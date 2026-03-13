# Website Build Research

Compiled research from three parallel investigations: full website copy inventory, B2B website design best practices, and React animation patterns. This document is the reference for all design, animation, and implementation decisions.

---

## Part 1: Complete Content Inventory

Every page of the Swift Stack marketing site, with copy status, section structure, CTA type, stats, and keywords.

---

### Homepage (/)

**Status:** Complete
**CTA:** Get Started
**Role:** Brand-level routing and conversion

**Sections:**
1. **Hero** - H1: "Pre-Funding Document Verification for Equipment Finance." Subhead about automating document checks between approval and payout. Single CTA, no stat in the hero. Animation (right column, 50-60% width) carries the visual weight.
2. **Problem** - H2: "Document Verification Is What Slows the Path from Approval to Payout." Two-column layout: text left, graphic right. Describes the manual PDF-by-PDF review process.
3. **Solutions Overview** - H2: "Built for Equipment Finance Workflows." Three cards linking to solution pages. COI card includes inline stats (4x, 60%). Other two cards have no stats yet. Cards 2 and 3 show "Coming Soon" badges.
4. **Why Swift Stack** - H2: "Why We Build What We Build." Single centered text block, max-width ~700px. Grounded and personal, not corporate. No graphic required.
5. **FAQ** - H2: "Common Questions." Five questions covering integrations (SharePoint, Outlook, Google Drive in progress), workflow fit (human-in-the-loop), processing speed (under 30 seconds), audit logs, and equipment finance specificity.
6. **CTA** - H2: "Get Started." Intro paragraph, three value props (See it in action, Launch pricing, Configured for your team), email form, email fallback.

**Keywords:** equipment finance automation, document verification, pre funding audit, equipment finance operations automation, deficiency tracking equipment finance, COI verification equipment finance, human in the loop, auditability, explainable AI

---

### COI Verification (/solutions/coi-verification)

**Status:** ~95% complete
**CTA:** Get Started (product is live)

**Sections:**
1. **Hero** - H1: "Smarter Insurance Reviews for Equipment Finance." Subhead about automatic COI verification against deal requirements. Animation: stylized COI vs equipment schedule, serial numbers highlighting.
2. **The Problem** - H2: "COI Verification in Equipment Finance Is More Complex Than It Looks." Each review takes several minutes per document. Multi-asset deals with 10-50+ serial numbers take significantly longer. ~30% of COIs have at least one deficiency on first submission.
3. **The Solution** - H2: "Insurance Document Intelligence, Purpose-Built." Framed as document intelligence, not just tracking.
4. **How It Works** - Three steps: Ingest (documents arrive from SharePoint/Outlook), Analyze (cross-reference against requirements, equipment schedule, previous COIs), Output (readable overlay directly on the insurance document with field-level highlighting). Built-in compliance: full audit trail, logged actions, configurable verification logic per deal type.
5. **What It Checks** - 12-item visual grid: serial numbers, asset descriptions, equipment schedule cross-referencing, loss payee designations, actual cash value, deductible, endorsement requirements, policy dates, policy expiration, insurer details, policy number, entity name matching.
6. **What This Means for Your Team** - Three blocks: Time Savings, Fewer Missed Deficiencies, More Deal Capacity (Same Team).
7. **FAQ** - Four questions: COI formats supported, large deal handling (50-asset deals compared in seconds), what happens on failure (field-level deficiency flagging), distinction from COI tracking platforms (Swift Stack reads and compares, not just tracks receipt).
8. **CTA** - H2: "Ready to Rethink Insurance Verification?" Get Started button + email fallback.

**Stats:** ~30% of COIs have a deficiency on first submission; 50-asset deal comparison runs in seconds
**Keywords:** COI verification equipment finance, equipment lease insurance, insurance compliance software lending, serial number verification, multi-asset COI verification, document intelligence, configurable verification logic, auditability

---

### Lien Validation (/solutions/lien-validation)

**Status:** ~70% (Problem and How It Works sections are DRAFT, pending review with Ethan)
**CTA:** Join the Waitlist (product not yet built)

