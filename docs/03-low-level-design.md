# 3 · Low-level design

This page explains **how the code works, file by file**. Keep `src/types/card.ts` open while reading — every object mentioned here is defined there.

---

## 3.1 The data shapes (`src/types/card.ts`)

| Type | What it represents | Example |
|---|---|---|
| `Occasion` | Which festival day | `'diwali' \| 'padwa' \| 'bhaubij'` |
| `OccasionName` | Which regional name the user picked | `'primary'` (Diwali Padwa / Bhaubij) or `'alternate'` (Govardhan Puja / Bhai Dooj) |
| `OccasionEffect` | The occasion's own animation | `'petals'` (Padwa) \| `'aarti'` (Bhaubij) |
| `CardMode` | Personal or business card | `'personal'` |
| `TemplateId` | Which design | `'deepmala'`, `'biz-letterhead-ivory'` |
| `CardTemplate` | Gallery info for a design (name, category, mode, **occasions**, swatch) | entries in `data/templates.ts` |
| `CardFormat` | Card size | `'portrait' \| 'square' \| 'landscape'` |
| `Language` | Card language | `'en' \| 'hi' \| 'mr'` |
| `Wish` | A ready-made message in all 3 languages, tagged with its `occasion` | `data/wishes.ts`, `data/occasionWishes.ts` |
| `SenderDetails` | Personal signer: `name`, `signAs`, `customSenderText` | `{ name: 'John Doe', signAs: 'withFamily' }` |
| `SignAs` | How a person signs | `'me' \| 'withFamily' \| 'family' \| 'sister' \| 'brother'` (last two on Bhaubij only) |
| `BusinessDetails` | Business form: name, tagline, phone, website, address, signoff | — |
| `LogoOptions` | Uploaded logo + `shape`, `size`, `position`, `backdrop` | — |
| `TextStyleOptions` | User's text style: font, size, colour, alignment | — |
| `FireworksLevel` | `'off' \| 'subtle' \| 'grand'` | — |
| **`CardContent`** | ★ **Everything a template needs, already translated and formatted** | see below |

`CardContent` is the contract between the logic and the designs:

```ts
interface CardContent {
  heading: string;        // "Happy Diwali!"  (translated)
  subheading: string;     // "The Festival of Lights"
  message: string;        // the wish or custom message
  senderIntro: string;    // "Happy Diwali Wishes From"  (or user's custom line)
  senderName: string;     // "John Doe & Family"  or  "Sharma Sweets"
  language: Language;
  business?: {            // only on business cards
    name: string; tagline: string;
    contacts: { kind: 'phone' | 'website' | 'address'; text: string }[];
  };
}
```

> **Rule:** templates never compute text themselves. They only *display* `CardContent`. All logic (translation, "& Family", placeholders) happens in the hook.

---

## 3.2 State: `src/hooks/useCardGenerator.ts`

This one hook holds **all** card state. `App.tsx` calls it once: `const card = useCardGenerator();`

### What it stores

| State | Default | Saved in browser? |
|---|---|---|
| `occasion` | `'diwali'` | no |
| `occasionNames` | `'primary'` for every occasion — **remembered per occasion** | no |
| `occasionEffectOn` | `true` (switched back on when the occasion changes) | no |
| `mode` | `'personal'` | no |
| `templateId` | `'deepmala'` | no |
| `format` | `'portrait'` | no |
| `language` | `'en'` | no |
| `messageMode`, `selectedWishId`, `wishCategory`, `customMessage`, `presetEdits` | first wish | no |
| `sender` (name, signAs, customSenderText) | empty | ✅ `diwali-card-sender-v1` |
| `business` (all business fields) | empty | ✅ `festive-card-business-v1` |
| `logo` (image data URL + options) | none | ✅ `diwali-card-logo-v2` |
| `textStyle` | design defaults | no |
| `fireworks` | `'off'` | no |

### What it computes (derived values)

```mermaid
flowchart LR
    S[sender / business] --> N{mode?}
    N -->|personal| F1[formatSenderName<br/>'John Doe & Family']
    N -->|business| F2[business.name<br/>+ toBusinessContent]
    W[selected wish or<br/>custom message] --> M[message]
    O[occasion + chosen name] --> TR
    L[language] --> TR[occasionText:<br/>heading, subheading,<br/>senderIntro, share text]
    F1 --> C[CardContent]
    F2 --> C
    M --> C
    TR --> C
    C --> OUT[card.content<br/>→ LiveCardPreview]
    S --> SIG[card.signature<br/>used for validation,<br/>filename, share text]
```

### Important actions

