"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

// ─── Colors ───

const C = {
  accent: "#2AA0E6",
  medium: "#006AAE",
  navy: "#003263",
  verified: "#22C55E",
  verifiedBg: "rgba(34, 197, 94, 0.12)",
  flagged: "#F59E0B",
  flaggedBg: "rgba(245, 158, 11, 0.12)",
  border: "#CBD5E1",
  faint: "#94A3B8",
  white: "white",
  fold: "#D6EDFB",
}

// ─── Layout ───

const SCAN_Y = 310
const OUT_Y = 420
const SVG_W = 420
const SVG_H = 620
const DUR = 10
const DOC_W = 80
const DOC_H = 105

// Field layout inside each doc
const FIELD_START = 22
const FIELD_H = 24
const FIELD_GAP = 4

const FIELDS = [
  { status: "verified" as const },
  { status: "flagged" as const },
  { status: "verified" as const },
]

// ─── Document body (static SVG, no animation) ───

function DocBody({ label }: { label?: string }) {
  return (
    <g>
      <rect x={0} y={0} width={DOC_W} height={DOC_H} rx={4}
        fill={C.white} stroke={C.medium} strokeWidth={1.2} />
      {/* Header */}
      <rect x={0} y={0} width={DOC_W} height={16} rx={4} fill={C.navy} />
      <rect x={0} y={12} width={DOC_W} height={4} fill={C.navy} />
      {label && (
        <text x={8} y={12} fontSize="8" fontWeight={700} fill="white" fontFamily="var(--font-sans)">{label}</text>
      )}
      {/* Corner fold */}
      <path d={`M${DOC_W - 18} 0 L${DOC_W - 18} 10 L${DOC_W} 10`} fill={C.fold} />
      {/* Field placeholders (gray) */}
      {FIELDS.map((_, i) => {
        const fy = FIELD_START + i * (FIELD_H + FIELD_GAP)
        return (
          <g key={i}>
            <rect x={6} y={fy} width={DOC_W - 12} height={FIELD_H} rx={2.5}
              fill={C.faint} opacity={0.06} />
            <rect x={10} y={fy + 5} width={35} height={2.5} rx={1} fill={C.faint} opacity={0.15} />
            <rect x={10} y={fy + 11} width={50} height={2.5} rx={1} fill={C.faint} opacity={0.1} />
            <rect x={10} y={fy + 17} width={28} height={2} rx={1} fill={C.faint} opacity={0.07} />
          </g>
        )
      })}
    </g>
  )
}

// ─── One document's full journey ───

function DocJourney({
  play,
  yKeys, yTimes,
  xKeys, xTimes,
  opKeys, opTimes,
  fieldOnTimes,
  trailOpKeys, trailOpTimes,
  label,
}: {
  play: boolean
  yKeys: number[]; yTimes: number[]
  xKeys: number[]; xTimes: number[]
  opKeys: number[]; opTimes: number[]
  fieldOnTimes: number[] // [invisible..., visible..., fadeout]
  trailOpKeys: number[]; trailOpTimes: number[]
  label: string
}) {
  return (
    <motion.g
      animate={play
        ? { y: yKeys, x: xKeys, opacity: opKeys }
        : { y: yKeys[0], x: xKeys[0], opacity: 0 }}
      transition={play
        ? {
            duration: DUR,
            repeat: Infinity,
            y: { times: yTimes, ease: "easeInOut" },
            x: { times: xTimes, ease: "easeInOut" },
            opacity: { times: opTimes, ease: "linear" },
          }
        : { duration: 0.2 }}
    >
      {/* Comet trail (fades during settling) */}
      <motion.rect
        x={DOC_W / 2 - 12} y={-50} width={24} height={45} rx={12}
        fill="url(#trail-v)"
        animate={play
          ? { opacity: trailOpKeys }
          : { opacity: 0 }}
        transition={play
          ? { duration: DUR, repeat: Infinity, times: trailOpTimes, ease: "linear" }
          : { duration: 0.2 }}
      />

      {/* Document */}
      <DocBody label={label} />

      {/* Field color overlays (appear when crossing scanner) */}
      {FIELDS.map((f, i) => {
        const fy = FIELD_START + i * (FIELD_H + FIELD_GAP)
        const color = f.status === "verified" ? C.verified : C.flagged
        const bg = f.status === "verified" ? C.verifiedBg : C.flaggedBg
        // Stagger each field slightly
        const stagger = i * 0.02
        const times = fieldOnTimes.map((t) => Math.min(1, t + stagger))
        const opVals = times.length === 5
          ? [0, 0, 1, 1, 0]
          : [0, 0, 0, 1, 1, 0]
        return (
          <motion.g
            key={`field-${i}`}
            animate={play ? { opacity: opVals } : { opacity: 0 }}
            transition={play
              ? { duration: DUR, repeat: Infinity, times, ease: "linear" }
              : { duration: 0.2 }}
          >
            <rect x={5} y={fy - 1} width={DOC_W - 10} height={FIELD_H + 2} rx={3} fill={bg} />
            <rect x={10} y={fy + 5} width={35} height={2.5} rx={1} fill={color} opacity={0.4} />
            <rect x={10} y={fy + 11} width={50} height={2.5} rx={1} fill={color} opacity={0.3} />
            <rect x={10} y={fy + 17} width={28} height={2} rx={1} fill={color} opacity={0.2} />
          </motion.g>
        )
      })}
    </motion.g>
  )
}