**Sections:**
1. **Hero** - H1: "Automated Lien Validation for Equipment Finance." Subhead about building automated filing verification for PPSA/UCC-1 filings. Animation: filing document compared against deal package, deviations surfacing.
2. **The Problem** - H2: "Filing Reviews Still Require Meticulous, Repeatable Checks." DRAFT. Complex deals with dozens/hundreds of assets on an itemized schedule. Filings pass through multiple departments repeating the same checks. Errors making a financing statement seriously misleading can compromise perfection or priority position.
3. **The Solution** - H2: "Filing Verification, Purpose-Built." Same document intelligence framing.
4. **How It Works** - Three steps: Ingestion, Comparison, Output. DRAFT, kept high-level. System reads both filing and deal documents, compares debtor information, secured party details, collateral descriptions, filing details. Exact source text shown side by side.
5. **What It Surfaces** - Uses "What It Surfaces" (not "What It Checks") to align with intelligence framing. Items: debtor name verification, debtor mailing address and type, secured party/assignee details, collateral scope validation (itemized schedule match or blanket description), jurisdiction details, effective dates and lapse/continuation windows, side-by-side source text for deviations, field-level deviation flagging. Note about titled collateral: separate workflows apply for vehicles/trailers.
6. **What This Means** - Time Savings, Fewer Filing Errors, More Deal Capacity (Same Team).
7. **FAQ** - Six questions: filing types (PPSA and UCC-1), name matching (exact source text shown, presentation-level vs substantive deviations), distinction from debtor search (different workflows at different deal stages), titled collateral (module focuses on financing statement accuracy), human oversight (surfaces comparison, team makes final call), Canadian and US support.
8. **CTA** - H2: "Be First in Line for Filing Verification." Three waitlist incentives: preferred pricing, early access, shape what we build. Join the Waitlist + email fallback.

**Stats:** No specific numeric stats yet. References dozens/hundreds of assets, multiple-department review.
**Keywords:** ucc 1 filing, ucc financing statement, PPSA registration, PPSA financing statement, financing statement verification, equipment finance automation, document intelligence, debtor search

---

### Debtor Search (/solutions/debtor-search)

**Status:** ~60% (intentionally kept high-level per Brand & Messaging Guide)
**CTA:** Join the Waitlist (product not yet built)

**Sections:**
1. **Hero** - H1: "Debtor Search Intelligence for Equipment Finance." Subhead about hundreds of pages of debtor search results and building intelligence to surface what matters. Animation: tall page stack enters frame, pages fan out, key registrations extracted, stack collapses to structured summary.
2. **The Problem** - H2: "Debtor Searches Are a Volume Problem." DRAFT. Before funding, teams run debtor searches from PPSA/UCC registries returning dense multi-page documents. Hundreds of pages per search. The volume is the problem.
3. **The Solution** - H2: "Debtor Search Intelligence, Purpose-Built."
4. **How It Works** - Three steps: Ingestion, Analysis, Summary. DRAFT, kept high-level. PDFs, exports, or registry outputs accepted. System reads full volume, identifies registrations, GSAs, blanket liens, secured interests. Team receives structured summary organized by relevance.
5. **What It Surfaces** - Existing registrations, general security agreements, blanket liens, secured party details and registration dates, registrations affecting priority position.
6. **What This Means** - Time Savings, Risk Mitigation (a registration buried in 200 pages is a financial exposure problem), More Deal Capacity (Same Team).
7. **FAQ** - Three questions: processing size (hundreds of pages), registration types identified, whether it replaces analyst judgment (no).
8. **CTA** - H2: "Be First in Line for Debtor Search Intelligence." Same three waitlist incentives. Join the Waitlist + email fallback.

**Stats:** Hundreds of pages per search; "minutes instead of hours"
**Keywords:** debtor search, general security agreement, blanket lien, document intelligence, equipment finance automation
**Note:** Thinnest solution page. Frame confidently but don't overcommit on unvalidated capabilities.

---

### Dynamic Capital Case Study (/case-studies/dynamic-capital)

**Status:** Drafted. DO NOT PUBLISH until full sign-off from Dynamic Capital.
**CTA:** Get Started

**Sections:**
1. **Hero** - H1: "How Dynamic Capital Streamlined COI Renewal Reviews." Subhead: documentation team spending over 200 hours/month on manual COI reviews; Swift Stack cut that by 75%.
2. **Challenge** - Two pain points: Hours Lost Reviewing (minutes to hours per COI, 200+ hours/month total) and Missed Coverage Gaps (manual review under time pressure). Three objectives: free analysts for higher-value work, reduce risk with consistency, increase lending capacity.
3. **Solution** - Two highlights: AI-Powered Verification (surfaces only exceptions) and In-Document Highlighting for Reliability and Speed.
4. **Results** - Three stat blocks: 4x faster COI renewal throughput, 150+ hours saved per month, 99% accuracy on verification outputs.
5. **Testimonial** - Pull quote from Carrie Freeman, Director of Operations, Dynamic Capital. Praises faster/more consistent reviews, better visibility into coverage gaps, responsive and easy to work with, saved time and strengthened risk controls.
6. **CTA** - H2: "See What Swift Stack Can Do for Your Team." Get Started + email fallback.

**Stats:** 200+ hours/month before, 4x faster, 150+ hours saved, 99% accuracy

