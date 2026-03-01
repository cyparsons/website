# Skill: Animation Micro-Interactions

When building interactive elements (buttons, cards, inputs, navigation) for the Swift Stack website, follow these patterns. Micro-interactions use CSS transitions where possible (simpler, more reliable for hover/focus states) and Motion where the interaction is more complex (dropdowns, modals).

---

## Card Hover

Used on: Solution cards (homepage), blog post cards, benefit blocks.

Translate Y -4px (subtle lift) + box shadow increase. 250ms ease-out. Return to original on mouse leave.

```tsx
"use client"

import { motion } from "motion/react"
import { EASE, DURATION, OFFSET } from "@/lib/animation"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function HoverCard({ children, className, href }: HoverCardProps) {
  const Component = href ? motion.a : motion.div

  return (
    <Component
      href={href}
      className={`block rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 ${className}`}
      whileHover={{
        y: OFFSET.hoverLift,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
        borderColor: "rgba(42, 160, 230, 0.3)",
      }}
      transition={{
        duration: DURATION.hover,
        ease: EASE.easeOut,
      }}
    >
      {children}
    </Component>
  )
}
```

**Dark mode shadow adjustment:**
```tsx
// In dark mode, shadows are less visible. Use a lighter glow instead:
whileHover={{
  y: OFFSET.hoverLift,
  boxShadow: isDark
    ? "0 20px 40px -12px rgba(42, 160, 230, 0.15)"  // Accent glow
    : "0 20px 40px -12px rgba(0, 0, 0, 0.08)",       // Standard shadow
}}
```

---

## Button Hover (Primary CTA)

Background color shift on hover. 200ms ease-out. No scale change, no shadow change on primary buttons. Subtle scale on tap (0.98).

**Prefer CSS for simple button hovers** (more reliable, no JS needed):

```tsx
// Using Tailwind:
<a
  href="/get-started"
  className="
    inline-flex items-center justify-center rounded-lg
    bg-accent px-6 py-3 text-white font-medium
    transition-colors duration-200 ease-out
    hover:bg-accent-hover
    active:scale-[0.98] active:transition-transform
  "
>
  Get Started
</a>
```

**When you need Motion for button animations** (loading states, success states):

```tsx
"use client"

import { motion, AnimatePresence } from "motion/react"

type ButtonState = "idle" | "loading" | "success" | "error"

export function SubmitButton({ state, children }: { state: ButtonState; children: React.ReactNode }) {
  return (
    <motion.button
      className="relative inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-white font-medium overflow-hidden"
      whileHover={{ backgroundColor: "rgb(79, 70, 229)" }}  // accent-hover
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      disabled={state === "loading"}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            Sending...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <CheckIcon className="h-4 w-4" /> Sent
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
```

---

## Form Input Focus

Border color shifts to brand accent. Subtle glow (box-shadow with low opacity accent). 150ms ease-out. On blur: returns to default.

**Use CSS transitions for form focus** (simpler, more reliable):

```tsx
<input
  type="email"
  placeholder="Work email"
  className="
    w-full rounded-lg border border-gray-300 bg-white px-4 py-3
    text-gray-900 placeholder-gray-400
    transition-all duration-150 ease-out
    focus:border-accent-hover focus:outline-none
    focus:ring-2 focus:ring-accent-hover/20
    dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100
    dark:focus:border-accent dark:focus:ring-accent/20
  "
/>
```

**For the CASL consent checkbox:**
```tsx
<label className="flex items-start gap-3 cursor-pointer group">
  <input
    type="checkbox"
    required
    className="
      mt-1 h-4 w-4 rounded border-gray-300
      text-accent transition-colors duration-150
      focus:ring-2 focus:ring-accent-hover/20 focus:ring-offset-0
      dark:border-gray-600
    "
  />
  <span className="text-sm text-gray-600 dark:text-gray-400">
    I agree to receive emails from Swift Stack Solutions...
  </span>
</label>
```

---

## Navigation Dropdown (Solutions)

Appears on hover (desktop) or click (mobile). 150ms fade-in, 100ms fade-out. Slight y translate for polish.

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function NavDropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {label}
        <motion.svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth={1.5} fill="none" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## Nav Link Hover

Underline or color shift. 200ms ease-out. Use CSS.

```tsx
<a
  href="/blog"
  className="
    text-sm font-medium text-gray-700 dark:text-gray-300
    transition-colors duration-200 ease-out
    hover:text-gray-900 dark:hover:text-white
    relative after:absolute after:bottom-0 after:left-0
    after:h-px after:w-0 after:bg-current
    after:transition-all after:duration-200
    hover:after:w-full
  "
>
  Blog
</a>
```

