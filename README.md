# Festive Card Studio — Personalised Festival Greeting Cards

Create a personalised greeting card for **Diwali, Diwali Padwa or Bhaubij** in English, Hindi or Marathi — for yourself or branded for your business — download it as a PNG or an animated GIF and share it on WhatsApp. Everything runs in the browser: there is no backend, no login and no tracking.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Lucide icons · html-to-image · gifenc

> **New to the project?** Start with the [Developer Handbook](docs/README.md): setup, high- and low-level design with diagrams, and step-by-step guides for common changes.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

`dist/` is a static site. Because `base: './'` is set, you can host it on Netlify, Vercel, GitHub Pages or any static host, and it also works from a sub-folder.

## Features

- **3 occasions:** Diwali, Diwali Padwa (users can call it "Govardhan Puja") and Bhaubij (or "Bhai Dooj"). Each has its own card text, wishes, designs and animation; the chosen name drives the heading, share text and filename.
- **33 designs.** Diwali 15 · Padwa 6 · Bhaubij 6 personal designs, plus 6 business designs for every occasion. All illustrations are original inline SVGs (diyas, toran, rangoli, aarti thali, kalash, star kandil, Lakshmi footprints, bahi-khata, sweets plate and more), so there are no stock images and nothing can show as a broken image.
- **Personal and Business modes.** Business cards are built around the company's logo (or an initials monogram) with a tagline and a phone / website / address contact line. Logos can be shown as original, circle, rounded or square.
- **3 card sizes:** Portrait 1080×1350, Square 1080×1080 and Landscape 1920×1080. Every design has its own layout for each size.
- **52 wishes** — Diwali 32, Padwa 10 (spouse, family, business new year…), Bhaubij 10 (for brother, for sister…) — written in English, Hindi and Marathi. Each wish has the same id in all three languages, so switching language keeps the same wish selected.
- **Random wish.** It never repeats the wish on screen, and it avoids recently shown wishes until it has used up the pool. It respects the active category filter.
- **Editable wishes.** You can edit a predefined wish and restore the original later. Edits are saved per language. You can also switch to a fully custom message.
- **Personalisation.** One name box (required) with a "Sign as" choice: Just me ("John Doe"), Me & family ("John Doe & Family") or Whole family ("Doe Family"), plus From sister / From brother on Bhaubij; the family and sibling wording is translated and custom sender text (replaces the "Happy Diwali Wishes From" line). Optional controls: alignment, font, size and colour.
- **Live preview.** The preview is the actual export node, rendered at full resolution and scaled with CSS, so the downloaded PNG matches the preview exactly.
- **Animations.** Optional fireworks (Off / Subtle / Grand) on every occasion, plus Padwa's falling marigold petals & gold coins and Bhaubij's aarti glow & rising petals. They animate in the preview, freeze on a designed frame in PNGs and loop seamlessly in GIFs.
- **Long messages never overflow.** `FitText` uses a binary search to find the font size that fits the box, and it re-measures once web fonts finish loading.
- **PNG and animated GIF export.** Fonts are embedded, including Devanagari. The PNG is the exact size of the chosen format; with an animation on, the card exports as a looping GIF (≈0.5–2 MB) that autoplays in WhatsApp. Files get meaningful names such as `Happy-Bhai-Dooj-Priya.gif`. A progress bar and an error message are shown.
- **WhatsApp sharing,** with honest fallbacks:
  1. If the Web Share API supports files (most mobile browsers), the share sheet opens with the image attached, and you pick WhatsApp.
  2. If the browser's user-activation window expired while the image was being generated, a dialog asks for one more tap to share.
  3. Otherwise the card is downloaded and a dialog explains how to attach it, with an "Open WhatsApp" link that pre-fills the greeting text. The app never claims the image was shared when it wasn't.
- **Self-hosted fonts** through `@fontsource`: Poppins, Playfair Display, Cormorant Garamond, Cinzel, Great Vibes, Yatra One, Kalam, and Noto Sans/Serif Devanagari. The app makes no external requests at runtime.
- Responsive layout (two columns on desktop with a sticky preview, stacked on mobile). Supports keyboard focus styles and `prefers-reduced-motion`. The sender name, business details and logo are remembered in localStorage.

## Project structure

```
src/
  components/
    cards/
      CardRenderer.tsx        maps templateId → design, adds logo + animation layers, owns the export node
      parts.tsx               CardRoot, FitText (auto-fit), SenderBlock, ornaments
      typography.ts           font stacks (Latin + Devanagari pairs), style resolution
      logoShape.ts            logo crop/mask (original, circle, rounded, square)
      decor/                  original SVG art: diyas, lanterns, marigolds, toran, rangoli,
                              mandala, aarti thali, kalash, star kandil, bahi-khata…
                              + Fireworks and OccasionEffects (animations)
      templates/              33 designs: classic/festive/artistic (Diwali), businessTemplates,
                              occasionTemplates + moreOccasionTemplates (Padwa, Bhaubij, more Diwali)
    OccasionPicker, ModeSwitch, TemplateGallery, TemplateCard, FireworksSelector,
    CardFormatSelector, LanguageSelector, WishSelector, PersonalisationForm, LogoUploader,
    LiveCardPreview, ScaledCard, DownloadButton, WhatsAppShareButton, ShareDialog,
    ContactSection, Navbar, HeroSection, HowItWorks, Footer, Toast …
  data/        occasions.ts · templates.ts · wishes.ts · occasionWishes.ts · translations.ts · contact.ts
  hooks/       useCardGenerator (all editor state) · useCardExport · useFontsReady · useSvgId
  types/       card.ts
  utils/       imageExport.ts · animationExport.ts (GIF) · whatsappShare.ts · logo.ts · filename.ts · randomWish.ts · seededRandom.ts
docs/          developer handbook (setup, high/low-level design, how-to guides, gotchas)
```

## Implementation notes

- **Devanagari in the PNG.** Every font stack pairs a Latin font with a Devanagari font. html-to-image only embeds fonts used by HTML elements, so all text (including the ॐ glyph and the outlined "दीपावली") is HTML rather than SVG `<text>`.
- **Marathi shaping.** Marathi cards are rendered with `lang="hi"`. Some display fonts (such as Yatra One) lose their conjunct rules under the Marathi language tag, and the Hindi shaping is correct for Marathi text.
- **Letter-spacing** is turned off for Devanagari, because it breaks the shirorekha (the headline that joins letters) and conjuncts.
- **Identical preview and export.** Decorative scatter (stars, bokeh) uses a seeded random generator, so preview and export always match.
- **Safari.** html-to-image runs twice on WebKit to work around the known first-paint font issue.

## Testing

Tested in headless Chrome:

- **End-to-end (60 checks, all passing):** the real app driven like a user — occasion switching and name choices, Personal and Business modes, Sign as (including From sister/brother), all Padwa and Bhaubij designs selected, languages, sizes, validation, logo upload and shapes, PNG and animated GIF downloads (checked file names, types and sizes), share dialog, contact links, data remembered after reload, phone width without sideways scroll, and no console errors.
- **Layout stress tests:** every design in portrait, square and landscape, in English, Hindi and Marathi, with long names and 500-character messages — checked automatically for unreadable text and anything outside the card, and reviewed by eye.
- **GIF export:** real animated GIFs generated for fireworks and occasion animations (≈0.5–2 MB, ≈20 s to create).

Not covered by automated tests: sharing to WhatsApp on a real phone and Safari/iOS behaviour — check these manually after deploying.
