"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { DURATION } from "@/lib/animation"

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export function CountUp({
  target,
  suffix = "",
  duration = DURATION.countUp,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    if (reduced) {
      setValue(target)
      return
    }

    const start = performance.now()
    const durationMs = duration * 1000

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, target, duration, reduced])

  return (
    <span ref={ref} className={className} style={style}>
      {value}
      {suffix}
    </span>
  )
}
