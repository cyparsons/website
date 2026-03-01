"use client"

import { motion, useReducedMotion } from "motion/react"

// Field comparison data for the hero animation
const fields = [
  { label: "Policy Number", left: "PLH-0042819", right: "PLH-0042819", status: "verified" as const },
  { label: "Named Insured", left: "Nexus Freight Corp", right: "Nexus Freight Corp", status: "verified" as const },
  { label: "Serial Number", left: "4UZAANDH5BC...", right: "4UZAANDH5BC...", status: "verified" as const },
  { label: "Loss Payee", left: "Dynamic Cap...", right: "Dynamic Capital", status: "flagged" as const },
  { label: "Policy Expiry", left: "2026-08-15", right: "2026-08-15", status: "verified" as const },
  { label: "Deductible", left: "$5,000", right: "$2,500", status: "flagged" as const },
]

function StatusDot({ status, delay }: { status: "verified" | "flagged"; delay: number }) {
  return (
    <motion.circle
      r="4"
      fill={status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay + 1.2, duration: 0.3, ease: [0, 0, 0.2, 1] }}
    />
  )
}

export function HeroAnimation() {
  const reduced = useReducedMotion()

  // Static final frame for reduced motion
  if (reduced) {
    return (
      <div className="relative w-full max-w-lg">
        <svg viewBox="0 0 480 370" fill="none" className="w-full">
          {/* Left document */}
          <rect x="16" y="16" width="200" height="280" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="32" y="32" width="80" height="8" rx="2" fill="var(--color-border)" />
          <text x="32" y="56" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Certificate of Insurance</text>

          {/* Right document */}
          <rect x="264" y="16" width="200" height="280" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="280" y="32" width="80" height="8" rx="2" fill="var(--color-border)" />
          <text x="280" y="56" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Equipment Schedule</text>

          {/* Field rows with status */}
          {fields.map((field, i) => {
            const y = 76 + i * 38
            const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
            const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
            return (
              <g key={i}>
                <rect x="28" y={y} width="176" height="28" rx="4" fill={bgColor} />
                <text x="36" y={y + 11} fontSize="7" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x="36" y={y + 22} fontSize="8" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.left}</text>

                <rect x="276" y={y} width="176" height="28" rx="4" fill={bgColor} />
                <text x="284" y={y + 11} fontSize="7" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x="284" y={y + 22} fontSize="8" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.right}</text>

                {/* Connection line */}
                <line x1="204" y1={y + 14} x2="276" y2={y + 14} stroke={color} strokeWidth="1" strokeDasharray="3,3" />
                <svg x="236" y={y + 10}>
                  <circle r="4" cx="4" cy="4" fill={color} />
                </svg>
              </g>
            )
          })}

          {/* Summary bar */}
          <rect x="16" y="320" width="448" height="32" rx="6" fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="36" cy="336" r="4" fill="var(--color-verified)" />
          <text x="46" y="339" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">4 Verified</text>
          <circle cx="120" cy="336" r="4" fill="var(--color-flagged)" />
          <text x="130" y="339" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Flagged</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-lg">
      <svg viewBox="0 0 480 370" fill="none" className="w-full">
        {/* Left document - slides in from left */}
        <motion.g
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="16" y="16" width="200" height="280" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="32" y="32" width="80" height="8" rx="2" fill="var(--color-border)" />
          <text x="32" y="56" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Certificate of Insurance</text>
        </motion.g>

        {/* Right document - slides in from right */}
        <motion.g
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <rect x="264" y="16" width="200" height="280" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="280" y="32" width="80" height="8" rx="2" fill="var(--color-border)" />
          <text x="280" y="56" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">Equipment Schedule</text>
        </motion.g>

        {/* Field rows - staggered reveal */}
        {fields.map((field, i) => {
          const y = 76 + i * 38
          const delay = 0.6 + i * 0.35
          const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
          const bgColor = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

          return (
            <g key={i}>
              {/* Left field highlight */}
              <motion.rect
                x="28" y={y} width="176" height="28" rx="4"
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
                <text x="36" y={y + 11} fontSize="7" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x="36" y={y + 22} fontSize="8" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.left}</text>
              </motion.g>

              {/* Right field highlight */}
              <motion.rect
                x="276" y={y} width="176" height="28" rx="4"
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
                <text x="284" y={y + 11} fontSize="7" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">{field.label}</text>
                <text x="284" y={y + 22} fontSize="8" fontWeight="500" fill="var(--color-text-primary)" fontFamily="var(--font-sans)">{field.right}</text>
              </motion.g>

              {/* Connection line draws between fields */}
              <motion.line
                x1="204" y1={y + 14} x2="276" y2={y + 14}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: delay + 0.2, duration: 0.4, ease: [0, 0, 0.2, 1] }}
              />

              {/* Status dot at midpoint */}
              <motion.svg x="236" y={y + 10} overflow="visible">
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
          <rect x="16" y="320" width="448" height="32" rx="6" fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx="36" cy="336" r="4" fill="var(--color-verified)" />
          <text x="46" y="339" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">4 Verified</text>
          <circle cx="120" cy="336" r="4" fill="var(--color-flagged)" />
          <text x="130" y="339" fontSize="8" fill="var(--color-text-secondary)" fontFamily="var(--font-sans)">2 Flagged</text>
        </motion.g>
      </svg>
    </div>
  )
}
