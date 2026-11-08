import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_WISH_ID, WISHES, getWishById } from '../data/wishes';
import { t } from '../data/translations';
import { pickRandomWish } from '../utils/randomWish';
import { getTemplateById } from '../data/templates';
import type {
  BusinessContent,
  BusinessDetails,
  CardContent,
  CardMode,
  CardFormat,
  FireworksLevel,
  Language,
  LogoOptions,
  MessageMode,
  SenderDetails,
  SenderTextField,
  SignAs,
  TemplateId,
  TextStyleOptions,
  WishCategory,
} from '../types/card';

export const LIMITS = {
  name: 50,
  customSenderText: 60,
  message: 500,
} as const;

export const BUSINESS_LIMITS: Record<keyof BusinessDetails, number> = {
  name: 50,
  tagline: 60,
  phone: 24,
  website: 40,
  address: 50,
  signoff: 60,
};

const BUSINESS_STORAGE_KEY = 'festive-card-business-v1';

const BUSINESS_PLACEHOLDER: Record<Language, string> = { en: 'Your Business', hi: 'आपका व्यवसाय', mr: 'तुमचा व्यवसाय' };

/** Saved so a business doesn't retype its details every visit. */
const loadBusiness = (): BusinessDetails => {
  const empty: BusinessDetails = { name: '', tagline: '', phone: '', website: '', address: '', signoff: '' };
  try {
    const raw = localStorage.getItem(BUSINESS_STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<BusinessDetails>;
      return (Object.keys(empty) as (keyof BusinessDetails)[]).reduce(
        (acc, k) => ({ ...acc, [k]: String(p[k] ?? '').slice(0, BUSINESS_LIMITS[k]) }),
        empty,
      );
    }
  } catch {
    /* storage unavailable — ignore */
  }
  return empty;
};

const toBusinessContent = (b: BusinessDetails): BusinessContent => ({
  name: b.name.trim(),
  tagline: b.tagline.trim(),
  contacts: (['phone', 'website', 'address'] as const).filter((k) => b[k].trim()).map((k) => ({ kind: k, text: b[k].trim() })),
});

const STORAGE_KEY = 'diwali-card-sender-v1';
const SIGN_AS: SignAs[] = ['me', 'withFamily', 'family'];

const loadSender = (): SenderDetails => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      // `familyName` is from the older two-box form — merged into one name.
      const parsed = JSON.parse(raw) as Partial<SenderDetails> & { familyName?: string };
      const legacyFamily = String(parsed.familyName ?? '').trim();
      return {
        name: `${String(parsed.name ?? '').trim()} ${legacyFamily}`.trim().slice(0, LIMITS.name),
        signAs: SIGN_AS.includes(parsed.signAs as SignAs) ? (parsed.signAs as SignAs) : legacyFamily ? 'withFamily' : 'me',
        customSenderText: String(parsed.customSenderText ?? '').slice(0, LIMITS.customSenderText),
      };
    }
  } catch {
    /* storage unavailable — ignore */
  }
  return { name: '', signAs: 'me', customSenderText: '' };
};

const LOGO_STORAGE_KEY = 'diwali-card-logo-v2';
/** v1 defaulted to a corner; its logo is kept but placement resets to the signature. */
const LEGACY_LOGO_STORAGE_KEY = 'diwali-card-logo-v1';

export const DEFAULT_LOGO: LogoOptions = { src: null, position: 'signature', size: 'md', shape: 'original', backdrop: false };

const LOGO_SHAPES: string[] = ['original', 'circle', 'rounded', 'square'];

