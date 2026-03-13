# Skill: React Animation Patterns

When building animated components for the Swift Stack marketing site, follow these patterns exactly. All animations use Motion (formerly Framer Motion) with the import path `motion/react`. Never use CSS @keyframes for scroll-triggered or sequenced animations.

---

## Imports

```tsx
// Core imports - use motion/react, not framer-motion
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate,
} from "motion/react"

// For code-splitting (use in app layout):
import { LazyMotion, domAnimation, m } from "motion/react"
```

---

## Animation Constants

Every animated component must use these standard values. Never hardcode timing or easing inline. Import from a shared constants file.

```tsx
// lib/animation.ts

export const EASE = {
  /** Primary easing. Smooth deceleration. Use for scroll reveals, entrances. */
  smooth: [0.22, 1, 0.36, 1] as const,
  /** Hover effects, interactive feedback. */
  easeOut: [0, 0, 0.2, 1] as const,
  /** Accordion expand/collapse, scroll reveals (alternative). */
  easeInOut: [0.4, 0, 0.2, 1] as const,
  /** Exit animations. */
  easeIn: [0.4, 0, 1, 1] as const,
}

export const DURATION = {
  /** Hover effects, form focus. */
  fast: 0.2,
  /** Card hover. */
  hover: 0.25,
  /** Accordion collapse. */
  accordionClose: 0.3,
  /** Accordion expand. */
  accordionOpen: 0.35,
  /** Scroll reveal (fade-in, slide-in). */
  reveal: 0.6,
  /** Step sequence per step. */
  step: 0.7,
  /** Hero text per element. */
  heroText: 0.8,
  /** Count-up numbers. */
  countUp: 1.8,
}

export const STAGGER = {
  /** Staggered card/grid items. */
  items: 0.12,
  /** Hero text elements (H1, subhead, CTA). */
  heroText: 0.15,
}

export const OFFSET = {
  /** Scroll reveal: translateY distance in px. */
  y: 24,
  /** Card hover: translateY lift in px. */
  hoverLift: -4,
}
```

---

## Reduced Motion

Every animated component MUST respect `prefers-reduced-motion`. Use this pattern:

```tsx
import { useReducedMotion } from "motion/react"

// Inside component:
const shouldReduceMotion = useReducedMotion()

// Apply to transitions:
transition={{
  duration: shouldReduceMotion ? 0 : DURATION.reveal,
  delay: shouldReduceMotion ? 0 : delay,
}}

// Apply to initial state (skip directional offset):
initial={{
  opacity: 0,
  y: shouldReduceMotion ? 0 : OFFSET.y,
}}
```

Also wrap the app in MotionConfig for global reduced motion support:

```tsx
import { MotionConfig } from "motion/react"

function RootLayout({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

And include this CSS fallback in globals:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Pattern: Scroll-Triggered Fade-In

The most common animation on the site. Used for: Problem sections, Why Swift Stack, FAQ reveal, CTA sections, Case Study sections, blog post CTA.

```tsx
"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { EASE, DURATION, OFFSET } from "@/lib/animation"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  className?: string
  as?: keyof typeof motion
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = DURATION.reveal,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    up: { y: OFFSET.y },
    down: { y: -OFFSET.y },
    left: { x: OFFSET.y },
    right: { x: -OFFSET.y },
  }

  const offset = shouldReduceMotion ? {} : directionOffset[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offset }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```tsx
<FadeIn>
  <h2>Section heading</h2>
  <p>Section content</p>
</FadeIn>

<FadeIn delay={0.2} direction="left">
  <Image src="..." alt="..." />
</FadeIn>
```

---

## Pattern: Staggered Reveal

Used for: Solution cards (homepage), checklist grid (COI), benefit blocks, blog cards.

```tsx
"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { EASE, DURATION, STAGGER, OFFSET } from "@/lib/animation"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export function StaggerContainer({
  children,
  className,
  stagger = STAGGER.items,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: shouldReduceMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : OFFSET.y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0 : DURATION.reveal,
            ease: EASE.smooth,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```tsx
<StaggerContainer className="grid grid-cols-3 gap-6">
  {cards.map((card) => (
    <StaggerItem key={card.id}>
      <SolutionCard {...card} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## Pattern: Count-Up Numbers

Used for: Homepage COI card stats (4x, 60%), Case Study results (4x, 150+, 99%).

Trigger at 30% visible. Fire once only. Show final number immediately for reduced motion.

```tsx
"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useInView, useReducedMotion, animate } from "motion/react"
import { EASE, DURATION } from "@/lib/animation"

interface CountUpProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function CountUp({
  from = 0,
  to,
  duration = DURATION.countUp,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const display = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return

    if (shouldReduceMotion) {
      motionValue.set(to)
      return
    }

    const controls = animate(motionValue, to, {
      duration,
      ease: EASE.smooth,
    })

    return controls.stop
  }, [isInView, motionValue, to, duration, shouldReduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
```

**Usage:**
```tsx
<CountUp to={4} suffix="x" />
<CountUp to={60} suffix="%" />
<CountUp to={99} suffix="%" />
<CountUp to={150} suffix="+" />
```

---

## Pattern: Accordion (FAQ)

Used on: Homepage, all three solution pages. Only one item open at a time. Smooth height + opacity transition.

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { DURATION } from "@/lib/animation"

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={index} className="border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-medium">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                }}
                className="ml-4 shrink-0"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      duration: shouldReduceMotion ? 0 : DURATION.accordionOpen,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    },
                    opacity: {
                      duration: shouldReduceMotion ? 0 : 0.25,
                    },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-5 text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
