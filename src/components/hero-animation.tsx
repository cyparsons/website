"use client"

import { motion, useReducedMotion } from "motion/react"

// Field comparison data for the hero animation
const fields = [
  { label: "Policy Number", left: "PLH-0042819", right: "PLH-0042819", status: "verified" as const },
  { label: "Named Insured", left: "Nexus Freight Corp", right: "Nexus Freight Corp", status: "verified" as const },
  { label: "Serial Number", left: "4UZAANDH5BC...", right: "4UZAANDH5BC...", status: "verified" as const },
  { label: "Loss Payee", left: "Maple Leaf Leasing", right: "Northern Credit Corp", status: "flagged" as const },
  { label: "Policy Expiry", left: "2026-08-15", right: "2026-08-15", status: "verified" as const },
  { label: "Deductible", left: "$5,000", right: "$2,500", status: "flagged" as const },
]

function StatusDot({ status, delay }: { status: "verified" | "flagged"; delay: number }) {
  return (
    <motion.circle
      r="5"
      fill={status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 1.3, 1],
        opacity: [0, 1, 1, 0.7, 1],
      }}
      transition={{
        scale: {
          times: [0, 0.15, 0.7, 0.85, 1],
          duration: 3,
          delay: delay + 1.2,
          repeat: Infinity,
          repeatDelay: 2,
        },
        opacity: {
          times: [0, 0.15, 0.7, 0.85, 1],
          duration: 3,
          delay: delay + 1.2,
          repeat: Infinity,
          repeatDelay: 2,
        },
      }}
    />
  )
}

