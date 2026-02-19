# FlowSync AI - Website Project

## About the Project

Website for **FlowSync AI**, a company that uses artificial intelligence to build systems that improve productivity, efficiency, and reduce costs for businesses. The site serves as a digital showcase ("vetrina") presenting FlowSync AI's systems and services.

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | App Router framework |
| React | 19.2.3 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | v4 | Utility-first styling (via `@tailwindcss/postcss`) |
| shadcn/ui | latest | UI components (Radix UI primitives) |
| Framer Motion | 12.29.2 | Animations |
| lucide-react | 0.562.0 | Icon library |
| next-themes | 0.4.6 | Dark mode (scoped to dashboard) |
| clsx + tailwind-merge | latest | ClassName management (via `cn()` utility) |
| @formkit/auto-animate | 0.9.0 | Auto-animation for list transitions |
| Lenis | 1.3.17 | Smooth scrolling (landing page) |

### Infrastructure

| Service | Purpose |
|---|---|
| Vercel | Deployment & hosting |
| GitHub | Version control |

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, routes)
│   ├── globals.css   # Global styles + Tailwind + CSS variables + color palette
│   ├── layout.tsx    # Root layout (fonts, metadata)
│   └── page.tsx      # Homepage
├── components/       # Reusable UI components
│   ├── Header.tsx    # Main navigation header (Framer Motion)
│   └── ui/           # shadcn/ui components
├── fonts/            # Local font files (Glacial Indifference woff2)
└── lib/
    └── utils.ts      # cn() utility (clsx + tailwind-merge)
```

## Key Conventions

- **Import alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`. Use `cn()` from `@/lib/utils` for conditional classNames.
- **Components**: Use shadcn/ui as the base component library. Add components with `npx shadcn@latest add <component>`.
- **Animations**: Use Framer Motion for complex animations, `@formkit/auto-animate` for list transitions.
- **Smooth scroll**: Lenis for smooth scrolling on the landing page.
- **Icons**: Use `lucide-react` for all icons.
- **Dark mode**: `next-themes` scoped to the dashboard section only.

## Commands

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Design System

### Color Palette (Dark Purple + Ice White)

| Token | Hex | Usage |
|---|---|---|
| `bg-deep` | `#06010f` | Page background (gradient start) |
| `bg-purple` | `#0d0520` | Page background (gradient end) |
| `bg-purple-light` | `#160a30` | Cards, elevated surfaces |
| `nav` | `#110826` | Navigation background |
| `accent` | `#8b5cf6` | Primary accent, CTAs, hover effects |
| `accent-bright` | `#a78bfa` | Lighter accent variant |
| `accent-deep` | `#6d28d9` | Deeper accent for gradients |
| `ice` | `#f0f4ff` | Ice white — headings, primary text |
| `text-primary` | `#f0f4ff` | Main text (headings, body) |
| `text-secondary` | `#b8c4e0` | Subtitles, secondary text |
| `text-muted` | `#6b7394` | Muted/tertiary text |

Background: `linear-gradient(165deg, #06010f 0%, #0a0320 40%, #0d0520 100%)`

### Typography

| Level | Font | Size | Weight | CSS var |
|---|---|---|---|---|
| Title (H1) | Red Hat Display | 3rem (48px) | Bold | `--fs-title` |
| Subtitle (H2) | Glacial Indifference | 1.5rem (24px) | Bold | `--fs-subtitle` |
| Body text | Glacial Indifference | 1rem (16px) | Regular | `--fs-text` |

**Ratio**: Title 1x → Subtitle 1:2 → Text 1:3

**Tailwind classes**: `font-display` (Red Hat Display), `font-body` (Glacial Indifference)

### Header Animations (Framer Motion)

- **Entrance**: Slide-down + fade-in with `ease: [0.22, 1, 0.36, 1]`; staggered children
- **Nav hover**: Scale 1.2x + electric blue glow (`textShadow`) via `whileHover`
- **Spring config**: `stiffness: 400, damping: 22`

## Content (TBD)

- Copy / text content: to be defined
- Graphics & imagery: to be defined
- FlowSync AI systems details: to be defined
