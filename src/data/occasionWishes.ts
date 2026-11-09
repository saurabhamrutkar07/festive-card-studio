import type { Wish } from '../types/card';

/*
 * Wishes for Diwali Padwa and Bhaubij. They avoid naming the festival
 * directly, so they read correctly whichever regional name the user picks
 * (Diwali Padwa / Govardhan Puja, Bhaubij / Bhai Dooj).
 */

export const PADWA_WISHES: Wish[] = [
  {
    id: 'padwa-spouse-1',
    occasion: 'padwa',
    category: 'spouse',
    text: {
      en: 'To my dearest partner — thank you for filling every day of my life with love, care and laughter. On this auspicious day, may our bond grow stronger and sweeter with every year.',
      hi: 'मेरे प्रिय जीवनसाथी — मेरे जीवन के हर दिन को प्यार, परवाह और हँसी से भरने के लिए धन्यवाद। इस शुभ दिन पर हमारा रिश्ता हर साल और भी मज़बूत और मधुर होता जाए।',
      mr: 'माझ्या प्रिय जोडीदारा — माझ्या आयुष्याचा प्रत्येक दिवस प्रेम, काळजी आणि हास्याने भरल्याबद्दल मनापासून धन्यवाद. या शुभदिनी आपलं नातं दरवर्षी अधिक घट्ट आणि गोड होत जावो.',
    },
  },
  {
    id: 'padwa-spouse-2',
    occasion: 'padwa',
    category: 'spouse',
    text: {
      en: 'As I light the aarti for you today, I pray for your long life, good health and success. You are my strength and my happiness — today and always.',
      hi: 'आज आपकी आरती उतारते हुए मैं आपकी लंबी उम्र, अच्छी सेहत और सफलता की कामना करती हूँ। आप मेरी ताक़त और मेरी खुशी हैं — आज और हमेशा।',
      mr: 'आज तुमचं औक्षण करताना तुमच्या दीर्घायुष्याची, उत्तम आरोग्याची आणि यशाची प्रार्थना करते. तुम्हीच माझी ताकद आणि माझा आनंद आहात — आज आणि कायम.',
    },
  },
  {
    id: 'padwa-spouse-3',
    occasion: 'padwa',
    category: 'spouse',
    text: {
      en: 'To the one who lights up our home brighter than any diya — thank you for your love and patience. Wishing you all the joy you bring to my life.',
      hi: 'जो किसी भी दीये से ज़्यादा हमारे घर को रोशन करती है — तुम्हारे प्यार और धैर्य के लिए शुक्रिया। तुम्हें वो सारी खुशियाँ मिलें जो तुम मेरे जीवन में लाती हो।',
      mr: 'कोणत्याही पणतीपेक्षा आपलं घर अधिक उजळवणाऱ्या तुला — तुझ्या प्रेमासाठी आणि संयमासाठी मनापासून आभार. तू माझ्या आयुष्यात आणतेस तो सगळा आनंद तुला मिळो.',
    },
  },
  {
    id: 'padwa-family-1',
    occasion: 'padwa',
    category: 'family',
    text: {
      en: 'May this new year bring our family closer, our home brighter and our hearts fuller. Wishing you love, health and prosperity in the year ahead.',
      hi: 'यह नया वर्ष हमारे परिवार को और करीब लाए, घर को और रोशन करे और दिलों को खुशियों से भर दे। आने वाले वर्ष के लिए प्रेम, स्वास्थ्य और समृद्धि की शुभकामनाएँ।',
      mr: 'हे नवीन वर्ष आपल्या कुटुंबाला अधिक जवळ आणो, घर अधिक उजळवो आणि मनं आनंदाने भरून टाको. येणाऱ्या वर्षासाठी प्रेम, आरोग्य आणि समृद्धीच्या शुभेच्छा.',
    },
  },
  {
    id: 'padwa-family-2',
    occasion: 'padwa',
    category: 'family',
    text: {
      en: 'On this auspicious day, may every member of your family be blessed with good health, success and endless happiness.',
      hi: 'इस शुभ दिन पर आपके परिवार के हर सदस्य को अच्छा स्वास्थ्य, सफलता और अनंत खुशियाँ मिलें।',
      mr: 'या शुभदिनी तुमच्या कुटुंबातील प्रत्येकाला उत्तम आरोग्य, यश आणि अखंड आनंद लाभो.',
    },
  },
  {
    id: 'padwa-traditional-1',
    occasion: 'padwa',
    category: 'traditional',
    text: {
      en: 'May the blessings of this sacred day bring new beginnings, fresh hopes and a year full of prosperity to your home.',
      hi: 'इस पावन दिन का आशीर्वाद आपके घर में नई शुरुआत, नई उम्मीदें और समृद्धि से भरा वर्ष लेकर आए।',
      mr: 'या पवित्र दिवसाचे आशीर्वाद तुमच्या घरात नवी सुरुवात, नव्या आशा आणि समृद्धीने भरलेले वर्ष घेऊन येवोत.',
    },
  },
  {
    id: 'padwa-traditional-2',
    occasion: 'padwa',
    category: 'traditional',
    text: {
      en: 'May your granaries stay full, your home stay blessed and your heart stay generous — wishing you abundance in the new year.',
      hi: 'आपके अन्न के भंडार सदा भरे रहें, घर पर सदा आशीर्वाद बना रहे और मन सदा उदार रहे — नए वर्ष में भरपूर समृद्धि की शुभकामनाएँ।',
      mr: 'तुमची धान्याची कोठारे सदैव भरलेली राहोत, घरावर सदैव आशीर्वाद राहो आणि मन सदैव उदार राहो — नववर्षात भरभरून समृद्धीच्या शुभेच्छा.',
    },
  },
  {
    id: 'padwa-professional-1',
    occasion: 'padwa',
    category: 'professional',
    text: {
      en: 'As we open a new chapter in our books this new year, we thank you for your trust and partnership. Wishing you a prosperous and successful year ahead.',
      hi: 'इस नए वर्ष में नए बही-खाते की शुरुआत करते हुए हम आपके विश्वास और साथ के लिए आभारी हैं। आपको समृद्ध और सफल वर्ष की शुभकामनाएँ।',
      mr: 'या नववर्षात नव्या चोपडीची सुरुवात करताना तुमच्या विश्वासासाठी आणि साथीसाठी आम्ही मनापासून आभारी आहोत. तुम्हाला समृद्ध आणि यशस्वी वर्षाच्या शुभेच्छा.',
    },
  },
  {
    id: 'padwa-professional-2',
    occasion: 'padwa',
    category: 'professional',
    text: {
      en: 'Wishing you shubh labh and new heights of success this new year. Thank you for being a valued part of our journey.',
      hi: 'इस नए वर्ष में आपको शुभ-लाभ और सफलता की नई ऊँचाइयाँ मिलें। हमारी यात्रा का अहम हिस्सा बनने के लिए धन्यवाद।',
      mr: 'या नववर्षात तुम्हाला शुभ-लाभ आणि यशाची नवी शिखरे लाभोत. आमच्या प्रवासाचा मौल्यवान भाग असल्याबद्दल धन्यवाद.',
    },
  },
  {
    id: 'padwa-short-1',
    occasion: 'padwa',
    category: 'short',
    text: {
      en: 'New year, new hopes, new beginnings — wishing you joy and prosperity!',
      hi: 'नया वर्ष, नई उम्मीदें, नई शुरुआत — आपको खुशियाँ और समृद्धि मुबारक!',
      mr: 'नवं वर्ष, नव्या आशा, नवी सुरुवात — तुम्हाला आनंद आणि समृद्धीच्या शुभेच्छा!',
    },
  },
];