const LOGO_POSITIONS: string[] = ['signature', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

/** Restores a saved logo so business users don't re-upload it every visit. */
const loadLogo = (): LogoOptions => {
  try {
    const legacy = !localStorage.getItem(LOGO_STORAGE_KEY);
    const raw = localStorage.getItem(LOGO_STORAGE_KEY) ?? localStorage.getItem(LEGACY_LOGO_STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<LogoOptions>;
      return {
        src: typeof p.src === 'string' && p.src.startsWith('data:image/png;base64,') ? p.src : null,
        position: !legacy && LOGO_POSITIONS.includes(String(p.position)) ? (p.position as LogoOptions['position']) : DEFAULT_LOGO.position,
        size: p.size === 'sm' || p.size === 'lg' ? p.size : 'md',
        shape: LOGO_SHAPES.includes(String(p.shape)) ? (p.shape as LogoOptions['shape']) : 'original',
        backdrop: p.backdrop === true,
      };
    }
  } catch {
    /* storage unavailable — ignore */
  }
  return DEFAULT_LOGO;
};

export const DEFAULT_TEXT_STYLE: TextStyleOptions = {
  senderAlign: 'template',
  fontStyle: 'template',
  fontScale: 'md',
  textColor: 'template',
};

/**
 * Builds the sender line from one name box + how the person signs:
 *   me          "John Doe"
 *   withFamily  "John Doe & Family"  /  "John Doe एवं परिवार"
 *   family      "Doe Family"         /  "Doe परिवार"   (last word = surname)
 */
export const formatSenderName = (sender: SenderDetails, lang: Language): string => {
  const name = sender.name.trim().replace(/\s+/g, ' ');
  if (!name) return lang === 'en' ? 'Your Name' : lang === 'hi' ? 'आपका नाम' : 'तुमचे नाव';
  const strings = t(lang);
  if (sender.signAs === 'withFamily') return `${name} ${strings.andFamily}`;
  if (sender.signAs === 'family') return `${name.split(' ').pop()} ${strings.familyOnly}`;
  return name;
};

export const useCardGenerator = () => {
  const [templateId, setTemplateId] = useState<TemplateId>('deepmala');
  const [format, setFormat] = useState<CardFormat>('portrait');
  const [language, setLanguage] = useState<Language>('en');
  const [messageMode, setMessageMode] = useState<MessageMode>('preset');
  const [selectedWishId, setSelectedWishId] = useState<string>(DEFAULT_WISH_ID);
  const [wishCategory, setWishCategory] = useState<WishCategory | 'all'>('all');
  /** User edits to predefined wishes, keyed by `${language}:${wishId}`. */
  const [presetEdits, setPresetEdits] = useState<Record<string, string>>({});
  const [customMessage, setCustomMessage] = useState('');
  const [sender, setSender] = useState<SenderDetails>(loadSender);
  const [textStyle, setTextStyle] = useState<TextStyleOptions>(DEFAULT_TEXT_STYLE);
  const [logo, setLogo] = useState<LogoOptions>(loadLogo);
  const [fireworks, setFireworks] = useState<FireworksLevel>('off');
  const [mode, setModeState] = useState<CardMode>('personal');
  const [business, setBusiness] = useState<BusinessDetails>(loadBusiness);
  const recentWishes = useRef<string[]>([]);
  /** The last design picked in each mode, so switching back restores it. */
  const lastTemplate = useRef<Record<CardMode, TemplateId>>({ personal: 'deepmala', business: 'biz-letterhead-ivory' });

  useEffect(() => {
    try {
      localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(business));
    } catch {
      /* ignore */
    }
  }, [business]);

  useEffect(() => {
    try {
      localStorage.setItem(LOGO_STORAGE_KEY, JSON.stringify(logo));
      localStorage.removeItem(LEGACY_LOGO_STORAGE_KEY);
    } catch {
      /* quota exceeded or storage blocked — the logo still works for this session */
    }
  }, [logo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sender));
    } catch {
      /* ignore */
    }
  }, [sender]);

  const editKey = `${language}:${selectedWishId}`;
  const originalPresetText = getWishById(selectedWishId)?.text[language] ?? '';
  const presetText = presetEdits[editKey] ?? originalPresetText;
  const isPresetEdited = editKey in presetEdits && presetEdits[editKey] !== originalPresetText;

  const message = messageMode === 'preset' ? presetText : customMessage;

  const visibleWishes = useMemo(
    () => (wishCategory === 'all' ? WISHES : WISHES.filter((w) => w.category === wishCategory)),
    [wishCategory],
  );

  const selectWish = useCallback((id: string) => {
    setSelectedWishId(id);
    setMessageMode('preset');
  }, []);

  const randomWish = useCallback(() => {
    const pick = pickRandomWish(visibleWishes, messageMode === 'preset' ? selectedWishId : null, recentWishes.current);
    if (!pick) return;
    const memory = Math.min(visibleWishes.length - 1, 10);
    recentWishes.current = [pick.id, ...recentWishes.current.filter((id) => id !== pick.id)].slice(0, memory);
    setSelectedWishId(pick.id);
    setMessageMode('preset');
  }, [visibleWishes, selectedWishId, messageMode]);

  const editPreset = useCallback(
    (text: string) => setPresetEdits((prev) => ({ ...prev, [editKey]: text.slice(0, LIMITS.message) })),
    [editKey],
  );

  const resetPreset = useCallback(
    () =>
      setPresetEdits((prev) => {
        const next = { ...prev };
        delete next[editKey];
        return next;
      }),
    [editKey],
  );

  const updateSender = useCallback((key: SenderTextField, value: string) => {
    setSender((prev) => ({ ...prev, [key]: value.slice(0, LIMITS[key]) }));
  }, []);

  const setSignAs = useCallback((signAs: SignAs) => setSender((prev) => ({ ...prev, signAs })), []);

  const updateTextStyle = useCallback(<K extends keyof TextStyleOptions>(key: K, value: TextStyleOptions[K]) => {
    setTextStyle((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateLogo = useCallback(<K extends keyof LogoOptions>(key: K, value: LogoOptions[K]) => {
    setLogo((prev) => ({ ...prev, [key]: value }));
  }, []);

  const removeLogo = useCallback(() => setLogo((prev) => ({ ...prev, src: null })), []);

  const updateBusiness = useCallback((key: keyof BusinessDetails, value: string) => {
    setBusiness((prev) => ({ ...prev, [key]: value.slice(0, BUSINESS_LIMITS[key]) }));
  }, []);

  const selectTemplate = useCallback((id: TemplateId) => {
    lastTemplate.current[getTemplateById(id).mode] = id;
    setTemplateId(id);
  }, []);

  /** Switching to Business opens its designs and the professional wishes. */
  const setMode = useCallback(
    (next: CardMode) => {
      if (next === mode) return;
      setModeState(next);
      setTemplateId(lastTemplate.current[next]);
      if (next === 'business') {
        setWishCategory('professional');
        if (getWishById(selectedWishId)?.category !== 'professional') setSelectedWishId('professional-1');
      } else {
        setWishCategory('all');
      }
    },
    [mode, selectedWishId],
  );

  const strings = t(language);

  const content: CardContent = useMemo(() => {
    const base = {
      heading: strings.heading,
      subheading: strings.subheading,
      message: message.trim() || strings.messagePlaceholder,
      senderIntro: sender.customSenderText.trim() || strings.senderIntro,
      language,
    };
    if (mode === 'personal') return { ...base, senderName: formatSenderName(sender, language) };
    return {
      ...base,
      senderIntro: business.signoff.trim() || strings.senderIntro,
      senderName: business.name.trim() || BUSINESS_PLACEHOLDER[language],
      business: toBusinessContent(business),
    };
  }, [strings, message, sender, language, mode, business]);

  /** How the card is signed: the person/family, or the business name. */
  const signature = mode === 'business' ? business.name.trim() : sender.name.trim() ? formatSenderName(sender, language) : '';

  const messageIsEmpty = message.trim().length === 0;

  return {
    // state
    templateId,
    format,
    language,
    messageMode,
    selectedWishId,
    wishCategory,
    customMessage,
    presetText,
    isPresetEdited,
    sender,
    textStyle,
    logo,
    fireworks,
    mode,
    business,
    signature,
    visibleWishes,
    content,
    messageIsEmpty,
    shareMessage: strings.shareMessage,
    // actions
    setTemplateId: selectTemplate,
    setMode,
    updateBusiness,
    setFormat,
    setFireworks,
    setLanguage,
    setMessageMode,
    setWishCategory,
    setCustomMessage: (v: string) => setCustomMessage(v.slice(0, LIMITS.message)),
    selectWish,
    randomWish,
    editPreset,
    resetPreset,
    updateSender,
    setSignAs,
    updateTextStyle,
    updateLogo,
    removeLogo,
    resetTextStyle: () => setTextStyle(DEFAULT_TEXT_STYLE),
  };
};

export type CardGenerator = ReturnType<typeof useCardGenerator>;
