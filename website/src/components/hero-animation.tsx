"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"

// ---------- Scenario data ----------

type FieldStatus = "verified" | "flagged"

interface Field {
  leftLabel: string
  rightLabel: string
  left: string
  right: string
  status: FieldStatus
}

interface Scenario {
  coiDate: string
  deal: string
  equipment: string
  fields: Field[]
}

const scenarios: Scenario[] = [
  {
    coiDate: "01/15/2026",
    deal: "EF-2024-0847",
    equipment: "2024 Volvo VNL 860",
    fields: [
      { leftLabel: "Named Insured", rightLabel: "Lessee", left: "Nexus Freight Corp", right: "Nexus Freight Corp", status: "verified" },
      { leftLabel: "Policy Number", rightLabel: "Policy on File", left: "PLH-0042819", right: "PLH-0042819", status: "verified" },
      { leftLabel: "Serial Number", rightLabel: "Equipment S/N", left: "4UZAANDH5BC...", right: "4UZAANDH5BC...", status: "verified" },
      { leftLabel: "Loss Payee", rightLabel: "Lessor", left: "Maple Leaf Leasing", right: "Northern Credit Corp", status: "flagged" },
      { leftLabel: "Policy Expiry", rightLabel: "Coverage Through", left: "08/15/2026", right: "08/15/2026", status: "verified" },
      { leftLabel: "Deductible", rightLabel: "Max Deductible", left: "$2,500", right: "$2,500", status: "verified" },
    ],
  },
  {
    coiDate: "06/03/2026",
    deal: "EF-2024-1203",
    equipment: "2023 CAT 320 Excavator",
    fields: [
      { leftLabel: "Named Insured", rightLabel: "Lessee", left: "Redline Transport Inc", right: "Redline Transport Inc", status: "verified" },
      { leftLabel: "Policy Number", rightLabel: "Policy on File", left: "CPL-7291045", right: "CPL-7291045", status: "verified" },
      { leftLabel: "Serial Number", rightLabel: "Equipment S/N", left: "1HTMMAAL5CH...", right: "1HTMMAAL5CJ...", status: "flagged" },
      { leftLabel: "Loss Payee", rightLabel: "Lessor", left: "Western Capital Corp", right: "Western Capital Corp", status: "verified" },
      { leftLabel: "Policy Expiry", rightLabel: "Coverage Through", left: "03/22/2027", right: "03/22/2027", status: "verified" },
      { leftLabel: "Deductible", rightLabel: "Max Deductible", left: "$5,000", right: "$5,000", status: "verified" },
    ],
  },
  {
    coiDate: "09/18/2025",
    deal: "EF-2025-0091",
    equipment: "2024 Kenworth T680",
    fields: [
      { leftLabel: "Named Insured", rightLabel: "Lessee", left: "Summit Logistics Ltd", right: "Summit Logistics Ltd", status: "verified" },
      { leftLabel: "Policy Number", rightLabel: "Policy on File", left: "GLP-3384756", right: "GLP-3384756", status: "verified" },
      { leftLabel: "Serial Number", rightLabel: "Equipment S/N", left: "3AKJHHDR7DS...", right: "3AKJHHDR7DS...", status: "verified" },
      { leftLabel: "Loss Payee", rightLabel: "Lessor", left: "Pacific Finance Group", right: "Pacific Finance Group", status: "verified" },
      { leftLabel: "Policy Expiry", rightLabel: "Coverage Through", left: "11/30/2026", right: "11/30/2026", status: "verified" },
      { leftLabel: "Deductible", rightLabel: "Max Deductible", left: "$10,000", right: "$5,000", status: "flagged" },
    ],
  },
]

// ---------- Animation timing ----------

// Per-field delay: first 3 one-at-a-time, last 3 cascade quickly
const fieldDelays = [1.0, 1.4, 1.8, 2.05, 2.2, 2.35]

// Cycle timing (ms)
const FADE_START = 5700   // when fade-out begins
const CYCLE_TOTAL = 6500  // total duration per cycle

// ---------- Layout constants ----------

