# Claude Code - Swift Stack Website

## Project Overview

Swift Stack Solutions builds AI-powered pre-funding document verification for equipment finance lenders. This is the marketing website, built from scratch. The site communicates what Swift Stack does, proves it's real, and converts visitors to leads.

**Buyers:** Operations leaders (COO, VP Ops), documentation team leads, and funding team leads at mid-market equipment finance lenders in Canada and the US. These are high-trust B2B deals. Buyers need to feel the company is legitimate, technically competent, and deeply specialized.

**Current product status:**
- COI Verification: Live and in production (CTA = "Get Started")
- Lien Validation: In development (CTA = "Join the Waitlist")
- Debtor Search: In development (CTA = "Join the Waitlist")

**Anchor client:** Dynamic Capital (mid-market Canadian equipment finance lender). Do NOT name them on public pages except the dedicated case study page (`/case-studies/dynamic-capital`), which requires their sign-off before publishing.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | SSG for marketing pages. SSR where needed. |
| Styling | Tailwind CSS | Dark mode via `dark:` variants. |
| Animations | Motion (formerly Framer Motion) | All scroll-triggered, interaction, and hero animations. |
| Hero visualizations | Motion + inline SVG | Code-built in React. No Lottie. No external animation tools. |
| Blog content | MDX | Markdown with optional React components. |
| Icons | Lucide React | Consistent stroke-based icons. 1.5-2px stroke. |
| Forms | HubSpot API | All CTAs and contact form submit to HubSpot. |
| Deployment | Vercel | SSG + edge. Zero-config. |
| Package manager | pnpm | - |

### Why Not Lottie

The hero animations (document comparison, field highlighting, connection lines) are SVG operations. Building them as React components with Motion + SVG means:
- Claude Code can build and iterate on them directly in code
- They respond to dark mode, screen size, and theme changes natively
- No dependency on After Effects or external animation tools
- Smaller bundle, fewer dependencies

If pre-designed illustrative animations are ever needed, use Rive (not Lottie). But the current animation spec does not require it.

---

## Design System

### Color Palette

**Approach:** Light mode default with blue brand palette derived from the logo. Dark mode as a first-class option.

**Brand blues (from logo, exact hex):**

| Name | Hex | RGB | Usage |
|---|---|---|---|
| **Light blue** | #2AA0E6 | 42, 160, 230 | Primary accent. CTAs, links, highlights, interactive states, hero connection lines. |
| **Medium blue** | #006AAE | 0, 106, 174 | Hover states, active states, secondary emphasis, gradients. |
| **Dark navy** | #003263 | 0, 50, 99 | Dark sections (footer, CTA blocks), dark mode base, heading emphasis. |

**Extended palette:**

| Role | Light mode | Dark mode |
|---|---|---|
| Background | #FFFFFF (white) | #001A33 (deeper than logo navy) |
| Surface/cards | #FFFFFF with border #E5E7EB | #002244 with border #003263 |
| Text primary | #0F172A (near-black) | #F1F5F9 (off-white) |
| Text secondary | #64748B (gray-500) | #94A3B8 (gray-400) |
| Border | #E5E7EB (gray-200) | #1E3A5F (navy-tinted) |
| Accent | #2AA0E6 (light blue) | #4DB8F0 (lighter for dark bg contrast) |
| Accent hover | #006AAE (medium blue) | #2AA0E6 (light blue) |

**Semantic colors:**

| Role | Color | Usage |
|---|---|---|
| Verified/success | #22C55E (green-500) | Hero animation verified fields, success states |
| Flagged/warning | #F59E0B (amber-500) | Hero animation flagged fields, deficiency indicators |
| Error | #EF4444 (red-500) | Form validation only, not used in marketing content |

**CSS custom properties (set in globals.css):**
```css
:root {
  --color-accent: #2AA0E6;
  --color-accent-hover: #006AAE;
  --color-navy: #003263;
  --color-verified: #22C55E;
  --color-verified-light: rgba(34, 197, 94, 0.08);
  --color-flagged: #F59E0B;
  --color-flagged-light: rgba(245, 158, 11, 0.08);
}

.dark {
  --color-accent: #4DB8F0;
  --color-accent-hover: #2AA0E6;
  --color-navy: #001A33;
  --color-verified: #4ADE80;
  --color-verified-light: rgba(74, 222, 128, 0.1);
  --color-flagged: #FBBF24;
  --color-flagged-light: rgba(251, 191, 36, 0.1);
}
```

