"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

// ─── Problem Card Animations (~80x64 viewBox) ───
// Loop continuously while in view

/** Document with scanning highlight bar sweeping continuously */
export function ManualWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="14" y="4" width="52" height="56" rx="4"
        fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
      <rect x="22" y="12" width="24" height="3" rx="1.5" fill="var(--color-border)" />
      {[22, 30, 38, 46].map((y) => (
        <rect key={y} x="22" y={y} width="36" height="3" rx="1.5"
          fill="var(--color-text-tertiary)" opacity="0.25" />
      ))}
      <motion.rect
        x="20" width="40" height="7" rx="2"
        fill="var(--color-flagged)"
        animate={play
          ? { y: [16, 48, 16], opacity: 0.18 }
          : { y: 16, opacity: 0 }}
        transition={play
          ? { y: { duration: 3.5, ease: "easeInOut", repeat: Infinity } }
          : { duration: 0.2 }}
      />
    </svg>
  )
}

/** Circular path with continuously orbiting dot */
export function RepetitiveWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const cx = 40, cy = 32, r = 20
  const play = inView && !reduced

  const docs = [
    { x: cx, y: cy - r },
    { x: cx + r * Math.cos((30 * Math.PI) / 180), y: cy + r * Math.sin((30 * Math.PI) / 180) },
    { x: cx + r * Math.cos((150 * Math.PI) / 180), y: cy + r * Math.sin((150 * Math.PI) / 180) },
  ]

  // 9 points around the circle (starting from top, closing the loop)
  const orbitCx = Array.from({ length: 9 }, (_, i) => cx + r * Math.cos((-90 + i * 45) * Math.PI / 180))
  const orbitCy = Array.from({ length: 9 }, (_, i) => cy + r * Math.sin((-90 + i * 45) * Math.PI / 180))

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r}
        stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3,3"
        fill="none" opacity="0.6" />
      {docs.map((doc, i) => (
        <g key={i}>
          <rect x={doc.x - 6} y={doc.y - 8} width="12" height="16" rx="2"
            fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
          <rect x={doc.x - 3.5} y={doc.y - 4} width="7" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
          <rect x={doc.x - 3.5} y={doc.y - 1} width="5" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
          <rect x={doc.x - 3.5} y={doc.y + 2} width="7" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
        </g>
      ))}
      <motion.circle
        r="2.5"
        fill="var(--color-accent)"
        opacity={play ? 0.8 : 0}
        animate={play
          ? { cx: orbitCx, cy: orbitCy }
          : { cx: cx, cy: cy - r }}
        transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
      />
    </svg>
  )
}

/** Uniform top-to-bottom dots, random flagged position each cycle */
export function RiskyWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const [cycle, setCycle] = useState(0)
  const [flaggedIndex, setFlaggedIndex] = useState(2)

  useEffect(() => {
    if (!inView || reduced) return
    const interval = setInterval(() => {
      setFlaggedIndex(Math.floor(Math.random() * 4))
      setCycle((c) => c + 1)
    }, 3200)
    return () => clearInterval(interval)
  }, [inView, reduced])

  const fields = [{ y: 22 }, { y: 31 }, { y: 40 }, { y: 49 }]
  const totalEnd = 2.6
  const stagger = 0.3

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="14" y="4" width="52" height="56" rx="4"
        fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
      <rect x="22" y="11" width="20" height="3" rx="1.5" fill="var(--color-border)" />
      {fields.map((field, i) => {
        const isFlagged = i === flaggedIndex
        const color = isFlagged ? "var(--color-flagged)" : "var(--color-verified)"
        const delay = i * stagger
        const duration = totalEnd - delay

        return (
          <g key={i}>
            <rect x="28" y={field.y} width="28" height="3" rx="1.5"
              fill="var(--color-text-tertiary)" opacity="0.25" />
            <motion.circle
              key={`${cycle}-${i}`}
              cx="23" cy={field.y + 1.5} r="2.5"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView && !reduced
                ? {
                    scale: isFlagged ? [0, 1, 1.35, 1, 1, 0] : [0, 1, 1, 0],
                    opacity: isFlagged ? [0, 1, 0.7, 1, 1, 0] : [0, 1, 1, 0],
                  }
                : reduced
                  ? { scale: 1, opacity: 1 }
                  : {}}
              transition={{
                duration,
                delay,
                times: isFlagged
                  ? [0, 0.14, 0.22, 0.3, 0.75, 1]
                  : [0, 0.16, 0.75, 1],
                ease: EASE.smooth,
              }}
              style={{ transformOrigin: `23px ${field.y + 1.5}px` }}
            />
          </g>
        )
      })}
    </svg>
  )
}