// ─── Scanner line + AI sparkle ───

function Scanner({ play }: { play: boolean }) {
  const cx = SVG_W / 2
  return (
    <g>
      {/* Beam line */}
      <line x1={30} y1={SCAN_Y} x2={SVG_W - 30} y2={SCAN_Y}
        stroke={C.accent} strokeWidth={1.5} opacity={0.25} />
      {/* Pulsing glow */}
      <motion.line
        x1={30} y1={SCAN_Y} x2={SVG_W - 30} y2={SCAN_Y}
        stroke={C.accent} strokeWidth={4}
        animate={play
          ? { opacity: [0.04, 0.15, 0.04] }
          : { opacity: 0.04 }}
        transition={play
          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }}
      />

      {/* 4-pointed AI sparkle */}
      <motion.g
        animate={play
          ? { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }
          : { scale: 1, opacity: 0.75 }}
        transition={play
          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }}
        style={{ transformOrigin: `${cx}px ${SCAN_Y}px` }}
      >
        {/* Outer star */}
        <path
          d={`M${cx} ${SCAN_Y - 16} L${cx + 6} ${SCAN_Y - 3} L${cx + 16} ${SCAN_Y} L${cx + 6} ${SCAN_Y + 3} L${cx} ${SCAN_Y + 16} L${cx - 6} ${SCAN_Y + 3} L${cx - 16} ${SCAN_Y} L${cx - 6} ${SCAN_Y - 3} Z`}
          fill={C.accent}
        />
        {/* Inner bright core */}
        <path
          d={`M${cx} ${SCAN_Y - 7} L${cx + 3} ${SCAN_Y - 1.5} L${cx + 7} ${SCAN_Y} L${cx + 3} ${SCAN_Y + 1.5} L${cx} ${SCAN_Y + 7} L${cx - 3} ${SCAN_Y + 1.5} L${cx - 7} ${SCAN_Y} L${cx - 3} ${SCAN_Y - 1.5} Z`}
          fill={C.white} opacity={0.85}
        />
      </motion.g>
    </g>
  )
}

// ─── Comparison results (appear after docs settle) ───

function ComparisonResults({ play }: { play: boolean }) {
  const aX = 40 + DOC_W   // right edge of doc A
  const bX = 260           // left edge of doc B

  return (
    <g>
      {FIELDS.map((f, i) => {
        const color = f.status === "verified" ? C.verified : C.flagged
        const bg = f.status === "verified" ? C.verifiedBg : C.flaggedBg
        const fy = OUT_Y + FIELD_START + i * (FIELD_H + FIELD_GAP)
        const lineY = fy + FIELD_H / 2
        const midX = (aX + bX) / 2
        const delay = i * 0.03

        return (
          <motion.g
            key={`comp-${i}`}
            animate={play
              ? { opacity: [0, 0, 1, 1, 0] }
              : { opacity: 0 }}
            transition={play
              ? { duration: DUR, repeat: Infinity, times: [0, 0.54 + delay, 0.60 + delay, 0.80, 0.90], ease: "linear" }
              : { duration: 0.2 }}
          >
            {/* Highlight rects on both docs */}
            <rect x={40 + 4} y={fy - 2} width={DOC_W - 8} height={FIELD_H + 4} rx={3.5} fill={bg} />
            <rect x={260 + 4} y={fy - 2} width={DOC_W - 8} height={FIELD_H + 4} rx={3.5} fill={bg} />
            {/* Connection line */}
            <line x1={aX + 2} y1={lineY} x2={bX - 2} y2={lineY}
              stroke={color} strokeWidth={1.2} strokeDasharray="5,4" />
            {/* Status dot */}
            <circle cx={midX} cy={lineY} r={8}
              fill={C.white} stroke={color} strokeWidth={1.5} />
            <circle cx={midX} cy={lineY} r={4} fill={color} />
          </motion.g>
        )
      })}

      {/* Summary bar */}
      <motion.g
        animate={play
          ? { opacity: [0, 0, 1, 1, 0] }
          : { opacity: 0 }}
        transition={play
          ? { duration: DUR, repeat: Infinity, times: [0, 0.62, 0.68, 0.80, 0.90], ease: "linear" }
          : { duration: 0.2 }}
      >
        <rect x={SVG_W / 2 - 100} y={OUT_Y + DOC_H + 20} width={200} height={26} rx={8}
          fill={C.white} stroke={C.border} strokeWidth={0.8} />
        <circle cx={SVG_W / 2 - 55} cy={OUT_Y + DOC_H + 33} r={4.5} fill={C.verified} />
        <text x={SVG_W / 2 - 45} y={OUT_Y + DOC_H + 37} fontSize="9" fill={C.faint} fontFamily="var(--font-sans)" fontWeight={500}>2 Verified</text>
        <circle cx={SVG_W / 2 + 35} cy={OUT_Y + DOC_H + 33} r={4.5} fill={C.flagged} />
        <text x={SVG_W / 2 + 45} y={OUT_Y + DOC_H + 37} fontSize="9" fill={C.faint} fontFamily="var(--font-sans)" fontWeight={500}>1 Flagged</text>
      </motion.g>
    </g>
  )
}

