# 4 · How-to guides

Step-by-step recipes for the most common requirements. Each one lists **exactly which files to change, in order**.

**Golden rule for every change:**
1. Start with the **type** in `src/types/card.ts` (TypeScript will then point at every place that needs updating).
2. Make the change.
3. Check it in the browser (`npm run dev`) in **all 3 sizes** and **all 3 languages**.
4. Run `npm run build` — it must pass before you commit.

---

## 1. Add a new personal template

**Example:** add a design called "Kandil" (lantern theme).

| Step | File | What to do |
|---|---|---|
| 1 | `src/types/card.ts` | Add `'kandil'` to the `TemplateId` union. If it needs a new gallery filter, add a name to `TemplateCategory`. |
| 2 | `src/data/templates.ts` | Add an entry to `CARD_TEMPLATES` with `mode: 'personal'`, `name`, `category`, `description`, `defaultTextColor`, `swatch`. |
| 3 | `src/components/cards/templates/festiveTemplates.tsx` (or a new file) | Write `export const KandilCard = ({ content, format, style, dims }: TemplateProps) => …` |
| 4 | `src/components/cards/CardRenderer.tsx` | Import it and add `kandil: KandilCard` to `TEMPLATE_COMPONENTS`. |

**Template skeleton** (copy an existing template and adapt — `DeepmalaCard` in `classicTemplates.tsx` is a good model):

```tsx
export const KandilCard = ({ content, format, style, dims }: TemplateProps) => {
  const L = format === 'landscape';
  const ty = resolveTypography(style, { font: 'garamond', color: '#fff4e0', align: 'center' });
  return (
    <CardRoot dims={dims} background="#2a0f3a">
      {/* decoration layers here (Layer, decor components) */}
      <div style={{ position: 'absolute', inset: L ? '80px 300px' : '120px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <FitText text={content.heading} max={110} min={50} boxStyle={{ flex: 'none', height: 160 }}
                 style={{ fontFamily: FONT_STACKS.decorative, color: '#f6cf6a', textAlign: 'center' }} />
        <FitText text={content.message} max={Math.round(44 * ty.scale)} min={20}
                 style={{ fontFamily: ty.font, color: ty.color, textAlign: 'center' }} />
        <SenderBlock intro={content.senderIntro} name={content.senderName} align={ty.senderAlign}
                     nameMax={Math.round(48 * ty.scale)} introStyle={{ fontSize: 22, color: ty.color }}
                     nameStyle={{ fontFamily: ty.font, color: ty.color }} />
      </div>
    </CardRoot>
  );
};
```

**Checklist:** always use `CardRoot` (fireworks need it) · use `FitText` for heading/message · use `SenderBlock` for the signature · use `ty.font / ty.color / ty.scale` so *Text style* works · test portrait, square, landscape.

---

## 2. Add a new business template

Same as recipe 1, but:
- In `data/templates.ts` use `mode: 'business'` and a business category (`'Letterhead' | 'Logo Hero' | 'Sign-off'`, or add a new one to `TemplateCategory`).
- Write it in `src/components/cards/templates/businessTemplates.tsx` and reuse its helpers:
  - `useLayout(props)` → `px(n)` scales portrait-authored sizes to any format
  - `biz(content)` → `{ name, tagline, contacts }`
  - `<BizLogo>` → uploaded logo or initials monogram (respects logo shape)
  - `<ContactLine>` → phone / website / address with icons
  - `useFrameRadius()` → frame corners that follow the logo shape
- Do **not** use `SenderBlock` — business designs lay out the signature themselves.
- Stress-test with a **long business name**, **all 3 contact fields**, a **500-character message** and a **wide logo** (see [gotchas](05-gotchas-and-glossary.md)).

---

## 3. Add a new wish

| Step | File | What to do |
|---|---|---|
| 1 | `src/data/wishes.ts` | Add an object to `WISHES`: a unique `id` (e.g. `'family-5'`), a `category`, and `text` for **every** language (`en`, `hi`, `mr`). |

That's it — the wish picker, categories and "Random wish" pick it up automatically. Keep it under 500 characters (the message limit). A new **category** also needs: `WishCategory` in `types/card.ts`, `WISH_CATEGORIES` in `wishes.ts`, and a label in `wishCategories` for each language in `translations.ts`.

---

## 4. Add a new language

**Example:** Gujarati (`gu`).

| Step | File | What to do |
|---|---|---|
| 1 | `src/types/card.ts` | `type Language = 'en' \| 'hi' \| 'mr' \| 'gu'` |
| 2 | `src/data/translations.ts` | Add `{ code: 'gu', … }` to `LANGUAGES` and a full `gu` block to `TRANSLATIONS`. |
| 3 | `src/data/wishes.ts` | Add `gu` text to **all 32 wishes** (TypeScript will list every missing one). |
| 4 | Fonts | Gujarati needs its own font: `npm install @fontsource/noto-sans-gujarati`, import it in `src/index.css`, and add it to the stacks in `components/cards/typography.ts`. |
| 5 | Small hard-coded spots | `formatSenderName` placeholder ("Your Name") and `BUSINESS_PLACEHOLDER` in `hooks/useCardGenerator.ts`; sample names in `components/TemplateGallery.tsx` and `components/HeroSection.tsx`. |
| 6 | `src/index.css` | If the script breaks with letter-spacing (like Devanagari), add `[lang='gu'] *` to the letter-spacing reset rule. |

