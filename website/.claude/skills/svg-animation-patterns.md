# Skill: SVG Animation Patterns

When building SVG-based animations for the Swift Stack website, follow these patterns. All hero visualizations and document animations are built with inline SVG + Motion. No Lottie. No external animation tools.

---

## Why SVG + Motion (Not Lottie)

- Claude Code can build and iterate directly in code
- Responds to dark mode via CSS custom properties and Tailwind classes
- Responds to screen size via responsive SVG viewBox
- No dependency on After Effects or external tools
- Smaller bundle, fewer dependencies
- Motion's `pathLength`, `pathOffset`, and SVG property animations are purpose-built for this

---

## SVG Foundation Rules

1. **Use inline SVG** in React components, not `<img>` or `<object>` tags. Inline SVG allows Motion to animate individual elements.
2. **Set viewBox, not width/height.** Let the parent container control sizing. The SVG scales responsively.
3. **Use transparent backgrounds.** No fill on the root SVG. Works on both light and dark mode.
4. **Theme-aware colors.** Use CSS custom properties or Tailwind's `currentColor` for strokes and fills that respond to dark mode.
5. **Stylized, not photorealistic.** Documents are clean rectangles with faint field lines. Not actual PDF renders.

```tsx
<svg
  viewBox="0 0 400 300"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-full h-auto"
  aria-hidden="true"
>
  {/* Animation content */}
</svg>
```

---

## Pattern: Animated Connection Line

Connection lines draw between matching fields in the document comparison hero. Thin (1.5-2px), slightly curved, color matches the result (green for verified, amber for flagged).

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

interface ConnectionLineProps {
  /** SVG path data for the curved line */
  d: string
  /** "verified" = green, "flagged" = amber */
  result: "verified" | "flagged"
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Whether this line should be visible (controlled by parent sequence) */
  isActive: boolean
}

const RESULT_COLORS = {
  verified: "var(--color-verified, #22c55e)",
  flagged: "var(--color-flagged, #f59e0b)",
}

export function ConnectionLine({
  d,
  result,
  delay = 0,
  duration = 0.6,
  isActive,
}: ConnectionLineProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={RESULT_COLORS[result]}
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        isActive
          ? { pathLength: 1, opacity: 1 }
          : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: {
          duration: shouldReduceMotion ? 0 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: EASE.smooth,
        },
        opacity: {
          duration: shouldReduceMotion ? 0 : 0.2,
          delay: shouldReduceMotion ? 0 : delay,
        },
      }}
    />
  )
}
```

**Generating curved paths between two points:**

```tsx
function createCurvedPath(
  x1: number, y1: number,
  x2: number, y2: number,
): string {
  const midX = (x1 + x2) / 2
  // Slight vertical curve for visual appeal
  const curveOffset = Math.abs(y2 - y1) * 0.2
  return `M ${x1} ${y1} C ${midX} ${y1 - curveOffset}, ${midX} ${y2 + curveOffset}, ${x2} ${y2}`
}
```

---

## Pattern: Stylized Document

A clean rectangular document with field rows. Fields can highlight individually with a border glow in verified (green) or flagged (amber) state.

```tsx
"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

interface DocumentField {
  id: string
  label: string
  /** Vertical position within the document (0-1 normalized) */
  yPosition: number
  /** Current state */
  state: "idle" | "active" | "verified" | "flagged"
}

interface StylizedDocumentProps {
  fields: DocumentField[]
  title?: string
  className?: string
}

const STATE_COLORS = {
  idle: {
    border: "var(--color-border, #e5e7eb)",
    bg: "transparent",
  },
  active: {
    border: "var(--color-accent, #2AA0E6)",
    bg: "var(--color-accent-light, rgba(42, 160, 230, 0.08))",
  },
  verified: {
    border: "var(--color-verified, #22c55e)",
    bg: "var(--color-verified-light, rgba(34, 197, 94, 0.08))",
  },
  flagged: {
    border: "var(--color-flagged, #f59e0b)",
    bg: "var(--color-flagged-light, rgba(245, 158, 11, 0.08))",
  },
}

