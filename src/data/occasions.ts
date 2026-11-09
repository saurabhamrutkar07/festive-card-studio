import { TRANSLATIONS } from './translations';
import type { Language, Occasion, OccasionEffect, OccasionName } from '../types/card';

/** The card text that changes with the occasion (and the chosen regional name). */
export interface OccasionText {
  heading: string;
  headingShort: string;
  subheading: string;
  senderIntro: string;
  messagePlaceholder: string;
  shareMessage: string;
}

export interface OccasionMeta {
  id: Occasion;
  /** Picker label: English + Marathi/Hindi script. */
  label: string;
  native: string;
  /** The two regional names users can choose between (none for Diwali). */
  names?: Record<OccasionName, string>;
  /** Occasion-specific animation, offered next to fireworks. */
  effect?: { kind: OccasionEffect; label: string };
  /** Filename prefix per name, e.g. "Happy-Bhaubij". */
  filePrefix: Record<OccasionName, string>;
}

export const OCCASIONS: OccasionMeta[] = [
  {
    id: 'diwali',
    label: 'Diwali',
    native: 'दिवाळी',
    filePrefix: { primary: 'Happy-Diwali', alternate: 'Happy-Diwali' },
  },
  {
    id: 'padwa',
    label: 'Padwa',
    native: 'पाडवा',
    names: { primary: 'Diwali Padwa', alternate: 'Govardhan Puja' },
    effect: { kind: 'petals', label: 'Marigold petals & gold coins' },
    filePrefix: { primary: 'Happy-Diwali-Padwa', alternate: 'Happy-Govardhan-Puja' },
  },
  {
    id: 'bhaubij',
    label: 'Bhaubij',
    native: 'भाऊबीज',
    names: { primary: 'Bhaubij', alternate: 'Bhai Dooj' },
    effect: { kind: 'aarti', label: 'Aarti glow & rising petals' },
    filePrefix: { primary: 'Happy-Bhaubij', alternate: 'Happy-Bhai-Dooj' },
  },
];

export const getOccasion = (id: Occasion): OccasionMeta => OCCASIONS.find((o) => o.id === id) ?? OCCASIONS[0];

type TextTable = Record<OccasionName, Record<Language, OccasionText>>;

const PADWA: TextTable = {
  primary: {
    en: {
      heading: 'Happy Diwali Padwa!',
      headingShort: 'Happy Padwa',
      subheading: 'Balipratipada',
      senderIntro: 'Padwa Wishes From',
      messagePlaceholder: 'Your heartfelt Padwa message will appear here…',
      shareMessage: 'Wishing you a very Happy Diwali Padwa! May this new year bring love, prosperity and new beginnings.',
    },
    hi: {
      heading: 'दिवाली पाड़वा की हार्दिक शुभकामनाएँ!',
      headingShort: 'शुभ पाड़वा',
      subheading: 'बलिप्रतिपदा',
      senderIntro: 'पाड़वा की शुभकामनाओं सहित',
      messagePlaceholder: 'आपका पाड़वा संदेश यहाँ दिखाई देगा…',
      shareMessage: 'आपको दिवाली पाड़वा की हार्दिक शुभकामनाएँ! यह नया वर्ष प्रेम, समृद्धि और नई शुरुआत लेकर आए।',
    },
    mr: {
      heading: 'दिवाळी पाडव्याच्या हार्दिक शुभेच्छा!',
      headingShort: 'शुभ पाडवा',
      subheading: 'बलिप्रतिपदा',
      senderIntro: 'पाडव्याच्या शुभेच्छांसह',
      messagePlaceholder: 'तुमचा पाडवा संदेश येथे दिसेल…',
      shareMessage: 'तुम्हाला दिवाळी पाडव्याच्या हार्दिक शुभेच्छा! हे नवीन वर्ष प्रेम, समृद्धी आणि नवी सुरुवात घेऊन येवो.',
    },
  },
  alternate: {
    en: {
      heading: 'Happy Govardhan Puja!',
      headingShort: 'Happy Govardhan Puja',
      subheading: 'Annakut Utsav',
      senderIntro: 'Govardhan Puja Wishes From',
      messagePlaceholder: 'Your heartfelt Govardhan Puja message will appear here…',
      shareMessage: 'Wishing you a very Happy Govardhan Puja! May Lord Krishna bless your home with abundance and joy.',
    },
    hi: {
      heading: 'गोवर्धन पूजा की हार्दिक शुभकामनाएँ!',
      headingShort: 'शुभ गोवर्धन पूजा',
      subheading: 'अन्नकूट उत्सव',
      senderIntro: 'गोवर्धन पूजा की शुभकामनाओं सहित',
      messagePlaceholder: 'आपका गोवर्धन पूजा संदेश यहाँ दिखाई देगा…',
      shareMessage: 'आपको गोवर्धन पूजा की हार्दिक शुभकामनाएँ! श्रीकृष्ण आपके घर को सुख-समृद्धि से भर दें।',
    },
    mr: {
      heading: 'गोवर्धन पूजेच्या हार्दिक शुभेच्छा!',
      headingShort: 'शुभ गोवर्धन पूजा',
      subheading: 'अन्नकूट उत्सव',
      senderIntro: 'गोवर्धन पूजेच्या शुभेच्छांसह',
      messagePlaceholder: 'तुमचा गोवर्धन पूजा संदेश येथे दिसेल…',
      shareMessage: 'तुम्हाला गोवर्धन पूजेच्या हार्दिक शुभेच्छा! श्रीकृष्ण तुमचे घर सुख-समृद्धीने भरून टाकोत.',
    },
  },
};

