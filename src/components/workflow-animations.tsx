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

// ─── How It Works Step Animations ───
// Continuous loop while in view

/** Documents flowing with comet-trail effect */
export function IngestAnimation() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  // 3 doc templates at different y positions with varied field layouts
  const templates = [
    { y: 20, header: 18, fields: [[22, 10], [16, 14], [20, 8], [12, 16]] },
    { y: 68, header: 14, fields: [[18, 12], [22, 10], [14, 16], [20, 12]] },
    { y: 116, header: 20, fields: [[16, 14], [20, 12], [18, 10], [22, 8]] },
  ]
  // Non-repeating sequence of which row each doc appears on (0=top, 1=mid, 2=bottom)
  // 6-item cycle so the pattern doesn't feel mechanical
  const sequence = [0, 2, 1, 2, 0, 1]
  const dur = 3.5
  const stagger = dur / 3
  const totalCycle = sequence.length * stagger
  const repeatDelay = totalCycle - dur

  return (
    <svg ref={ref} viewBox="0 0 320 160" fill="none" className="w-full h-full" style={{ overflow: "visible" }} aria-hidden="true">
      <defs>
        <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#006AAE" stopOpacity="0" />
          <stop offset="100%" stopColor="#006AAE" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {sequence.map((tIdx, i) => {
        const doc = templates[tIdx]
        return (
          <motion.g
            key={i}
            animate={play
              ? { x: [-40, 320], opacity: [0, 1, 1, 0] }
              : { x: -40, opacity: 0 }}
            transition={play
              ? {
                  x: { duration: dur, delay: i * stagger, repeat: Infinity, repeatDelay, ease: "linear" },
                  opacity: { duration: dur, delay: i * stagger, repeat: Infinity, repeatDelay, ease: "linear", times: [0, 0.08, 0.88, 1] },
                }
              : { duration: 0.2 }}
          >
            {/* Comet trail */}
            <rect x={-90} y={doc.y + 4} width="90" height="16" rx="8" fill="url(#trail)" />
            {/* Document body */}
            <rect x={0} y={doc.y} width="30" height="40" rx="3"
              fill="white" stroke="#006AAE" strokeWidth="1" />
            {/* Corner fold */}
            <path d={`M22 ${doc.y} L22 ${doc.y + 6} L30 ${doc.y + 6}`} fill="#D6EDFB" />
            <path d={`M22 ${doc.y} L30 ${doc.y + 6}`} stroke="#006AAE" strokeWidth="0.5" opacity="0.4" />
            {/* ACORD-style header */}
            <rect x={0} y={doc.y} width="30" height="8" rx="3" fill="#003263" />
            <rect x={0} y={doc.y + 3} width="30" height="5" fill="#003263" />
            <text x={3} y={doc.y + 6} fontSize="3.5" fontWeight="700" fill="white" fontFamily="var(--font-sans)">ACORD</text>
            {/* Field rows */}
            {doc.fields.map(([labelW, valueW], fi) => {
              const fy = doc.y + 13 + fi * 7
              return (
                <g key={fi}>
                  <rect x={4} y={fy} width={labelW} height="2" rx="1" fill="var(--color-border)" opacity="0.3" />
                  <rect x={4} y={fy + 3} width={valueW} height="1.5" rx="0.75" fill="var(--color-border)" opacity="0.2" />
                </g>
              )
            })}
          </motion.g>
        )
      })}
    </svg>
  )
}