export const BHAUBIJ_WISHES: Wish[] = [
  {
    id: 'bhaubij-brother-1',
    occasion: 'bhaubij',
    category: 'forBrother',
    text: {
      en: 'Dear brother, as I light the aarti for you today, I pray for your long life, success and happiness. Thank you for always protecting me and standing by my side.',
      hi: 'प्यारे भैया, आज तुम्हारी आरती उतारते हुए मैं तुम्हारी लंबी उम्र, सफलता और खुशियों की प्रार्थना करती हूँ। हमेशा मेरी रक्षा करने और मेरे साथ खड़े रहने के लिए धन्यवाद।',
      mr: 'माझ्या लाडक्या भावा, आज तुझं औक्षण करताना तुझ्या दीर्घायुष्याची, यशाची आणि आनंदाची प्रार्थना करते. नेहमी माझी काळजी घेतल्याबद्दल आणि माझ्या पाठीशी उभा राहिल्याबद्दल धन्यवाद.',
    },
  },
  {
    id: 'bhaubij-brother-2',
    occasion: 'bhaubij',
    category: 'forBrother',
    text: {
      en: 'To my partner in crime, my first friend and my forever protector — you make every day brighter. Love you, brother!',
      hi: 'मेरे शरारतों के साथी, मेरे पहले दोस्त और मेरे हमेशा के रक्षक — तुम हर दिन को रोशन बना देते हो। बहुत प्यार, भैया!',
      mr: 'माझ्या खोड्यांचा साथीदार, माझा पहिला मित्र आणि कायमचा रक्षणकर्ता — तू प्रत्येक दिवस उजळवतोस. खूप प्रेम, भावा!',
    },
  },
  {
    id: 'bhaubij-brother-3',
    occasion: 'bhaubij',
    category: 'forBrother',
    text: {
      en: 'No matter how far life takes us, our bond will always shine like the diya on today’s aarti thali. Wishing you all the success in the world, brother.',
      hi: 'ज़िंदगी हमें कितना भी दूर ले जाए, हमारा रिश्ता आज की आरती की थाली के दीये जैसा हमेशा जगमगाता रहेगा। दुनिया की हर सफलता तुम्हें मिले, भैया।',
      mr: 'आयुष्य आपल्याला कितीही दूर घेऊन जाओ, आपलं नातं आजच्या औक्षणाच्या ताटातील पणतीसारखं कायम उजळत राहील. तुला जगातलं सगळं यश मिळो, भावा.',
    },
  },
  {
    id: 'bhaubij-sister-1',
    occasion: 'bhaubij',
    category: 'forSister',
    text: {
      en: 'Dear sister, thank you for your endless love, prayers and care. I promise to stand by you always. May your life be full of joy and success.',
      hi: 'प्यारी बहना, तुम्हारे अनंत प्यार, दुआओं और परवाह के लिए धन्यवाद। मैं वादा करता हूँ कि हमेशा तुम्हारे साथ रहूँगा। तुम्हारा जीवन खुशियों और सफलता से भरा रहे।',
      mr: 'माझ्या लाडक्या बहिणी, तुझ्या अखंड प्रेमासाठी, प्रार्थनांसाठी आणि काळजीसाठी धन्यवाद. मी नेहमी तुझ्या पाठीशी उभा राहीन असं वचन देतो. तुझं आयुष्य आनंदाने आणि यशाने भरलेलं राहो.',
    },
  },
  {
    id: 'bhaubij-sister-2',
    occasion: 'bhaubij',
    category: 'forSister',
    text: {
      en: 'To the sister who knows all my secrets and still loves me — you are my biggest blessing. Thank you for always being there.',
      hi: 'उस बहन के लिए जो मेरे सारे राज़ जानती है और फिर भी मुझसे प्यार करती है — तुम मेरा सबसे बड़ा आशीर्वाद हो। हमेशा साथ रहने के लिए शुक्रिया।',
      mr: 'माझी सगळी गुपितं माहीत असूनही माझ्यावर प्रेम करणाऱ्या बहिणीला — तू माझा सगळ्यात मोठा आशीर्वाद आहेस. नेहमी सोबत असल्याबद्दल धन्यवाद.',
    },
  },
  {
    id: 'bhaubij-sister-3',
    occasion: 'bhaubij',
    category: 'forSister',
    text: {
      en: 'Your aarti brings blessings, your smile brings light and your love makes our home complete. Wishing you happiness always, dear sister.',
      hi: 'तुम्हारी आरती आशीर्वाद लाती है, तुम्हारी मुस्कान रोशनी लाती है और तुम्हारा प्यार हमारे घर को पूरा करता है। हमेशा खुश रहो, प्यारी बहना।',
      mr: 'तुझं औक्षण आशीर्वाद घेऊन येतं, तुझं हसू प्रकाश घेऊन येतं आणि तुझं प्रेम आपलं घर पूर्ण करतं. सदैव आनंदी राहा, लाडक्या बहिणी.',
    },
  },
  {
    id: 'bhaubij-traditional-1',
    occasion: 'bhaubij',
    category: 'traditional',
    text: {
      en: 'May the sacred bond between brother and sister grow stronger with every diya lit today. Wishing you love, protection and prosperity.',
      hi: 'आज जलाए गए हर दीये के साथ भाई-बहन का यह पवित्र रिश्ता और मज़बूत हो। आपको प्रेम, सुरक्षा और समृद्धि की शुभकामनाएँ।',
      mr: 'आज लावलेल्या प्रत्येक पणतीसोबत बहीण-भावाचं हे पवित्र नातं अधिक घट्ट होवो. तुम्हाला प्रेम, संरक्षण आणि समृद्धीच्या शुभेच्छा.',
    },
  },
  {
    id: 'bhaubij-traditional-2',
    occasion: 'bhaubij',
    category: 'traditional',
    text: {
      en: 'Just as Yamuna prayed for her brother Yama, may every sister’s prayers keep her brother safe, happy and blessed.',
      hi: 'जैसे यमुना ने अपने भाई यम के लिए प्रार्थना की थी, वैसे ही हर बहन की दुआएँ उसके भाई को सुरक्षित, खुश और आशीर्वादित रखें।',
      mr: 'जशी यमुनेने आपल्या भावासाठी — यमासाठी — प्रार्थना केली, तशीच प्रत्येक बहिणीची प्रार्थना तिच्या भावाला सुरक्षित, आनंदी आणि आशीर्वादित ठेवो.',
    },
  },
  {
    id: 'bhaubij-short-1',
    occasion: 'bhaubij',
    category: 'short',
    text: {
      en: 'One thali, one diya, one tilak — and a bond that lasts a lifetime.',
      hi: 'एक थाली, एक दीया, एक तिलक — और जीवन भर का रिश्ता।',
      mr: 'एक ताट, एक पणती, एक टिळा — आणि आयुष्यभराचं नातं.',
    },
  },
  {
    id: 'bhaubij-short-2',
    occasion: 'bhaubij',
    category: 'short',
    text: {
      en: 'Siblings by birth, friends by choice — wishing you a day full of love and sweets!',
      hi: 'जन्म से भाई-बहन, दिल से दोस्त — प्यार और मिठाइयों से भरे दिन की शुभकामनाएँ!',
      mr: 'जन्माने भावंडं, मनाने मित्र — प्रेम आणि गोडधोडाने भरलेल्या दिवसाच्या शुभेच्छा!',
    },
  },
];