---

### Contact (/contact)

**Status:** Complete
**CTA:** Links to /#cta on homepage

**Content:**
- H1: "Get in Touch"
- Two co-founder contact cards: Cyrus Parsons (CEO, cyrus@swiftstacksolutions.com, +1 250 884-5404), Ethan Swift (COO, ethan@swiftstacksolutions.com, +1 236 638-4225)
- General inquiries: hello@swiftstacksolutions.com
- Contact form: Name, Company, Email Address, Message, "Send Message" button
- Success state: "Thanks for reaching out. We'll get back to you within one business day."
- Error state: Fallback to email

---

### Careers (/careers)

**Status:** Complete
**CTA:** Email (careers@swiftstacksolutions.com), no CTA block

**Content:**
- H1: "Join Our Team"
- Building the document verification layer for equipment finance. Focused team, real operational problems.
- Three values: Ownership (own your work from idea to delivery), Clarity (communicate directly, skip corporate overhead), Depth (understand problems thoroughly)
- How to apply: Resume + one project or achievement you're proud of to careers@swiftstacksolutions.com
- Simple text page, max-width ~720px

---

### Privacy Policy (/privacy-policy)

**Status:** Complete
**CTA:** None (legal page)
**Effective date:** March 12, 2026

Full 12-section privacy policy covering: scope (sign-up forms, contact forms, analytics, not product/document processing), who we are (BC tech company), data collected (email from sign-up, name/company/email/message from contact, GA4 analytics), usage, cookies (GA4 only, no advertising/retargeting), third parties (HubSpot for forms, Google Analytics), cross-border processing, retention, rights, security, changes, contact (ethan@swiftstacksolutions.com).

Design: Simple text page, same nav/footer, no CTA block, consider noindex, max-width ~720px.

---

### Blog (/blog and /blog/[post-slug])

**Status:** Template/structure defined
**CTA:** Varies by post topic

**Blog Index:**
- H1: "Insights on Equipment Finance Automation"
- Reverse chronological. Cards show title, date, reading time, first 1-2 sentences. No author name on cards.

**Blog Post Template:**
- Title (H1), metadata line (Author | Date | Reading time). Author for E-E-A-T and Article schema.
- Body content with internal links to relevant solution page
- Bottom CTA block: Two custom fields per post (CTA title as H3, CTA body sentence) + button + email fallback

**CTA Logic:**
- COI/insurance/serial numbers/ACORD/pre-funding topics: Get Started
- UCC/PPSA/blanket liens/GSA/debtor search topics: Join the Waitlist

**Blog-to-solution linking:**
- COI/insurance topics link to /solutions/coi-verification
- UCC/PPSA/GSA topics link to /solutions/lien-validation
- Debtor search topics link to /solutions/debtor-search

---

### 404 Page

**Status:** Complete
**CTA:** None (routing links only)

- H1: "Page not found." Body: "This page doesn't exist or has been moved."
- Links: Back to Homepage, Explore Solutions (/solutions/coi-verification), Read the Blog, Get in Touch
- noindex, nofollow. Minimal, centered. Optional subtle illustration.

---

### SEO & Meta Data

**Meta titles and descriptions per page:**

| Page | Title Tag | Meta Description |
|---|---|---|
| Homepage | Document Verification for Equipment Finance \| Swift Stack (57 chars) | Swift Stack automates COI verification, lien validation, and debtor search analysis for equipment finance lenders. 4x faster document verification. |
| COI Verification | COI Verification for Equipment Finance \| Swift Stack (50 chars) | Automate COI verification for equipment finance. Serial numbers, asset descriptions, actual cash value, deductibles, and endorsements verified automatically. |
| Lien Validation | PPSA & UCC-1 Filing Verification \| Swift Stack (48 chars) | We're building automated PPSA and UCC-1 filing verification for equipment finance... |
| Debtor Search | Debtor Search Intelligence for Equipment Lenders \| Swift Stack (58 chars) | Debtor search results can run hundreds of pages... |
| Blog Index | Equipment Finance Automation Insights \| Swift Stack Blog (54 chars) | Practical guidance on COI verification, lien validation, debtor searches... |
| Case Study | Dynamic Capital COI Case Study \| Swift Stack (45 chars) | How Dynamic Capital streamlined COI renewal reviews... 4x faster, 150+ hours saved, 99% accuracy. DO NOT PUBLISH until sign-off. |
| Contact | Contact Swift Stack Solutions (29 chars) | Get in touch with Swift Stack Solutions... |
| Privacy Policy | Privacy Policy \| Swift Stack (31 chars) | How Swift Stack Solutions collects, uses, and protects... |
| Careers | Careers \| Swift Stack (24 chars) | Join the Swift Stack team... |
| 404 | Page Not Found \| Swift Stack (29 chars) | noindex, nofollow. No meta description. |