const NUM_FIELDS = 6
const LX = 0, LW = 275
const RX = 340, RW = 255
const PAD = 10
const FW_L = LW - PAD * 2, FW_R = RW - PAD * 2
const FSTART = 86, FH = 32, FGAP = 36
const DOC_H = FSTART + NUM_FIELDS * FGAP + 8
const MID = (LX + LW + RX) / 2
const SUM_Y = DOC_H + 10
const TOTAL_H = SUM_Y + 34
const VW = RX + RW
const FONT = "var(--font-sans)"

// ---------- Chrome sub-components ----------

function Bar({ x, y, w, h = 4 }: { x: number; y: number; w: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={2} fill="var(--color-border)" opacity={0.4} />
}

function COIChrome({ coiDate }: { coiDate: string }) {
  return (
    <g>
      <rect x={LX} y={0} width={LW} height={DOC_H} rx={8} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      <rect x={LX} y={0} width={LW} height={20} rx={8} fill="var(--color-navy)" />
      <rect x={LX} y={10} width={LW} height={10} fill="var(--color-navy)" />
      <text x={LX + PAD} y={14} fontSize={8} fontWeight={700} fill="white" fontFamily={FONT}>ACORD</text>
      <text x={LX + 43} y={11} fontSize={4} fill="rgba(255,255,255,0.5)" fontFamily={FONT}>&#174;</text>
      <text x={LX + LW - PAD} y={14} fontSize={5} fill="rgba(255,255,255,0.5)" fontFamily={FONT} textAnchor="end">{coiDate}</text>
      <text x={LX + PAD} y={32} fontSize={6} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.4">CERTIFICATE OF LIABILITY INSURANCE</text>
      <rect x={LX + PAD} y={38} width={122} height={28} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={LX + PAD + 3} y={46} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>PRODUCER</text>
      <Bar x={LX + PAD + 3} y={50} w={75} />
      <Bar x={LX + PAD + 3} y={57} w={55} />
      <rect x={LX + PAD + 127} y={38} width={122} height={28} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={LX + PAD + 130} y={46} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>INSURED</text>
      <Bar x={LX + PAD + 130} y={50} w={85} />
      <Bar x={LX + PAD + 130} y={57} w={65} />
      <rect x={LX + PAD} y={70} width={FW_L} height={12} rx={2} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={0.3} />
      <text x={LX + PAD + 4} y={78.5} fontSize={5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">COVERAGES</text>
      {Array.from({ length: NUM_FIELDS }, (_, i) => (
        <line key={i} x1={LX + PAD} y1={FSTART + i * FGAP + FH + 1} x2={LX + LW - PAD} y2={FSTART + i * FGAP + FH + 1} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.4} />
      ))}
    </g>
  )
}

function ScheduleChrome({ deal, equipment }: { deal: string; equipment: string }) {
  return (
    <g>
      <rect x={RX} y={0} width={RW} height={DOC_H} rx={8} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      <rect x={RX} y={0} width={RW} height={20} rx={8} fill="var(--color-accent)" />
      <rect x={RX} y={10} width={RW} height={10} fill="var(--color-accent)" />
      <text x={RX + PAD} y={14} fontSize={7} fontWeight={600} fill="white" fontFamily={FONT}>EQUIPMENT SCHEDULE</text>
      <text x={RX + PAD} y={32} fontSize={5} fill="var(--color-text-tertiary)" fontFamily={FONT}>Deal #{deal}</text>
      <Bar x={RX + PAD} y={38} w={100} />
      <Bar x={RX + PAD} y={46} w={75} />
      <rect x={RX + PAD} y={56} width={FW_R} height={12} rx={2} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={0.3} />
      <text x={RX + PAD + 4} y={64.5} fontSize={5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">VERIFICATION REQUIREMENTS</text>
      <text x={RX + PAD + 4} y={76} fontSize={5} fill="var(--color-text-tertiary)" fontFamily={FONT}>{equipment}</text>
      <Bar x={RX + PAD + 4} y={80} w={90} />
      {Array.from({ length: NUM_FIELDS }, (_, i) => (
        <line key={i} x1={RX + PAD} y1={FSTART + i * FGAP + FH + 1} x2={RX + RW - PAD} y2={FSTART + i * FGAP + FH + 1} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.4} />
      ))}
    </g>
  )
}

// ---------- Static version for reduced motion ----------

function StaticFields({ fields }: { fields: Field[] }) {
  return (
    <>
      {fields.map((f, i) => {
        const y = FSTART + i * FGAP
        const color = f.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
        return (
          <g key={i}>
            <rect x={LX + PAD} y={y} width={FW_L} height={FH} rx={4} fill={bg} />
            <text x={LX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.leftLabel}</text>
            <text x={LX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.left}</text>
            <rect x={RX + PAD} y={y} width={FW_R} height={FH} rx={4} fill={bg} />
            <text x={RX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.rightLabel}</text>
            <text x={RX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.right}</text>
            <line x1={LX + LW} y1={y + FH / 2} x2={RX} y2={y + FH / 2} stroke={color} strokeWidth={1.5} strokeDasharray="4,4" />
            <circle cx={MID} cy={y + FH / 2} r={5} fill={color} />
          </g>
        )
      })}
    </>
  )
}

function SummaryBar() {
  return (
    <g>
      <rect x={LX} y={SUM_Y} width={VW} height={34} rx={8} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={1} />
      <circle cx={24} cy={SUM_Y + 17} r={5} fill="var(--color-verified)" />
      <text x={36} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>5 Verified</text>
      <circle cx={130} cy={SUM_Y + 17} r={5} fill="var(--color-flagged)" />
      <text x={142} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>1 Flagged</text>
    </g>
  )
}

// ---------- Animated field overlay (remounts per cycle via key) ----------

function AnimatedOverlay({ fields }: { fields: Field[] }) {
  return (
    <>
      {fields.map((f, i) => {
        const y = FSTART + i * FGAP
        const delay = fieldDelays[i]
        const color = f.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
        const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
        return (
          <g key={i}>
            <motion.rect x={LX + PAD} y={y} width={FW_L} height={FH} rx={4} fill={bg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }} />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>
              <text x={LX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.leftLabel}</text>
              <text x={LX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.left}</text>
            </motion.g>
            <motion.rect x={RX + PAD} y={y} width={FW_R} height={FH} rx={4} fill={bg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.1, duration: 0.3 }} />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.1, duration: 0.3 }}>
              <text x={RX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.rightLabel}</text>
              <text x={RX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.right}</text>
            </motion.g>
            <motion.line
              x1={LX + LW} y1={y + FH / 2} x2={RX} y2={y + FH / 2}
              stroke={color} strokeWidth={1.5} strokeDasharray="4,4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: delay + 0.2, duration: 0.4, ease: [0, 0, 0.2, 1] }}
            />
            <motion.circle
              cx={MID} cy={y + FH / 2} r={5}
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>
        )
      })}

      <motion.g initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <SummaryBar />
      </motion.g>
    </>
  )
}

