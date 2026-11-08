# 5 · Rules, gotchas & glossary

## Rules that silently break things if ignored

| # | Rule | Why |
|---|---|---|
| 1 | **Never change a card's pixel size** to make it fit the screen. Use `ScaledCard`. | The exported PNG/GIF is a photo of the real-size card. Shrinking it shrinks the download. |
| 2 | **Use `FitText` for any user-controlled text** (heading, message). | Users can type 500 characters. Fixed font sizes overflow; `FitText` shrinks to fit. |
| 3 | **Templates must use inline styles, not Tailwind classes.** | Cards are rendered at exact pixel sizes and photographed by html-to-image; inline styles are predictable. Tailwind is for the page UI only. |
| 4 | **Every template must render inside `CardRoot`.** | Fireworks are injected by `CardRoot`. Skip it and fireworks disappear on that design. |
| 5 | **Keep the CSS fireworks keyframes and the JS frame functions in sync.** | Preview uses CSS; GIF export uses JS. If they differ, the GIF won't match the preview. |
| 6 | **Don't use letter-spacing on Hindi/Marathi text.** | It breaks Devanagari letter joins. `index.css` resets it for `[lang='hi']` — don't remove that rule. |
| 7 | **Marathi cards use `lang="hi"` on the card root.** | Some display fonts lack Marathi shaping rules; Hindi shaping renders Marathi correctly. (See `CardRenderer.tsx`.) |
| 8 | **Randomness in designs must use `seededRandom`, never `Math.random`.** | Decor positions must be identical in preview and export. |
| 9 | **SVG gradient/filter ids must be unique** — use the `useSvgId` hook. | The gallery shows many cards at once; duplicate ids make one card's gradient affect another. |
| 10 | **Always wrap `localStorage` access in `try/catch`.** | Private mode and some browsers block storage; the app must still work. |
| 11 | **Run `npm run build` before pushing.** | A push to `main` deploys to the live site. A broken build means a failed deploy. |

## Testing checklist (before every PR)

- [ ] Portrait, Square **and** Landscape
- [ ] English, हिन्दी **and** मराठी
- [ ] Personal **and** Business mode (if your change touches shared code)
- [ ] A very long name / business name and a 500-character message
- [ ] Fireworks **Off** and **Grand**
- [ ] Download PNG works; with fireworks on, download GIF works and animates
- [ ] Phone width (Chrome DevTools device toolbar, ~390 px)
- [ ] `npm run build` passes

## Common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| Text in a design is tiny | Too many fixed-size elements leave little room for `FitText` | Reduce fixed sizes (logo, lamps, margins) in that template |
| Fireworks missing on one design | Template doesn't use `CardRoot` | Wrap it in `CardRoot` |
| Hindi text looks broken/disjointed | letter-spacing applied | Remove letter-spacing for Devanagari |
| GIF doesn't match preview | CSS keyframes and JS frame functions differ | Sync `index.css` and `Fireworks.tsx` |
| Export fails with "could not create the image" | An external image without CORS, or fonts not loaded | Only use bundled assets / data URLs in cards |
| Old saved data looks wrong after a change | localStorage shape changed | Add migration in the `load…` function, or bump the storage key |
| Vercel deploy failed | `npm run build` errors | Run the build locally, fix the TypeScript error |

## What's saved in the visitor's browser

| Key | Contents |
|---|---|
| `diwali-card-sender-v1` | Personal name, Sign as, custom sender text |
| `festive-card-business-v1` | Business name, tagline, phone, website, address, sign-off |
| `diwali-card-logo-v2` | Logo image (PNG data URL) + shape/size/position |

## Glossary

| Term | Meaning |
|---|---|
| **Template / design** | One card layout, e.g. *Deepmala* or *Letterhead Ivory*. A React component in `templates/`. |
| **Mode** | *Personal* (signed by people) or *Business* (branded with a company). |
| **Format** | Card size: portrait, square or landscape. |
| **`CardContent`** | The ready-to-display text a template receives (heading, message, signature…). |
| **Signature** | Who the card is from: "John Doe & Family" or "Sharma Sweets". |
| **Sign as** | How a person signs: Just me / Me & family / Whole family. |
| **Monogram** | Circle with the business initials, shown when no logo is uploaded. |
| **Frozen frame** | The still pose of the fireworks used in PNG downloads and thumbnails. |
| **Frame differencing** | GIF trick: each frame stores only the pixels that changed, keeping files small. |
| **Palette** | The 255 colours a GIF is allowed to use, built once from sample frames. |
| **`FitText`** | Component that shrinks text until it fits its box. |
| **Context (React)** | A way to pass a value (logo, fireworks) deep into components without passing props through every level. |
| **localStorage** | Small storage inside the visitor's browser; survives page reloads, not shared with anyone. |
| **Data URL** | An image stored as text (`data:image/png;base64,…`), so no upload is needed. |
| **Web Share API** | Browser feature (`navigator.share`) that opens the phone's share sheet with a file. |
| **Hot reload** | The dev server updating the browser instantly when you save a file. |
| **Vercel** | The hosting service that rebuilds and publishes the site on every push to `main`. |

← Back to the [handbook home](README.md)