export function StylizedDocument({ fields, title, className }: StylizedDocumentProps) {
  const shouldReduceMotion = useReducedMotion()

  const docWidth = 160
  const docHeight = 220
  const fieldHeight = 14
  const fieldMargin = 6
  const fieldStartY = 40
  const fieldPadding = 12

  return (
    <svg
      viewBox={`0 0 ${docWidth} ${docHeight}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Document background */}
      <rect
        x={0}
        y={0}
        width={docWidth}
        height={docHeight}
        rx={6}
        className="fill-white dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-700"
        strokeWidth={1}
      />

      {/* Document title bar */}
      {title && (
        <text
          x={fieldPadding}
          y={24}
          className="fill-gray-400 dark:fill-gray-500"
          fontSize={9}
          fontFamily="system-ui, sans-serif"
        >
          {title}
        </text>
      )}

      {/* Separator line */}
      <line
        x1={fieldPadding}
        y1={32}
        x2={docWidth - fieldPadding}
        y2={32}
        className="stroke-gray-100 dark:stroke-gray-800"
        strokeWidth={0.5}
      />

      {/* Field rows */}
      {fields.map((field, i) => {
        const y = fieldStartY + i * (fieldHeight + fieldMargin)
        const colors = STATE_COLORS[field.state]

        return (
          <g key={field.id}>
            {/* Field background highlight */}
            <motion.rect
              x={fieldPadding - 2}
              y={y - 2}
              width={docWidth - fieldPadding * 2 + 4}
              height={fieldHeight + 4}
              rx={3}
              fill={colors.bg}
              stroke={colors.border}
              strokeWidth={field.state === "idle" ? 0 : 1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: field.state === "idle" ? 0 : 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: EASE.easeOut,
              }}
            />

            {/* Field label text */}
            <text
              x={fieldPadding + 2}
              y={y + fieldHeight - 3}
              fontSize={7}
              className="fill-gray-500 dark:fill-gray-400"
              fontFamily="system-ui, sans-serif"
            >
              {field.label}
            </text>

            {/* Field value placeholder (gray bar) */}
            <rect
              x={fieldPadding + 50}
              y={y + 3}
              width={docWidth - fieldPadding * 2 - 54}
              height={fieldHeight - 6}
              rx={2}
              className="fill-gray-100 dark:fill-gray-800"
            />
          </g>
        )
      })}
    </svg>
  )
}
```

---

## Pattern: Homepage Hero Animation (Document Comparison)

The signature hero animation. Two documents side by side, fields highlight in sequence, connection lines draw between matching fields, each pair resolves to verified or flagged.

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"
import { StylizedDocument } from "./StylizedDocument"
import { ConnectionLine, createCurvedPath } from "./ConnectionLine"

// Define field pairs (source field -> reference field, with result)
const FIELD_PAIRS = [
  { sourceIndex: 0, refIndex: 0, result: "verified" as const, label: "Loss Payee" },
  { sourceIndex: 1, refIndex: 1, result: "verified" as const, label: "Serial Number" },
  { sourceIndex: 2, refIndex: 2, result: "flagged" as const, label: "Coverage Amount" },
  { sourceIndex: 3, refIndex: 3, result: "verified" as const, label: "Policy Dates" },
]

const SOURCE_FIELDS = [
  { id: "s-lp", label: "Loss Payee", yPosition: 0 },
  { id: "s-sn", label: "Serial No.", yPosition: 1 },
  { id: "s-cv", label: "Coverage", yPosition: 2 },
  { id: "s-pd", label: "Policy Date", yPosition: 3 },
  { id: "s-ins", label: "Insurer", yPosition: 4 },
  { id: "s-ded", label: "Deductible", yPosition: 5 },
]

const REFERENCE_FIELDS = [
  { id: "r-lp", label: "Loss Payee", yPosition: 0 },
  { id: "r-sn", label: "Serial No.", yPosition: 1 },
  { id: "r-cv", label: "Coverage Req", yPosition: 2 },
  { id: "r-pd", label: "Effective Date", yPosition: 3 },
  { id: "r-eq", label: "Equipment", yPosition: 4 },
  { id: "r-val", label: "Value", yPosition: 5 },
]

// Animation sequence timing (milliseconds)
const SEQUENCE = [
  0,     // Step 0: Documents fade in
  800,   // Step 1: First pair highlights + line draws + resolves
  1800,  // Step 2: Second pair
  2800,  // Step 3: Third pair (flagged)
  3600,  // Step 4: Fourth pair + remaining cascade
  4500,  // Step 5: Verification summary slides in
]

export function DocumentComparisonHero({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(-1)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentStep(SEQUENCE.length - 1)
      return
    }

    const timers = SEQUENCE.map((delay, step) =>
      setTimeout(() => setCurrentStep(step), delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [shouldReduceMotion])

  // Compute field states based on current step
  function getFieldState(fieldIndex: number, side: "source" | "ref") {
    for (let pairIdx = 0; pairIdx < FIELD_PAIRS.length; pairIdx++) {
      const pair = FIELD_PAIRS[pairIdx]
      const targetIndex = side === "source" ? pair.sourceIndex : pair.refIndex

      if (targetIndex === fieldIndex) {
        if (currentStep > pairIdx) return pair.result   // Resolved
        if (currentStep === pairIdx) return "active"     // Currently highlighting
      }
    }
    return "idle"
  }

  const sourceFieldsWithState = SOURCE_FIELDS.map((f, i) => ({
    ...f,
    state: getFieldState(i, "source"),
  }))

  const refFieldsWithState = REFERENCE_FIELDS.map((f, i) => ({
    ...f,
    state: getFieldState(i, "ref"),
  }))

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-4 items-start">
        {/* Source document */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={currentStep >= 0 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: EASE.smooth }}
        >
          <StylizedDocument
            fields={sourceFieldsWithState}
            title="Insurance Certificate"
          />
        </motion.div>

        {/* Reference document */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={currentStep >= 0 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: EASE.smooth }}
        >
          <StylizedDocument
            fields={refFieldsWithState}
            title="Equipment Schedule"
          />
        </motion.div>
      </div>

      {/* Connection lines SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        {FIELD_PAIRS.map((pair, i) => (
          <ConnectionLine
            key={i}
            d={createCurvedPath(
              180, 60 + pair.sourceIndex * 24,
              220, 60 + pair.refIndex * 24
            )}
            result={pair.result}
            delay={0.2}
            isActive={currentStep > i}
          />
        ))}
      </svg>

      {/* Verification summary bar */}
      <motion.div
        className="mt-4 mx-auto flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm w-fit"
        initial={{ opacity: 0, y: 8 }}
        animate={
          currentStep >= SEQUENCE.length - 1
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 8 }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: EASE.smooth }}
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {FIELD_PAIRS.filter((p) => p.result === "verified").length} verified
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          {FIELD_PAIRS.filter((p) => p.result === "flagged").length} flagged
        </span>
      </motion.div>
    </div>
  )
}
```

---

## Pattern: Debtor Search Hero (Stack Collapse)

Different from the other heroes. A tall stack of pages enters, pages fan out, key registrations are extracted, stack collapses to a structured summary.

```tsx
// Conceptual structure - adapt field labels and timing

export function DebtorSearchHero() {
  const [step, setStep] = useState(-1)
  const shouldReduceMotion = useReducedMotion()

  // Steps:
  // 0: Stack of pages slides in from right
  // 1: Pages fan out slightly (showing volume)
  // 2: Key pages glow and pull forward
  // 3: Stack collapses, extracted items form a clean list
  // 4: Summary badge appears ("12 registrations found, 3 require review")

  // Each "page" in the stack is a simple rounded rectangle
  // Stagger them with slight y and rotate offsets
  // On step 2, highlighted pages scale up and move left
  // On step 3, everything collapses into a clean summary card

  return (
    <div className="relative">
      <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto" aria-hidden="true">
        {/* Page stack (15-20 thin rectangles, staggered) */}
        {pages.map((page, i) => (
          <motion.rect
            key={i}
            x={100 + i * 1.5}
            y={20 + i * 2}
            width={200}
            height={260}
            rx={4}
            className="fill-white dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-700"
            strokeWidth={0.5}
            initial={{ opacity: 0, x: 60 }}
            animate={getPageAnimation(step, i, page.isHighlighted)}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : i * 0.03,
              ease: EASE.smooth,
            }}
          />
        ))}

        {/* Summary card (appears at step 3+) */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: EASE.smooth }}
        >
          {/* Clean summary rectangle with organized results */}
        </motion.g>
      </svg>
    </div>
  )
}
```

---

## Dark Mode Handling for SVG Animations

Use Tailwind dark mode classes on SVG elements:

```tsx
// Document backgrounds
<rect className="fill-white dark:fill-gray-900 stroke-gray-200 dark:stroke-gray-700" />

