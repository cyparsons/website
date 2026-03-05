"use client"

import { motion, useReducedMotion } from "motion/react"

// Comparison fields with document-specific labels
const fields = [
  { leftLabel: "Named Insured", rightLabel: "Lessee", left: "Nexus Freight Corp", right: "Nexus Freight Corp", status: "verified" as const },
  { leftLabel: "Policy Number", rightLabel: "Policy on File", left: "PLH-0042819", right: "PLH-0042819", status: "verified" as const },
  { leftLabel: "Serial Number", rightLabel: "Equipment S/N", left: "4UZAANDH5BC...", right: "4UZAANDH5BC...", status: "verified" as const },
  { leftLabel: "Loss Payee", rightLabel: "Lessor", left: "Maple Leaf Leasing", right: "Northern Credit Corp", status: "flagged" as const },
  { leftLabel: "Policy Expiry", rightLabel: "Coverage Through", left: "08/15/2026", right: "08/15/2026", status: "verified" as const },
  { leftLabel: "Deductible", rightLabel: "Max Deductible", left: "$5,000", right: "$2,500", status: "flagged" as const },
]

// Layout constants
const LX = 0, LW = 275
const RX = 340, RW = 255
const PAD = 10
const FW_L = LW - PAD * 2, FW_R = RW - PAD * 2
const FSTART = 86, FH = 32, FGAP = 36
const DOC_H = FSTART + fields.length * FGAP + 8
const MID = (LX + LW + RX) / 2
const SUM_Y = DOC_H + 10
const TOTAL_H = SUM_Y + 34
const VW = RX + RW
const FONT = "var(--font-sans)"

