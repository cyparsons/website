"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

// ---------- Types ----------

type FieldStatus = "verified" | "flagged"

interface FieldData {
  label: string
  value: string
  status: FieldStatus
  flagReason?: string
}

interface DocData {
  company: string
  fields: FieldData[]
}

type DocState = "waiting" | "pulling" | "active" | "transitioning" | "done"

interface AnimState {
  docStates: [DocState, DocState, DocState]
  cycle: number
}

// ---------- Document data ----------

const docs: DocData[] = [
  {
    company: "Nexus Freight Corp",
    fields: [
      { label: "Named Insured", value: "Nexus Freight Corp", status: "verified" },
      { label: "Policy Number", value: "PLH-0042819", status: "verified" },
      { label: "Serial Number", value: "4UZAANDH5BC...", status: "verified" },
      { label: "Loss Payee", value: "Northern Credit Corp", status: "verified" },
      { label: "Deductible", value: "$2,500", status: "verified" },
    ],
  },
  {
    company: "Redline Transport Inc",
    fields: [
      { label: "Named Insured", value: "Redline Transport Inc", status: "verified" },
      { label: "Policy Expiry", value: "03/22/2027", status: "verified" },
      { label: "Serial Number", value: "1HTMMAAL5CH...", status: "verified" },
      { label: "ACV", value: "$310,000", status: "verified" },
      { label: "Loss Payee", value: "Western Capital Corp", status: "verified" },
    ],
  },
  {
    company: "Pacific Coast Hauling",
    fields: [
      { label: "Named Insured", value: "Pacific Coast Hauling", status: "verified" },
      { label: "Policy Number", value: "CPL-8827103", status: "verified" },
      { label: "Serial Number", value: "3AKJHHDR7DS...", status: "flagged", flagReason: "Mismatch" },
      { label: "Loss Payee", value: "Maple Leaf Leasing", status: "flagged", flagReason: "Not Found" },
      { label: "Deductible", value: "$5,000", status: "verified" },
    ],
  },
]

// ---------- Layout constants ----------

const FONT = "var(--font-sans)"
const VW = 480
const VH = 330

const DOC_W = 200
const DOC_H = 260
const DOC_RX = 6
const HDR_H = 18
const PAD = 8

const FIELD_START_Y = 78
const FIELD_H = 28
const FIELD_GAP = 33
const NUM_FIELDS = 5
const FIELD_W = DOC_W - PAD * 2

const ACTIVE_X = 20
const ACTIVE_Y = 10

const STACK_OFFSET_X = 5
const STACK_OFFSET_Y = 4

const DONE_X = 275
const DONE_Y = 20
const DONE_SCALE = 0.75
const DONE_FAN_X = 5
const DONE_FAN_Y = 4

// ---------- Timing constants ----------

const PULL_DUR = 0.3
const SCAN_DUR = 1.3
const HIGHLIGHT_START = 1.5
const HIGHLIGHT_INTERVAL = 0.22
const BADGE_TIME = 2.8
const DWELL_VERIFIED = 1.0
const DWELL_FLAGGED = 1.5
const SLIDE_TO_DONE_DUR = 0.5

const INITIAL_STATE: AnimState = {
  docStates: ["pulling", "waiting", "waiting"],
  cycle: 0,
}

// ---------- Timeline builder ----------

interface TimelineEntry {
  t: number
  patch: { docStates: [DocState, DocState, DocState] }
}

function buildTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = []

  // Doc 0 (verified) — starts active immediately, no pull from stack
  const d0Active = 1200
  const d0Transition = d0Active + (BADGE_TIME + DWELL_VERIFIED) * 1000
  const d0Done = d0Transition + SLIDE_TO_DONE_DUR * 1000

  entries.push({ t: d0Active, patch: { docStates: ["active", "waiting", "waiting"] } })
  entries.push({ t: d0Transition, patch: { docStates: ["transitioning", "waiting", "waiting"] } })
  entries.push({ t: d0Done, patch: { docStates: ["done", "pulling", "waiting"] } })

  // Doc 1 (verified)
  const d1Active = d0Done + PULL_DUR * 1000
  const d1Transition = d1Active + (BADGE_TIME + DWELL_VERIFIED) * 1000
  const d1Done = d1Transition + SLIDE_TO_DONE_DUR * 1000

  entries.push({ t: d1Active, patch: { docStates: ["done", "active", "waiting"] } })
  entries.push({ t: d1Transition, patch: { docStates: ["done", "transitioning", "waiting"] } })
  entries.push({ t: d1Done, patch: { docStates: ["done", "done", "pulling"] } })

  // Doc 2 (flagged, stays in active position as final frame)
  const d2Active = d1Done + PULL_DUR * 1000

  entries.push({ t: d2Active, patch: { docStates: ["done", "done", "active"] } })

  return entries
}