const BHAUBIJ: TextTable = {
  primary: {
    en: {
      heading: 'Happy Bhaubij!',
      headingShort: 'Happy Bhaubij',
      subheading: 'A Bond of Love & Protection',
      senderIntro: 'Bhaubij Wishes From',
      messagePlaceholder: 'Your heartfelt Bhaubij message will appear here…',
      shareMessage: 'Wishing you a very Happy Bhaubij! May the bond between brother and sister grow stronger every year.',
    },
    hi: {
      heading: 'भाऊबीज की हार्दिक शुभकामनाएँ!',
      headingShort: 'शुभ भाऊबीज',
      subheading: 'भाई-बहन के प्रेम का पर्व',
      senderIntro: 'भाऊबीज की शुभकामनाओं सहित',
      messagePlaceholder: 'आपका भाऊबीज संदेश यहाँ दिखाई देगा…',
      shareMessage: 'आपको भाऊबीज की हार्दिक शुभकामनाएँ! भाई-बहन का यह प्यार हर साल और गहरा हो।',
    },
    mr: {
      heading: 'भाऊबीजेच्या हार्दिक शुभेच्छा!',
      headingShort: 'शुभ भाऊबीज',
      subheading: 'बहीण-भावाच्या प्रेमाचा सण',
      senderIntro: 'भाऊबीजेच्या शुभेच्छांसह',
      messagePlaceholder: 'तुमचा भाऊबीज संदेश येथे दिसेल…',
      shareMessage: 'तुम्हाला भाऊबीजेच्या हार्दिक शुभेच्छा! बहीण-भावाचं हे प्रेम दरवर्षी अधिक घट्ट होवो.',
    },
  },
  alternate: {
    en: {
      heading: 'Happy Bhai Dooj!',
      headingShort: 'Happy Bhai Dooj',
      subheading: 'A Bond of Love & Protection',
      senderIntro: 'Bhai Dooj Wishes From',
      messagePlaceholder: 'Your heartfelt Bhai Dooj message will appear here…',
      shareMessage: 'Wishing you a very Happy Bhai Dooj! May the bond between brother and sister grow stronger every year.',
    },
    hi: {
      heading: 'भाई दूज की हार्दिक शुभकामनाएँ!',
      headingShort: 'शुभ भाई दूज',
      subheading: 'भाई-बहन के प्रेम का पर्व',
      senderIntro: 'भाई दूज की शुभकामनाओं सहित',
      messagePlaceholder: 'आपका भाई दूज संदेश यहाँ दिखाई देगा…',
      shareMessage: 'आपको भाई दूज की हार्दिक शुभकामनाएँ! भाई-बहन का यह प्यार हर साल और गहरा हो।',
    },
    mr: {
      heading: 'भाईदूजच्या हार्दिक शुभेच्छा!',
      headingShort: 'शुभ भाईदूज',
      subheading: 'बहीण-भावाच्या प्रेमाचा सण',
      senderIntro: 'भाईदूजच्या शुभेच्छांसह',
      messagePlaceholder: 'तुमचा भाईदूज संदेश येथे दिसेल…',
      shareMessage: 'तुम्हाला भाईदूजच्या हार्दिक शुभेच्छा! बहीण-भावाचं हे प्रेम दरवर्षी अधिक घट्ट होवो.',
    },
  },
};

/** Card text for an occasion in a language, honouring the user's chosen name. */
export const occasionText = (occasion: Occasion, name: OccasionName, lang: Language): OccasionText => {
  if (occasion === 'padwa') return PADWA[name][lang];
  if (occasion === 'bhaubij') return BHAUBIJ[name][lang];
  const s = TRANSLATIONS[lang];
  return {
    heading: s.heading,
    headingShort: s.headingShort,
    subheading: s.subheading,
    senderIntro: s.senderIntro,
    messagePlaceholder: s.messagePlaceholder,
    shareMessage: s.shareMessage,
  };
};

/** "Diwali", "Diwali Padwa", "Govardhan Puja", "Bhaubij", "Bhai Dooj". */
export const occasionDisplayName = (occasion: Occasion, name: OccasionName): string => {
  const meta = getOccasion(occasion);
  return meta.names ? meta.names[name] : meta.label;
};