```

---

## Pattern: Hero Text Stagger

Used on: Homepage hero, all solution page heroes. H1 first, subhead second, CTA third. 150ms delay between elements.

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE, DURATION, STAGGER } from "@/lib/animation"

interface HeroTextProps {
  headline: string
  subhead: string
  ctaText: string
  ctaHref: string
}

export function HeroText({ headline, subhead, ctaText, ctaHref }: HeroTextProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * STAGGER.heroText,
        duration: shouldReduceMotion ? 0 : DURATION.heroText,
        ease: EASE.smooth,
      },
    }),
  }

  return (
    <div>
      <motion.h1
        custom={0}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="text-5xl font-bold tracking-tight lg:text-6xl"
      >
        {headline}
      </motion.h1>

      <motion.p
        custom={1}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="mt-6 text-lg text-gray-600 dark:text-gray-400"
      >
        {subhead}
      </motion.p>

      <motion.div
        custom={2}
        variants={variants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <a
          href={ctaHref}
          className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-white font-medium"
        >
          {ctaText}
        </a>
      </motion.div>
    </div>
  )
}
```

---

## Pattern: Step Sequence (How It Works)

Used on: All three solution pages. Three steps, alternating graphic positions. Scroll-linked progress line connects steps. Each step fades in as user scrolls.

```tsx
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { EASE, DURATION } from "@/lib/animation"

interface Step {
  title: string
  description: string
  graphic: React.ReactNode
}

export function StepSequence({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical progress line */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-accent origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      )}

      {steps.map((step, index) => {
        const isEven = index % 2 === 0

        return (
          <StepItem
            key={index}
            step={step}
            index={index}
            isEven={isEven}
            totalSteps={steps.length}
            scrollYProgress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
          />
        )
      })}
    </div>
  )
}

function StepItem({
  step,
  index,
  isEven,
  totalSteps,
  scrollYProgress,
  shouldReduceMotion,
}: {
  step: Step
  index: number
  isEven: boolean
  totalSteps: number
  scrollYProgress: any
  shouldReduceMotion: boolean | null
}) {
  const stepStart = index / totalSteps
  const stepEnd = (index + 0.5) / totalSteps
  const opacity = useTransform(
    scrollYProgress,
    [stepStart, stepEnd],
    shouldReduceMotion ? [1, 1] : [0.2, 1]
  )
  const x = useTransform(
    scrollYProgress,
    [stepStart, stepEnd],
    shouldReduceMotion ? [0, 0] : [isEven ? -20 : 20, 0]
  )

  return (
    <motion.div
      className={`flex items-center gap-12 py-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}
      style={{ opacity, x }}
    >
      <div className="flex-1">{step.graphic}</div>
      <div className="flex-1">
        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent dark:bg-accent/10">
          {index + 1}
        </div>
        <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
        <p className="mt-3 text-gray-600 dark:text-gray-400">{step.description}</p>
      </div>
    </motion.div>
  )
}
```

---

## Pattern: Scroll Progress Bar (Blog Posts)

Thin bar at the top of the viewport. Fills left to right as user reads. Brand accent color.

```tsx
"use client"

import { motion, useScroll } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

---

## SSR / Next.js Considerations

1. All animated components must include `"use client"` at the top.
2. Above-the-fold content (hero text): Use `initial="hidden"` + `animate="visible"` on mount, not scroll-triggered. The animation fires immediately on hydration.
3. Below-fold content: Use `useInView` with `once: true`. Elements render with `opacity: 0` on SSR, animate on scroll. No hydration flash because they're below the viewport.
4. Never use `initial={false}` on below-fold content (it would skip the reveal animation entirely).
5. Use `LazyMotion` with `domAnimation` in the root layout to code-split animation features:

```tsx
// app/layout.tsx
import { LazyMotion, domAnimation } from "motion/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </body>
    </html>
  )
}
```

---

## Performance Rules

1. **Only animate transform and opacity.** These are GPU-composited. Never animate width, height, top, left, margin, padding, border-width, or font-size. The sole exception is height for accordions (wrapped in overflow: hidden).
2. **Use will-change sparingly.** Only on elements that are about to animate. Remove after animation completes for static elements.
3. **Max 4-5 simultaneous animations.** Use staggerChildren to spread GPU work.
4. **Target 60fps.** Test on mid-tier hardware (Chrome DevTools performance throttling).
5. **Animation JS budget: under 25KB gzipped.** Motion core domAnimation is ~16KB gzipped. Leave room for component code.
6. **Intersection Observer thresholds:** Use `amount: 0.2` for sections, `amount: 0.3` for stats, `amount: 0.1` for tall containers.
7. **Hero animation must not block first paint.** Text renders first, animation loads alongside or after. Use `initial={false}` on the hero text itself so it's visible instantly, and animate the hero visualization separately.