const TIMELINE = buildTimeline()
// Hold the flagged doc in active position long enough to read, then reset
const CYCLE_END = TIMELINE[TIMELINE.length - 1].t + (BADGE_TIME + DWELL_FLAGGED) * 1000 + 2000

// ---------- Helpers ----------

function computeStackOffset(docIndex: number, docStates: [DocState, DocState, DocState]): number {
  // How many waiting docs come before this one in the queue
  let count = 0
  for (let i = 0; i < docIndex; i++) {
    if (docStates[i] === "waiting") count++
  }
  return count
}

function computeDoneIndex(docIndex: number, docStates: [DocState, DocState, DocState]): number {
  let count = 0
  for (let i = 0; i < docIndex; i++) {
    if (docStates[i] === "done" || docStates[i] === "transitioning") count++
  }
  return count
}

// ---------- Document chrome ----------

function DocChrome({ company }: { company: string }) {
  return (
    <g>
      <rect x={0} y={0} width={DOC_W} height={DOC_H} rx={DOC_RX} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      <rect x={0} y={0} width={DOC_W} height={HDR_H} rx={DOC_RX} fill="var(--color-navy)" />
      <rect x={0} y={DOC_RX} width={DOC_W} height={HDR_H - DOC_RX} fill="var(--color-navy)" />
      <text x={PAD} y={13} fontSize={7} fontWeight={700} fill="white" fontFamily={FONT}>ACORD</text>
      <text x={37} y={10.5} fontSize={3.5} fill="rgba(255,255,255,0.4)" fontFamily={FONT}>&#174;</text>
      <text x={PAD} y={29} fontSize={5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">CERTIFICATE OF LIABILITY INSURANCE</text>
      <text x={PAD} y={42} fontSize={7} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{company}</text>
      <rect x={PAD} y={48} width={95} height={3} rx={1.5} fill="var(--color-border)" opacity={0.25} />
      <rect x={PAD} y={55} width={70} height={3} rx={1.5} fill="var(--color-border)" opacity={0.25} />
      <rect x={PAD} y={62} width={120} height={3} rx={1.5} fill="var(--color-border)" opacity={0.25} />
      <rect x={PAD} y={70} width={FIELD_W} height={4} rx={1.5} fill="var(--color-border)" opacity={0.12} />
      {Array.from({ length: NUM_FIELDS }, (_, i) => (
        <line key={i} x1={PAD} y1={FIELD_START_Y + i * FIELD_GAP + FIELD_H + 1.5} x2={DOC_W - PAD} y2={FIELD_START_Y + i * FIELD_GAP + FIELD_H + 1.5} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.25} />
      ))}
    </g>
  )
}

// ---------- Laser beam (rAF driven) ----------