// ─── Solution Card Animations (~160x100 viewBox) ───
// Play once on scroll, then on hover

/** Mini document comparison with connection lines and status dots */
export function COIVerificationWorkflow({ play = false }: { play?: boolean }) {
  const reduced = useReducedMotion()
  const active = play && !reduced

  const leftX = 4, rightX = 96, docW = 60, docH = 72
  const fields = [
    { y: 28, status: "verified" as const },
    { y: 44, status: "verified" as const },
    { y: 60, status: "flagged" as const },
  ]

  return (
    <svg viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Left document */}
      <motion.g
        animate={active ? { opacity: 1 } : { opacity: 0.5 }}
        transition={{ duration: 0.4, ease: EASE.smooth }}
      >
        <rect x={leftX} y="8" width={docW} height={docH} rx="4"
          fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        <rect x={leftX + 8} y="16" width="24" height="3" rx="1.5" fill="var(--color-border)" />
        <text x={leftX + 8} y="26" fontSize="5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">COI</text>
        {fields.map((f, i) => (
          <rect key={i} x={leftX + 8} y={f.y} width="44" height="8" rx="2"
            fill="var(--color-text-tertiary)" opacity="0.08" />
        ))}
      </motion.g>

      {/* Right document */}
      <motion.g
        animate={active ? { opacity: 1 } : { opacity: 0.5 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE.smooth }}
      >
        <rect x={rightX} y="8" width={docW} height={docH} rx="4"
          fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        <rect x={rightX + 8} y="16" width="24" height="3" rx="1.5" fill="var(--color-border)" />
        <text x={rightX + 8} y="26" fontSize="5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">Schedule</text>
        {fields.map((f, i) => (
          <rect key={i} x={rightX + 8} y={f.y} width="44" height="8" rx="2"
            fill="var(--color-text-tertiary)" opacity="0.08" />
        ))}
      </motion.g>

      {/* Connection lines + status dots */}
      {fields.map((field, i) => {
        const delay = 0.3 + i * 0.35
        const lineY = field.y + 4
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

        return (
          <g key={i}>
            <motion.rect
              x={leftX + 7} y={field.y - 1} width="46" height="10" rx="2.5"
              fill={bgColor}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay }}
            />
            <motion.rect
              x={rightX + 7} y={field.y - 1} width="46" height="10" rx="2.5"
              fill={bgColor}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.1 }}
            />
            <motion.line
              x1={leftX + docW} y1={lineY} x2={rightX} y2={lineY}
              stroke={color} strokeWidth="1" strokeDasharray="3,2"
              animate={active ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay: delay + 0.15, ease: EASE.easeOut }}
            />
            <motion.circle
              cx="80" cy={lineY} r="3"
              fill={color}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, delay: delay + 0.3, ease: EASE.smooth }}
              style={{ transformOrigin: `80px ${lineY}px` }}
            />
          </g>
        )
      })}

      {/* Summary bar */}
      <motion.g
        animate={active ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.8, ease: EASE.smooth }}
      >
        <rect x="30" y="86" width="100" height="12" rx="3"
          fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="0.6" />
        <circle cx="42" cy="92" r="2" fill="var(--color-verified)" />
        <text x="47" y="93.5" fontSize="4.5" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Verified</text>
        <circle cx="86" cy="92" r="2" fill="var(--color-flagged)" />
        <text x="91" y="93.5" fontSize="4.5" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">1 Flagged</text>
      </motion.g>
    </svg>
  )
}