// Field placeholder bars
<rect className="fill-gray-100 dark:fill-gray-800" />

// Text labels
<text className="fill-gray-500 dark:fill-gray-400" />

// For animated colors (connection lines, highlights), use CSS custom properties:
// In globals.css (defined in CLAUDE.md, repeated here for reference):
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

Then in SVG elements:
```tsx
<motion.path stroke="var(--color-verified)" />
<motion.rect fill="var(--color-flagged-light)" stroke="var(--color-flagged)" />
```

---

## Mobile Responsiveness for SVG Animations

The hero animations must work on mobile (single-column layout, stacked vertically):

1. **Container controls sizing.** SVG uses `viewBox` and `className="w-full h-auto"`. Parent div controls max width.
2. **Homepage hero on mobile:** Documents can stack vertically (source on top, reference below). Connection lines run vertically instead of horizontally. Adjust the SVG viewBox to a portrait orientation.
3. **Debtor search hero on mobile:** Stack animation works the same but scaled down.
4. **Use a responsive viewBox or conditional rendering:**

```tsx
function HeroAnimation() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return <DocumentComparisonVertical />  // Stacked layout
  }

  return <DocumentComparisonHorizontal />  // Side-by-side layout
}
```

---

## Performance Rules for SVG Animations

1. **Animate transform and opacity only.** Use Motion's `x`, `y`, `scale`, `rotate` on SVG groups and elements. Never animate `cx`, `cy`, `width`, `height` directly.
2. **Group related elements in `<g>` tags.** Animate the group, not individual elements, when they move together.
3. **Keep SVG element count reasonable.** Under 100 elements per hero animation. Use visual simplification (field bars instead of real text).
4. **Use `aria-hidden="true"`** on all decorative SVG animations.
5. **Provide a static fallback** for reduced motion: render the final frame of the animation immediately.
