"use client"

import { motion, useReducedMotion } from "motion/react"

const fields = [
  { label: "Named Insured", value: "Nexus Freight Corp", status: "verified" as const },
  { label: "Serial Number", value: "4UZAANDH5BCXR7832", status: "verified" as const },
  { label: "Loss Payee", value: "Maple Leaf Leasing Inc.", status: "flagged" as const },
  { label: "Policy Expiry", value: "08/15/2026", status: "verified" as const },
  { label: "Actual Cash Value", value: "Included", status: "verified" as const },
  { label: "Deductible", value: "$5,000", status: "flagged" as const },
  { label: "Endorsements", value: "Blanket Waiver of Subr.", status: "verified" as const },
  { label: "Policy Number", value: "PLH-0042819", status: "verified" as const },
]

const PAD = 14
const FIELD_Y_START = 80
const FIELD_H = 28
const FIELD_GAP = 32
const DOC_W = 380
const DOC_H = FIELD_Y_START + fields.length * FIELD_GAP + 12
const SUM_Y = DOC_H + 12
const TOTAL_H = SUM_Y + 32
const FONT = "var(--font-sans)"

const verified = fields.filter((f) => f.status === "verified").length
const flagged = fields.filter((f) => f.status === "flagged").length

function DocChrome() {
  return (
    <g>
      <rect x={0} y={0} width={DOC_W} height={DOC_H} rx={8} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
      {/* ACORD header */}
      <rect x={0} y={0} width={DOC_W} height={22} rx={8} fill="var(--color-navy)" />
      <rect x={0} y={10} width={DOC_W} height={12} fill="var(--color-navy)" />
      <text x={PAD} y={16} fontSize={9} fontWeight={700} fill="white" fontFamily={FONT}>ACORD</text>
      <text x={52} y={13} fontSize={5} fill="rgba(255,255,255,0.5)" fontFamily={FONT}>&#174;</text>
      <text x={DOC_W - PAD} y={16} fontSize={6} fill="rgba(255,255,255,0.5)" fontFamily={FONT} textAnchor="end">CERTIFICATE OF LIABILITY INSURANCE</text>
      {/* Form subtitle */}
      <text x={PAD} y={38} fontSize={6.5} fontWeight={600} fill="var(--color-text-secondary)" fontFamily={FONT} letterSpacing="0.3">INSURANCE VERIFICATION</text>
      {/* Producer / Insured boxes */}
      <rect x={PAD} y={44} width={170} height={26} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={PAD + 4} y={52} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>PRODUCER</text>
      <rect x={PAD + 4} y={55} width={80} height={3.5} rx={1.5} fill="var(--color-border)" opacity={0.4} />
      <rect x={PAD + 4} y={61} width={55} height={3.5} rx={1.5} fill="var(--color-border)" opacity={0.4} />
      <rect x={PAD + 178} y={44} width={170} height={26} rx={3} fill="none" stroke="var(--color-border)" strokeWidth={0.5} />
      <text x={PAD + 182} y={52} fontSize={4.5} fill="var(--color-text-tertiary)" fontFamily={FONT}>INSURED</text>
      <rect x={PAD + 182} y={55} width={90} height={3.5} rx={1.5} fill="var(--color-border)" opacity={0.4} />
      <rect x={PAD + 182} y={61} width={65} height={3.5} rx={1.5} fill="var(--color-border)" opacity={0.4} />
      {/* Coverages header */}
      <rect x={PAD} y={74} width={DOC_W - PAD * 2} height={3} rx={1.5} fill="var(--color-surface-alt)" />
      {/* Field separator lines */}
      {fields.map((_, i) => (
        <line key={i} x1={PAD} y1={FIELD_Y_START + i * FIELD_GAP + FIELD_H + 1.5} x2={DOC_W - PAD} y2={FIELD_Y_START + i * FIELD_GAP + FIELD_H + 1.5} stroke="var(--color-border)" strokeWidth={0.3} opacity={0.4} />
      ))}
    </g>
  )
}

