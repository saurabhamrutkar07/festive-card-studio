import type { FontScale, FontStyle, TextAlign, TextStyleOptions } from '../../types/card';

/**
 * Every Latin font is paired with a Devanagari font so Hindi/Marathi text
 * always renders with proper glyphs (on screen and in the exported PNG).
 */
export const FONT_STACKS = {
  serif: "'Playfair Display', 'Noto Serif Devanagari', Georgia, serif",
  garamond: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif",
  sans: "'Poppins', 'Noto Sans Devanagari', Arial, sans-serif",
  script: "'Great Vibes', 'Kalam', cursive",
  decorative: "'Cinzel', 'Yatra One', Georgia, serif",
  folk: "'Kalam', 'Kalam', cursive",
  yatra: "'Yatra One', 'Yatra One', Georgia, serif",
  devaSerif: "'Noto Serif Devanagari', 'Playfair Display', Georgia, serif",
} as const;

export type FontStackKey = keyof typeof FONT_STACKS;

export const USER_FONT_OPTIONS: { value: FontStyle; label: string }[] = [
  { value: 'template', label: 'Design default' },
  { value: 'serif', label: 'Elegant Serif' },
  { value: 'sans', label: 'Clean Sans' },
  { value: 'script', label: 'Handwritten' },
  { value: 'decorative', label: 'Festive Classic' },
];

const USER_FONT_TO_STACK: Record<Exclude<FontStyle, 'template'>, FontStackKey> = {
  serif: 'serif',
  sans: 'sans',
  script: 'folk',
  decorative: 'decorative',
};

export const FONT_SCALE_FACTOR: Record<FontScale, number> = { sm: 0.86, md: 1, lg: 1.16 };

export interface TemplateTypeDefaults {
  font: FontStackKey;
  color: string;
  align: Exclude<TextAlign, 'template'>;
}

export interface ResolvedTypography {
  font: string;
  color: string;
  senderAlign: Exclude<TextAlign, 'template'>;
  scale: number;
}

export const resolveTypography = (
  style: TextStyleOptions,
  defaults: TemplateTypeDefaults,
): ResolvedTypography => ({
  font: style.fontStyle === 'template' ? FONT_STACKS[defaults.font] : FONT_STACKS[USER_FONT_TO_STACK[style.fontStyle]],
  color: style.textColor === 'template' ? defaults.color : style.textColor,
  senderAlign: style.senderAlign === 'template' ? defaults.align : style.senderAlign,
  scale: FONT_SCALE_FACTOR[style.fontScale],
});

export const isDevanagari = (text: string) => /[ऀ-ॿ]/.test(text);