**Schema markup plan:**
- FAQ Schema (JSON-LD): Homepage, COI Verification, Lien Validation, Debtor Search
- Organization Schema: All pages (site-wide)
- Article Schema: Blog posts (headline, author, datePublished, dateModified, publisher)
- Breadcrumb Schema: Solution pages (Home > Solutions > Name), Blog posts (Home > Blog > Title)
- Open Graph: Every page needs og:title, og:description, og:image (1200x630px), og:url

**Image alt text strategy:** Describe what the image shows, include a relevant keyword naturally. Under 125 characters. Skip decorative images (empty alt=""). Unique per image.

**Keyword tiers:**

Core brand (every page): Swift Stack Solutions, equipment finance automation, document verification

Primary keywords (verified search volume):
- ucc 1 filing (10K-100K volume)
- ucc financing statement (1K-10K)
- ucc lien search (1K-10K)
- ppsa search (100-1K)
- general security agreement (100-1K)
- equipment schedule (100-1K)
- equipment lease insurance (100-1K)
- serial number verification (100-1K)
- blanket lien (100-1K)
- debtor search (10-100)
- lender insurance tracking (10-100)

Solution-aware keywords: COI verification software, document verification automation, insurance compliance software lending

---

## Part 2: B2B Website Design Best Practices

Research on trust signals, design patterns, conversion optimization, and credibility strategies for high-trust B2B fintech.

---

### Trust Signals for Equipment Finance Buyers

**Security and compliance indicators** (critical for financial document processing):

1. **SOC 2 Type II badge** - The single most important trust signal. If in progress, say "SOC 2 Type II in progress" with a timeline. Plaid, Stripe, Ramp all lead with this.
2. **Data encryption indicators** - "256-bit AES encryption" or "Data encrypted at rest and in transit" near form submissions and in the footer.
3. **Data residency disclosure** - Explicitly state where data is stored ("Data hosted in AWS Canada / AWS US regions"). Regulated financial companies care about this enormously.
4. **PIPEDA and state privacy compliance** - Referencing PIPEDA compliance is a strong differentiator for Canadian buyers.
5. **Security/Trust page** - A dedicated /security or /trust page explaining how documents are handled, processed, and protected. Not a checkbox exercise but a substantive page demonstrating technical depth. Plaid's /security page is the model.

**Placement:** Footer (persistent), near CTAs (contextual), and on a dedicated security page (deep).

**Social proof hierarchy of credibility:**
1. Named client logos with permission (highest)
2. Quantified outcomes ("4x faster," not "dramatically improved")
3. Full narrative case studies with measured results
4. Integration logos (systems you work with: SharePoint, Outlook)
5. Industry association membership (CFLA, ELFA)

**Team visibility is not optional for early-stage B2B fintech:**
- Founders with headshots, titles, LinkedIn links
- Professional bios emphasizing equipment finance and AI/ML credentials
- Advisory board if applicable (even 2-3 credible advisors boost legitimacy significantly)
- "Backed by" section for investors, accelerators, grants (BDC, IRAP, etc.)

---

### Design Patterns from Premium B2B Companies

**Hero section patterns (Stripe, Linear, Vercel, Plaid):**

"Statement + Proof" pattern (dominant):
- Clear, specific value proposition in large type
- Subheadline adding specificity or quantified benefit
- Product screenshot, animation, or interactive demo immediately visible
- Primary CTA (high-commitment) + secondary CTA (low-commitment)

"Show Don't Tell" pattern (Linear, Vercel):
- Product-first hero leading with interactive demo or rich animation
- Minimal text, product speaks for itself
- Works when product has strong visual appeal

**Specific approaches to study:**
- **Stripe:** Code snippets and API previews on marketing site. Creates "this is real technology" feeling.
- **Linear:** Extremely refined micro-animations, tight spacing, restrained palette. Every element feels intentional. Implicit message: "if the website is this well-crafted, imagine the product."
- **Vercel:** Site loads almost instantly. For a company selling operational efficiency, a fast website reinforces the brand message.
- **Plaid:** Dedicated pages explaining how technology works with architectural diagrams. Transparency as a sales enabler for risk/compliance teams.

**Feature showcase patterns:**
1. Problem-first framing (lead with pain point before solution)
2. Visual proof with every feature (screenshots, short video, animated diagrams)
3. Tabbed or scrollable progressive disclosure (not a grid of icons with labels)
4. Quantified benefits alongside each feature

---

### Conversion Optimization for Enterprise B2B

