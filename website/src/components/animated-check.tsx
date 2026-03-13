"use client"

import { motion, useReducedMotion } from "motion/react"

interface AnimatedCheckProps {
  delay?: number
}

export function AnimatedCheck({ delay = 0 }: AnimatedCheckProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  }

  return (
    <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <motion.polyline
        points="20 6 9 17 4 12"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          pathLength: { delay: delay + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          opacity: { delay: delay + 0.3, duration: 0.1 },
        }}
      />
    </svg>
  )
}