/** Laser beam driven by requestAnimationFrame for reliable y-position animation */
function LaserBeam({ play, laserTop, laserBot, dur, scanEnd }: {
  play: boolean; laserTop: number; laserBot: number; dur: number; scanEnd: number
}) {
  const gRef = useRef<SVGGElement>(null)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!play) {
      if (gRef.current) gRef.current.style.opacity = "0"
      startRef.current = null
      cancelAnimationFrame(rafRef.current)
      return
    }

    function tick(now: number) {
      if (!gRef.current) return
      if (startRef.current === null) startRef.current = now

      const elapsed = (now - startRef.current) / 1000
      const t = (elapsed % dur) / dur // normalized 0-1 within cycle

      let currentY: number
      let currentOpacity: number

      if (t < scanEnd) {
        // Scanning down with ease-out (decelerates toward bottom)
        const linear = t / scanEnd
        const eased = 1 - (1 - linear) * (1 - linear) // quadratic ease-out
        currentY = laserTop + (laserBot - laserTop) * eased
        // Fade in during first 5% of scan
        currentOpacity = Math.min(1, linear / 0.05)
      } else if (t < scanEnd + 0.04) {
        // Fade out at bottom
        currentY = laserBot
        currentOpacity = 1 - (t - scanEnd) / 0.04
      } else {
        // Invisible, parked at top
        currentY = laserTop
        currentOpacity = 0
      }

      gRef.current.style.transform = `translateY(${currentY}px)`
      gRef.current.style.opacity = String(currentOpacity)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [play, laserTop, laserBot, dur, scanEnd])

  return (
    <g ref={gRef} style={{ opacity: 0 }}>
      {/* Sharp scanning line */}
      <rect x={5} y={-1} width={350} height={2} rx={1} fill="#2AA0E6" opacity={0.5} />
      {/* 3 glow lines below — decreasing opacity for depth */}
      <rect x={5} y={1} width={350} height={2} fill="#2AA0E6" opacity={0.22} />
      <rect x={5} y={3} width={350} height={2} fill="#2AA0E6" opacity={0.1} />
      <rect x={5} y={5} width={350} height={2} fill="#2AA0E6" opacity={0.04} />
    </g>
  )
}

/** Dual-document laser scan: horizontal beam sweeps both docs, fields highlight */
export function AnalyzeAnimation() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  const DUR = 7

  // Document dimensions
  const DOC_W = 140
  const DOC_H = 160
  const DOC_A_X = 10
  const DOC_B_X = 210
  const DOC_Y = 10

  // Field row y-positions (absolute, same for both docs)
  const fieldYs = [38, 62, 86, 110, 134]
  const FIELD_H = 16

  // Laser scan range (top to bottom of documents)
  const LASER_TOP = DOC_Y
  const LASER_BOT = DOC_Y + DOC_H
  const SCAN_END = 0.50 // fraction of cycle spent scanning

  // Field label/value widths per document (varied for realism)
  const docAFields = [
    { labelW: 50, valueW: 90 },
    { labelW: 40, valueW: 105 },
    { labelW: 55, valueW: 80 },
    { labelW: 45, valueW: 95 },
    { labelW: 60, valueW: 70 },
  ]
  const docBFields = [
    { labelW: 45, valueW: 95 },
    { labelW: 55, valueW: 85 },
    { labelW: 38, valueW: 100 },
    { labelW: 50, valueW: 90 },
    { labelW: 42, valueW: 80 },
  ]

  // Calculate when laser reaches each field (as fraction of total cycle)
  // Calculate when laser reaches each field, accounting for ease-out curve
  // Inverse of easeOut(t) = 1-(1-t)^2: t = 1 - sqrt(1 - progress)
  const fieldActivationTimes = fieldYs.map((y) => {
    const progress = (y + FIELD_H / 2 - LASER_TOP) / (LASER_BOT - LASER_TOP)
    const linearT = 1 - Math.sqrt(1 - progress)
    return linearT * SCAN_END
  })

  // Helper to render a static document shell
  const renderDoc = (x: number, label: string, fields: { labelW: number; valueW: number }[]) => (
    <g>
      <rect x={x} y={DOC_Y} width={DOC_W} height={DOC_H} rx={5}
        fill="white" stroke="#006AAE" strokeWidth={1.2} />
      {/* Header bar */}
      <rect x={x} y={DOC_Y} width={DOC_W} height={18} rx={5} fill="#003263" />
      <rect x={x} y={DOC_Y + 14} width={DOC_W} height={4} fill="#003263" />
      <text x={x + 10} y={DOC_Y + 13} fontSize="8" fontWeight={700} fill="white"
        fontFamily="var(--font-sans)">{label}</text>
      {/* Corner fold */}
      <path d={`M${x + DOC_W - 18} ${DOC_Y} L${x + DOC_W - 18} ${DOC_Y + 10} L${x + DOC_W} ${DOC_Y + 10}`}
        fill="#D6EDFB" />
      {/* Field placeholder rows */}
      {fields.map((f, i) => (
        <g key={`field-${i}`}>
          <rect x={x + 8} y={fieldYs[i]} width={f.labelW} height={2.5} rx={1.2}
            fill="#003263" opacity={0.12} />
          <rect x={x + 8} y={fieldYs[i] + 5} width={f.valueW} height={2.5} rx={1}
            fill="#003263" opacity={0.08} />
          <rect x={x + 8} y={fieldYs[i] + 10} width={f.labelW * 0.6} height={2} rx={1}
            fill="#003263" opacity={0.05} />
        </g>
      ))}
    </g>
  )

  // Helper to render blue pulse flash on each field as laser crosses it
  const renderFieldFlashes = (x: number, fields: { labelW: number; valueW: number }[]) =>
    fields.map((f, i) => {
      const tActivate = fieldActivationTimes[i]
      return (
        <motion.g
          key={`flash-${x}-${i}`}
          animate={play
            ? { opacity: [0, 0, 0.7, 0, 0] }
            : { opacity: 0 }}
          transition={play
            ? {
                duration: DUR, repeat: Infinity,
                times: [0, Math.max(0, tActivate - 0.005), tActivate + 0.01, tActivate + 0.06, 1],
                ease: "linear",
              }
            : { duration: 0.2 }}
        >
          {/* Blue flash overlay on text placeholder lines */}
          <rect x={x + 8} y={fieldYs[i]} width={f.labelW} height={2.5} rx={1.2} fill="#2AA0E6" />
          <rect x={x + 8} y={fieldYs[i] + 5} width={f.valueW} height={2.5} rx={1} fill="#2AA0E6" />
          <rect x={x + 8} y={fieldYs[i] + 10} width={f.labelW * 0.6} height={2} rx={1} fill="#2AA0E6" />
        </motion.g>
      )
    })

  return (
    <svg ref={ref} viewBox="0 0 360 180" fill="none" className="w-full h-full" aria-hidden="true">
      {/* ─── Static: Documents ─── */}
      {renderDoc(DOC_A_X, "Insurance Requirements", docAFields)}
      {renderDoc(DOC_B_X, "ACORD", docBFields)}

      {/* ─── Animated: Blue pulse flashes as laser crosses fields ─── */}
      {renderFieldFlashes(DOC_A_X, docAFields)}
      {renderFieldFlashes(DOC_B_X, docBFields)}

      {/* ─── Animated: Laser beam (rAF-driven, not Motion) ─── */}
      <LaserBeam play={play} laserTop={LASER_TOP} laserBot={LASER_BOT} dur={DUR} scanEnd={SCAN_END} />
    </svg>
  )
}

