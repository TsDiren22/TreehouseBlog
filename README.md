# Diren · Digital Treehouse

A personal portfolio website built around a **Digital Treehouse** aesthetic |
foresty, warm, and technical. Birch plywood background, pine-needle and
mahogany accents, an amber lantern glow on every hover, and a fine film of
grain layered over the whole site so it feels hand-built rather than
machine-rendered.

## Stack

- [Next.js 14](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS 3.4](https://tailwindcss.com) with a fully custom theme
- [`next/font`](https://nextjs.org/docs/app/api-reference/components/font)
  for [Inter](https://rsms.me/inter/),
  [JetBrains Mono](https://www.jetbrains.com/lp/mono/), and
  [Fraunces](https://fonts.google.com/specimen/Fraunces)

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## The theme

All design tokens live in [`tailwind.config.ts`](./tailwind.config.ts).

| Token                     | Hex       | Used for                              |
| ------------------------- | --------- | ------------------------------------- |
| `birch-light`             | `#EED9B1` | Sunlit plywood background             |
| `birch-shadow`            | `#D2B48C` | Plank shadows / knots                 |
| `pine` (Pine Needle)      | `#2D4F1E` | Primary accent, links, nav            |
| `mahogany` (Deep Mahogany)| `#4A2C2A` | Heading text, primary buttons         |
| `lantern` (Amber Lantern) | `#FFB347` | Hover glow, focus rings, highlights   |

Fonts are exposed as CSS variables (`--font-inter`,
`--font-jetbrains`, `--font-fraunces`) and mapped to Tailwind&rsquo;s
`font-sans`, `font-mono`, and `font-serif` / `font-display`.

### Signature utilities

- `.plank` | plywood card with a soft inner knot shadow.
- `.btn-lantern` | mahogany button that ignites with the amber glow on hover.
- `.link-pine` | pine-colored link whose underline grows into a lantern trail.
- `.grain-overlay` | the site-wide fractal-noise film (see
  [`public/grain.svg`](./public/grain.svg) and
  [`components/GrainOverlay.tsx`](./components/GrainOverlay.tsx)).
- `animate-flicker` | gentle lantern flicker for glowing elements.

## Structure

```
app/
  layout.tsx      # fonts, ambient lantern haze, grain overlay
  page.tsx        # hero · about · projects · contact
  globals.css     # @tailwind layers + .plank / .btn-lantern / .link-pine
components/
  GrainOverlay.tsx
public/
  grain.svg       # fractal-noise texture (mix-blend: multiply)
tailwind.config.ts
```

## Extending

- **New section?** Follow the `SectionHeader` + `.plank` pattern in
  `app/page.tsx` so it inherits the treehouse rhythm automatically.
- **New color?** Add it under `theme.extend.colors` in
  `tailwind.config.ts` | the palette is organized as small scales
  (`pine.50` &hellip; `pine.900`) so tints stay consistent.
- **More grain?** Tweak `baseFrequency` / opacity in
  `public/grain.svg` and `.grain-overlay` in `globals.css`.
