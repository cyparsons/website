"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

interface IconProps {
  className?: string
  delay?: number
}

const pathTransition = (delay: number) => ({
  pathLength: { duration: 0.8, delay, ease: EASE.smooth },
  opacity: { duration: 0.2, delay },
})

// Problem card: Manual — stylized document with lines being read
export function ManualIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Document outline */}
      <motion.path
        d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
        {...props}
        transition={pathTransition(delay)}
      />
      {/* Folded corner */}
      <motion.path
        d="M14 2v6h6"
        {...props}
        transition={pathTransition(delay + 0.2)}
      />
      {/* Text lines */}
      <motion.line x1="8" y1="13" x2="16" y2="13" {...props} transition={pathTransition(delay + 0.4)} />
      <motion.line x1="8" y1="17" x2="13" y2="17" {...props} transition={pathTransition(delay + 0.5)} />
      {/* Scanning cursor */}
      <motion.line
        x1="7" y1="13" x2="7" y2="17"
        stroke="var(--color-flagged)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.6)}
      />
    </svg>
  )
}

// Problem card: Repetitive — circular arrows (loop)
export function RepetitiveIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Top arc */}
      <motion.path
        d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-7.5 4"
        {...props}
        transition={pathTransition(delay)}
      />
      {/* Bottom arc */}
      <motion.path
        d="M3 12a9 9 0 0 0 9 9 9 9 0 0 0 7.5-4"
        {...props}
        transition={pathTransition(delay + 0.3)}
      />
      {/* Top arrow head */}
      <motion.polyline
        points="4.5 3 4.5 7 8.5 7"
        {...props}
        transition={pathTransition(delay + 0.5)}
      />
      {/* Bottom arrow head */}
      <motion.polyline
        points="19.5 21 19.5 17 15.5 17"
        {...props}
        transition={pathTransition(delay + 0.6)}
      />
    </svg>
  )
}

// Problem card: Risky — shield with crack/warning
export function RiskyIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Shield outline */}
      <motion.path
        d="M12 2l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V6l8-4z"
        {...props}
        transition={pathTransition(delay)}
      />
      {/* Warning exclamation */}
      <motion.line
        x1="12" y1="9" x2="12" y2="13"
        stroke="var(--color-flagged)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.4)}
      />
      <motion.circle
        cx="12" cy="16" r="0.5"
        fill="var(--color-flagged)"
        stroke="var(--color-flagged)"
        strokeWidth="1"
        {...(reduced ? {} : {
          initial: { scale: 0, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true, amount: 0.5 },
        })}
        transition={{ delay: delay + 0.6, duration: 0.3, ease: EASE.smooth }}
      />
    </svg>
  )
}

// Solution card: COI Verification — shield with checkmark
export function VerificationIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Shield */}
      <motion.path
        d="M12 2l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V6l8-4z"
        {...props}
        transition={pathTransition(delay)}
      />
      {/* Checkmark */}
      <motion.polyline
        points="8.5 12.5 11 15 15.5 10"
        stroke="var(--color-verified)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.4)}
      />
    </svg>
  )
}

// Solution card: Lien Validation — magnifying glass over document
export function LienIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Document */}
      <motion.path
        d="M5 3h10l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        {...props}
        transition={pathTransition(delay)}
      />
      <motion.path d="M15 3v4h4" {...props} transition={pathTransition(delay + 0.15)} />
      {/* Text lines */}
      <motion.line x1="7" y1="11" x2="13" y2="11" {...props} transition={pathTransition(delay + 0.3)} />
      <motion.line x1="7" y1="15" x2="11" y2="15" {...props} transition={pathTransition(delay + 0.35)} />
      {/* Magnifying glass */}
      <motion.circle
        cx="17" cy="17" r="3"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        {...props}
        transition={pathTransition(delay + 0.5)}
      />
      <motion.line
        x1="19.5" y1="19.5" x2="22" y2="22"
        stroke="var(--color-accent)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.6)}
      />
    </svg>
  )
}

// Solution card: Debtor Search — stacked pages with extraction
export function SearchIcon({ className = "h-6 w-6", delay = 0 }: IconProps) {
  const reduced = useReducedMotion()
  const props = reduced
    ? { pathLength: 1, opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Back page */}
      <motion.rect
        x="6" y="2" width="14" height="18" rx="2"
        opacity="0.3"
        {...props}
        transition={pathTransition(delay)}
      />
      {/* Middle page */}
      <motion.rect
        x="4" y="4" width="14" height="18" rx="2"
        opacity="0.6"
        {...props}
        transition={pathTransition(delay + 0.15)}
      />
      {/* Front page */}
      <motion.rect
        x="2" y="6" width="14" height="18" rx="2"
        {...props}
        transition={pathTransition(delay + 0.3)}
      />
      {/* Extraction arrow */}
      <motion.path
        d="M18 13l3-3-3-3"
        stroke="var(--color-accent)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.5)}
      />
      <motion.line
        x1="14" y1="10" x2="21" y2="10"
        stroke="var(--color-accent)"
        strokeWidth="2"
        {...props}
        transition={pathTransition(delay + 0.5)}
      />
    </svg>
  )
}