function StatusBadge({ x, y, status }: { x: number; y: number; status: "verified" | "flagged" }) {
  const color = status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
  const label = status === "verified" ? "Verified" : "Flagged"
  const w = status === "verified" ? 58 : 50
  return (
    <g>
      <rect x={x} y={y} width={w} height={16} rx={8} fill={status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"} stroke={color} strokeWidth={0.5} />
      <circle cx={x + 10} cy={y + 8} r={3} fill={color} />
      <text x={x + 17} y={y + 11.5} fontSize={7} fontWeight={500} fill={color} fontFamily={FONT}>{label}</text>
    </g>
  )
}

export function COIHeroAnimation() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${DOC_W} ${TOTAL_H}`} fill="none" className="w-full h-auto">
          <DocChrome />
          {fields.map((f, i) => {
            const y = FIELD_Y_START + i * FIELD_GAP
            const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
            return (
              <g key={i}>
                <rect x={PAD} y={y} width={DOC_W - PAD * 2} height={FIELD_H} rx={4} fill={bg} />
                <text x={PAD + 8} y={y + 11} fontSize={7} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.label}</text>
                <text x={PAD + 8} y={y + 23} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.value}</text>
                <StatusBadge x={DOC_W - PAD - 66} y={y + 6} status={f.status} />
              </g>
            )
          })}
          {/* Summary bar */}
          <rect x={0} y={SUM_Y} width={DOC_W} height={32} rx={8} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={1} />
          <circle cx={20} cy={SUM_Y + 16} r={5} fill="var(--color-verified)" />
          <text x={32} y={SUM_Y + 20} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>{verified} Verified</text>
          <circle cx={130} cy={SUM_Y + 16} r={5} fill="var(--color-flagged)" />
          <text x={142} y={SUM_Y + 20} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>{flagged} Flagged</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${DOC_W} ${TOTAL_H}`} fill="none" className="w-full h-auto">
        {/* Document slides in */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <DocChrome />
        </motion.g>

        {/* Field-by-field verification */}
        {fields.map((f, i) => {
          const y = FIELD_Y_START + i * FIELD_GAP
          const delay = 0.7 + i * 0.35
          const bg = f.status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"
          return (
            <g key={i}>
              {/* Field highlight */}
              <motion.rect
                x={PAD} y={y} width={DOC_W - PAD * 2} height={FIELD_H} rx={4}
                fill={bg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.3 }}
              />
              {/* Field text */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>
                <text x={PAD + 8} y={y + 11} fontSize={7} fill="var(--color-text-secondary)" fontFamily={FONT}>{f.label}</text>
                <text x={PAD + 8} y={y + 23} fontSize={9} fontWeight={500} fill="var(--color-text-primary)" fontFamily={FONT}>{f.value}</text>
              </motion.g>
              {/* Status badge */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                transition={{ delay: delay + 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${DOC_W - PAD - 37}px ${y + 14}px` }}
              >
                <StatusBadge x={DOC_W - PAD - 66} y={y + 6} status={f.status} />
              </motion.g>
            </g>
          )
        })}

        {/* Summary bar */}
        <motion.g
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 + fields.length * 0.35 + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={0} y={SUM_Y} width={DOC_W} height={32} rx={8} fill="var(--color-surface-alt)" stroke="var(--color-border)" strokeWidth={1} />
          <circle cx={20} cy={SUM_Y + 16} r={5} fill="var(--color-verified)" />
          <text x={32} y={SUM_Y + 20} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>{verified} Verified</text>
          <circle cx={130} cy={SUM_Y + 16} r={5} fill="var(--color-flagged)" />
          <text x={142} y={SUM_Y + 20} fontSize={10} fill="var(--color-text-secondary)" fontFamily={FONT}>{flagged} Flagged</text>
        </motion.g>
      </svg>
    </div>
  )
}