export function HeroAnimation() {
  const reduced = useReducedMotion()

  // Shared layout constants
  const leftDocX = 0
  const rightDocX = 330
  const docW = 260
  const fieldStartY = 62
  const fieldH = 36
  const fieldGap = 38
  const fieldPadX = 14
  const fieldW = docW - fieldPadX * 2
  const midGap = rightDocX - (leftDocX + docW)
  const midX = leftDocX + docW + midGap / 2
  const docH = fieldStartY + (fields.length - 1) * fieldGap + fieldH + 10
  const summaryY = docH + 10
  const summaryH = 36
  const totalH = summaryY + summaryH + 4

  // Static final frame for reduced motion
  if (reduced) {
    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 590 ${totalH}`} fill="none" className="w-full h-auto">
          {/* Left document */}
          <rect x={leftDocX} y="0" width={docW} height={docH} rx="10" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x={leftDocX + fieldPadX} y="16" width="100" height="10" rx="3" fill="var(--color-border)" />
          <text x={leftDocX + fieldPadX} y="46" fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Certificate of Insurance</text>

          {/* Right document */}
          <rect x={rightDocX} y="0" width={docW} height={docH} rx="10" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x={rightDocX + fieldPadX} y="16" width="100" height="10" rx="3" fill="var(--color-border)" />
          <text x={rightDocX + fieldPadX} y="46" fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Equipment Schedule</text>

          {/* Field rows with status */}
          {fields.map((field, i) => {
            const y = fieldStartY + i * fieldGap
            const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
            const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
            return (
              <g key={i}>
                <rect x={leftDocX + fieldPadX} y={y} width={fieldW} height={fieldH} rx="5" fill={bgColor} />
                <text x={leftDocX + fieldPadX + 10} y={y + 14} fontSize="9" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x={leftDocX + fieldPadX + 10} y={y + 28} fontSize="10" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.left}</text>

                <rect x={rightDocX + fieldPadX} y={y} width={fieldW} height={fieldH} rx="5" fill={bgColor} />
                <text x={rightDocX + fieldPadX + 10} y={y + 14} fontSize="9" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x={rightDocX + fieldPadX + 10} y={y + 28} fontSize="10" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.right}</text>

                {/* Connection line */}
                <line x1={leftDocX + docW} y1={y + fieldH / 2} x2={rightDocX} y2={y + fieldH / 2} stroke={color} strokeWidth="1.5" strokeDasharray="4,4" />
                <circle cx={midX} cy={y + fieldH / 2} r="5" fill={color} />
              </g>
            )
          })}

          {/* Summary bar */}
          <rect x={leftDocX} y={summaryY} width={rightDocX + docW - leftDocX} height={summaryH} rx="8" fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx={leftDocX + 24} cy={summaryY + summaryH / 2} r="5" fill="var(--color-verified)" />
          <text x={leftDocX + 36} y={summaryY + summaryH / 2 + 4} fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">4 Verified</text>
          <circle cx={leftDocX + 130} cy={summaryY + summaryH / 2} r="5" fill="var(--color-flagged)" />
          <text x={leftDocX + 142} y={summaryY + summaryH / 2 + 4} fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Flagged</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 590 ${totalH}`} fill="none" className="w-full h-auto">
        {/* Left document - slides in from left */}
        <motion.g
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={leftDocX} y="0" width={docW} height={docH} rx="10" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x={leftDocX + fieldPadX} y="16" width="100" height="10" rx="3" fill="var(--color-border)" />
          <text x={leftDocX + fieldPadX} y="46" fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Certificate of Insurance</text>
        </motion.g>

        {/* Right document - slides in from right */}
        <motion.g
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <rect x={rightDocX} y="0" width={docW} height={docH} rx="10" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x={rightDocX + fieldPadX} y="16" width="100" height="10" rx="3" fill="var(--color-border)" />
          <text x={rightDocX + fieldPadX} y="46" fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Equipment Schedule</text>
        </motion.g>

        {/* Field rows - staggered reveal */}
        {fields.map((field, i) => {
          const y = fieldStartY + i * fieldGap
          const delay = 0.6 + i * 0.35
          const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
          const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

          return (
            <g key={i}>
              {/* Left field highlight */}
              <motion.rect
                x={leftDocX + fieldPadX} y={y} width={fieldW} height={fieldH} rx="5"
                fill={bgColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.3 }}
              />
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.3 }}
              >
                <text x={leftDocX + fieldPadX + 10} y={y + 14} fontSize="9" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x={leftDocX + fieldPadX + 10} y={y + 28} fontSize="10" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.left}</text>
              </motion.g>

              {/* Right field highlight */}
              <motion.rect
                x={rightDocX + fieldPadX} y={y} width={fieldW} height={fieldH} rx="5"
                fill={bgColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.1, duration: 0.3 }}
              />
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.1, duration: 0.3 }}
              >
                <text x={rightDocX + fieldPadX + 10} y={y + 14} fontSize="9" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x={rightDocX + fieldPadX + 10} y={y + 28} fontSize="10" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.right}</text>
              </motion.g>

              {/* Connection line draws between fields */}
              <motion.line
                x1={leftDocX + docW} y1={y + fieldH / 2} x2={rightDocX} y2={y + fieldH / 2}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray="4,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: delay + 0.2, duration: 0.4, ease: [0, 0, 0.2, 1] }}
              />

              {/* Status dot at midpoint */}
              <motion.svg x={midX} y={y + fieldH / 2} overflow="visible">
                <StatusDot status={field.status} delay={delay - 0.6} />
              </motion.svg>
            </g>
          )
        })}

        {/* Summary bar - slides up at end */}
        <motion.g
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={leftDocX} y={summaryY} width={rightDocX + docW - leftDocX} height={summaryH} rx="8" fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx={leftDocX + 24} cy={summaryY + summaryH / 2} r="5" fill="var(--color-verified)" />
          <text x={leftDocX + 36} y={summaryY + summaryH / 2 + 4} fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">4 Verified</text>
          <circle cx={leftDocX + 130} cy={summaryY + summaryH / 2} r="5" fill="var(--color-flagged)" />
          <text x={leftDocX + 142} y={summaryY + summaryH / 2 + 4} fontSize="10" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Flagged</text>
        </motion.g>
      </svg>
    </div>
  )
}
