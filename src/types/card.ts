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
  | 'Premium Dark Theme'
  // Business
  | 'Letterhead'
  | 'Logo Hero'
  | 'Sign-off'
  // Padwa
  | 'Royal Gold'
  | 'Soft & Romantic'
  | 'New Year'
  // Bhaubij
  | 'Aukshan'
  | 'Playful'
  | 'Twilight'
  // More occasion designs
  | 'Akash Kandil'
  | 'Lakshmi Pujan'
  | 'Modern Sparkle'
  | 'Gold Shopping'
  | 'Chopda Pujan'
  | 'Diwali Pahat'
  | 'Minimal'
  | 'Gifts'
  | 'Sweets';

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
  | 'amavasya'
  | 'biz-letterhead-ivory'
  | 'biz-letterhead-navy'
  | 'biz-hero-marigold'
  | 'biz-hero-midnight'
  | 'biz-signoff-maroon'
  | 'biz-signoff-minimal'
  | 'padwa-suvarna'
  | 'padwa-ovalni'
  | 'padwa-navvarsh'
  | 'bhaubij-aukshan'
  | 'bhaubij-bandhan'
  | 'bhaubij-yamuna'
  | 'diwali-kandil'
  | 'diwali-lakshmi'
  | 'diwali-phuljhadi'
  | 'padwa-kanchan'
  | 'padwa-chopda'
  | 'padwa-pahat'
  | 'bhaubij-tilak'
  | 'bhaubij-bhet'
  | 'bhaubij-mithai';

/** The festival day a card is for. */
export type Occasion = 'diwali' | 'padwa' | 'bhaubij';

/**
 * Which regional name the user prefers for the occasion:
 * Padwa → 'primary' Diwali Padwa · 'alternate' Govardhan Puja;
 * Bhaubij → 'primary' Bhaubij · 'alternate' Bhai Dooj.
 */
export type OccasionName = 'primary' | 'alternate';

/** Occasion-specific background animation (on top of the optional fireworks). */
export type OccasionEffect = 'petals' | 'aarti';

/** Personal cards are signed by people; business cards are branded with a company. */
export type CardMode = 'personal' | 'business';

export interface CardTemplate {
  id: TemplateId;
  mode: CardMode;
  /** Occasions this design appears for. */
  occasions: Occasion[];
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
  | 'prosperity'
  | 'spouse'
  | 'forBrother'
  | 'forSister';

export interface Wish {
  id: string;
  occasion: Occasion;
  category: WishCategory;
  text: Record<Language, string>;
}

export type MessageMode = 'preset' | 'custom';

export type FontStyle = 'template' | 'serif' | 'sans' | 'script' | 'decorative';

export type TextAlign = 'template' | 'left' | 'center' | 'right';

export type FontScale = 'sm' | 'md' | 'lg';

/** sister / brother are offered for Bhaubij only. */
export type SignAs = 'me' | 'withFamily' | 'family' | 'sister' | 'brother';

/** Free-text sender fields (signAs is set separately). */
export type SenderTextField = 'name' | 'customSenderText';

export interface SenderDetails {
  name: string;
  /** How the card is signed: just the name, name + family, or family only. */
  signAs: SignAs;
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
  /** Present on business cards: the brand details the business templates lay out. */
  business?: BusinessContent;
}

export interface BusinessDetails {
  name: string;
  tagline: string;
  phone: string;
  website: string;
  address: string;
  /** Business's own sign-off line (kept separate from the personal one). */
  signoff: string;
}

export type ContactKind = 'phone' | 'website' | 'address';

export interface BusinessContent {
  name: string;
  tagline: string;
  contacts: { kind: ContactKind; text: string }[];
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

/** 'signature' places the logo with the sender name, inside the template's layout. */
export type LogoPosition = 'signature' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type LogoSize = 'sm' | 'md' | 'lg';

export type LogoShape = 'original' | 'circle' | 'rounded' | 'square';

export type FireworksLevel = 'off' | 'subtle' | 'grand';

export interface LogoOptions {
  /** Processed PNG data URL, or null when no logo is set. */
  src: string | null;
  position: LogoPosition;
  size: LogoSize;
  /** Crop/mask applied to the logo (and frames drawn around it). */
  shape: LogoShape;
  /** Draw a soft white badge behind the logo so it stays readable on dark designs. */
  backdrop: boolean;
}