---

## Sticky Header Transition

The nav bar becomes sticky on scroll. Add a subtle background blur and border when scrolled past the hero.

```tsx
"use client"

import { useScroll, useTransform, motion } from "motion/react"

export function Header() {
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  )
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.08)"]
  )

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
      style={{
        backgroundColor: headerBg,
        borderBottomWidth: 1,
        borderBottomColor: headerBorder,
      }}
    >
      {/* Nav content */}
    </motion.header>
  )
}

// Dark mode variant:
// Use "rgba(10, 15, 28, 0)" to "rgba(10, 15, 28, 0.8)" for dark background
// Use "rgba(255, 255, 255, 0)" to "rgba(255, 255, 255, 0.08)" for dark border
```

---

## Blur-In Transition

Modern alternative to simple fade-in. Creates a depth-of-field effect. Use sparingly for premium sections (hero visualization, key stats).

```tsx
<motion.div
  initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  Content
</motion.div>

// For scroll-triggered blur-in:
<motion.div
  initial={{ opacity: 0, filter: "blur(8px)" }}
  whileInView={{ opacity: 1, filter: "blur(0px)" }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  Content
</motion.div>
```

**Note:** `filter` is GPU-composited in modern browsers but can be heavier than transform+opacity. Use only on 1-2 key elements per page, not on every scroll reveal.

---

## Ambient Background Gradient

Very subtle, continuous gradient shift for hero or CTA sections. Creates premium feel without distraction. Extremely low opacity (0.2-0.3).

```tsx
"use client"

import { motion } from "motion/react"

export function AmbientGradient({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 opacity-20 pointer-events-none ${className}`}
      animate={{
        background: [
          "radial-gradient(ellipse at 20% 50%, var(--color-accent) 0%, transparent 60%)",
          "radial-gradient(ellipse at 80% 30%, var(--color-accent) 0%, transparent 60%)",
          "radial-gradient(ellipse at 50% 80%, var(--color-accent) 0%, transparent 60%)",
          "radial-gradient(ellipse at 20% 50%, var(--color-accent) 0%, transparent 60%)",
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  )
}
```

**Usage:**
```tsx
<section className="relative overflow-hidden">
  <AmbientGradient />
  <div className="relative z-10">
    {/* Section content */}
  </div>
</section>
```

**When to use:** Hero background, CTA section background. Maximum one per visible viewport.

---

## Mobile Hamburger Menu

Smooth slide-in from the right. Overlay behind it.

```tsx
"use client"

import { motion, AnimatePresence } from "motion/react"
import { EASE } from "@/lib/animation"

export function MobileMenu({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: EASE.smooth }}
          >
            <div className="p-6">
              <button onClick={onClose} className="mb-8" aria-label="Close menu">
                <XIcon className="h-6 w-6" />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## When to Use CSS vs Motion

| Interaction | Use | Reason |
|---|---|---|
| Button hover (color change) | CSS | Simple state, no JS needed |
| Button tap/press (scale) | CSS `active:` | Simple state |
| Button loading/success state | Motion | AnimatePresence for text swap |
| Card hover (lift + shadow) | Motion | Complex multi-property animation |
| Input focus (border + glow) | CSS | Simple state, more reliable |
| Nav link hover (underline) | CSS | Simple state |
| Nav dropdown (appear/disappear) | Motion | AnimatePresence for enter/exit |
| Sticky header bg transition | Motion | Scroll-linked value |
| Mobile menu (slide in/out) | Motion | AnimatePresence for enter/exit |
| Accordion expand/collapse | Motion | Height animation needs JS |
| Scroll reveals | Motion | Intersection Observer needed |

**Rule of thumb:** If it's a simple two-state toggle triggered by hover or focus, use CSS. If it needs enter/exit transitions, scroll linking, or complex sequencing, use Motion.

---

## Accessibility Rules for Micro-Interactions

1. **All hover effects must also work on keyboard focus.** If a card lifts on hover, it should also lift on `:focus-visible`. Use Tailwind's `focus-visible:` variant.
2. **Touch targets: 44x44px minimum.** All buttons, links, and interactive elements.
3. **Focus indicators must be visible.** Never `outline: none` without a visible alternative. Use `focus-visible:ring-2` pattern.
4. **Dropdown must be keyboard navigable.** Arrow keys to move between items, Escape to close, Enter to select.
5. **Mobile menu must trap focus.** Tab should cycle within the menu when open. Escape should close it.
6. **Animations respect reduced motion.** All Motion animations use `useReducedMotion()`. CSS transitions have the `@media (prefers-reduced-motion)` fallback.