function LaserBeam({ startDelay }: { startDelay: number }) {
  const ref = useRef<SVGGElement>(null)
  const raf = useRef(0)

  const top = HDR_H + 8
  const bot = DOC_H - 8

  useEffect(() => {
    if (!ref.current) return

    const t0 = performance.now() + startDelay * 1000
    const dur = SCAN_DUR * 1000

    function tick(now: number) {
      if (!ref.current) return
      const elapsed = now - t0
      if (elapsed < 0) {
        ref.current.style.opacity = "0"
        raf.current = requestAnimationFrame(tick)
        return
      }
      const lin = Math.min(elapsed / dur, 1)
      const eased = 1 - (1 - lin) * (1 - lin)
      const y = top + (bot - top) * eased

      ref.current.style.transform = `translateY(${y}px)`
      let op = 1
      if (lin < 0.06) op = lin / 0.06
      else if (lin > 0.9) op = (1 - lin) / 0.1
      ref.current.style.opacity = String(Math.max(op, 0))

      if (lin < 1) raf.current = requestAnimationFrame(tick)
      else ref.current.style.opacity = "0"
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [startDelay, top, bot])

  return (
    <g ref={ref} style={{ opacity: 0 }}>
      <rect x={-10} y={0} width={DOC_W + 20} height={2} rx={1} fill="var(--color-accent)" opacity={0.55} />
      <rect x={-10} y={2} width={DOC_W + 20} height={5} rx={1} fill="var(--color-accent)" opacity={0.2} />
      <rect x={-10} y={7} width={DOC_W + 20} height={8} rx={1} fill="var(--color-accent)" opacity={0.07} />
    </g>
  )
}

// ---------- Field highlights (used in DocumentCard and reduced-motion) ----------

function FieldHighlights({
  fields,
  animate: shouldAnimate,
  highlightOpacity,
  showFlagReasons,
}: {
  fields: FieldData[]
  animate: boolean
  highlightOpacity: number
  showFlagReasons: boolean
}) {
  return (
    <>
      {fields.map((field, i) => {
        const y = FIELD_START_Y + i * FIELD_GAP
        const delay = shouldAnimate ? HIGHLIGHT_START + i * HIGHLIGHT_INTERVAL : 0
        const color = field.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bg = field.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

        return (
          <motion.g
            key={field.label}
            initial={shouldAnimate ? { opacity: 0 } : { opacity: highlightOpacity }}
            animate={{ opacity: highlightOpacity }}
            transition={shouldAnimate ? { delay, duration: 0.25, ease: EASE.smooth } : { duration: 0.3 }}
          >
            <rect x={PAD} y={y} width={FIELD_W} height={FIELD_H} rx={3} fill={bg} />
            <text x={PAD + 6} y={y + 11} fontSize={6} fill="var(--color-text-secondary)" fontFamily={FONT}>{field.label}</text>
            <text x={PAD + 6} y={y + 22} fontSize={8} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{field.value}</text>

            {/* Status dot */}
            <motion.g
              initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
              animate={{ scale: 1 }}
              transition={shouldAnimate ? { delay: delay + 0.1, duration: 0.2, ease: EASE.smooth } : { duration: 0.2 }}
              style={{ transformOrigin: `${DOC_W - PAD - 8}px ${y + FIELD_H / 2}px` }}
            >
              <circle cx={DOC_W - PAD - 8} cy={y + FIELD_H / 2} r={5} fill={color} />
              {field.status === "verified" ? (
                <path
                  d={`M${DOC_W - PAD - 10.5} ${y + FIELD_H / 2 + 0.5} l2 2 l3.5 -3.5`}
                  stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
              ) : (
                <text x={DOC_W - PAD - 8} y={y + FIELD_H / 2 + 3} fontSize={7} fontWeight={700} fill="white" fontFamily={FONT} textAnchor="middle">!</text>
              )}
            </motion.g>

            {/* Flag reason pill */}
            {showFlagReasons && field.status === "flagged" && field.flagReason && (
              <motion.g
                initial={shouldAnimate ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldAnimate ? { delay: delay + 0.15, duration: 0.2 } : { duration: 0.2 }}
              >
                <rect x={PAD + 6} y={y + FIELD_H - 4} width={field.flagReason.length * 5.5 + 12} height={11} rx={5.5}
                  fill="var(--color-flagged-light)" stroke="var(--color-flagged)" strokeWidth={0.5} />
                <text x={PAD + 12} y={y + FIELD_H + 4.5} fontSize={5} fontWeight={500} fill="var(--color-flagged)" fontFamily={FONT}>{field.flagReason}</text>
              </motion.g>
            )}
          </motion.g>
        )
      })}
    </>
  )
}

// ---------- Document card (unified: waiting → pulling → active → transitioning → done) ----------

function DocumentCard({
  doc,
  state,
  doneIndex,
  stackOffset,
}: {
  doc: DocData
  state: DocState
  doneIndex: number
  stackOffset: number
}) {
  const isFlagged = !doc.fields.every(f => f.status === "verified")
  const hasBeenActive = useRef(false)
  const [showBadge, setShowBadge] = useState(false)
  const badgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track when this card first becomes active to trigger highlight animations
  const wasActive = useRef(false)
  const shouldAnimateHighlights = state === "active" && !wasActive.current

  if (state === "active" && !hasBeenActive.current) {
    hasBeenActive.current = true
  }

  // Start badge timer when entering active state
  useEffect(() => {
    if (state === "active" && !showBadge) {
      badgeTimer.current = setTimeout(() => setShowBadge(true), BADGE_TIME * 1000)
    }
    return () => {
      if (badgeTimer.current) clearTimeout(badgeTimer.current)
    }
  }, [state, showBadge])

  // Mark that we've completed the initial highlight animation
  useEffect(() => {
    if (state === "active") {
      const t = setTimeout(() => { wasActive.current = true }, (HIGHLIGHT_START + NUM_FIELDS * HIGHLIGHT_INTERVAL + 0.3) * 1000)
      return () => clearTimeout(t)
    }
  }, [state])

  // Compute position based on state
  let targetX: number, targetY: number, targetScale: number

  if (state === "waiting" || state === "pulling") {
    if (state === "waiting") {
      targetX = ACTIVE_X + (stackOffset + 1) * STACK_OFFSET_X
      targetY = ACTIVE_Y + (stackOffset + 1) * STACK_OFFSET_Y
      targetScale = 1
    } else {
      targetX = ACTIVE_X
      targetY = ACTIVE_Y
      targetScale = 1
    }
  } else if (state === "active") {
    targetX = ACTIVE_X
    targetY = ACTIVE_Y
    targetScale = 1
  } else {
    // transitioning or done
    targetX = DONE_X + doneIndex * DONE_FAN_X
    targetY = DONE_Y + doneIndex * DONE_FAN_Y
    targetScale = DONE_SCALE
  }

  // Transition duration varies by which state change is happening
  let transitionDuration = 0.01
  if (state === "pulling") transitionDuration = PULL_DUR
  else if (state === "transitioning") transitionDuration = SLIDE_TO_DONE_DUR
  else if (state === "waiting") transitionDuration = PULL_DUR // stack shift
  else if (state === "done") transitionDuration = 0.01

  // Highlight opacity
  const showHighlights = hasBeenActive.current || state === "active"
  const highlightOpacity = state === "active" ? 1 : (state === "transitioning" || state === "done") ? 0.3 : 0

  // Border color
  const borderColor = isFlagged ? "var(--color-flagged)" : "var(--color-verified)"

  return (
    <motion.g
      animate={{
        x: targetX,
        y: targetY,
        scale: targetScale,
      }}
      transition={{
        duration: transitionDuration,
        ease: EASE.smooth,
      }}
      style={{ transformOrigin: "0 0" }}
    >
      <DocChrome company={doc.company} />

      {/* Laser scan (only during active) */}
      {state === "active" && <LaserBeam startDelay={0.1} />}

      {/* Field highlights */}
      {showHighlights && (
        <FieldHighlights
          fields={doc.fields}
          animate={shouldAnimateHighlights}
          highlightOpacity={highlightOpacity}
          showFlagReasons={state === "active"}
        />
      )}

      {/* Badge */}
      {showBadge && (
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: EASE.smooth }}
          style={{ transformOrigin: `${DOC_W / 2}px ${DOC_H - 14}px` }}
        >
          <rect x={DOC_W / 2 - 38} y={DOC_H - 22} width={76} height={17} rx={8.5}
            fill={isFlagged ? "var(--color-flagged)" : "var(--color-verified)"} opacity={0.9} />
          <text x={DOC_W / 2} y={DOC_H - 10.5} fontSize={6.5} fontWeight={600} fill="white" fontFamily={FONT} textAnchor="middle">
            {isFlagged ? "\u26A0 Items Flagged" : "\u2713 Verified"}
          </text>
        </motion.g>
      )}

      {/* Status border */}
      {showBadge && (
        <motion.rect
          x={0} y={0} width={DOC_W} height={DOC_H} rx={DOC_RX}
          fill="none" stroke={borderColor} strokeWidth={1.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.g>
  )
}

// ---------- Main component ----------

export function HeroAnimation() {
  const reduced = useReducedMotion()
  const [animState, setAnimState] = useState<AnimState>(INITIAL_STATE)

  const patchState = useCallback((patch: { docStates: [DocState, DocState, DocState] }) => {
    setAnimState(prev => ({ ...prev, ...patch }))
  }, [])

  useEffect(() => {
    if (reduced) return

    const timers: ReturnType<typeof setTimeout>[] = []

    // Schedule all timeline events
    for (const entry of TIMELINE) {
      timers.push(setTimeout(() => patchState(entry.patch), entry.t))
    }

    // Schedule cycle reset
    timers.push(setTimeout(() => {
      setAnimState(prev => ({
        ...INITIAL_STATE,
        cycle: prev.cycle + 1,
      }))
    }, CYCLE_END))

    return () => timers.forEach(clearTimeout)
  }, [animState.cycle, reduced, patchState])

  // Reduced motion: static final state
  if (reduced) {
    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${VW} ${VH}`} fill="none" className="w-full h-auto">
          {/* Done pile docs with faint highlights */}
          {docs.slice(0, 2).map((d, i) => (
            <g key={d.company} transform={`translate(${DONE_X + i * DONE_FAN_X}, ${DONE_Y + i * DONE_FAN_Y}) scale(${DONE_SCALE})`}>
              <DocChrome company={d.company} />
              {d.fields.map((f, fi) => {
                const y = FIELD_START_Y + fi * FIELD_GAP
                const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
                const color = f.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
                return (
                  <g key={f.label} opacity={0.3}>
                    <rect x={PAD} y={y} width={FIELD_W} height={FIELD_H} rx={3} fill={bg} />
                    <text x={PAD + 6} y={y + 11} fontSize={6} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.label}</text>
                    <text x={PAD + 6} y={y + 22} fontSize={8} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.value}</text>
                    <circle cx={DOC_W - PAD - 8} cy={y + FIELD_H / 2} r={5} fill={color} />
                  </g>
                )
              })}
              <rect x={0} y={0} width={DOC_W} height={DOC_H} rx={DOC_RX} fill="none" stroke="var(--color-verified)" strokeWidth={2} />
              <rect x={DOC_W / 2 - 30} y={DOC_H - 22} width={60} height={16} rx={8} fill="var(--color-verified)" opacity={0.9} />
              <text x={DOC_W / 2} y={DOC_H - 11} fontSize={6.5} fontWeight={600} fill="white" fontFamily={FONT} textAnchor="middle">{"\u2713"} Verified</text>
            </g>
          ))}

          {/* Active doc (flagged) with full highlights */}
          <g transform={`translate(${ACTIVE_X}, ${ACTIVE_Y})`}>
            <DocChrome company={docs[2].company} />
            {docs[2].fields.map((f, i) => {
              const y = FIELD_START_Y + i * FIELD_GAP
              const color = f.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
              const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
              return (
                <g key={f.label}>
                  <rect x={PAD} y={y} width={FIELD_W} height={FIELD_H} rx={3} fill={bg} />
                  <text x={PAD + 6} y={y + 11} fontSize={6} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.label}</text>
                  <text x={PAD + 6} y={y + 22} fontSize={8} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.value}</text>
                  <circle cx={DOC_W - PAD - 8} cy={y + FIELD_H / 2} r={5} fill={color} />
                  {f.status === "verified" ? (
                    <path
                      d={`M${DOC_W - PAD - 10.5} ${y + FIELD_H / 2 + 0.5} l2 2 l3.5 -3.5`}
                      stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round"
                    />
                  ) : (
                    <text x={DOC_W - PAD - 8} y={y + FIELD_H / 2 + 3} fontSize={7} fontWeight={700} fill="white" fontFamily={FONT} textAnchor="middle">!</text>
                  )}
                  {f.status === "flagged" && f.flagReason && (
                    <g>
                      <rect x={PAD + 6} y={y + FIELD_H - 4} width={f.flagReason.length * 5.5 + 12} height={11} rx={5.5}
                        fill="var(--color-flagged-light)" stroke="var(--color-flagged)" strokeWidth={0.5} />
                      <text x={PAD + 12} y={y + FIELD_H + 4.5} fontSize={5} fontWeight={500} fill="var(--color-flagged)" fontFamily={FONT}>{f.flagReason}</text>
                    </g>
                  )}
                </g>
              )
            })}
            <rect x={DOC_W / 2 - 38} y={DOC_H - 22} width={76} height={17} rx={8.5}
              fill="var(--color-flagged)" opacity={0.9} />
            <text x={DOC_W / 2} y={DOC_H - 10.5} fontSize={6.5} fontWeight={600} fill="white" fontFamily={FONT} textAnchor="middle">
              {"\u26A0"} Items Flagged
            </text>
            <rect x={0} y={0} width={DOC_W} height={DOC_H} rx={DOC_RX} fill="none" stroke="var(--color-flagged)" strokeWidth={1.5} />
          </g>

        </svg>
      </div>
    )
  }

  // Compute render order: done first (behind), waiting next, active/pulling/transitioning last (on top)
  const indices = [0, 1, 2] as const
  const renderOrder = [
    ...indices.filter(i => animState.docStates[i] === "done"),
    ...indices.filter(i => animState.docStates[i] === "waiting").reverse(),
    ...indices.filter(i => animState.docStates[i] === "pulling" || animState.docStates[i] === "active" || animState.docStates[i] === "transitioning"),
  ]

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${VW} ${VH}`} fill="none" className="w-full h-auto">
        <AnimatePresence mode="wait">
          <motion.g
            key={animState.cycle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderOrder.map(i => (
              <DocumentCard
                key={`doc-${i}`}
                doc={docs[i]}
                state={animState.docStates[i]}
                doneIndex={computeDoneIndex(i, animState.docStates)}
                stackOffset={computeStackOffset(i, animState.docStates)}
              />
            ))}

          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  )
}
