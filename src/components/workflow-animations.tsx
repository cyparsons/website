"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

// ─── Problem Card Animations (~80x64 viewBox) ───

/** Document with scanning highlight bar sweeping down field lines */
export function ManualWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Document */}
      <motion.rect
        x="14" y="4" width="52" height="56" rx="4"
        fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE.smooth }}
      />
      {/* Title bar */}
      <motion.rect
        x="22" y="12" width="24" height="3" rx="1.5"
        fill="var(--color-border)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.2 }}
      />
      {/* Field lines */}
      {[24, 32, 40, 48].map((y, i) => (
        <motion.rect
          key={y} x="22" y={y} width="36" height="3" rx="1.5"
          fill="var(--color-text-tertiary)" opacity="0.25"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.25 } : {}}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.3 + i * 0.05 }}
        />
      ))}
      {/* Scanning highlight bar */}
      <motion.rect
        x="20" y="22" width="40" height="7" rx="2"
        fill="var(--color-flagged)" opacity="0.15"
        initial={{ y: 0, opacity: 0 }}
        animate={play ? {
          y: [0, 0, 8, 8, 16, 16, 24, 24],
          opacity: [0, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0],
        } : reduced && inView ? { y: 24, opacity: 0.15 } : {}}
        transition={{ duration: 3, delay: 0.6, ease: "linear" }}
      />
    </svg>
  )
}

/** Circular path with documents cycling around it */
export function RepetitiveWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const cx = 40, cy = 32, r = 20

  // Positions around the circle for 3 mini docs
  const docs = [
    { angle: -90, x: cx, y: cy - r },
    { angle: 30, x: cx + r * Math.cos((30 * Math.PI) / 180), y: cy + r * Math.sin((30 * Math.PI) / 180) },
    { angle: 150, x: cx + r * Math.cos((150 * Math.PI) / 180), y: cy + r * Math.sin((150 * Math.PI) / 180) },
  ]

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Dashed circular path */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3,3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2, ease: EASE.smooth }}
      />
      {/* Three mini documents around the circle */}
      {docs.map((doc, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.5 + i * 0.2, ease: EASE.smooth }}
          style={{ transformOrigin: `${doc.x}px ${doc.y}px` }}
        >
          <rect x={doc.x - 6} y={doc.y - 8} width="12" height="16" rx="2"
            fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
          <rect x={doc.x - 3.5} y={doc.y - 4} width="7" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
          <rect x={doc.x - 3.5} y={doc.y - 1} width="5" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
          <rect x={doc.x - 3.5} y={doc.y + 2} width="7" height="1.5" rx="0.75"
            fill="var(--color-text-tertiary)" opacity="0.3" />
        </motion.g>
      ))}
      {/* Traveling pulse dot */}
      <motion.circle
        r="2.5"
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? {
          opacity: [0, 0.8, 0.8, 0.8, 0],
          offsetDistance: ["0%", "33%", "66%", "100%", "100%"],
        } : reduced && inView ? { opacity: 0.8, cx: cx, cy: cy - r } : {}}
        transition={{ duration: 3, delay: 1.2, ease: "linear" }}
        style={!reduced ? {
          offsetPath: `path("M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}")`,
        } : undefined}
      />
    </svg>
  )
}

