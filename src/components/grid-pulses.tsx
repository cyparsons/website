"use client"

import { motion, useReducedMotion } from "motion/react"

interface Pulse {
  /** "h" = horizontal (travels left→right), "v" = vertical (travels top→bottom) */
  direction: "h" | "v"
  /** Grid line position — multiplied by 48px */
  gridLine: number
  /** Animation duration in seconds */
  duration: number
  /** Delay before first run (seconds) */
  delay: number
  /** Pulse length in px */
  length?: number
}

const GRID = 48 // matches bg-line-grid-fade

const DEFAULT_PULSES: Pulse[] = [
  // Reduced from 5 to 2 for Safari performance — fewer infinite animations
  { direction: "h", gridLine: 5,  duration: 18, delay: 0,   length: 140 },
  { direction: "v", gridLine: 10, duration: 20, delay: 3,   length: 130 },
]

export function GridPulses({
  pulses = DEFAULT_PULSES,
  variant = "light",
}: {
  pulses?: Pulse[]
  variant?: "light" | "dark"
}) {
  const reduced = useReducedMotion()

  if (reduced) return null

  const color = variant === "dark"
    ? "rgba(42, 160, 230, 0.25)"
    : "rgba(42, 160, 230, 0.18)"

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pulses.map((p, i) => {
        const len = p.length ?? 130
        const pos = p.gridLine * GRID

        if (p.direction === "h") {
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: pos,
                left: 0,
                width: len,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                willChange: "transform",
              }}
              animate={{ x: ["calc(-100%)", "calc(100vw + 100%)"] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )
        }

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: pos,
              top: 0,
              height: len,
              width: 1,
              background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
              willChange: "transform",
            }}
            animate={{ y: ["calc(-100%)", "calc(100vh + 100%)"] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}