// ---------- Main component ----------

export function HeroAnimation() {
  const reduced = useReducedMotion()
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const scenario = scenarios[scenarioIndex]

  useEffect(() => {
    if (reduced) return

    const fadeTimer = setTimeout(() => setVisible(false), FADE_START)
    const nextTimer = setTimeout(() => {
      setVisible(true)
      setScenarioIndex((prev) => (prev + 1) % scenarios.length)
    }, CYCLE_TOTAL)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(nextTimer)
    }
  }, [scenarioIndex, reduced])

  // Reduced motion: show first scenario final state
  if (reduced) {
    const s = scenarios[0]
    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${VW} ${TOTAL_H}`} fill="none" className="w-full h-auto">
          <COIChrome coiDate={s.coiDate} />
          <ScheduleChrome deal={s.deal} equipment={s.equipment} />
          <StaticFields fields={s.fields} />
          <SummaryBar />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${VW} ${TOTAL_H}`} fill="none" className="w-full h-auto">
        {/* Documents slide in on first load, persist across cycles */}
        <motion.g
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <COIChrome coiDate={scenario.coiDate} />
        </motion.g>
        <motion.g
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScheduleChrome deal={scenario.deal} equipment={scenario.equipment} />
        </motion.g>

        {/* Verification overlay: remounts each cycle via key, fades out before switch */}
        <motion.g
          key={scenarioIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <AnimatedOverlay fields={scenario.fields} />
        </motion.g>
      </svg>
    </div>
  )
}
