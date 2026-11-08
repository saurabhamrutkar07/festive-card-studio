# Deepotsav Cards — Personalised Diwali Greeting Card Generator

Create a personalised Diwali greeting card in English, Hindi or Marathi, download it as a PNG and share it on WhatsApp. Everything runs in the browser: there is no backend, no login and no tracking.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Lucide icons · html-to-image

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

`dist/` is a static site. Because `base: './'` is set, you can host it on Netlify, Vercel, GitHub Pages or any static host, and it also works from a sub-folder.

## Features

- **12 designs, one per category.** Each design has its own layout, typography, border and illustrations. All illustrations are original inline SVGs, so there are no stock images and nothing can show as a broken image:
  Deepmala (Traditional) · Rajwada (Royal Gold) · Shuddh (Modern Minimal) · Genda Phool (Floral) · Rangoli Utsav · Omkar (Spiritual) · Swarna Noir (Elegant Luxury) · Utsav Night (Colourful Festive) · Madhubani (Indian Art) · Aurora Glow (Contemporary Gradient) · Ghar Aangan (Family) · Amavasya (Premium Dark).
- **3 card sizes:** Portrait 1080×1350, Square 1080×1080 and Landscape 1920×1080. Every design has its own layout for each size.
- **32 wishes in 8 categories**, written in English, Hindi and Marathi. Each wish has the same id in all three languages, so switching language keeps the same wish selected.
- **Random wish.** It never repeats the wish on screen, and it avoids recently shown wishes until it has used up the pool. It respects the active category filter.
- **Editable wishes.** You can edit a predefined wish and restore the original later. Edits are saved per language. You can also switch to a fully custom message.
- **Personalisation.** Name (required), family name (adds "& Family", which is translated) and custom sender text (replaces the "Happy Diwali Wishes From" line). Optional controls: alignment, font, size and colour.
- **Live preview.** The preview is the actual export node, rendered at full resolution and scaled with CSS, so the downloaded PNG matches the preview exactly.
- **Long messages never overflow.** `FitText` uses a binary search to find the font size that fits the box, and it re-measures once web fonts finish loading.
- **PNG export.** Fonts are embedded, including Devanagari. The PNG is the exact size of the chosen format and gets a meaningful file name such as `Happy-Diwali-Saurabh-Wani.png`. A loading state and an error message are shown.
- **WhatsApp sharing,** with honest fallbacks:
  1. If the Web Share API supports files (most mobile browsers), the share sheet opens with the image attached, and you pick WhatsApp.
  2. If the browser's user-activation window expired while the image was being generated, a dialog asks for one more tap to share.
  3. Otherwise the card is downloaded and a dialog explains how to attach it, with an "Open WhatsApp" link that pre-fills the greeting text. The app never claims the image was shared when it wasn't.
- **Self-hosted fonts** through `@fontsource`: Poppins, Playfair Display, Cormorant Garamond, Cinzel, Great Vibes, Yatra One, Kalam, and Noto Sans/Serif Devanagari. The app makes no external requests at runtime.
- Responsive layout (two columns on desktop with a sticky preview, stacked on mobile). Supports keyboard focus styles and `prefers-reduced-motion`. The sender name is remembered in localStorage.

## Project structure

```
src/
  components/
    cards/
      CardRenderer.tsx        maps templateId → design, owns the export node
      parts.tsx               CardRoot, FitText (auto-fit), SenderBlock, ornaments
      typography.ts           font stacks (Latin + Devanagari pairs), style resolution
      decor/                  original SVG art: diyas, lanterns, marigolds, toran,
                              rangoli, mandala, fireworks, madhubani frame, house…
      templates/              the 12 card designs (3 files × 4 designs)
    Navbar, HeroSection, HowItWorks, TemplateGallery, TemplateCard,
    CardFormatSelector, LanguageSelector, WishSelector, RandomWishButton,
    CustomMessageEditor, PersonalisationForm, LiveCardPreview, ScaledCard,
    DownloadButton, WhatsAppShareButton, ShareDialog, Toast, Footer
  data/        templates.ts · wishes.ts · translations.ts
  hooks/       useCardGenerator (all editor state) · useCardExport · useFontsReady · useSvgId
  types/       card.ts
  utils/       imageExport.ts · whatsappShare.ts · randomWish.ts · filename.ts · seededRandom.ts
```

## Implementation notes

- **Devanagari in the PNG.** Every font stack pairs a Latin font with a Devanagari font. html-to-image only embeds fonts used by HTML elements, so all text (including the ॐ glyph and the outlined "दीपावली") is HTML rather than SVG `<text>`.
- **Marathi shaping.** Marathi cards are rendered with `lang="hi"`. Some display fonts (such as Yatra One) lose their conjunct rules under the Marathi language tag, and the Hindi shaping is correct for Marathi text.
- **Letter-spacing** is turned off for Devanagari, because it breaks the shirorekha (the headline that joins letters) and conjuncts.
- **Identical preview and export.** Decorative scatter (stars, bokeh) uses a seeded random generator, so preview and export always match.
- **Safari.** html-to-image runs twice on WebKit to work around the known first-paint font issue.

## Testing

The app was tested end to end in headless Chrome (Playwright):

- 108 exports: 12 designs × 3 sizes × 3 languages, each checked for exact pixel dimensions and visually reviewed.
- Validation: downloading or sharing without a name is blocked with a message.
- Random wish: no consecutive repeats.
- Editing a predefined wish, and a custom 500-character message (no overflow).
- Special characters and emoji; Marathi typed into the custom message.
- Custom sender text, and an empty family name.
- Text style controls.
- Mobile layout at 390 px (no horizontal scroll).
- Every share path: native share success, share expired → retry dialog, user cancel, and the no-Web-Share fallback.
