"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

export function AnimatedDivider() {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className="divider-gradient mx-auto max-w-5xl" />
  }

  return (
    <div className="mx-auto max-w-5xl overflow-hidden">
      <motion.div
        className="divider-gradient h-px"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE.smooth }}
      />
    </div>
  )
}
