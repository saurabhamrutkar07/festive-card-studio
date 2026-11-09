import type { Occasion, Wish, WishCategory } from '../types/card';
import { BHAUBIJ_WISHES, PADWA_WISHES } from './occasionWishes';

/**
 * 32 wishes across 8 categories. Every wish shares one id across all three
 * languages so that switching language keeps the same sentiment selected.
 */
const DIWALI_WISHES: Omit<Wish, 'occasion'>[] = [
  // ───────────── Traditional ─────────────
  {
    id: 'traditional-1',
    category: 'traditional',
    text: {
      en: 'May the festival of lights illuminate your life with happiness, prosperity, good health and endless blessings. Wishing you and your family a very Happy Diwali!',
      hi: 'दीपों का यह पावन पर्व आपके जीवन को सुख, समृद्धि, उत्तम स्वास्थ्य और अनंत आशीर्वादों से रोशन करे। आपको और आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ!',
      mr: 'दीपांचा हा पवित्र सण तुमचे आयुष्य सुख, समृद्धी, उत्तम आरोग्य आणि अखंड आशीर्वादांनी उजळून टाको. तुम्हाला आणि तुमच्या कुटुंबाला दिवाळीच्या हार्दिक शुभेच्छा!',
    },
  },
  {
    id: 'traditional-2',
    category: 'traditional',
    text: {
      en: 'May every diya bring new hope, every sparkle bring happiness, and every moment of this Diwali fill your home with love and prosperity.',
      hi: 'हर दीया नई आशा लाए, हर चमक खुशियाँ लाए, और इस दीवाली का हर पल आपके घर को प्रेम और समृद्धि से भर दे।',
      mr: 'प्रत्येक पणती नवी आशा घेऊन येवो, प्रत्येक चमक आनंद देवो आणि या दिवाळीचा प्रत्येक क्षण तुमचे घर प्रेम आणि समृद्धीने भरून टाको.',
    },
  },
  {
    id: 'traditional-3',
    category: 'traditional',
    text: {
      en: 'As rows of diyas light up every doorstep, may your home glow with peace, your heart with joy, and your days with good fortune. Shubh Deepavali!',
      hi: 'जैसे हर द्वार पर दीपों की कतारें जगमगाती हैं, वैसे ही आपका घर शांति से, मन आनंद से और हर दिन सौभाग्य से जगमगाए। शुभ दीपावली!',
      mr: 'जशा प्रत्येक दारात पणत्यांच्या रांगा उजळतात, तसे तुमचे घर शांतीने, मन आनंदाने आणि प्रत्येक दिवस सौभाग्याने उजळून निघो. शुभ दीपावली!',
    },
  },
  {
    id: 'traditional-4',
    category: 'traditional',
    text: {
      en: 'With fresh rangoli at the door, sweets on the table and lamps in every window, may this Diwali bring you a whole year of warmth and blessings.',
      hi: 'द्वार पर सुंदर रंगोली, थाली में मिठाइयाँ और हर खिड़की पर जलते दीये — यह दीवाली आपके लिए पूरे वर्ष की खुशियाँ और आशीर्वाद लेकर आए।',
      mr: 'दारात सुंदर रांगोळी, ताटात फराळ आणि प्रत्येक खिडकीत तेवणाऱ्या पणत्या — ही दिवाळी तुमच्यासाठी वर्षभराचा आनंद आणि आशीर्वाद घेऊन येवो.',
    },
  },

  // ───────────── Family ─────────────
  {
    id: 'family-1',
    category: 'family',
    text: {
      en: 'Let the light of Diwali brighten your path, the warmth of family fill your heart, and the blessings of this festival bring success and happiness.',
      hi: 'दीवाली की रोशनी आपकी राह रोशन करे, परिवार का स्नेह आपके दिल को भर दे, और इस पर्व का आशीर्वाद आपको सफलता और खुशियाँ दे।',
      mr: 'दिवाळीचा प्रकाश तुमची वाट उजळो, कुटुंबाची माया तुमचे मन भरून टाको आणि या सणाचे आशीर्वाद तुम्हाला यश आणि आनंद देवोत.',
    },
  },
  {
    id: 'family-2',
    category: 'family',
    text: {
      en: 'Here’s to laughter around the dinner table, stories shared under twinkling lights and the love that makes every home shine brighter. Happy Diwali to your whole family!',
      hi: 'खाने की मेज़ पर ठहाके, जगमगाती रोशनी में बाँटी गई बातें और वह प्यार जो हर घर को और भी रोशन कर देता है — आपके पूरे परिवार को दीवाली की ढेरों शुभकामनाएँ!',
      mr: 'जेवणाच्या पंगतीतले हसू, लुकलुकत्या दिव्यांच्या उजेडात रंगलेल्या गप्पा आणि प्रत्येक घर अधिक उजळवणारे प्रेम — तुमच्या संपूर्ण कुटुंबाला दिवाळीच्या खूप खूप शुभेच्छा!',
    },
  },
  {
    id: 'family-3',
    category: 'family',
    text: {
      en: 'May the blessings of elders guide you, the laughter of children fill your home, and togetherness be the brightest lamp in your family this Diwali.',
      hi: 'बड़ों का आशीर्वाद आपका मार्गदर्शन करे, बच्चों की हँसी आपके घर को भर दे, और इस दीवाली एकता आपके परिवार का सबसे उजला दीपक बने।',
      mr: 'वडीलधाऱ्यांचे आशीर्वाद तुम्हाला मार्ग दाखवोत, मुलांचे हसू तुमचे घर भरून टाको आणि या दिवाळीत एकोपा हाच तुमच्या कुटुंबाचा सर्वात तेजस्वी दिवा ठरो.',
    },
  },
  {
    id: 'family-4',
    category: 'family',
    text: {
      en: 'From our home to yours — sending love, light and heartfelt wishes. May your family be blessed with health, harmony and happiness all year long.',
      hi: 'हमारे घर से आपके घर तक — ढेर सारा प्यार, रोशनी और दिल से शुभकामनाएँ। आपका परिवार पूरे वर्ष स्वास्थ्य, सद्भाव और खुशियों से भरा रहे।',
      mr: 'आमच्या घरून तुमच्या घरापर्यंत — भरपूर प्रेम, प्रकाश आणि मनापासून शुभेच्छा. तुमचे कुटुंब वर्षभर आरोग्य, सलोखा आणि आनंदाने भरलेले राहो.',
    },
  },

  // ───────────── Friends ─────────────
  {
    id: 'friends-1',
    category: 'friends',
    text: {
      en: 'To the friend who makes every celebration brighter — may your Diwali be as sparkling, sweet and wonderful as you are!',
      hi: 'हर जश्न को और रोशन बना देने वाले मेरे दोस्त — तुम्हारी दीवाली भी तुम्हारी तरह चमकदार, मीठी और शानदार हो!',
      mr: 'प्रत्येक सण अधिक उजळवणाऱ्या माझ्या मित्रा — तुझी दिवाळीही तुझ्यासारखीच चमकदार, गोड आणि अप्रतिम जावो!',
    },
  },
  {
    id: 'friends-2',
    category: 'friends',
    text: {
      en: 'More laddoos, fewer worries, endless laughter and memories worth keeping forever. Happy Diwali, my friend!',
      hi: 'ज़्यादा लड्डू, कम चिंताएँ, बेहिसाब हँसी और हमेशा याद रखने लायक पल। दीवाली मुबारक हो, मेरे दोस्त!',
      mr: 'भरपूर लाडू, कमी काळज्या, अमर्याद हसू आणि कायम जपून ठेवाव्यात अशा आठवणी. दिवाळीच्या शुभेच्छा, मित्रा!',
    },
  },
  {
    id: 'friends-3',
    category: 'friends',
    text: {
      en: 'Distance may keep us apart, but the glow of our friendship reaches across every mile. Wishing you a joyful and dazzling Diwali!',
      hi: 'दूरियाँ भले ही हमें अलग रखें, पर हमारी दोस्ती की रोशनी हर फ़ासले को पार कर जाती है। तुम्हें आनंद और जगमगाहट भरी दीवाली की शुभकामनाएँ!',
      mr: 'अंतर आपल्याला दूर ठेवेल, पण आपल्या मैत्रीचा प्रकाश प्रत्येक अंतर पार करून पोहोचतो. तुला आनंदी आणि झगमगत्या दिवाळीच्या शुभेच्छा!',
    },
  },
  {
    id: 'friends-4',
    category: 'friends',
    text: {
      en: 'Old friends are like diyas — they make even the darkest nights feel warm. Thank you for lighting up my life. Happy Diwali!',
      hi: 'पुराने दोस्त दीयों की तरह होते हैं — सबसे अँधेरी रात को भी गर्माहट से भर देते हैं। मेरी ज़िंदगी रोशन करने के लिए शुक्रिया। शुभ दीवाली!',
      mr: 'जुने मित्र पणत्यांसारखे असतात — सर्वात अंधाऱ्या रात्रीलाही ऊब देतात. माझे आयुष्य उजळवल्याबद्दल धन्यवाद. शुभ दीपावली!',
    },
  },

  // ───────────── Professional ─────────────
  {
    id: 'professional-1',
    category: 'professional',
    text: {
      en: 'Wishing you and your team a prosperous Diwali. May the year ahead bring new opportunities, shared success and continued growth.',
      hi: 'आपको और आपकी टीम को समृद्ध दीपावली की शुभकामनाएँ। आने वाला वर्ष नए अवसर, साझा सफलता और निरंतर प्रगति लेकर आए।',
      mr: 'तुम्हाला आणि तुमच्या संपूर्ण टीमला समृद्ध दीपावलीच्या शुभेच्छा. येणारे वर्ष नव्या संधी, सामायिक यश आणि सातत्यपूर्ण प्रगती घेऊन येवो.',
    },
  },
  {
    id: 'professional-2',
    category: 'professional',
    text: {
      en: 'Thank you for your trust and partnership. May this festival of lights illuminate new milestones for you and your organisation. Happy Diwali!',
      hi: 'आपके विश्वास और साझेदारी के लिए हार्दिक धन्यवाद। प्रकाश का यह पर्व आपके और आपकी संस्था के लिए नई उपलब्धियों का मार्ग रोशन करे। शुभ दीपावली!',
      mr: 'तुमच्या विश्वासाबद्दल आणि सहकार्याबद्दल मनःपूर्वक धन्यवाद. प्रकाशाचा हा सण तुमच्या आणि तुमच्या संस्थेच्या नव्या यशाचा मार्ग उजळो. शुभ दीपावली!',
    },
  },
  {
    id: 'professional-3',
    category: 'professional',
    text: {
      en: 'May this Diwali mark the beginning of a bright new chapter filled with fresh ideas, proud achievements and lasting success.',
      hi: 'यह दीवाली नए विचारों, गौरवपूर्ण उपलब्धियों और स्थायी सफलता से भरे एक उज्ज्वल नए अध्याय की शुरुआत बने।',
      mr: 'ही दिवाळी नव्या कल्पना, अभिमानास्पद यश आणि शाश्वत प्रगतीने भरलेल्या एका उज्ज्वल नव्या अध्यायाची सुरुवात ठरो.',
    },
  },
  {
    id: 'professional-4',
    category: 'professional',
    text: {
      en: 'Warm Diwali greetings to you and your loved ones. May your work be rewarding, your goals be achieved and your festive days be restful.',
      hi: 'आपको और आपके प्रियजनों को दीपावली की हार्दिक बधाई। आपका कार्य फलदायी हो, लक्ष्य पूरे हों और त्योहार के दिन सुकून भरे हों।',
      mr: 'तुम्हाला आणि तुमच्या प्रियजनांना दीपावलीच्या हार्दिक शुभेच्छा. तुमचे काम फलदायी ठरो, उद्दिष्टे पूर्ण होवोत आणि सणाचे दिवस निवांत जावोत.',
    },
  },

  // ───────────── Short & Sweet ─────────────
  {
    id: 'short-1',
    category: 'short',
    text: {
      en: 'Light, love and laddoos — Happy Diwali!',
      hi: 'रोशनी, प्यार और लड्डू — दीवाली मुबारक!',
      mr: 'प्रकाश, प्रेम आणि लाडू — दिवाळीच्या शुभेच्छा!',
    },
  },
  {
    id: 'short-2',
    category: 'short',
    text: {
      en: 'May your Diwali sparkle brighter than ever before.',
      hi: 'आपकी दीवाली पहले से कहीं ज़्यादा जगमगाए।',
      mr: 'तुमची दिवाळी नेहमीपेक्षा अधिक झगमगो.',
    },
  },
  {
    id: 'short-3',
    category: 'short',
    text: {
      en: 'Glow bright, smile wide, celebrate big. Happy Diwali!',
      hi: 'खूब चमको, खुलकर मुस्कुराओ, जमकर मनाओ। हैप्पी दीवाली!',
      mr: 'खूप उजळा, मनमोकळं हसा, जल्लोषात साजरी करा. हॅप्पी दिवाळी!',
    },
  },
  {
    id: 'short-4',
    category: 'short',
    text: {
      en: 'One diya, a million wishes — all of them for you.',
      hi: 'एक दीया, लाखों दुआएँ — सब आपके लिए।',
      mr: 'एक पणती, लाखो शुभेच्छा — सगळ्या तुमच्यासाठी.',
    },
  },

  // ───────────── Inspirational ─────────────
  {
    id: 'inspirational-1',
    category: 'inspirational',
    text: {
      en: 'Just as one small diya can defeat the darkness, may your courage overcome every challenge in the year ahead. Happy Diwali!',
      hi: 'जैसे एक छोटा-सा दीया अँधेरे को हरा देता है, वैसे ही आपका साहस आने वाले वर्ष की हर चुनौती पर विजय पाए। शुभ दीपावली!',
      mr: 'जशी एक छोटी पणती अंधाराला हरवते, तसेच तुमचे धैर्य येणाऱ्या वर्षातील प्रत्येक आव्हानावर मात करो. शुभ दीपावली!',
    },
  },
  {
    id: 'inspirational-2',
    category: 'inspirational',
    text: {
      en: 'Let this Diwali light the lamp of wisdom within you, burn away every doubt and guide you towards your brightest dreams.',
      hi: 'यह दीवाली आपके भीतर ज्ञान का दीपक जलाए, हर संदेह को मिटा दे और आपको आपके सबसे उजले सपनों की ओर ले जाए।',
      mr: 'ही दिवाळी तुमच्या अंतरात ज्ञानाचा दीप प्रज्वलित करो, प्रत्येक शंका दूर करो आणि तुम्हाला तुमच्या उज्ज्वल स्वप्नांकडे घेऊन जावो.',
    },
  },
  {
    id: 'inspirational-3',
    category: 'inspirational',
    text: {
      en: 'Sweep away old fears like dust before the festival, and welcome new hope like Lakshmi at your door. Here’s to a fresh, fearless beginning!',
      hi: 'त्योहार से पहले की सफ़ाई की तरह पुराने डर को निकाल दीजिए, और नई आशा का स्वागत द्वार पर आई लक्ष्मी की तरह कीजिए। एक नई, निडर शुरुआत की शुभकामनाएँ!',
      mr: 'सणापूर्वीच्या साफसफाईप्रमाणे जुनी भीती दूर करा आणि दारी आलेल्या लक्ष्मीसारखे नव्या आशेचे स्वागत करा. नव्या, निर्भय सुरुवातीसाठी शुभेच्छा!',
    },
  },
  {
    id: 'inspirational-4',
    category: 'inspirational',
    text: {
      en: 'Be the light someone else needs this Diwali. Kindness shared is the brightest firework of all.',
      hi: 'इस दीवाली किसी और के लिए वह रोशनी बनिए जिसकी उसे ज़रूरत है। बाँटी गई दयालुता ही सबसे सुंदर आतिशबाज़ी है।',
      mr: 'या दिवाळीत एखाद्याला हवा असलेला प्रकाश तुम्ही व्हा. वाटलेली माणुसकी हीच सर्वात सुंदर आतषबाजी आहे.',
    },
  },

  // ───────────── Spiritual ─────────────
  {
    id: 'spiritual-1',
    category: 'spiritual',
    text: {
      en: 'May Goddess Lakshmi bless your home with abundance, Lord Ganesha remove every obstacle, and this festival bring endless joy to your family. Happy Diwali!',
      hi: 'माँ लक्ष्मी आपके घर को धन-धान्य से भर दें, श्री गणेश हर विघ्न दूर करें, और यह पर्व आपके परिवार में अनंत आनंद लाए। शुभ दीपावली!',
      mr: 'लक्ष्मीमाता तुमचे घर धनधान्याने भरून टाको, श्री गणेश प्रत्येक विघ्न दूर करोत आणि हा सण तुमच्या कुटुंबात अखंड आनंद घेऊन येवो. शुभ दीपावली!',
    },
  },
  {
    id: 'spiritual-2',
    category: 'spiritual',
    text: {
      en: 'As lamps lit the way for Lord Rama’s return to Ayodhya, may righteousness light your path and peace find a home in your heart.',
      hi: 'जैसे प्रभु श्रीराम के अयोध्या लौटने पर दीपों ने उनका मार्ग रोशन किया, वैसे ही धर्म आपकी राह रोशन करे और शांति आपके हृदय में बसे।',
      mr: 'प्रभू श्रीराम अयोध्येला परतले तेव्हा पणत्यांनी त्यांचा मार्ग उजळला; तसाच धर्म तुमचा मार्ग उजळो आणि शांती तुमच्या हृदयात वास करो.',
    },
  },
  {
    id: 'spiritual-3',
    category: 'spiritual',
    text: {
      en: 'Tamaso ma jyotirgamaya — from darkness, lead us to light. May this sacred festival awaken the divine light within you.',
      hi: 'तमसो मा ज्योतिर्गमय — अंधकार से प्रकाश की ओर। यह पावन पर्व आपके भीतर की दिव्य ज्योति को जगाए।',
      mr: 'तमसो मा ज्योतिर्गमय — अंधाराकडून प्रकाशाकडे. हा पवित्र सण तुमच्या अंतरातील दिव्य ज्योत जागृत करो.',
    },
  },
  {
    id: 'spiritual-4',
    category: 'spiritual',
    text: {
      en: 'May the sacred flame of the diya purify your thoughts, the sound of prayers calm your mind, and divine grace stay with you always.',
      hi: 'दीये की पवित्र लौ आपके विचारों को निर्मल करे, प्रार्थना के स्वर मन को शांत करें, और ईश्वर की कृपा सदा आप पर बनी रहे।',
      mr: 'पणतीची पवित्र ज्योत तुमचे विचार निर्मळ करो, प्रार्थनेचे स्वर मन शांत करोत आणि ईश्वराची कृपा सदैव तुमच्यावर राहो.',
    },
  },

  // ───────────── Prosperity & Happiness ─────────────
  {
    id: 'prosperity-1',
    category: 'prosperity',
    text: {
      en: 'Wishing you a Diwali filled with beautiful moments, sweet memories, good health, prosperity and countless reasons to smile.',
      hi: 'आपको सुंदर पलों, मीठी यादों, अच्छे स्वास्थ्य, समृद्धि और मुस्कुराने की अनगिनत वजहों से भरी दीवाली की शुभकामनाएँ।',
      mr: 'सुंदर क्षण, गोड आठवणी, उत्तम आरोग्य, समृद्धी आणि हसण्याची असंख्य कारणे घेऊन येणाऱ्या दिवाळीच्या तुम्हाला शुभेच्छा.',
    },
  },
  {
    id: 'prosperity-2',
    category: 'prosperity',
    text: {
      en: 'May your coffers stay full, your heart stay light, and your home overflow with gold, grain and good fortune this Diwali.',
      hi: 'इस दीवाली आपकी तिजोरी भरी रहे, मन हल्का रहे, और घर सोने, अन्न और सौभाग्य से भरपूर रहे।',
      mr: 'या दिवाळीत तुमची तिजोरी भरलेली राहो, मन हलके राहो आणि घर सोने, धान्य व सौभाग्याने ओसंडून वाहो.',
    },
  },
  {
    id: 'prosperity-3',
    category: 'prosperity',
    text: {
      en: 'May the glow of a thousand diyas bring a thousand reasons to be happy, and may prosperity knock at your door every single day.',
      hi: 'हज़ार दीयों की रोशनी आपके लिए खुशी की हज़ार वजहें लाए, और समृद्धि हर दिन आपके द्वार पर दस्तक दे।',
      mr: 'हजार पणत्यांचा प्रकाश तुमच्यासाठी आनंदाची हजार कारणे घेऊन येवो आणि समृद्धी रोज तुमच्या दारी येवो.',
    },
  },
  {
    id: 'prosperity-4',
    category: 'prosperity',
    text: {
      en: 'Sweet like kaju katli, bright like a phuljhadi and rich like Lakshmi’s blessings — may your whole year be all of these!',
      hi: 'काजू कतली जैसा मीठा, फुलझड़ी जैसा रोशन और माँ लक्ष्मी के आशीर्वाद जैसा समृद्ध — आपका पूरा वर्ष ऐसा ही हो!',
      mr: 'काजू कतलीसारखे गोड, फुलबाजीसारखे उजळ आणि लक्ष्मीमातेच्या आशीर्वादासारखे समृद्ध — तुमचे संपूर्ण वर्ष असेच जावो!',
    },
  },
];

/** Every wish across all occasions. */
export const WISHES: Wish[] = [...DIWALI_WISHES.map((w) => ({ ...w, occasion: 'diwali' as const })), ...PADWA_WISHES, ...BHAUBIJ_WISHES];

/** Display order of category chips; only categories an occasion has are shown. */
export const WISH_CATEGORIES: WishCategory[] = [
  'spouse',
  'forBrother',
  'forSister',
  'traditional',
  'family',
  'friends',
  'professional',
  'short',
  'inspirational',
  'spiritual',
  'prosperity',
];

export const DEFAULT_WISH_ID = WISHES[0].id;

export const getWishById = (id: string): Wish | undefined => WISHES.find((w) => w.id === id);

export const wishesForOccasion = (occasion: Occasion): Wish[] => WISHES.filter((w) => w.occasion === occasion);

export const categoriesForOccasion = (occasion: Occasion): WishCategory[] => {
  const present = new Set(wishesForOccasion(occasion).map((w) => w.category));
  return WISH_CATEGORIES.filter((c) => present.has(c));
};