---

## 5. Add a new occasion (festival day)

> **Status:** built. The app has **Diwali**, **Diwali Padwa** and **Bhaubij**. Follow the same pattern to add Holi, Eid, Christmas and so on.

| Step | File | What to do |
|---|---|---|
| 1 | `src/types/card.ts` | Add the id to `Occasion` (e.g. `'holi'`). If it needs its own animation, add it to `OccasionEffect`. |
| 2 | `src/data/occasions.ts` | Add an entry to `OCCASIONS` (label, native label, optional two regional `names`, optional `effect`, `filePrefix`) and its text table (heading, sub-heading, sender intro, placeholder, share message × every language × each name). Return it from `occasionText`. |
| 3 | `src/data/occasionWishes.ts` + `wishes.ts` | Add a wish list with `occasion: 'holi'` and spread it into `WISHES`. New categories need `WishCategory`, `WISH_CATEGORIES` and labels in `translations.ts`. |
| 4 | `src/data/templates.ts` | Add personal designs with `occasions: ['holi']`. Add `'holi'` to the business templates' `occasions` if they suit it. |
| 5 | `src/components/cards/templates/occasionTemplates.tsx` | Write the designs; reuse `TextColumn` and `useScale`. Register them in `CardRenderer.tsx`. |
| 6 | Animation (optional) | Add a `kind` to `decor/OccasionEffects.tsx` (particles + JS frame function) and its CSS keyframes in `index.css`. Every duration must divide the 4 s loop. |

The occasion picker, wish categories, gallery, filename and share text all update automatically from the config.

**How it flows:** `OccasionPicker` → `useCardGenerator.setOccasion()` → designs (`templatesFor(mode, occasion)`), wishes (`wishesForOccasion`), card text (`occasionText(occasion, name, language)`) and the animation (`getOccasion(occasion).effect`).

**Bhaubij extras:** "Sign as" offers *From sister / From brother*. These change the intro line (e.g. "With love, your sister") and fall back to "Just me" on other occasions (`effectiveSignAs`).

---

## 6. Change the owner's contact details

Edit **only** `src/data/contact.ts`:

```ts
export const OWNER_CONTACT = {
  name: 'Saurabh',            // "Designed & built by …"
  whatsapp: '919403588913',   // country code + number, digits only
  email: 'amrutkars18@gmail.com',
  message: "Hi! I saw your Festive Card Studio website…",  // pre-filled text
};
```

Set a value to `''` to hide that button. If both WhatsApp and email are empty, the whole contact section hides. To add a portfolio link later: add a field here and a button in `components/ContactSection.tsx`.

---

## 7. Add a new business detail field

**Example:** add "GST number".

| Step | File | What to do |
|---|---|---|
| 1 | `src/types/card.ts` | Add `gst: string` to `BusinessDetails` (and, if shown on the card, to `BusinessContent`). |
| 2 | `src/hooks/useCardGenerator.ts` | Add a limit to `BUSINESS_LIMITS`, add `gst: ''` to the `empty` object in `loadBusiness`, and pass it through `toBusinessContent`. |
| 3 | `src/components/PersonalisationForm.tsx` | Add a `<Field id="business-gst" … onChange={(v) => onBusinessChange('gst', v)} />` in the business branch. |
| 4 | `src/components/cards/templates/businessTemplates.tsx` | Display it in the designs that should show it. |

Saved values persist automatically (the whole `business` object is saved to localStorage).

---

## 8. Tune fireworks or GIF export

| Want to change… | Where |
|---|---|
| Number of bursts/rockets/sparkles, overall opacity | `CONFIG` in `components/cards/decor/Fireworks.tsx` |
| Firework colours | `COLORS` in `Fireworks.tsx` |
| Animation shape/speed | keyframes in `src/index.css` (`fx-burst`, `fx-rocket`, `fx-twinkle`) **and** the JS copies `burstFrame` / `rocketFrame` / `sparkFrame` in `Fireworks.tsx` — keep both in sync |
| Loop length | `FIREWORKS_LOOP_SECONDS` in `decor/fireworksClock.ts` — every duration in `Fireworks.tsx` must divide it evenly |
| GIF smoothness / size | `GIF_FPS` and `GIF_MAX_SIDE` in `utils/animationExport.ts` (higher = bigger file + slower export) |

Next: [Rules, gotchas & glossary →](05-gotchas-and-glossary.md)
