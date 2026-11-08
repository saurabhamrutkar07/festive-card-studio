export type Language = 'en' | 'hi' | 'mr';

export type CardFormat = 'portrait' | 'square' | 'landscape';

export type TemplateCategory =
  | 'Traditional Diwali'
  | 'Royal Gold'
  | 'Modern Minimal'
  | 'Floral Diwali'
  | 'Rangoli Theme'
  | 'Spiritual Diwali'
  | 'Elegant Luxury'
  | 'Colourful Festive'
  | 'Traditional Indian Art'
  | 'Contemporary Gradient'
  | 'Family Celebration'
  | 'Premium Dark Theme';

export type TemplateId =
  | 'deepmala'
  | 'rajwada'
  | 'shuddh'
  | 'genda'
  | 'rangoli'
  | 'omkar'
  | 'noir'
  | 'utsav'
  | 'madhubani'
  | 'aurora'
  | 'parivar'
  | 'amavasya';

export interface CardTemplate {
  id: TemplateId;
  name: string;
  category: TemplateCategory;
  description: string;
  /** Colour used for the default sender/message text. */
  defaultTextColor: string;
  /** Swatch colours used for the gallery chip. */
  swatch: [string, string];
}

export type WishCategory =
  | 'traditional'
  | 'family'
  | 'friends'
  | 'professional'
  | 'short'
  | 'inspirational'
  | 'spiritual'
  | 'prosperity';

export interface Wish {
  id: string;
  category: WishCategory;
  text: Record<Language, string>;
}

export type MessageMode = 'preset' | 'custom';

export type FontStyle = 'template' | 'serif' | 'sans' | 'script' | 'decorative';

export type TextAlign = 'template' | 'left' | 'center' | 'right';

export type FontScale = 'sm' | 'md' | 'lg';

export interface SenderDetails {
  name: string;
  familyName: string;
  customSenderText: string;
}

export interface TextStyleOptions {
  senderAlign: TextAlign;
  fontStyle: FontStyle;
  fontScale: FontScale;
  /** 'template' means use the template's own colour. */
  textColor: string;
}

/** Everything a card design needs to render. Already resolved/translated. */
export interface CardContent {
  heading: string;
  subheading: string;
  message: string;
  senderIntro: string;
  senderName: string;
  language: Language;
}

export interface CardRenderProps {
  content: CardContent;
  format: CardFormat;
  style: TextStyleOptions;
}

export interface CardDimensions {
  width: number;
  height: number;
  label: string;
}

export type LogoPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoOptions {
  /** Processed PNG data URL, or null when no logo is set. */
  src: string | null;
  position: LogoPosition;
  size: LogoSize;
  /** Draw a soft white badge behind the logo so it stays readable on dark designs. */
  backdrop: boolean;
}