**CTA placement:**
- Hero section (for visitors who know what they want)
- After first value proposition section
- After social proof
- Fixed/sticky header CTA (appears after scrolling past hero, subtle button)
- End of page (final CTA before footer)

**CTA language considerations:**
- "Request a Demo" or "See It In Action" are specific and outcome-oriented without being pushy
- "Learn How It Works" as a secondary lower-commitment CTA
- For waitlist: "Apply for Early Access" rather than "Join the Waitlist" signals exclusivity rather than unavailability (worth considering)

**Form design:**
- 3-5 fields maximum: Work email (required), full name (required), company name (required), job title (optional), brief open text (optional)
- Do NOT ask for phone number (reduces conversion 5-25%)
- Inline on the page, not a modal (modals feel aggressive for enterprise buyers)
- Post-submission: "We'll email you within 1 business day to schedule a 20-minute demo" (specific next step, not generic "thank you")

**Progressive engagement model:**
1. Level 0 (browse): Read about product, see screenshots. No commitment.
2. Level 1 (learn): Download whitepaper, watch recorded demo, read case study. May require email.
3. Level 2 (evaluate): Request live demo. Form submission.
4. Level 3 (validate): Security documentation, technical docs. Requires sales engagement.

---

### Color and Typography for Fintech

**Colors that signal trust:**
- Deep navy (#0A1628 to #1A2744) - Dominant color in fintech. Communicates stability, professionalism, trust.
- White/near-white backgrounds (#FFFFFF to #FAFBFC) - Clean, spacious, transparent.
- Single controlled accent. Options: Teal (#00B4D8 to #0077B6) for innovation/technology, Violet (#6C63FF to #7C3AED) for sophistication/modernity, Green (#10B981 to #059669) for growth/success (careful: can feel cheap if too bright).

**Colors to avoid:** Bright red (danger in finance), bright orange (consumer/retail), neon (consumer tech), pure black backgrounds (oppressive for financial docs).

**Dark mode:** Default to light mode for the marketing site. If dark mode, use very dark navy (#0A0F1C) not pure black. Product screenshots should match the mode they're shown in.

**Typography recommendations:**
- Inter (dominant in modern B2B SaaS, clean, highly legible, free)
- Geist by Vercel (more distinctive, same professionalism)
- Satoshi (geometric sans-serif, gaining popularity in fintech)

Scale: Hero 48-72px desktop / 32-40px mobile. H2 32-40px / 24-28px. Body 16-18px. Never below 14px. Headlines semi-bold (600) or bold (700). Body regular (400). Never light (300) for body.

---

### Information Architecture for Multi-Product Sites

**Navigation (5-7 items max):**
```
Product/Platform | Solutions | Customers | Resources | Company | [CTA]
```

**Three-layer progressive disclosure:**
1. Layer 1 (Homepage): What we do and why you should care
2. Layer 2 (Solution pages): How this works for someone like me
3. Layer 3 (Deep content): Can I trust this technology with our data

**Cross-linking:** Every product feature links to its section. Case studies link to relevant features. Blog posts link to solution pages. Footer has comprehensive sitemap links.

---

### Social Proof for Early-Stage Companies

Five proven patterns when you have limited clients:

**1. Depth Over Breadth**
Go deep on one client relationship instead of showing a sparse logo bar. Detailed case study with specific metrics, named quote, timeline narrative. Single deep proof point beats vague claims about "trusted by leading companies."

**2. Technical Credibility**
Publish substantive content about the problems you solve. Blog posts like "The 7 Most Common Document Errors in Equipment Finance Funding" demonstrate domain expertise. Show methodology: explain how AI verification works at an appropriate level.

**3. Ecosystem Credibility**
Borrow credibility from established entities. Technology partner logos (AWS), LOS platform integrations, accelerator/program logos, investor logos, industry association memberships, press mentions.

**4. Founder Credibility**
Buyers are buying the team as much as the product. Founder backgrounds prominently displayed. Active LinkedIn presence on equipment finance topics. Speaking engagements. Advisory board.

**5. Transparent Early-Stage**
Lean into specialization, not scale. "Purpose-built for equipment finance" (specialization). "In production with [client descriptor]" (honest stage, proves product works). "Founded by equipment finance and AI veterans" (credibility through experience). Never: "Trusted by thousands" or anything implying scale you don't have.

**What NOT to do:**
- No stock photos of generic business people (fastest way to destroy credibility)
- No fake testimonials or unattributed quotes
- No vanity metrics if numbers are small
- No listing "clients" that are actually free users/pilots
- No "as seen on" logos for mere directory listings

---

### Accessibility and Performance Standards

**WCAG 2.2 Level AA (current standard):**
- Contrast: 4.5:1 for text, 3:1 for large text
- Touch targets: 44x44px minimum
- Keyboard: Full functionality, visible focus indicators, logical tab order
- ARIA landmarks: header, nav, main, footer
- Form labels: Associated labels, not just placeholders
- Don't rely solely on color (use icons and text for error states)

**Core Web Vitals (2025-2026):**
- LCP: Under 2.5 seconds
- INP: Under 200ms (replaced FID March 2024)
- CLS: Under 0.1

**Performance budget:**
- Total page weight: Under 1.5MB for homepage
- Time to Interactive: Under 3.5 seconds on mid-tier mobile
- First Contentful Paint: Under 1.8 seconds
- Total requests: Under 50
- Lighthouse: 90+ on all four metrics

**Practical performance steps:**
- SSG/SSR with Next.js (static HTML loads instantly)
- Image optimization: WebP/AVIF, responsive srcset, lazy-load below-fold (use next/image)
- Font optimization: Preload critical fonts, font-display: swap, subset characters
- Minimal JavaScript for marketing pages
- CDN: Vercel Edge Network

---

### Reference Sites to Study

| Site | What to study |
|---|---|
| stripe.com | Product screenshots, security page, progressive disclosure, ambient gradients |
| plaid.com | Security/trust page, technical credibility, "How it Works" explanations |
| linear.app | Polish, animation, engineering quality through design, dark mode |
| ramp.com | Speaking the language of finance buyers, not generic SaaS |
| mercury.com | Dark mode in fintech, sophisticated typography |
| middesk.com | B2B fintech at similar stage, good trust signal patterns |
| vercel.com | Performance and technical credibility through design |
| clerk.com | Interactive UI demos, code-to-UI transitions, stagger animations |
| resend.com | Functional animation (every animation demonstrates a product capability) |

---

## Part 3: React Animation Patterns and Implementation

Comprehensive technical reference for building animations with Motion (formerly Framer Motion) and SVG.

---

### Motion Library Status

Framer Motion rebranded to **Motion** with the forward-looking import path `motion/react`. Latest stable is v11.x. The `framer-motion` import still works but `motion/react` is the recommended path.

```tsx
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "motion/react"
```

Bundle size: ~16KB gzipped for `domAnimation` features. Use `LazyMotion` for code-splitting:

```tsx
import { LazyMotion, domAnimation, m } from "motion/react"

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div animate={{ opacity: 1 }}>Content</m.div>
    </LazyMotion>
  )
}
```

---

### Animation Constants

Standard values to use across all components for consistency:

```tsx
// Easing curves
export const EASE = {
  smooth: [0.22, 1, 0.36, 1],       // Primary: smooth deceleration, premium feel
  snappy: [0.16, 1, 0.3, 1],        // Interactive elements
  gentle: [0.4, 0, 0.2, 1],         // Large movements
  easeOut: [0, 0, 0.2, 1],          // Hover, interactive feedback
  easeInOut: [0.4, 0, 0.2, 1],      // Scroll reveals, entrances
  easeIn: [0.4, 0, 1, 1],           // Exit animations
}

// Durations (seconds)
export const DURATION = {
  instant: 0.1,
  fast: 0.2,                         // Hover effects, form focus
  normal: 0.5,                       // Scroll reveals
  medium: 0.6,                       // Staggered items
  slow: 0.8,                         // Step sequences
  countUp: 1.8,                      // Count-up numbers
  hero: 5,                           // Hero visualization sequence
}

// Stagger delays (seconds)
export const STAGGER = {
  fast: 0.05,
  normal: 0.08,                      // Sweet spot for fintech "confident" feel
  cards: 0.12,                       // Card grids, benefit blocks
  heroText: 0.15,                    // Hero text elements
}

// Viewport/IntersectionObserver
export const VIEWPORT = {
  default: { once: true, amount: 0.2 },
  countUp: { once: true, amount: 0.3 },
  hero: { once: true, amount: 0.1 },
}
```

---

### Core Pattern: Scroll-Triggered Fade-In

The most common animation across the site. Reusable component:

```tsx
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  className?: string
}

function FadeIn({ children, delay = 0, direction = "up", duration = 0.7, className }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  const offset = shouldReduceMotion ? {} : directionOffset[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
```

---

### Core Pattern: Staggered Reveal

For card grids, solution cards, benefit blocks, checklist items:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function StaggeredGrid({ items }: { items: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <Card {...item} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

### Core Pattern: Count-Up Numbers

For stats (4x, 60%, 99%, 150+):

```tsx
function CountUp({
  from = 0,
  to,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef(null)
  const motionValue = useMotionValue(from)
  const rounded = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  )
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isInView) {
      if (shouldReduceMotion) {
        motionValue.set(to)
        return
      }
      const controls = animate(motionValue, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      })
      return controls.stop
    }
  }, [isInView, motionValue, to, duration, shouldReduceMotion])

  return (
    <span ref={ref}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}
```

---

### Core Pattern: Accordion (FAQ)

Single-item-open-at-a-time:

```tsx
function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.25 },
                }}
                style={{ overflow: "hidden" }}
              >
                <div className="py-4">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

---

### Core Pattern: SVG Path Drawing (Connection Lines)

For the hero document comparison animation. Lines draw between matching fields:

```tsx
function AnimatedConnectionLine({
  d,
  color = "var(--color-accent, #2AA0E6)",
  delay = 0,
  duration = 1.5,
}: {
  d: string
  color?: string
  delay?: number
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <svg ref={ref} className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.3, delay },
        }}
      />
    </svg>
  )
}
```

---

### Core Pattern: Hero Text Stagger

For all hero sections (homepage and solution pages):

```tsx
function HeroText({ tag, headline, subhead, ctaText, ctaHref }: HeroTextProps) {
  const shouldReduceMotion = useReducedMotion()

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.15,
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div>
      {tag && (
        <motion.p custom={0} variants={textVariants} initial="hidden" animate="visible">
          {tag}
        </motion.p>
      )}
      <motion.h1 custom={1} variants={textVariants} initial="hidden" animate="visible">
        {headline}
      </motion.h1>
      <motion.p custom={2} variants={textVariants} initial="hidden" animate="visible">
        {subhead}
      </motion.p>
      <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible">
        <a href={ctaHref}>{ctaText}</a>
      </motion.div>
    </div>
  )
}
```

---

### Core Pattern: Card Hover

For solution cards and blog post cards:

```tsx
function HoverCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
        borderColor: "rgba(99, 102, 241, 0.3)",
      }}
      transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