**Colors to avoid:** Bright orange, neon anything, pure black (#000000) backgrounds, violet/purple (off-brand).

### Typography

**Font:** Geist (by Vercel). Clean, professional, distinctive. Install via `geist` npm package. Use `GeistSans` for all text. Do not use decorative or unusual fonts. Do not fall back to Inter unless Geist cannot be loaded.

**Scale:**
- Hero headline: 48-72px desktop, 32-40px mobile
- Section headings (H2): 32-40px desktop, 24-28px mobile
- Body text: 16-18px
- Small/caption: 14px minimum (accessibility floor)

**Weights:**
- Headlines: Semi-bold (600) or Bold (700)
- Subheadlines: Medium (500) or Regular (400)
- Body: Regular (400)
- Never use Light (300) for body text

**Line height:** 1.6-1.7 for body text. Tighter for headings.

### Spacing and Layout

**Max content widths:**
- Full-width sections: Edge to edge, content constrained within
- Standard content: ~1200px max
- Narrow text (Why Swift Stack, FAQ, blog posts, simple pages): ~720-800px max
- Hero split: Text left 40-50%, animation right 50-60%

**Responsive breakpoints (desktop-first):**
- Desktop: 1280px+
- Laptop: 1024-1279px
- Tablet: 768-1023px
- Mobile: < 768px (single column everything, hamburger nav)

### Dark Mode

- **Default:** Light mode. Respect `prefers-color-scheme` for users who prefer dark.
- **Optional toggle:** In nav or footer. Store preference in localStorage.
- **Rationale:** Buyers are operations leaders at financial companies, not developers. Light mode is the visual language of financial services. Dark mode is an option, not the default.

---

## Brand Voice and Writing Rules

Read the full Brand & Messaging Guide in the Obsidian vault before writing or editing any copy. Key rules:

1. **No em dashes.** They signal AI-generated text. Use commas, parentheses, or separate sentences.
2. **No absolute numbers tied to one client.** Use percentages and multipliers (60%, 4x, 99%).
3. **Don't reveal Dynamic Capital on public pages.** They are "a mid-market Canadian equipment finance lender."
4. **Don't state production timeframe.** Don't say "12 months" or similar.
5. **Don't overcommit on unvalidated capabilities.** Debtor search and lien validation are framed as in-development.
6. **No salesy language.** Never "revolutionize," "transform," "unlock the power of," "cutting-edge solutions," or "leveraging AI."
7. **Be specific.** Every claim backed by a number, workflow, or capability. Never generic SaaS language.
8. **Use industry terminology correctly.** COI, ACORD 27/28, PPSA, UCC, GSA, deficiency, loss payee, entity matching. See the Brand & Messaging Guide terminology table.

### Product Terminology

| Concept | Correct term | Do not use |
|---|---|---|
| The company | Swift Stack Solutions (formal), Swift Stack (casual) | SwiftStack (except URLs/handles) |
| What we do | Pre-funding document verification | "document processing," "document management" |
| Where we fit | Between approval and payout | "back office" (too vague) |
| What the system finds | Deficiencies | "errors" (too narrow), "issues" (too vague) |
| How humans interact | Human-in-the-loop, exception-based review | "fully automated" |
| What the system produces | Verification results, flagged items | "reports," "outputs" |

### Production Metrics

| Metric | Value | Usage |
|---|---|---|
| Workflow speed | 4x | "4x faster document verification" |
| Deficiency rate | 60% | "60% of COIs contain deficiencies" (prevalence, not catch rate) |
| Accuracy | 99% | Case study only |

---

## Site Architecture

```
swiftstacksolutions.com
├── /                              Homepage
├── /solutions/
│   ├── /coi-verification          COI verification (live)
│   ├── /lien-validation           Lien validation (coming soon)
│   └── /debtor-search             Debtor search (coming soon)
├── /case-studies/
│   └── /dynamic-capital           (DO NOT PUBLISH until sign-off)
├── /blog/
│   └── /[post-slug]
├── /careers
├── /contact
├── /privacy-policy
└── /404
```

**Navigation:**
```
Logo | Solutions v | Blog | Contact     Log In  [Get Started]
       ├── COI Verification
       ├── Lien Validation
       └── Debtor Search Intelligence
```

**CTA mapping:**

| Page | CTA button text |
|---|---|
| Homepage, COI Verification, Case Study | Get Started |
| Lien Validation, Debtor Search | Join the Waitlist |
| Nav bar (all pages) | Get Started |

Both CTAs submit to HubSpot. Email fallback on every page: hello@swiftstacksolutions.com

### Page Templates

**Homepage sections:** Hero > Problem > Solutions Overview (3 cards) > Why Swift Stack > FAQ > CTA > Footer

**Solution page sections:** Hero > Problem > Solution > How It Works (3 steps) > What It Checks/Surfaces > What This Means > FAQ > CTA > Footer

**Simple pages** (Careers, Privacy Policy): Nav > Content (720px max-width) > Footer. No CTA block.

---

## Animation Specs

### Motion Principles

Smooth and elegant with some pace. Confident, not flashy. Every animation communicates something. If removing it doesn't lose meaning, remove it.

**No:** Parallax on text, 3D card flips, particle effects, typing reveals, scroll hijacking, auto-playing video, animations that delay content.

### Timing Standards

| Type | Duration | Notes |
|---|---|---|
| Hover effects | 200-250ms | Fast, immediate feedback |
| Scroll reveal (fade-in) | 500-600ms | Smooth entrance |
| Staggered reveal (per item) | 100-150ms delay | Total stagger under ~600ms |
| Count-up numbers | 1500-2000ms | Ease-out. Fire once only. |
| Accordion expand/collapse | 300-400ms | Height + opacity |
| Hero visualization | 4-6 seconds | Plays on load, holds final frame |
| Step sequence (per step) | 600-800ms | Each step on scroll |
| Form focus | 150-200ms | Border/glow transition |

### Easing Curves

| Context | Motion value |
|---|---|
| Hover, interactive feedback | `{ ease: [0, 0, 0.2, 1] }` (ease-out) |
| Scroll reveals, entrances | `{ ease: [0.4, 0, 0.2, 1] }` (ease-in-out) |
| Exit animations | `{ ease: [0.4, 0, 1, 1] }` (ease-in) |

No spring/bounce easing.

### Scroll Behavior

- Default trigger: 20% visible (`amount: 0.2` in `useInView`)
- Count-up numbers: 30% visible
- Hero: Animates on page load, not scroll
- All scroll reveals: Fire once, do not re-trigger on scroll back
- Card hover: Repeatable
- Accordion: Repeatable

### Interaction Patterns

**Buttons:** Background color shift on hover. 200ms ease-out. No scale, no shadow change.

**Cards:** Translate Y -4px lift, increase box shadow. 250ms ease-out.

**Scroll reveal:** Initial `opacity: 0, y: 24px` to `opacity: 1, y: 0`. 500ms ease-in-out.

**Staggered reveal:** Same per-item fade-in, 120ms delay between items. Container triggers at 20% visible.

**Count-up numbers:** 0 to target, 1800ms, ease-out, fire once. Display with suffix (4x, 60%, 99%, 150+).

**Accordion:** One item open at a time. Expand: height 0 to auto + fade in, 350ms. Collapse: fade out + height to 0, 300ms.

### Hero Animations (SVG + Motion)

All heroes use a split layout: text left, animated visualization right.

**Homepage:** Split comparison pane. Two stylized documents side by side. Field pairs highlight, connection lines draw between matching fields, each resolves to verified (green) or flagged (amber). Verification summary slides in at bottom. 4-6 second sequence.

**COI Verification:** Stylized COI vs equipment schedule. Serial numbers, loss payee, policy dates highlight and compare.

**Lien Validation:** Filing document vs deal package. Debtor names, collateral descriptions compared. Entity name variation flagged.

**Debtor Search:** Different pattern. Tall page stack enters, pages fan out, key registrations extracted, stack collapses to structured summary.

**All hero animations:** Stylized, not photorealistic. Clean rectangles, faint field lines. Connection lines 1-2px, slightly curved. Transparent backgrounds for dark mode compatibility.

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- All scroll reveals: Render in final state immediately
- Count-ups: Show final number, no animation
- Hero: Show final frame as static
- How It Works steps: All visible, no scroll trigger
- Keep hover effects and accordion (user-initiated)
- Lottie/complex animations: Static first or last frame

Implementation: Wrap all Motion animations in `useReducedMotion()` check.

### Performance Budget

- Animations: Only `transform` and `opacity` (GPU-composited). No layout-triggering properties.
- No animation should block first paint. Text visible first, decoration follows.
- SVG hero animations: Lazy-load or defer. Must not block text rendering.
- Target 60fps on all scroll-triggered animations. Use `will-change` sparingly.

---

## Trust and Credibility Approach

### Primary Trust Signals

1. **Depth over breadth for social proof.** One deep case study (Dynamic Capital) with real metrics is more credible than a logo bar. Go deep on 4x, 150+, 99%.
2. **Security/Trust page** (build for Phase 1 or early Phase 2). Explain how documents are handled, encryption, data residency, compliance status. Equipment finance buyers need to justify the tool to their risk/compliance teams.
3. **Team visibility.** Founders with headshots, titles, LinkedIn links. Professional bios emphasizing domain experience. Advisory board if applicable.
4. **Ecosystem credibility.** Technology partner logos (AWS, integrations), industry association memberships (CFLA, ELFA), accelerator/program logos if applicable.
5. **Technical credibility through content.** Blog posts demonstrating deep domain expertise in equipment finance operations.

### What NOT to Do

- No stock photos of generic business people
- No fake testimonials or unattributed quotes
- No vanity metrics if the numbers are small
- No language implying scale we don't have ("trusted by thousands")
- No "as seen on" logos for mere directory listings

### CTA Design

- Primary CTA wording: "Get Started" (live products) or "Join the Waitlist" (in development)
- Forms: Inline on the page, not modals. Keep to 3-5 fields max.
- Post-submission: Show specific next step ("We'll email you within 1 business day"), not generic "thank you"
- Email fallback on every page below the CTA form

---

## Accessibility Standards

**Target: WCAG 2.2 Level AA**

- Color contrast: 4.5:1 minimum for text, 3:1 for large text
- Touch targets: 44x44px minimum
- All images: Meaningful alt text (see SEO & Meta file for alt text strategy)
- Keyboard navigation: Full functionality, visible focus indicators, logical tab order
- ARIA landmarks: header, nav, main, footer
- Form labels: Associated labels on all fields, not just placeholders
- Reduced motion: Full support (see Animation Specs)

**Target: Lighthouse 90+ on all four metrics** (Performance, Accessibility, Best Practices, SEO)

**Core Web Vitals targets:**
- LCP: Under 2.5 seconds
- INP: Under 200ms
- CLS: Under 0.1

---

## SEO Implementation

- Meta titles and descriptions: Defined per page in the SEO & Meta file
- Schema markup: FAQ (JSON-LD) on pages with FAQs, Organization (site-wide), Article (blog posts), Breadcrumb (solution pages, blog posts)
- Open Graph tags: Every page. 1200x630px OG images.
- Sitemap: Auto-generated
- Robots: noindex on 404 and privacy policy

---

## Forms and CASL Compliance

### Sign-up Forms (Get Started / Join the Waitlist)

Checkbox (required, not pre-checked):
> I agree to receive emails from Swift Stack Solutions about product updates, launch announcements, and related company communications.

Disclosure below checkbox:
> You can withdraw your consent at any time by clicking the unsubscribe link in any email or by contacting hello@swiftstacksolutions.com. Swift Stack Solutions, swiftstacksolutions.com.

### Contact Form

Non-marketing notice near submit (no checkbox needed):
> By submitting this form, you agree that Swift Stack Solutions may use the information you provide to respond to your inquiry and communicate with you about that inquiry.

Optional marketing checkbox (not pre-checked):
> Yes, I would like to receive emails from Swift Stack Solutions about product updates, launch announcements, and related company communications.

---

## Current Build State

### Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind theme + modern utility classes
│   │   ├── layout.tsx           # Root layout (Geist font, Header, Footer, OrganizationSchema)
│   │   └── page.tsx             # Homepage (all 6 sections)
│   ├── components/
│   │   ├── accordion.tsx        # FAQ accordion with open-state highlight
│   │   ├── count-up.tsx         # Animated number counter
│   │   ├── fade-in.tsx          # Scroll-triggered fade-in wrapper
│   │   ├── footer.tsx           # Site footer
│   │   ├── header.tsx           # Sticky glass header with dropdown + mobile menu
│   │   ├── hero-animation.tsx   # SVG document comparison animation
│   │   └── schema.tsx           # JSON-LD schema (Organization, FAQ)
│   └── lib/
│       └── animation.ts         # Shared animation constants, variants, easing
├── public/
│   └── logo.png
├── docs/
│   └── research.md              # Full research document (content inventory, B2B patterns, animation patterns)
├── .claude/
│   └── skills/                  # Animation pattern skills (3 files)
├── CLAUDE.md
├── package.json
├── tailwind.config.ts           # (not needed - using Tailwind v4 CSS-based config)
├── postcss.config.mjs
├── tsconfig.json
└── next.config.ts
```

### Pages Built
- **Homepage** (`/`): Complete with all 6 sections (Hero, Problem, Solutions, Why Swift Stack, FAQ, CTA)

### Pages Not Yet Built
- `/solutions/coi-verification`
- `/solutions/lien-validation`
- `/solutions/debtor-search`
- `/case-studies/dynamic-capital` (requires client sign-off)
- `/blog` and `/blog/[slug]`
- `/contact`
- `/careers`
- `/privacy-policy`
- `/404`

### Modern Design Patterns Established

These patterns are used across the site. Maintain consistency when building new pages.

1. **Section labels**: Uppercase tracking-widest accent-colored text above each section heading (e.g., "THE PROBLEM", "SOLUTIONS")
2. **Gradient text**: Headlines use `text-gradient` class (primary to secondary color fade)
3. **Ambient glows**: Soft radial gradients behind key sections (hero, CTA) using absolute positioned divs with blur
4. **Gradient section dividers**: `divider-gradient` class between sections (subtle blue gradient line)
5. **Glass header**: Transparent on top, transitions to frosted glass (`header-glass` class + bg-surface/80) on scroll
6. **Modern cards**: `card-modern` class with border, hover glow effect, subtle lift on hover
7. **Gradient CTA button**: `btn-primary` class with gradient background, shadow, hover lift
8. **Status pills**: Rounded pill with pulsing dot for live product indicators
9. **Staggered scroll reveals**: Cards and list items animate in with stagger using Motion variants
10. **Checklist items**: Accent checkmark in circle + bordered card rows for feature lists

### CSS Utility Classes (globals.css)

| Class | Usage |
|---|---|
| `text-gradient` | Gradient text (primary to secondary) |
| `text-gradient-accent` | Gradient text (accent blue) |
| `glow-accent` | Subtle blue glow box-shadow |
| `glow-accent-hover` | Glow on hover |
| `border-gradient` | Gradient border effect |
| `divider-gradient` | Horizontal gradient line divider |
| `card-modern` | Card with border, hover glow + lift |
| `btn-primary` | Gradient button with shadow + hover lift |
| `header-glass` | Backdrop blur + saturation for glass effect |

### Dev Server

Run with `npx pnpm dev`. Accessible at `http://localhost:3000`.
pnpm is installed but not in PATH; always use `npx pnpm` to run commands.

### Forms

HubSpot integration is **not yet wired up**. Forms currently use `onSubmit={(e) => e.preventDefault()}`. Need HubSpot portal ID and form IDs to connect.

---

## Reference Files

The Obsidian knowledge base is at `/Users/cyrusparsons/Documents/Swift COI/Swift Stack Obsidian/`. Read the relevant files before building or editing pages.

**Always read before any task:**
- `Projects/Website/References/Brand & Messaging Guide.md`
- `Projects/Website/References/Animation & Design Guide.md`
- `Projects/Website/References/Site Architecture.md`

**Read when building specific pages:**
- `Projects/Website/Copy/Homepage.md`
- `Projects/Website/Copy/COI Verification.md`
- `Projects/Website/Copy/Lien Validation.md`
- `Projects/Website/Copy/Debtor Search.md`
- `Projects/Website/Copy/Dynamic Capital Case Study.md`
- `Projects/Website/Copy/Blog Structure.md`
- `Projects/Website/Copy/Contact.md`
- `Projects/Website/Copy/Careers.md`
- `Projects/Website/Copy/Privacy Policy.md`
- `Projects/Website/Copy/404.md`

**Read when implementing SEO:**
- `Projects/Website/SEO & Meta.md`

**Read for layout wireframes:**
- `Projects/Website/References/Website Layout Guide.md`