| Action | What it does |
|---|---|
| `setOccasion(o)` | Switches occasion: restores the last design used for that mode + occasion, moves the wish list to the occasion's wishes, switches the occasion animation on |
| `setOccasionName(n)` | Picks the regional name **for the current occasion only** (e.g. Bhai Dooj doesn't change Padwa) |
| `setOccasionEffectOn(b)` | Turns the occasion animation on/off |
| `setMode(m)` | Switches mode, restores the last template used in that mode + occasion, and for business opens the *professional* wishes when the occasion has them |
| `setTemplateId(id)` | Selects a design (remembered per mode + occasion) |
| `updateSender(key, v)` / `setSignAs(v)` | Personal form |
| `updateBusiness(key, v)` | Business form (length-limited by `BUSINESS_LIMITS`) |
| `selectWish`, `randomWish`, `editPreset`, `resetPreset`, `setCustomMessage` | Message handling |
| `updateLogo(key, v)` / `removeLogo()` | Logo |
| `updateTextStyle`, `resetTextStyle`, `setFireworks`, `setFormat`, `setLanguage` | Styling |

### `formatSenderName` (personal signature)

| signAs | English | Hindi |
|---|---|---|
| `me` | John Doe | John Doe |
| `withFamily` | John Doe & Family | John Doe एवं परिवार |
| `family` | Doe Family *(last word of the name)* | Doe परिवार |
| `sister` / `brother` *(Bhaubij)* | name only — the **intro line** becomes "With love, your sister / brother" | intro "ढेर सारे प्यार के साथ, तुम्हारी बहन" |

`effectiveSignAs()` turns `sister` / `brother` back into `me` on Diwali and Padwa, so a choice made on Bhaubij never leaks onto other cards.

---

## 3.3 Component tree

```mermaid
flowchart TD
    App --> Navbar
    App --> HeroSection
    App --> HowItWorks
    App --> Studio[Card Studio section]
    Studio --> OccasionPicker
    Studio --> ModeSwitch
    Studio --> Step1[Step 1 panel]
    Step1 --> CardFormatSelector
    Step1 --> TemplateGallery --> TemplateCard --> CR1[CardRenderer<br/>thumbnail]
    Step1 --> FireworksSelector
    Studio --> Step2[Step 2 panel] --> LanguageSelector
    Step2 --> WishSelector --> CustomMessageEditor
    Studio --> Step3[Step 3 panel] --> PersonalisationForm
    Studio --> Step4["Step 4 panel (business only)"] --> LogoUploader
    Studio --> LiveCardPreview --> ScaledCard --> CR2[CardRenderer<br/>★ the exported node]
    LiveCardPreview --> DownloadButton
    LiveCardPreview --> WhatsAppShareButton
    App --> ContactSection
    App --> Footer
    App --> ShareDialog
    App --> Toast
```

- **`OccasionPicker`** shows Diwali · Padwa · Bhaubij and, for Padwa/Bhaubij, the "Call it" name chips.
- **`TemplateGallery`** shows the designs for the current mode **and occasion** (`templatesFor(mode, occasion)`) using occasion-appropriate sample content.
- **`FireworksSelector`** shows the occasion animation switch (when the occasion has one) above the fireworks choice.
- **`LiveCardPreview`** holds `cardRef` — a React ref pointing at the real card DOM node. Export functions photograph exactly this node, so **preview = download**.
- **`ScaledCard`** shows the full-size card (e.g. 1080×1350) shrunk with CSS `transform: scale()` to fit the screen. The card itself never changes size.

---

## 3.4 How a card is drawn

```mermaid
flowchart TD
    CR["CardRenderer<br/>(templateId, format, content, style, logo, fireworks)"]
    CR --> D[looks up size in CARD_DIMENSIONS]
    CR --> P1[CardLogoContext.Provider<br/>value = logo]
    P1 --> P2[CardBackdropContext.Provider<br/>value = Fireworks or null]
    P2 --> T[Template component<br/>from TEMPLATE_COMPONENTS]
    T --> ROOT[CardRoot<br/>background + backdrop layer + children]
    ROOT --> FW[Fireworks SVG<br/>behind everything]
    ROOT --> ART[Decor: Layer, lamps,<br/>florals, patterns]
    ROOT --> TXT[FitText heading/message]
    ROOT --> SB[SenderBlock<br/>intro + name]
    CR --> OV["LogoOverlay<br/>(personal corner logo — currently unused)"]
```

### The shared parts (`src/components/cards/parts.tsx`)

| Part | Job |
|---|---|
| `CardRoot` | The card canvas at exact pixel size. Draws the background and the **backdrop** (fireworks) *under* the template's children. |
| `Layer` | An absolutely positioned decorative box. |
| `FitText` | ★ Auto-shrinks text (binary search on font size) until it fits its box. **This is why long messages never overflow.** Use it for any text whose length the user controls. |
| `SenderBlock` | The "From … / Name" block used by all personal templates. |
| `OrnamentDivider` | Small line–diamond–line ornament. |
| `CardLogoContext` / `CardBackdropContext` | React contexts so logo and fireworks reach every template **without changing each template's code**. |

### Typography (`src/components/cards/typography.ts`)

- `FONT_STACKS` pairs each Latin font with a Devanagari font, so Hindi/Marathi always render.
- `resolveTypography(style, defaults)` merges the user's *Text style* choices with the template's defaults → `{ font, color, senderAlign, scale }`.

### Personal vs business templates

| | Personal (`classic/festive/artisticTemplates.tsx`) | Business (`businessTemplates.tsx`) |
|---|---|---|
| Signature | `SenderBlock` | Own layout: logo + name + tagline + `ContactLine` |
| Logo | not shown (personal logos are disabled for now) | `BizLogo` — uploaded logo, or a **monogram of initials** if none |
| Sizing | hand-tuned per format | authored for portrait, scaled by `k = height / 1350` via `useLayout()` |

---

## 3.5 Animations: fireworks and occasion effects

Files: `decor/Fireworks.tsx`, `decor/OccasionEffects.tsx`, `decor/fireworksClock.ts`, keyframes in `index.css`.
`CardRenderer` passes both to every template through `CardBackdropContext`, so they sit **behind** the art and text.

```mermaid
flowchart LR
    A[Fireworks component] -->|seededRandom| B[same burst positions<br/>every render]
    B --> C{frameTime?}
    C -->|null: live| D[CSS animations play<br/>.fx-burst .fx-rocket .fx-spark]
    C -->|number: exporting GIF| E[JS computes the exact<br/>transform/opacity for time t]
    D -.->|during PNG export,<br/>data-exporting attr| F[animations switched off<br/>→ designed 'frozen frame']
```

- **Base style = frozen frame.** Each element's default style shows bursts fully open. CSS animations play *on top* in the live preview.
- **PNG export** adds `data-exporting` to the card → CSS rule turns animations off → the PNG shows the frozen frame.
- **GIF export** sets a global clock (`setFireworksFrameTime(t)`) → `Fireworks` re-renders the exact moment `t` using JS copies of the keyframes (`burstFrame`, `rocketFrame`, `sparkFrame`).
- **Seamless loop:** every animation duration divides `FIREWORKS_LOOP_SECONDS` (4 s), so the GIF loops without a jump.
- Bursts are timed to be *open at t = 0*, so the first frame (used as chat thumbnail) looks complete.

**Occasion effects (`OccasionEffects.tsx`)** follow the same contract:

| Kind | Occasion | What moves | CSS classes | JS frame functions |
|---|---|---|---|---|
| `petals` | Padwa | Marigold petals and gold coins fall, sway and spin | `.fx-fall` | `fallFrame` |
| `aarti` | Bhaubij | A warm glow pulses at the bottom; embers and petals rise | `.fx-pulse`, `.fx-fall` | `pulseFrame`, `fallFrame` |

- Particles only travel in the **outer 16% on each side** of the card, so they never drift behind the message.
- Each particle's fall distance is passed to CSS as variables (`--fx-from`, `--fx-to`, `--fx-sway`, `--fx-spin`).
- Every duration is exactly `FIREWORKS_LOOP_SECONDS` (4 s) so the GIF still loops seamlessly.
- The card exports as a GIF when **fireworks or the occasion effect** is on.

---

## 3.6 Export & share

### PNG — `utils/imageExport.ts`

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Hook as useCardExport
    participant IE as imageExport
    participant DOM as Card node (cardRef)
    User->>App: Download
    App->>App: validate() — name/business name + message present?
    App->>Hook: generate('download','png')
    Hook->>IE: exportCardToBlob(node, dims)
    IE->>IE: wait for fonts, embed font CSS (cached)
    IE->>DOM: set data-exporting (freeze animations)
    IE->>DOM: html-to-image toBlob() at exact pixel size
    IE->>DOM: remove data-exporting
    IE-->>App: PNG Blob
    App->>User: downloadBlob() → Happy-Diwali-John-Doe.png
```

### GIF — `utils/animationExport.ts`

```mermaid
flowchart TD
    A[exportCardToGif] --> B["Pass 1: render 4 sample moments<br/>(0s, 1s, 2s, 3s) → build ONE 255-colour palette"]
    B --> C["Pass 2: for each of 60 frames (15 fps × 4 s)"]
    C --> D["setFireworksFrameTime(t) + flushSync<br/>→ card re-renders that exact moment"]
    D --> E["html-to-image toCanvas<br/>at GIF size (longest side 900px)"]
    E --> F["applyPalette → colour indexes"]
    F --> G["store only pixels that changed<br/>(others = transparent)"]
    G --> H["gifenc writeFrame"]
    H --> C
    C -->|done| I["finish → GIF Blob (~2 MB, ~20 s)"]
```

Why two passes and frame differencing? Keeping all frames in memory would use ~150 MB (too much for phones), and storing only changed pixels keeps the file small enough for WhatsApp.

### Share — `App.tsx handleShare` + `utils/whatsappShare.ts`

```mermaid
flowchart TD
    A[Share on WhatsApp] --> B[generate PNG or GIF]
    B --> C{Browser can share files?<br/>navigator.canShare}
    C -->|yes| D[navigator.share → phone share sheet]
    D --> E{result}
    E -->|shared| OK[Toast: shared]
    E -->|needs-gesture<br/>permission expired while generating| R[ShareDialog 'Tap to share' retry]
    E -->|unsupported| M
    C -->|no, e.g. desktop| M[Download the file +<br/>ShareDialog with wa.me link<br/>to attach manually]
```

---

## 3.7 Logo pipeline (business mode)

```mermaid
flowchart LR
    F[User picks file<br/>LogoUploader] --> V[prepareLogo<br/>utils/logo.ts]
    V -->|check type & ≤5 MB| R[draw on canvas,<br/>longest side ≤600px]
    R --> P[PNG data URL]
    P --> S[logo.src in state<br/>+ localStorage]
    S --> C[CardLogoContext]
    C --> B[BizLogo in business templates<br/>logoImgStyle by shape]
```

`logoShape.ts`: `original` keeps the image as-is; `circle` / `rounded` / `square` crop it to a square and mask it. `logoFrameRadius` makes frames around the logo follow the same shape.

---

## 3.8 File reference (when would I touch this?)

| File | Responsibility | You touch it when… |
|---|---|---|
| `App.tsx` | Page layout, steps, validation, download/share handlers | Adding a page section or a new step; changing button behaviour |
| `types/card.ts` | All data types | Adding any new field/option (always start here) |
| `data/occasions.ts` | Occasion list, regional names, animation, filename prefix, card text per occasion × name × language | Adding an occasion; changing headings/share text |
| `data/templates.ts` | Design list (name, category, mode, occasions), card sizes, `templatesFor(mode, occasion)` | Adding/renaming a design |
| `data/wishes.ts` | 32 Diwali wishes + helpers (`wishesForOccasion`, `categoriesForOccasion`) | Adding/editing Diwali messages |
| `data/occasionWishes.ts` | 10 Padwa + 10 Bhaubij wishes × 3 languages | Adding/editing Padwa/Bhaubij messages |
| `data/translations.ts` | Card text + labels per language | Changing wording; adding a language |
| `data/contact.ts` | Owner's name, WhatsApp, email | Changing contact details |
| `hooks/useCardGenerator.ts` | All state + `CardContent` | New option that affects the card |
| `hooks/useCardExport.ts` | Export state (busy, progress) | New export format |
| `components/cards/CardRenderer.tsx` | Template registry + logo/fireworks layers | Registering a new template |
| `components/cards/parts.tsx` | Shared template building blocks | Changing something for *all* personal templates |
| `components/cards/templates/*.tsx` | The designs: classic/festive/artistic (Diwali), `businessTemplates`, `occasionTemplates` (first Padwa/Bhaubij set + shared `TextColumn`, `useScale`), `moreOccasionTemplates` (3 more per occasion) | Creating/changing a design |
| `components/cards/decor/*.tsx` | SVG art: lamps, florals, patterns, scenes, fireworks, `occasionDecor` (aarti thali, gold coin, kalash, gift box, river), `festiveDecor` (star kandil, Lakshmi feet, phuljhadi, coin stack, bahi-khata, tilak, sweets plate), `OccasionEffects` | New decorations or animations |
| `components/OccasionPicker.tsx` | Occasion buttons + "Call it" name chips | Occasion picker UI |
| `components/PersonalisationForm.tsx` | Step 3 form (personal + business + text style) | New form field |
| `components/LogoUploader.tsx` | Step 4 logo upload + shape | Logo options |
| `components/TemplateGallery.tsx` | Step 1 gallery + sample content per mode and occasion | Gallery filters/sample text |
| `components/FireworksSelector.tsx` | Occasion animation switch + fireworks choice | Animation controls |
| `utils/imageExport.ts` / `animationExport.ts` | PNG / GIF creation | Export quality, size, speed |
| `utils/whatsappShare.ts` | Web Share API + wa.me links | Share behaviour |
| `utils/filename.ts` | Download filename with the occasion prefix (`Happy-Bhai-Dooj-Priya.gif`) | Filename format |
| `index.css` | Fonts, Tailwind theme, fireworks + occasion-effect keyframes, Hindi letter-spacing fix | Global styles, animations |

Next: [How-to guides →](04-how-to-guides.md)