/** Post-analysis output: two documents with colored fields, connection lines, cycling flagged position, mini results panel */
export function OutputAnimation() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  const DUR = 8

  // Document dimensions (bigger than AnalyzeAnimation)
  const DOC_W = 155
  const DOC_H = 175
  const DOC_A_X = 10
  const DOC_B_X = 220
  const DOC_Y = 10

  // Field row y-positions
  const fieldYs = [40, 66, 92, 118, 144]
  const FIELD_H = 18

  // Cycling flagged field position
  const flaggedSequence = [2, 0, 4, 1, 3]
  const [cycle, setCycle] = useState(0)
  const [flaggedIdx, setFlaggedIdx] = useState(2)

  useEffect(() => {
    if (!inView || reduced) return
    const interval = setInterval(() => {
      setCycle((c) => c + 1)
      setFlaggedIdx(flaggedSequence[(cycle + 1) % flaggedSequence.length])
    }, DUR * 1000)
    return () => clearInterval(interval)
  }, [inView, reduced, cycle])

  // Field label/value widths per document (varied for realism)
  const docAFields = [
    { labelW: 55, valueW: 100 },
    { labelW: 45, valueW: 115 },
    { labelW: 60, valueW: 88 },
    { labelW: 50, valueW: 105 },
    { labelW: 65, valueW: 78 },
  ]
  const docBFields = [
    { labelW: 50, valueW: 105 },
    { labelW: 60, valueW: 92 },
    { labelW: 42, valueW: 110 },
    { labelW: 55, valueW: 98 },
    { labelW: 48, valueW: 88 },
  ]

  // Mini results panel
  const PANEL_X = 395
  const PANEL_W = 90
  const PANEL_H = 155
  const PANEL_Y = DOC_Y + 10

  // Connection midpoint X
  const MID_X = (DOC_A_X + DOC_W + DOC_B_X) / 2

  // Render a document shell (no fields — fields rendered separately for stagger)
  const renderDocShell = (x: number, label: string) => (
    <g>
      <rect x={x} y={DOC_Y} width={DOC_W} height={DOC_H} rx={5}
        fill="white" stroke="#006AAE" strokeWidth={1.2} />
      <rect x={x} y={DOC_Y} width={DOC_W} height={18} rx={5} fill="#003263" />
      <rect x={x} y={DOC_Y + 14} width={DOC_W} height={4} fill="#003263" />
      <text x={x + 10} y={DOC_Y + 13} fontSize="8" fontWeight={700} fill="white"
        fontFamily="var(--font-sans)">{label}</text>
      <path d={`M${x + DOC_W - 18} ${DOC_Y} L${x + DOC_W - 18} ${DOC_Y + 10} L${x + DOC_W} ${DOC_Y + 10}`}
        fill="#D6EDFB" />
    </g>
  )

  // Render a single field row with status coloring
  const renderField = (x: number, f: { labelW: number; valueW: number }, i: number) => {
    const isFlagged = i === flaggedIdx
    const statusColor = isFlagged ? "#F59E0B" : "#22C55E"
    const bgColor = isFlagged ? "rgba(245, 158, 11, 0.10)" : "rgba(34, 197, 94, 0.08)"
    const barOpacity = isFlagged ? 0.35 : 0.25

    return (
      <g>
        <rect x={x + 5} y={fieldYs[i] - 2} width={DOC_W - 10} height={FIELD_H + 4} rx={3}
          fill={bgColor} />
        <rect x={x + 8} y={fieldYs[i]} width={f.labelW} height={2.5} rx={1.2}
          fill={statusColor} opacity={barOpacity} />
        <rect x={x + 8} y={fieldYs[i] + 5} width={f.valueW} height={2.5} rx={1}
          fill={statusColor} opacity={barOpacity * 0.7} />
        <rect x={x + 8} y={fieldYs[i] + 10} width={f.labelW * 0.6} height={2} rx={1}
          fill={statusColor} opacity={barOpacity * 0.4} />
        <circle cx={x + DOC_W - 12} cy={fieldYs[i] + FIELD_H / 2} r={3.5}
          fill={statusColor} opacity={0.7} />
      </g>
    )
  }

  // Stagger timing for field reveals (fraction of DUR)
  const fieldRevealTime = (i: number) => 0.03 + i * 0.03
  const fieldRevealEnd = (i: number) => fieldRevealTime(i) + 0.03

  return (
    <svg ref={ref} viewBox="0 0 500 210" fill="none" className="w-full h-full" aria-hidden="true">
      {/* ─── Document shells (fade in together) ─── */}
      <motion.g
        key={`shells-${cycle}`}
        initial={{ opacity: 0 }}
        animate={play
          ? { opacity: [0, 1, 1, 0, 0] }
          : { opacity: reduced ? 1 : 0 }}
        transition={play
          ? { duration: DUR, repeat: Infinity, times: [0, 0.02, 0.78, 0.88, 1], ease: "linear" }
          : { duration: 0.2 }}
      >
        {renderDocShell(DOC_A_X, "Insurance Requirements")}
        {renderDocShell(DOC_B_X, "ACORD")}
      </motion.g>

      {/* ─── Staggered field reveals with connection lines (all appear together per field) ─── */}
      {fieldYs.map((_, i) => {
        const tIn = fieldRevealTime(i)
        const tVis = fieldRevealEnd(i)
        const isFlagged = i === flaggedIdx
        const color = isFlagged ? "#F59E0B" : "#22C55E"
        const fieldCenterY = fieldYs[i] + FIELD_H / 2

        return (
          <motion.g
            key={`fields-${cycle}-${i}`}
            initial={{ opacity: 0 }}
            animate={play
              ? { opacity: [0, 0, 1, 1, 0, 0] }
              : { opacity: reduced ? 1 : 0 }}
            transition={play
              ? { duration: DUR, repeat: Infinity, times: [0, tIn, tVis, 0.78, 0.88, 1], ease: "linear" }
              : { duration: 0.2 }}
          >
            {/* Fields on both docs */}
            {renderField(DOC_A_X, docAFields[i], i)}
            {renderField(DOC_B_X, docBFields[i], i)}

            {/* Connection line between matching fields */}
            <line
              x1={DOC_A_X + DOC_W} y1={fieldCenterY}
              x2={DOC_B_X} y2={fieldCenterY}
              stroke={color} strokeWidth={1.2} strokeDasharray="4,3" opacity={0.6}
            />

            {/* Status dot at midpoint */}
            <circle cx={MID_X} cy={fieldCenterY} r={6} fill="white" stroke={color} strokeWidth={1.3} />
            {isFlagged ? (
              <text x={MID_X} y={fieldCenterY + 3} fontSize="7" fontWeight={700} fill={color}
                fontFamily="var(--font-sans)" textAnchor="middle">!</text>
            ) : (
              <path
                d={`M${MID_X - 2.5} ${fieldCenterY + 0.5} L${MID_X - 0.5} ${fieldCenterY + 2.5} L${MID_X + 3} ${fieldCenterY - 1.5}`}
                stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            )}
          </motion.g>
        )
      })}

      {/* ─── Mini results panel ─── */}
      <motion.g
        key={`panel-${cycle}`}
        initial={{ opacity: 0 }}
        animate={play
          ? { opacity: [0, 0, 1, 1, 0, 0] }
          : { opacity: reduced ? 1 : 0 }}
        transition={play
          ? { duration: DUR, repeat: Infinity, times: [0, 0.02, 0.06, 0.78, 0.88, 1], ease: "linear" }
          : { duration: 0.2 }}
      >
        {/* Panel background */}
        <rect x={PANEL_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx={5}
          fill="white" stroke="#CBD5E1" strokeWidth={0.8} />

        {/* Panel header */}
        <text x={PANEL_X + PANEL_W / 2} y={PANEL_Y + 15} fontSize="7.5" fontWeight={700}
          fill="#374151" fontFamily="var(--font-sans)" textAnchor="middle">Results</text>
        <line x1={PANEL_X + 8} y1={PANEL_Y + 22} x2={PANEL_X + PANEL_W - 8} y2={PANEL_Y + 22}
          stroke="#E5E7EB" strokeWidth={0.5} />

        {/* Status rows */}
        {fieldYs.map((_, i) => {
          const isFlagged = i === flaggedIdx
          const color = isFlagged ? "#F59E0B" : "#22C55E"
          const rowY = PANEL_Y + 32 + i * 24
          const tIn = fieldRevealTime(i)
          const tVis = fieldRevealEnd(i)

          return (
            <motion.g
              key={`result-${cycle}-${i}`}
              initial={{ opacity: 0 }}
              animate={play
                ? { opacity: [0, 0, 1, 1, 0, 0] }
                : { opacity: reduced ? 1 : 0 }}
              transition={play
                ? { duration: DUR, repeat: Infinity, times: [0, tIn, tVis, 0.78, 0.88, 1], ease: "linear" }
                : { duration: 0.2 }}
            >
              {/* Status circle */}
              <circle cx={PANEL_X + 18} cy={rowY} r={5.5} fill={color} />
              {isFlagged ? (
                <text x={PANEL_X + 18} y={rowY + 3.5} fontSize="7.5" fontWeight={700} fill="white"
                  fontFamily="var(--font-sans)" textAnchor="middle">!</text>
              ) : (
                <path
                  d={`M${PANEL_X + 15} ${rowY + 0.5} L${PANEL_X + 17} ${rowY + 2.5} L${PANEL_X + 21} ${rowY - 1.5}`}
                  stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
                />
              )}
              {/* Placeholder bars */}
              <rect x={PANEL_X + 30} y={rowY - 3} width={isFlagged ? 40 : 46} height={2.5} rx={1.2}
                fill={color} opacity={0.2} />
              <rect x={PANEL_X + 30} y={rowY + 2} width={isFlagged ? 32 : 38} height={2} rx={1}
                fill={color} opacity={0.12} />
            </motion.g>
          )
        })}
      </motion.g>
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