/** Filing document overlapping deal package with comparison arrows */
export function LienValidationWorkflow({ play = false }: { play?: boolean }) {
  const reduced = useReducedMotion()
  const active = play && !reduced

  const fields = [
    { y: 30, status: "verified" as const },
    { y: 46, status: "verified" as const },
    { y: 62, status: "flagged" as const },
  ]

  return (
    <svg viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Back document (deal package) */}
      <g opacity="0.5">
        <rect x="48" y="4" width="64" height="80" rx="4"
          fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        <rect x="56" y="12" width="28" height="3" rx="1.5" fill="var(--color-border)" />
        <text x="56" y="23" fontSize="5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">Deal Package</text>
        {fields.map((f, i) => (
          <rect key={i} x="56" y={f.y} width="48" height="8" rx="2"
            fill="var(--color-text-tertiary)" opacity="0.08" />
        ))}
      </g>

      {/* Front document (filing) */}
      <motion.g
        animate={active ? { opacity: 1 } : { opacity: 0.6 }}
        transition={{ duration: 0.4, ease: EASE.smooth }}
      >
        <rect x="12" y="10" width="64" height="80" rx="4"
          fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        <rect x="20" y="18" width="28" height="3" rx="1.5" fill="var(--color-border)" />
        <text x="20" y="28" fontSize="5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">PPSA Filing</text>
        {fields.map((f, i) => (
          <rect key={i} x="20" y={f.y + 6} width="48" height="8" rx="2"
            fill="var(--color-text-tertiary)" opacity="0.08" />
        ))}
      </motion.g>

      {/* Comparison arrows with status */}
      {fields.map((field, i) => {
        const delay = 0.4 + i * 0.35
        const arrowY = field.y + 10
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"

        return (
          <g key={i}>
            <motion.line
              x1="78" y1={arrowY} x2="104" y2={field.y + 4}
              stroke={color} strokeWidth="1" strokeDasharray="3,2"
              animate={active ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay, ease: EASE.easeOut }}
            />
            <motion.circle
              cx="91" cy={(arrowY + field.y + 4) / 2} r="3"
              fill={color}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, delay: delay + 0.2, ease: EASE.smooth }}
              style={{ transformOrigin: `91px ${(arrowY + field.y + 4) / 2}px` }}
            />
            <motion.text
              x="120" y={(arrowY + field.y + 4) / 2 + 2}
              fontSize="4.5"
              fill={color}
              fontFamily="var(--font-sans)"
              fontWeight="500"
              animate={active ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: delay + 0.3 }}
            >
              {field.status === "flagged" ? "Mismatch" : "Match"}
            </motion.text>
          </g>
        )
      })}
    </svg>
  )
}

/** Document stack with extracted findings */
export function DebtorSearchWorkflow({ play = false }: { play?: boolean }) {
  const reduced = useReducedMotion()
  const active = play && !reduced

  const findings = [
    { y: 16, label: "GSA", status: "flagged" as const },
    { y: 40, label: "Blanket Lien", status: "flagged" as const },
    { y: 64, label: "No Conflict", status: "verified" as const },
  ]

  return (
    <svg viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Document stack — 3 overlapping pages */}
      {[0, 1, 2].map((i) => {
        const x = 8 + i * 3
        const y = 6 + i * 3
        const isTop = i === 2
        return (
          <motion.g key={i}
            animate={active ? { x: (i - 1) * 3, opacity: isTop ? 1 : 0.4 } : { x: 0, opacity: 0.3 + i * 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: EASE.smooth }}
          >
            <rect x={x} y={y} width="56" height="72" rx="4"
              fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
            {isTop && (
              <>
                <rect x={x + 8} y={y + 8} width="22" height="3" rx="1.5" fill="var(--color-border)" />
                <text x={x + 8} y={y + 20} fontSize="4.5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">Search Results</text>
                {[26, 34, 42, 50, 58].map((fy) => (
                  <rect key={fy} x={x + 8} y={y + fy} width="40" height="3" rx="1.5"
                    fill="var(--color-text-tertiary)" opacity="0.12" />
                ))}
              </>
            )}
          </motion.g>
        )
      })}

      {/* Extracted findings */}
      {findings.map((item, i) => {
        const delay = 0.5 + i * 0.3
        const color = item.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bgColor = item.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

        return (
          <g key={i}>
            <motion.line
              x1="72" y1={item.y + 8} x2="90" y2={item.y + 8}
              stroke={color} strokeWidth="0.8" strokeDasharray="2,2"
              animate={active ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay, ease: EASE.easeOut }}
            />
            <motion.g
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.35, delay, ease: EASE.smooth }}
            >
              <rect x="92" y={item.y} width="62" height="16" rx="3"
                fill={bgColor} stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
              <circle cx="100" cy={item.y + 8} r="2.5" fill={color} />
              <text x="106" y={item.y + 10} fontSize="5" fill="var(--color-text-primary)" fontFamily="var(--font-sans)" fontWeight="500">
                {item.label}
              </text>
            </motion.g>
          </g>
        )
      })}

      {/* Summary bar */}
      <motion.g
        animate={active ? { y: 0, opacity: 1 } : { y: 4, opacity: 0 }}
        transition={{ duration: 0.35, delay: 1.6, ease: EASE.smooth }}
      >
        <rect x="30" y="86" width="100" height="12" rx="3"
          fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="0.6" />
        <circle cx="42" cy="92" r="2" fill="var(--color-flagged)" />
        <text x="47" y="93.5" fontSize="4.5" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Flagged</text>
        <circle cx="86" cy="92" r="2" fill="var(--color-verified)" />
        <text x="91" y="93.5" fontSize="4.5" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">1 Clear</text>
      </motion.g>
    </svg>
  )
}