/** Document with field rows getting verified, but the last one gets missed */
export function RiskyWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const fields = [
    { y: 22, status: "verified" as const },
    { y: 31, status: "verified" as const },
    { y: 40, status: "verified" as const },
    { y: 49, status: "flagged" as const },
  ]

  return (
    <svg ref={ref} viewBox="0 0 80 64" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Document */}
      <motion.rect
        x="14" y="4" width="52" height="56" rx="4"
        fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE.smooth }}
      />
      {/* Title bar */}
      <motion.rect
        x="22" y="11" width="20" height="3" rx="1.5"
        fill="var(--color-border)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.2 }}
      />
      {/* Field rows with status dots */}
      {fields.map((field, i) => {
        const delay = reduced ? 0 : 0.6 + i * 0.5
        const isLast = i === fields.length - 1
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"

        return (
          <g key={i}>
            {/* Field line */}
            <motion.rect
              x="28" y={field.y} width="28" height="3" rx="1.5"
              fill="var(--color-text-tertiary)" opacity="0.25"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.25 } : {}}
              transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : 0.3 + i * 0.05 }}
            />
            {/* Status dot */}
            <motion.circle
              cx="23" cy={field.y + 1.5} r="2.5"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? {
                scale: isLast && !reduced ? [0, 1, 1.4, 1] : [0, 1],
                opacity: 1,
              } : {}}
              transition={{
                duration: reduced ? 0 : isLast ? 0.6 : 0.3,
                delay,
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

/** Mini document comparison with connection lines and status dots */
export function COIVerificationWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const leftX = 4, rightX = 96, docW = 60, docH = 72
  const fields = [
    { y: 28, status: "verified" as const },
    { y: 44, status: "verified" as const },
    { y: 60, status: "flagged" as const },
  ]

  return (
    <svg ref={ref} viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Left document */}
      <motion.g
        initial={{ x: -12, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE.smooth }}
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
        initial={{ x: 12, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15, ease: EASE.smooth }}
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

      {/* Connection lines + status dots between documents */}
      {fields.map((field, i) => {
        const delay = reduced ? 0 : 0.6 + i * 0.45
        const lineY = field.y + 4
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

        return (
          <g key={i}>
            {/* Highlight on left field */}
            <motion.rect
              x={leftX + 7} y={field.y - 1} width="46" height="10" rx="2.5"
              fill={bgColor}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduced ? 0 : 0.3, delay }}
            />
            {/* Highlight on right field */}
            <motion.rect
              x={rightX + 7} y={field.y - 1} width="46" height="10" rx="2.5"
              fill={bgColor}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduced ? 0 : 0.3, delay: delay + 0.1 }}
            />
            {/* Dashed connection line */}
            <motion.line
              x1={leftX + docW} y1={lineY} x2={rightX} y2={lineY}
              stroke={color} strokeWidth="1" strokeDasharray="3,2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: reduced ? 0 : 0.35, delay: delay + 0.15, ease: EASE.easeOut }}
            />
            {/* Status dot at midpoint */}
            <motion.circle
              cx="80" cy={lineY} r="3"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: reduced ? 0 : 0.25, delay: delay + 0.3, ease: EASE.smooth }}
              style={{ transformOrigin: `80px ${lineY}px` }}
            />
          </g>
        )
      })}

      {/* Summary bar */}
      <motion.g
        initial={{ y: 6, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 2.2, ease: EASE.smooth }}
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
export function LienValidationWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const fields = [
    { y: 30, status: "verified" as const, label: "Debtor" },
    { y: 46, status: "verified" as const, label: "Collateral" },
    { y: 62, status: "flagged" as const, label: "Entity" },
  ]

  return (
    <svg ref={ref} viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Back document (deal package) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE.smooth }}
      >
        <rect x="48" y="4" width="64" height="80" rx="4"
          fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="0.8" />
        <rect x="56" y="12" width="28" height="3" rx="1.5" fill="var(--color-border)" />
        <text x="56" y="23" fontSize="5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)">Deal Package</text>
        {fields.map((f, i) => (
          <rect key={i} x="56" y={f.y} width="48" height="8" rx="2"
            fill="var(--color-text-tertiary)" opacity="0.08" />
        ))}
      </motion.g>

      {/* Front document (filing) - slides in overlapping */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3, ease: EASE.smooth }}
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
        const delay = reduced ? 0 : 0.9 + i * 0.45
        const arrowY = field.y + 10
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"

        return (
          <g key={i}>
            {/* Arrow line from filing to deal package */}
            <motion.line
              x1="78" y1={arrowY} x2="104" y2={field.y + 4}
              stroke={color} strokeWidth="1" strokeDasharray="3,2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
              transition={{ duration: reduced ? 0 : 0.35, delay, ease: EASE.easeOut }}
            />
            {/* Status indicator */}
            <motion.circle
              cx="91" cy={(arrowY + field.y + 4) / 2} r="3"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: reduced ? 0 : 0.25, delay: delay + 0.2, ease: EASE.smooth }}
              style={{ transformOrigin: `91px ${(arrowY + field.y + 4) / 2}px` }}
            />
            {/* Field label */}
            <motion.text
              x="120" y={(arrowY + field.y + 4) / 2 + 2}
              fontSize="4.5"
              fill={color}
              fontFamily="var(--font-sans)"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.8 } : {}}
              transition={{ duration: reduced ? 0 : 0.2, delay: delay + 0.3 }}
            >
              {field.status === "flagged" ? "Mismatch" : "Match"}
            </motion.text>
          </g>
        )
      })}
    </svg>
  )
}