---

### Core Pattern: Scroll Progress Bar (Blog Posts)

```tsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

---

### Core Pattern: Step Sequence (How It Works)

Alternating layout with scroll-linked progress line:

```tsx
function ScrollSteps({ steps }: { steps: { title: string; description: string }[] }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Progress line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-accent origin-top"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />

      {steps.map((step, index) => {
        const stepProgress = useTransform(
          scrollYProgress,
          [index / steps.length, (index + 0.5) / steps.length],
          [0, 1]
        )
        const opacity = useTransform(stepProgress, [0, 1], [0.3, 1])
        const x = useTransform(stepProgress, [0, 1], [20, 0])

        return (
          <motion.div key={index} style={{ opacity, x }} className="py-12">
            <span className="font-bold">{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
```

---

### Hero Document Comparison Animation (Homepage)

The signature animation. Two stylized documents side by side, fields highlight in pairs, connection lines draw between matching fields, each resolves to verified (green) or flagged (amber):

```tsx
// Conceptual structure for the homepage hero animation
// Built entirely with SVG + Motion, no Lottie

function DocumentComparisonAnimation() {
  const [step, setStep] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setStep(6) // Show final state immediately
      return
    }

    const sequence = [
      { delay: 0 },      // Step 0: Documents fade in
      { delay: 500 },    // Step 1: First field pair highlights, line draws, resolves green
      { delay: 1500 },   // Step 2: Second field pair, resolves green
      { delay: 2500 },   // Step 3: Third field pair, resolves amber (flagged)
      { delay: 3500 },   // Step 4: Remaining fields cascade
      { delay: 4500 },   // Step 5: Verification summary slides up
      { delay: 5000 },   // Step 6: Hold final state
    ]

    const timers = sequence.map((s, i) =>
      setTimeout(() => setStep(i), s.delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [shouldReduceMotion])

  return (
    <div className="relative w-full aspect-[4/3]">
      {/* Left document (source: COI/financing statement) */}
      <motion.div
        className="absolute left-0 top-0 w-[45%] h-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: step >= 0 ? 1 : 0, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <StylizedDocument fields={sourceFields} activeStep={step} side="left" />
      </motion.div>

      {/* Right document (reference: equipment schedule/deal package) */}
      <motion.div
        className="absolute right-0 top-0 w-[45%] h-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: step >= 0 ? 1 : 0, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <StylizedDocument fields={referenceFields} activeStep={step} side="right" />
      </motion.div>

      {/* Connection lines between matching fields */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {fieldPairs.map((pair, i) => (
          <motion.path
            key={i}
            d={pair.curvePath}
            fill="none"
            stroke={pair.result === "verified" ? "#22c55e" : "#f59e0b"}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={step > i ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      {/* Verification summary bar */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={step >= 5 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <VerificationSummary verified={3} flagged={1} />
      </motion.div>
    </div>
  )
}
```

---

### Micro-Interactions

**Button hover (primary CTA):**
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

**Form input focus:**
```tsx
// Use CSS transitions for form focus (simpler, more reliable):
// border-color transition 150ms ease-out
// box-shadow transition 150ms ease-out (subtle glow with brand accent at low opacity)
```

**Nav dropdown:**
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
    >
      {/* Dropdown content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

### Visual Effects for Premium Feel

**Blur-in transition (modern alternative to simple fade):**
```tsx
<motion.div
  initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.8 }}
/>
```

**Ambient background gradient (very subtle, continuous):**
```tsx
<motion.div
  className="absolute inset-0 opacity-30"
  animate={{
    background: [
      "radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%)",
      "radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 50%)",
      "radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%)",
    ],
  }}
  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
/>
```

**Gradient text animation:**
```tsx
<motion.span
  className="bg-clip-text text-transparent bg-gradient-to-r from-accent-hover via-purple-500 to-pink-500 bg-[length:200%_auto]"
  animate={{ backgroundPosition: ["0% center", "200% center"] }}
  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
/>
```

---

### Performance Rules

**Only animate GPU-composited properties:**
- transform (translate, scale, rotate) via Motion's x, y, scale, rotate
- opacity
- filter (blur, brightness)
- clip-path (some browsers)

**Never animate layout-triggering properties:**
- width, height, top, left, right, bottom, margin, padding, border-width, font-size
- Exception: height 0 to auto for accordions (wrap in overflow: hidden)

**Performance budget for animations:**
- Total animation JS: Under 25KB gzipped (Motion core is ~16KB)
- Simultaneous animations: Max 4-5 at a time
- Frame rate: 60fps target, never below 30fps
- Use will-change sparingly, only on elements about to animate

**SSR/hydration considerations:**
- Above-the-fold content: Use `initial={false}` to prevent flash on hydration
- Below-fold content: `initial={{ opacity: 0 }}` is fine (animated on scroll, not hydration)
- Use `whileInView` over manual `useInView` + `animate` when possible (cleaner API)

---

### Reduced Motion (Complete Pattern)

Global approach using MotionConfig:

```tsx
import { MotionConfig } from "motion/react"

function App({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

CSS fallback:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Per-component hook:
```tsx
function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion()

  return useMemo(() => ({
    fadeInUp: shouldReduceMotion
      ? { initial: {}, animate: {}, transition: {} }
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    stagger: shouldReduceMotion ? { staggerChildren: 0 } : { staggerChildren: 0.08 },
    duration: {
      fast: shouldReduceMotion ? 0 : 0.2,
      normal: shouldReduceMotion ? 0 : 0.5,
      slow: shouldReduceMotion ? 0 : 0.8,
    },
  }), [shouldReduceMotion])
}
```

---

### Animation Trends (2024-2026)

1. **Blur transitions** instead of simple fades. Creates depth-of-field effect.
2. **Ambient gradient motion** in backgrounds. Slow, continuous, very subtle.
3. **Bento grid layouts** with per-card micro-animations or interactive demos.
4. **Scroll-driven storytelling.** Page as presentation, each scroll step reveals narrative.
5. **Dark mode with glow effects.** Light-on-dark with colored glow/bloom.
6. **3D via CSS transforms.** Perspective, rotateX, rotateY for depth without 3D libraries.
7. **SVG morphing.** Shapes smoothly transitioning between states via Motion path animation.

---

### Recommended Reusable Components to Build

| Component | Purpose |
|---|---|
| `<FadeIn>` | Scroll-triggered fade with directional slide |
| `<StaggerContainer>` + `<StaggerItem>` | Staggered child reveals |
| `<CountUp>` | Animated number counter |
| `<ScrollProgress>` | Page/section scroll progress bar |
| `<AnimatedPath>` | SVG path drawing animation |
| `<AnimatedAccordion>` | Expand/collapse with height animation |
| `<HoverCard>` | Card with hover lift + shadow |
| `<HeroTextStagger>` | Hero text with staggered entrance |
| `<DocumentComparisonAnimation>` | Homepage hero SVG animation |
| `<StepSequence>` | How It Works with scroll-linked progress |

---

### Recommended Skill File Structure

```
/.claude/skills/
  react-animation-patterns.md     - Core Motion API, scroll reveals, stagger, layout, count-up,
                                    accordion, step sequence, hero sequences, reduced motion,
                                    performance rules, SSR considerations
  svg-animation-patterns.md       - SVG path drawing, connection lines, document visualizations,
                                    field highlighting, verification animations
  animation-micro-interactions.md - Buttons, cards, inputs, nav dropdowns, form states,
                                    blur transitions, ambient gradients
```