// ─── Main Pipeline Animation ───

export function PipelineAnimation({ activePhase = 0 }: { activePhase?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.05 })
  const reduced = useReducedMotion()
  const play = inView && !reduced

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      fill="none"
      className="h-full w-full"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trail-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.medium} stopOpacity="0" />
          <stop offset="100%" stopColor={C.medium} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Zone highlights */}
      {[
        { top: 0, bot: 280, phase: 0 },
        { top: 280, bot: 350, phase: 1 },
        { top: 350, bot: SVG_H, phase: 2 },
      ].map((z) => (
        <motion.rect
          key={z.phase}
          x={0} y={z.top} width={SVG_W} height={z.bot - z.top}
          rx={8} fill={C.accent}
          animate={{ opacity: activePhase === z.phase ? 0.04 : 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Zone dividers */}
      <line x1={30} y1={280} x2={SVG_W - 30} y2={280}
        stroke={C.border} strokeWidth={0.5} opacity={0.2} />
      <line x1={30} y1={350} x2={SVG_W - 30} y2={350}
        stroke={C.border} strokeWidth={0.5} opacity={0.2} />

      {/* Scanner beam + AI sparkle */}
      <Scanner play={play} />

      {/* Doc A journey: top-center-left → scanner → bottom-left */}
      <DocJourney
        play={play}
        label="COI"
        yKeys={[-60, SCAN_Y - DOC_H / 2, OUT_Y, OUT_Y, OUT_Y]}
        yTimes={[0, 0.25, 0.40, 0.85, 1]}
        xKeys={[130, 130, 40, 40, 130]}
        xTimes={[0, 0.25, 0.40, 0.85, 1]}
        opKeys={[0, 1, 1, 1, 0]}
        opTimes={[0, 0.04, 0.40, 0.83, 0.93]}
        fieldOnTimes={[0, 0.23, 0.29, 0.83, 0.93]}
        trailOpKeys={[0, 0.2, 0.2, 0, 0]}
        trailOpTimes={[0, 0.05, 0.20, 0.32, 1]}
      />

      {/* Doc B journey: top-center-right → scanner → bottom-right */}
      <DocJourney
        play={play}
        label="Schedule"
        yKeys={[-60, -60, SCAN_Y - DOC_H / 2, OUT_Y, OUT_Y, OUT_Y]}
        yTimes={[0, 0.10, 0.35, 0.52, 0.85, 1]}
        xKeys={[260, 260, 260, 260, 260, 260]}
        xTimes={[0, 0.10, 0.35, 0.52, 0.85, 1]}
        opKeys={[0, 0, 1, 1, 1, 0]}
        opTimes={[0, 0.10, 0.14, 0.52, 0.83, 0.93]}
        fieldOnTimes={[0, 0.10, 0.33, 0.39, 0.83, 0.93]}
        trailOpKeys={[0, 0, 0.2, 0.2, 0, 0]}
        trailOpTimes={[0, 0.11, 0.15, 0.28, 0.40, 1]}
      />

      {/* Comparison lines + status dots (appear after both docs settle) */}
      <ComparisonResults play={play} />
    </svg>
  )
}