/** Stack of pages that fan out, extract key items, and collapse to summary */
export function DebtorSearchWorkflow() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()

  const pageCount = 5
  const extractedItems = [
    { label: "GSA", color: "var(--color-flagged)" },
    { label: "Lien", color: "var(--color-flagged)" },
    { label: "Clear", color: "var(--color-verified)" },
  ]

  return (
    <svg ref={ref} viewBox="0 0 160 100" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Stack of pages */}
      {Array.from({ length: pageCount }).map((_, i) => {
        const baseX = 12 + i * 2
        const baseY = 8 + i * 2
        const delay = reduced ? 0 : 0.1 + i * 0.08
        const fanDelay = reduced ? 0 : 0.6 + i * 0.06

        return (
          <motion.rect
            key={i}
            x={baseX} y={baseY}
            width="52" height="68" rx="3"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
            strokeWidth="0.6"
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? {
              x: [baseX - 20, baseX, baseX + (i - 2) * 3, baseX],
              opacity: [0, 0.4 + i * 0.15, 0.4 + i * 0.15, i === pageCount - 1 ? 1 : 0.3],
            } : {}}
            transition={{
              duration: reduced ? 0 : 2,
              delay,
              ease: EASE.smooth,
              times: [0, 0.3, 0.6, 1],
            }}
          />
        )
      })}

      {/* Field lines on top page */}
      {[26, 34, 42, 50, 58].map((y, i) => (
        <motion.rect
          key={y}
          x="24" y={y} width="28" height="2.5" rx="1.25"
          fill="var(--color-text-tertiary)" opacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.2 } : {}}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.8 + i * 0.05 }}
        />
      ))}

      {/* Extracted items floating to the right */}
      {extractedItems.map((item, i) => {
        const itemY = 22 + i * 22
        const delay = reduced ? 0 : 1.2 + i * 0.3

        return (
          <motion.g key={i}
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: reduced ? 0 : 0.5, delay, ease: EASE.smooth }}
          >
            {/* Pill shape */}
            <rect x="88" y={itemY} width="56" height="14" rx="7"
              fill={item.color} opacity="0.12" stroke={item.color} strokeWidth="0.6" strokeOpacity="0.4" />
            <text x="98" y={itemY + 9.5} fontSize="5.5" fill={item.color} fontFamily="var(--font-sans)" fontWeight="500">
              {item.label}
            </text>
            {/* Connector from stack */}
            <motion.line
              x1="66" y1={itemY + 7} x2="88" y2={itemY + 7}
              stroke={item.color} strokeWidth="0.6" strokeDasharray="2,2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: reduced ? 0 : 0.3, delay: delay + 0.15, ease: EASE.easeOut }}
            />
          </motion.g>
        )
      })}

      {/* Summary label */}
      <motion.text
        x="96" y="82" fontSize="4.5" fill="var(--color-text-tertiary)" fontFamily="var(--font-sans)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : {}}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 2.4 }}
      >
        3 items surfaced
      </motion.text>
    </svg>
  )
}
