import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_WISH_ID, WISHES, getWishById } from '../data/wishes';
import { t } from '../data/translations';
import { pickRandomWish } from '../utils/randomWish';
import type {
  CardContent,
  CardFormat,
  Language,
  MessageMode,
  SenderDetails,
  TemplateId,
  TextStyleOptions,
  WishCategory,
} from '../types/card';

export const LIMITS = {
  name: 40,
  familyName: 30,
  customSenderText: 60,
  message: 500,
} as const;

const STORAGE_KEY = 'diwali-card-sender-v1';

const loadSender = (): SenderDetails => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SenderDetails>;
      return {
        name: String(parsed.name ?? '').slice(0, LIMITS.name),
        familyName: String(parsed.familyName ?? '').slice(0, LIMITS.familyName),
        customSenderText: String(parsed.customSenderText ?? '').slice(0, LIMITS.customSenderText),
      };
    }
  } catch {
    /* storage unavailable — ignore */
  }
  return { name: '', familyName: '', customSenderText: '' };
};

export const DEFAULT_TEXT_STYLE: TextStyleOptions = {
  senderAlign: 'template',
  fontStyle: 'template',
  fontScale: 'md',
  textColor: 'template',
};

/** Builds the sender line: "Saurabh Wani & Family" or just "Saurabh". */
export const formatSenderName = (sender: SenderDetails, lang: Language): string => {
  const name = sender.name.trim();
  const family = sender.familyName.trim();
  if (!name) return lang === 'en' ? 'Your Name' : lang === 'hi' ? 'आपका नाम' : 'तुमचे नाव';
  return family ? `${name} ${family} ${t(lang).andFamily}` : name;
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
  const recentWishes = useRef<string[]>([]);

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

  const updateSender = useCallback(<K extends keyof SenderDetails>(key: K, value: string) => {
    setSender((prev) => ({ ...prev, [key]: value.slice(0, LIMITS[key]) }));
  }, []);

  const updateTextStyle = useCallback(<K extends keyof TextStyleOptions>(key: K, value: TextStyleOptions[K]) => {
    setTextStyle((prev) => ({ ...prev, [key]: value }));
  }, []);

  const strings = t(language);

  const content: CardContent = useMemo(
    () => ({
      heading: strings.heading,
      subheading: strings.subheading,
      message: message.trim() || strings.messagePlaceholder,
      senderIntro: sender.customSenderText.trim() || strings.senderIntro,
      senderName: formatSenderName(sender, language),
      language,
    }),
    [strings, message, sender, language],
  );

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
    visibleWishes,
    content,
    messageIsEmpty,
    shareMessage: strings.shareMessage,
    // actions
    setTemplateId,
    setFormat,
    setLanguage,
    setMessageMode,
    setWishCategory,
    setCustomMessage: (v: string) => setCustomMessage(v.slice(0, LIMITS.message)),
    selectWish,
    randomWish,
    editPreset,
    resetPreset,
    updateSender,
    updateTextStyle,
    resetTextStyle: () => setTextStyle(DEFAULT_TEXT_STYLE),
  };
};

export type CardGenerator = ReturnType<typeof useCardGenerator>;
