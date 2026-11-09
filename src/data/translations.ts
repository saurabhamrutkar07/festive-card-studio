import type { Language, WishCategory } from '../types/card';

export interface LanguageMeta {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
];

interface CardStrings {
  heading: string;
  /** Short heading used by layouts that need a compact title. */
  headingShort: string;
  subheading: string;
  senderIntro: string;
  andFamily: string;
  /** Used when the whole family signs: "Doe Family". */
  familyOnly: string;
  shareMessage: string;
  messagePlaceholder: string;
  wishCategories: Record<WishCategory, string>;
  /** Bhaubij "Sign as" intro lines, e.g. "With love, your sister". */
  fromSister: string;
  fromBrother: string;
}

export const TRANSLATIONS: Record<Language, CardStrings> = {
  en: {
    heading: 'Happy Diwali!',
    headingShort: 'Happy Diwali',
    subheading: 'The Festival of Lights',
    senderIntro: 'Happy Diwali Wishes From',
    andFamily: '& Family',
    familyOnly: 'Family',
    messagePlaceholder: 'Your heartfelt Diwali message will appear here…',
    shareMessage:
      'Sending you and your family warm wishes for a Happy Diwali! May this festival bring happiness, prosperity and good health.',
    wishCategories: {
      traditional: 'Traditional',
      family: 'Family',
      friends: 'Friends',
      professional: 'Professional',
      short: 'Short & Sweet',
      inspirational: 'Inspirational',
      spiritual: 'Spiritual',
      prosperity: 'Prosperity & Happiness',
      spouse: 'For Spouse',
      forBrother: 'For Brother',
      forSister: 'For Sister',
    },
    fromSister: 'With love, your sister',
    fromBrother: 'With love, your brother',
  },
  hi: {
    heading: 'दीपावली की हार्दिक शुभकामनाएँ!',
    headingShort: 'शुभ दीपावली',
    subheading: 'प्रकाश का पावन पर्व',
    senderIntro: 'दीपावली की शुभकामनाओं सहित',
    andFamily: 'एवं परिवार',
    familyOnly: 'परिवार',
    messagePlaceholder: 'आपका दीपावली संदेश यहाँ दिखाई देगा…',
    shareMessage:
      'आपको और आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ! यह पर्व आपके जीवन में सुख, समृद्धि और उत्तम स्वास्थ्य लाए।',
    wishCategories: {
      traditional: 'पारंपरिक',
      family: 'परिवार',
      friends: 'दोस्त',
      professional: 'व्यावसायिक',
      short: 'छोटी और प्यारी',
      inspirational: 'प्रेरणादायक',
      spiritual: 'आध्यात्मिक',
      prosperity: 'समृद्धि और खुशी',
      spouse: 'जीवनसाथी के लिए',
      forBrother: 'भाई के लिए',
      forSister: 'बहन के लिए',
    },
    fromSister: 'ढेर सारे प्यार के साथ, तुम्हारी बहन',
    fromBrother: 'ढेर सारे प्यार के साथ, तुम्हारा भाई',
  },
  mr: {
    heading: 'दिवाळीच्या हार्दिक शुभेच्छा!',
    headingShort: 'शुभ दीपावली',
    subheading: 'प्रकाशाचा मंगल सण',
    senderIntro: 'दिवाळीच्या शुभेच्छांसह',
    andFamily: 'व परिवार',
    familyOnly: 'परिवार',
    messagePlaceholder: 'तुमचा दिवाळी संदेश येथे दिसेल…',
    shareMessage:
      'तुम्हाला आणि तुमच्या कुटुंबाला दिवाळीच्या हार्दिक शुभेच्छा! हा सण तुमच्या आयुष्यात सुख, समृद्धी आणि उत्तम आरोग्य घेऊन येवो.',
    wishCategories: {
      traditional: 'पारंपरिक',
      family: 'कुटुंब',
      friends: 'मित्र',
      professional: 'व्यावसायिक',
      short: 'छोट्या व गोड',
      inspirational: 'प्रेरणादायी',
      spiritual: 'आध्यात्मिक',
      prosperity: 'समृद्धी व आनंद',
      spouse: 'जोडीदारासाठी',
      forBrother: 'भावासाठी',
      forSister: 'बहिणीसाठी',
    },
    fromSister: 'खूप प्रेमाने, तुझी बहीण',
    fromBrother: 'खूप प्रेमाने, तुझा भाऊ',
  },
};

export const t = (lang: Language) => TRANSLATIONS[lang];