function Bar({ x, y, w, h = 4 }: { x: number; y: number; w: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={2} fill="var(--color-border)" opacity={0.4} />
}

// ACORD-style COI document structure
function COIChrome() {
  return (
    <g>
      <rect x={LX} y={0} width={LW} height={DOC_H} rx={8} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      {/* ACORD header bar */}
      <rect x={LX} y={0} width={LW} height={20} rx={8} fill="var(--color-navy)" />
      <rect x={LX} y={10} width={LW} height={10} fill="var(--color-navy)" />
      <text x={LX + PAD} y={14} fontSize={8} fontWeight={700} fill="white" fontFamily={FONT}>ACORD</text>
      <text x={LX + 43} y={11} fontSize={4} fill="rgba(255,255,255,0.5)" fontFamily={FONT}>&#174;</text>
      <text x={LX + LW - PAD} y={14} fontSize={5} fill="rgba(255,255,255,0.5)" fontFamily={FONT} textAnchor="end">01/15/2026</text>
      {/* Form title */}
      <text x={LX + PAD} y={32} fontSize={6} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.4">CERTIFICATE OF LIABILITY INSURANCE</text>
      {/* Producer box */}
      <rect x={LX + PAD} y={38} width={122} height={28} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={LX + PAD + 3} y={46} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>PRODUCER</text>
      <Bar x={LX + PAD + 3} y={50} w={75} />
      <Bar x={LX + PAD + 3} y={57} w={55} />
      {/* Insured box */}
      <rect x={LX + PAD + 127} y={38} width={122} height={28} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={LX + PAD + 130} y={46} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>INSURED</text>
      <Bar x={LX + PAD + 130} y={50} w={85} />
      <Bar x={LX + PAD + 130} y={57} w={65} />
      {/* Coverages section header */}
      <rect x={LX + PAD} y={70} width={FW_L} height={12} rx={2} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={0.3} />
      <text x={LX + PAD + 4} y={78.5} fontSize={5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">COVERAGES</text>
      {/* Faint grid lines between fields */}
      {fields.map((_, i) => (
        <line key={i} x1={LX + PAD} y1={FSTART + i * FGAP + FH + 1} x2={LX + LW - PAD} y2={FSTART + i * FGAP + FH + 1} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.4} />
      ))}
    </g>
  )
}

// Equipment Schedule document structure
function ScheduleChrome() {
  return (
    <g>
      <rect x={RX} y={0} width={RW} height={DOC_H} rx={8} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      {/* Header bar */}
      <rect x={RX} y={0} width={RW} height={20} rx={8} fill="var(--color-accent)" />
      <rect x={RX} y={10} width={RW} height={10} fill="var(--color-accent)" />
      <text x={RX + PAD} y={14} fontSize={7} fontWeight={600} fill="white" fontFamily={FONT}>EQUIPMENT SCHEDULE</text>
      {/* Deal info */}
      <text x={RX + PAD} y={32} fontSize={5} fill="var(--color-text-tertiary)" fontFamily={FONT}>Deal #EF-2024-0847</text>
      <Bar x={RX + PAD} y={38} w={100} />
      <Bar x={RX + PAD} y={46} w={75} />
      {/* Deal details section header */}
      <rect x={RX + PAD} y={56} width={FW_R} height={12} rx={2} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={0.3} />
      <text x={RX + PAD + 4} y={64.5} fontSize={5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">VERIFICATION REQUIREMENTS</text>
      {/* Equipment info */}
      <text x={RX + PAD + 4} y={76} fontSize={5} fill="var(--color-text-tertiary)" fontFamily={FONT}>2024 Volvo VNL 860</text>
      <Bar x={RX + PAD + 4} y={80} w={90} />
      {/* Grid lines */}
      {fields.map((_, i) => (
        <line key={i} x1={RX + PAD} y1={FSTART + i * FGAP + FH + 1} x2={RX + RW - PAD} y2={FSTART + i * FGAP + FH + 1} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.4} />
      ))}
    </g>
  )
}

export function HeroAnimation() {
  const reduced = useReducedMotion()

  // Static reduced-motion version
  if (reduced) {
    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${VW} ${TOTAL_H}`} fill="none" className="w-full h-auto">
          <COIChrome />
          <ScheduleChrome />
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
          <rect x={LX} y={SUM_Y} width={VW} height={34} rx={8} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={1} />
          <circle cx={24} cy={SUM_Y + 17} r={5} fill="var(--color-verified)" />
          <text x={36} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>4 Verified</text>
          <circle cx={130} cy={SUM_Y + 17} r={5} fill="var(--color-flagged)" />
          <text x={142} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>2 Flagged</text>
        </svg>
      </div>
    )
  }

  // Animated version
  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${VW} ${TOTAL_H}`} fill="none" className="w-full h-auto">
        {/* Documents slide in */}
        <motion.g initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <COIChrome />
        </motion.g>
        <motion.g initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <ScheduleChrome />
        </motion.g>

        {/* Field-by-field comparison */}
        {fields.map((f, i) => {
          const y = FSTART + i * FGAP
          const delay = 0.8 + i * 0.4
          const color = f.status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
          const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
          return (
            <g key={i}>
              {/* Left field highlight */}
              <motion.rect x={LX + PAD} y={y} width={FW_L} height={FH} rx={4} fill={bg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }} />
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>
                <text x={LX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.leftLabel}</text>
                <text x={LX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.left}</text>
              </motion.g>
              {/* Right field highlight */}
              <motion.rect x={RX + PAD} y={y} width={FW_R} height={FH} rx={4} fill={bg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.1, duration: 0.3 }} />
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.1, duration: 0.3 }}>
                <text x={RX + PAD + 8} y={y + 12} fontSize={7.5} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.rightLabel}</text>
                <text x={RX + PAD + 8} y={y + 25} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.right}</text>
              </motion.g>
              {/* Connection line */}
              <motion.line
                x1={LX + LW} y1={y + FH / 2} x2={RX} y2={y + FH / 2}
                stroke={color} strokeWidth={1.5} strokeDasharray="4,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: delay + 0.2, duration: 0.4, ease: [0, 0, 0.2, 1] }}
              />
              {/* Status dot */}
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

        {/* Summary bar */}
        <motion.g initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <rect x={LX} y={SUM_Y} width={VW} height={34} rx={8} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={1} />
          <circle cx={24} cy={SUM_Y + 17} r={5} fill="var(--color-verified)" />
          <text x={36} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>4 Verified</text>
          <circle cx={130} cy={SUM_Y + 17} r={5} fill="var(--color-flagged)" />
          <text x={142} y={SUM_Y + 21} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>2 Flagged</text>
        </motion.g>
      </svg>
    </div>
  )
}
