"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { EASE } from "@/lib/animation"

// ---------- Types ----------

type Status = "verified" | "flagged"

interface HeaderField {
  label: string
  value: string
  expected?: string
  status: Status
}

interface AssetDetail {
  label: string
  value: string
  expected: string
  status: Status
}

interface Asset {
  serial: string
  shortSerial: string
  name: string
  status: Status
  details: AssetDetail[]
}

interface Scenario {
  insuredName: string
  producerName: string
  policyNumber: string
  headerFields: HeaderField[]
  assets: Asset[]
  clickTarget: "header" | "asset"
  clickIndex: number // index into headerFields or assets
}

// ---------- Scenarios ----------

const scenarios: Scenario[] = [
  {
    // Cycle 1: Loss Payee mismatch — click highlights the header field
    insuredName: "Nexus Freight Corp",
    producerName: "Bridgepoint Insurance Brokers",
    policyNumber: "PLH-0042819",
    headerFields: [
      { label: "Named Insured", value: "Nexus Freight Corp", status: "verified" },
      { label: "Policy Expiry", value: "08/15/2026", status: "verified" },
      { label: "Loss Payee", value: "Maple Leaf Leasing", expected: "Nexus Capital Finance Corp", status: "flagged" },
    ],
    assets: [
      {
        serial: "4UZAANDH5BCXF9127", shortSerial: "4UZAANDH5BC...", name: "2024 Volvo VNL 860", status: "verified",
        details: [
          { label: "Serial Number", value: "4UZAANDH5BCXF9127", expected: "4UZAANDH5BCXF9127", status: "verified" },
          { label: "Asset Description", value: "2024 Volvo VNL 860", expected: "2024 Volvo VNL 860", status: "verified" },
          { label: "Actual Cash Value", value: "$185,000", expected: "$185,000", status: "verified" },
          { label: "Deductible", value: "$2,500", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "1XKAD49X1LJ419836", shortSerial: "1XKAD49X1LJ...", name: "2023 Kenworth T680", status: "verified",
        details: [
          { label: "Serial Number", value: "1XKAD49X1LJ419836", expected: "1XKAD49X1LJ419836", status: "verified" },
          { label: "Asset Description", value: "2023 Kenworth T680", expected: "2023 Kenworth T680", status: "verified" },
          { label: "Actual Cash Value", value: "$165,000", expected: "$165,000", status: "verified" },
          { label: "Deductible", value: "$2,500", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "3AKJHHDR7DSLX4092", shortSerial: "3AKJHHDR7DS...", name: "2024 Freightliner Cascadia", status: "verified",
        details: [
          { label: "Serial Number", value: "3AKJHHDR7DSLX4092", expected: "3AKJHHDR7DSLX4092", status: "verified" },
          { label: "Asset Description", value: "2024 Freightliner Cascadia", expected: "2024 Freightliner Cascadia", status: "verified" },
          { label: "Actual Cash Value", value: "$195,000", expected: "$195,000", status: "verified" },
          { label: "Deductible", value: "$5,000", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "5PVNJ8JT6N5412087", shortSerial: "5PVNJ8JT6N5...", name: "2023 Peterbilt 579", status: "verified",
        details: [
          { label: "Serial Number", value: "5PVNJ8JT6N5412087", expected: "5PVNJ8JT6N5412087", status: "verified" },
          { label: "Asset Description", value: "2023 Peterbilt 579", expected: "2023 Peterbilt 579", status: "verified" },
          { label: "Actual Cash Value", value: "$178,000", expected: "$178,000", status: "verified" },
          { label: "Deductible", value: "$5,000", expected: "$5,000 max", status: "verified" },
        ],
      },
    ],
    clickTarget: "header",
    clickIndex: 2, // Loss Payee (index 2 after reorder: Insured, Expiry, Loss Payee)
  },
  {
    // Cycle 2: Serial number mismatch — click expands the asset dropdown
    insuredName: "Redline Transport Inc",
    producerName: "Atlas Commercial Insurance",
    policyNumber: "CPL-7291045",
    headerFields: [
      { label: "Named Insured", value: "Redline Transport Inc", status: "verified" },
      { label: "Policy Expiry", value: "03/22/2027", status: "verified" },
      { label: "Loss Payee", value: "Western Capital Corp", status: "verified" },
    ],
    assets: [
      {
        serial: "1HTMMAAL5CH819204", shortSerial: "1HTMMAAL5CH...", name: "2023 CAT 320 Excavator", status: "verified",
        details: [
          { label: "Serial Number", value: "1HTMMAAL5CH819204", expected: "1HTMMAAL5CH819204", status: "verified" },
          { label: "Asset Description", value: "2023 CAT 320 Excavator", expected: "2023 CAT 320 Excavator", status: "verified" },
          { label: "Actual Cash Value", value: "$310,000", expected: "$310,000", status: "verified" },
          { label: "Deductible", value: "$10,000", expected: "$10,000 max", status: "verified" },
        ],
      },
      {
        serial: "CAT0320EKFR910345", shortSerial: "CAT0320EKFR...", name: "2022 CAT 330 Excavator", status: "verified",
        details: [
          { label: "Serial Number", value: "CAT0320EKFR910345", expected: "CAT0320EKFR910345", status: "verified" },
          { label: "Asset Description", value: "2022 CAT 330 Excavator", expected: "2022 CAT 330 Excavator", status: "verified" },
          { label: "Actual Cash Value", value: "$365,000", expected: "$365,000", status: "verified" },
          { label: "Deductible", value: "$10,000", expected: "$10,000 max", status: "verified" },
        ],
      },
      {
        serial: "JHN0310GLKM41927", shortSerial: "JHN0310GLKM...", name: "2023 Deere 310L Backhoe", status: "flagged",
        details: [
          { label: "Serial Number", value: "JHN0310GLKM41927", expected: "JHN0310GLKM41972", status: "flagged" },
          { label: "Asset Description", value: "2023 Deere 310L Backhoe", expected: "2023 Deere 310L Backhoe", status: "verified" },
          { label: "Actual Cash Value", value: "$128,000", expected: "$128,000", status: "verified" },
          { label: "Deductible", value: "$5,000", expected: "$10,000 max", status: "verified" },
        ],
      },
      {
        serial: "KOM0PC210LCI58301", shortSerial: "KOM0PC210LC...", name: "2024 Komatsu PC210", status: "verified",
        details: [
          { label: "Serial Number", value: "KOM0PC210LCI58301", expected: "KOM0PC210LCI58301", status: "verified" },
          { label: "Asset Description", value: "2024 Komatsu PC210", expected: "2024 Komatsu PC210", status: "verified" },
          { label: "Actual Cash Value", value: "$290,000", expected: "$290,000", status: "verified" },
          { label: "Deductible", value: "$10,000", expected: "$10,000 max", status: "verified" },
        ],
      },
    ],
    clickTarget: "asset",
    clickIndex: 2, // Deere 310L
  },
  {
    // Cycle 3: Deductible exceeded — click expands the asset dropdown
    insuredName: "Summit Logistics Ltd",
    producerName: "Pacific Coast Risk Services",
    policyNumber: "GLP-3384756",
    headerFields: [
      { label: "Named Insured", value: "Summit Logistics Ltd", status: "verified" },
      { label: "Policy Expiry", value: "11/30/2026", status: "verified" },
      { label: "Loss Payee", value: "Pacific Finance Group", status: "verified" },
    ],
    assets: [
      {
        serial: "3AKJHHDR7DSLX8174", shortSerial: "3AKJHHDR7DS...", name: "2024 Freightliner Cascadia", status: "verified",
        details: [
          { label: "Serial Number", value: "3AKJHHDR7DSLX8174", expected: "3AKJHHDR7DSLX8174", status: "verified" },
          { label: "Asset Description", value: "2024 Freightliner Cascadia", expected: "2024 Freightliner Cascadia", status: "verified" },
          { label: "Actual Cash Value", value: "$198,000", expected: "$198,000", status: "verified" },
          { label: "Deductible", value: "$5,000", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "1XKYD49X8PJ302918", shortSerial: "1XKYD49X8PJ...", name: "2024 Kenworth W990", status: "verified",
        details: [
          { label: "Serial Number", value: "1XKYD49X8PJ302918", expected: "1XKYD49X8PJ302918", status: "verified" },
          { label: "Asset Description", value: "2024 Kenworth W990", expected: "2024 Kenworth W990", status: "verified" },
          { label: "Actual Cash Value", value: "$215,000", expected: "$215,000", status: "verified" },
          { label: "Deductible", value: "$5,000", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "4UZABRCH9MCKL5830", shortSerial: "4UZABRCH9MC...", name: "2023 Volvo VNR 640", status: "verified",
        details: [
          { label: "Serial Number", value: "4UZABRCH9MCKL5830", expected: "4UZABRCH9MCKL5830", status: "verified" },
          { label: "Asset Description", value: "2023 Volvo VNR 640", expected: "2023 Volvo VNR 640", status: "verified" },
          { label: "Actual Cash Value", value: "$162,000", expected: "$162,000", status: "verified" },
          { label: "Deductible", value: "$2,500", expected: "$5,000 max", status: "verified" },
        ],
      },
      {
        serial: "2HSCESBR5SC102847", shortSerial: "2HSCESBR5SC...", name: "2024 International LT625", status: "flagged",
        details: [
          { label: "Serial Number", value: "2HSCESBR5SC102847", expected: "2HSCESBR5SC102847", status: "verified" },
          { label: "Asset Description", value: "2024 International LT625", expected: "2024 International LT625", status: "verified" },
          { label: "Actual Cash Value", value: "$175,000", expected: "$175,000", status: "verified" },
          { label: "Deductible", value: "$15,000", expected: "$5,000 max", status: "flagged" },
        ],
      },
    ],
    clickTarget: "asset",
    clickIndex: 3, // International LT625
  },
]

// ---------- Timing (synced across both panels) ----------

const FIELD_DELAYS = [0.4, 0.9, 1.4]
const SCHED_DELAY = 2.0
const ASSET_DELAYS = [2.2, 2.5, 2.8, 3.1]
const CLICK_S = 4.0
const FADE_MS = 9500
const CYCLE_MS = 10500
// ---------- Shared components ----------

function StatusIcon({ status, size = 16 }: { status: Status; size?: number }) {
  const color = status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
  const r = size / 2

  if (status === "flagged") {
    return (
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: size, height: size, background: `color-mix(in srgb, ${color} 15%, transparent)` }}
      >
        <span style={{ color, fontSize: size * 0.7, fontWeight: 700, lineHeight: 1 }}>!</span>
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ width: size, height: size, background: `color-mix(in srgb, ${color} 15%, transparent)` }}
    >
      <svg width={r} height={r} viewBox="0 0 10 10" fill="none">
        <path d="M2 5.5L4 7.5L8 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ---------- SVG Document Panel (2/3 width) ----------

const FONT = "var(--font-sans)"
const DW = 520
const DH = 510 // fits all content through the equipment schedule table

// Highlight overlay on the document — supports a "pulse" mode for click interaction
function Highlight({
  x, y, w, h, status, delay, label, pulse,
}: {
  x: number; y: number; w: number; h: number
  status: Status; delay: number; label: string; pulse: boolean
}) {
  const color = status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
  const bg = status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background highlight */}
      <rect x={x} y={y} width={w} height={h} rx={3} fill={bg} />
      {/* Border — pulses when clicked */}
      <motion.rect
        x={x} y={y} width={w} height={h} rx={3}
        fill="none" stroke={color}
        initial={{ strokeWidth: 1, strokeOpacity: 0.5 }}
        animate={pulse
          ? { strokeWidth: [1, 2.5, 1], strokeOpacity: [0.5, 1, 0.5] }
          : { strokeWidth: 1, strokeOpacity: 0.5 }
        }
        transition={pulse
          ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
        }
      />
    </motion.g>
  )
}

function AssetRowHighlight({
  x, y, w, h, status, delay, pulse,
}: {
  x: number; y: number; w: number; h: number
  status: Status; delay: number; pulse: boolean
}) {
  const color = status === "verified" ? "var(--color-verified)" : "var(--color-flagged)"
  const bg = status === "verified" ? "var(--color-verified-light)" : "var(--color-flagged-light)"

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x={x} y={y} width={w} height={h} rx={2} fill={bg} />
      <motion.rect
        x={x} y={y} width={w} height={h} rx={2}
        fill="none" stroke={color}
        initial={{ strokeWidth: 0.8, strokeOpacity: 0.4 }}
        animate={pulse
          ? { strokeWidth: [0.8, 2.5, 0.8], strokeOpacity: [0.4, 1, 0.4] }
          : { strokeWidth: 0.8, strokeOpacity: 0.4 }
        }
        transition={pulse
          ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
        }
      />
    </motion.g>
  )
}

interface DocPanelProps {
  scenario: Scenario
  clicked: boolean
}

function DocumentPanel({ scenario, clicked }: DocPanelProps) {
  const insuredY = 66
  const lossPayeeY = 296
  const policyExpiryY = 150
  const tableStartY = 390
  const tableRowH = 22

  // Which highlight should pulse on this document?
  const headerPulseIndex = clicked && scenario.clickTarget === "header" ? scenario.clickIndex : -1
  const assetPulseIndex = clicked && scenario.clickTarget === "asset" ? scenario.clickIndex : -1

  // Map header field index to SVG highlight positions (top-down order: Insured → Expiry → Loss Payee)
  const headerHighlights = [
    { x: 264, y: insuredY, w: 244, h: 30 },        // 0: Named Insured
    { x: 280, y: policyExpiryY, w: 100, h: 36 },   // 1: Policy Expiry
    { x: 12, y: lossPayeeY, w: DW - 24, h: 38 },   // 2: Loss Payee
  ]

  // Spotlight area — the highlight that stays vivid when the rest dims
  let spotlightArea: { x: number; y: number; w: number; h: number } | null = null
  if (clicked) {
    if (scenario.clickTarget === "header") {
      spotlightArea = headerHighlights[scenario.clickIndex]
    } else {
      const rowY = tableStartY + 16 + scenario.clickIndex * tableRowH
      spotlightArea = { x: 12, y: rowY, w: DW - 24, h: tableRowH }
    }
  }

  return (
    <div className="hidden md:block">
      <svg
        viewBox={`0 0 ${DW} ${DH}`}
        fill="none"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.08))" }}
      >
        {/* Paper background */}
        <rect x={0} y={0} width={DW} height={DH} rx={4} fill="white" />
        <rect x={0} y={0} width={DW} height={DH} rx={4} fill="none" stroke="var(--color-border)" strokeWidth={1} />

        {/* ===== ACORD Form Header ===== */}
        <rect x={0} y={0} width={DW} height={44} rx={4} fill="#1a1a2e" />
        <rect x={0} y={20} width={DW} height={24} fill="#1a1a2e" />
        <text x={16} y={20} fontSize={11} fontWeight={800} fill="white" fontFamily={FONT} letterSpacing="0.5">ACORD</text>
        <text x={54} y={16} fontSize={5} fill="rgba(255,255,255,0.4)" fontFamily={FONT}>&#174;</text>
        <text x={16} y={36} fontSize={8} fill="rgba(255,255,255,0.6)" fontFamily={FONT} letterSpacing="0.3">CERTIFICATE OF LIABILITY INSURANCE</text>
        <text x={DW - 16} y={20} fontSize={7} fill="rgba(255,255,255,0.4)" fontFamily={FONT} textAnchor="end">DATE (MM/DD/YYYY)</text>
        <text x={DW - 16} y={34} fontSize={8} fill="rgba(255,255,255,0.6)" fontFamily={FONT} textAnchor="end" fontWeight={500}>01/15/2026</text>

        {/* ===== Producer / Insured ===== */}
        <rect x={12} y={52} width={248} height={70} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={62} fontSize={6} fill="#9ca3af" fontFamily={FONT} letterSpacing="0.5">PRODUCER</text>
        <text x={16} y={75} fontSize={8} fill="#374151" fontFamily={FONT} fontWeight={500}>{scenario.producerName}</text>
        <rect x={16} y={81} width={120} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={16} y={88} width={80} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={16} y={95} width={100} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={16} y={102} width={60} height={3} rx={1.5} fill="#e5e7eb" />

        <rect x={264} y={52} width={244} height={70} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={268} y={62} fontSize={6} fill="#9ca3af" fontFamily={FONT} letterSpacing="0.5">INSURED</text>
        <text x={268} y={75} fontSize={8} fill="#374151" fontFamily={FONT} fontWeight={500}>{scenario.insuredName}</text>
        <rect x={268} y={81} width={140} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={268} y={88} width={100} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={268} y={95} width={120} height={3} rx={1.5} fill="#e5e7eb" />

        {/* Named Insured highlight */}
        <Highlight
          x={headerHighlights[0].x} y={headerHighlights[0].y} w={headerHighlights[0].w} h={headerHighlights[0].h}
          status={scenario.headerFields[0].status}
          delay={FIELD_DELAYS[0]}
          label="Named Insured"
          pulse={headerPulseIndex === 0}
        />

        {/* ===== Policy info strip ===== */}
        <line x1={12} y1={130} x2={DW - 12} y2={130} stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={142} fontSize={6} fill="#9ca3af" fontFamily={FONT} letterSpacing="0.5">THIS IS TO CERTIFY THAT THE POLICIES OF INSURANCE LISTED BELOW HAVE BEEN ISSUED</text>

        <rect x={12} y={150} width={DW - 24} height={36} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <line x1={130} y1={150} x2={130} y2={186} stroke="#d1d5db" strokeWidth={0.5} />
        <line x1={280} y1={150} x2={280} y2={186} stroke="#d1d5db" strokeWidth={0.5} />
        <line x1={380} y1={150} x2={380} y2={186} stroke="#d1d5db" strokeWidth={0.5} />

        <text x={16} y={161} fontSize={6} fill="#9ca3af" fontFamily={FONT}>POLICY NUMBER</text>
        <text x={16} y={175} fontSize={8.5} fill="#374151" fontFamily={FONT} fontWeight={500}>{scenario.policyNumber}</text>
        <text x={134} y={161} fontSize={6} fill="#9ca3af" fontFamily={FONT}>POLICY EFF (MM/DD/YYYY)</text>
        <text x={134} y={175} fontSize={8.5} fill="#374151" fontFamily={FONT}>01/15/2026</text>
        <text x={284} y={161} fontSize={6} fill="#9ca3af" fontFamily={FONT}>POLICY EXP (MM/DD/YYYY)</text>
        <text x={284} y={175} fontSize={8.5} fill="#374151" fontFamily={FONT}>{scenario.headerFields[1].value}</text>
        <text x={384} y={161} fontSize={6} fill="#9ca3af" fontFamily={FONT}>TYPE OF INSURANCE</text>
        <text x={384} y={175} fontSize={8} fill="#374151" fontFamily={FONT}>Inland Marine</text>

        {/* Policy Expiry highlight */}
        <Highlight
          x={headerHighlights[1].x} y={headerHighlights[1].y} w={headerHighlights[1].w} h={headerHighlights[1].h}
          status={scenario.headerFields[1].status}
          delay={FIELD_DELAYS[1]}
          label="Policy Expiry"
          pulse={headerPulseIndex === 1}
        />

        {/* ===== Coverages ===== */}
        <line x1={12} y1={194} x2={DW - 12} y2={194} stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={208} fontSize={7} fill="#374151" fontFamily={FONT} fontWeight={600} letterSpacing="0.3">COVERAGES</text>

        <rect x={12} y={215} width={DW - 24} height={18} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={227} fontSize={7} fill="#6b7280" fontFamily={FONT}>General Aggregate</text>
        <text x={DW - 20} y={227} fontSize={7.5} fill="#374151" fontFamily={FONT} fontWeight={500} textAnchor="end">$2,000,000</text>

        <rect x={12} y={233} width={DW - 24} height={18} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={245} fontSize={7} fill="#6b7280" fontFamily={FONT}>Each Occurrence</text>
        <text x={DW - 20} y={245} fontSize={7.5} fill="#374151" fontFamily={FONT} fontWeight={500} textAnchor="end">$1,000,000</text>

        <rect x={12} y={251} width={DW - 24} height={18} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={263} fontSize={7} fill="#6b7280" fontFamily={FONT}>Deductible</text>
        <text x={DW - 20} y={263} fontSize={7.5} fill="#374151" fontFamily={FONT} fontWeight={500} textAnchor="end">$5,000</text>

        {/* ===== Loss Payee ===== */}
        <line x1={12} y1={277} x2={DW - 12} y2={277} stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={291} fontSize={7} fill="#374151" fontFamily={FONT} fontWeight={600} letterSpacing="0.3">CERTIFICATE HOLDER / LOSS PAYEE</text>

        <rect x={12} y={298} width={DW - 24} height={34} rx={0} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        <text x={16} y={311} fontSize={6} fill="#9ca3af" fontFamily={FONT}>LOSS PAYEE</text>
        <text x={16} y={324} fontSize={8.5} fill="#374151" fontFamily={FONT} fontWeight={500}>{scenario.headerFields[2].value}</text>

        {/* Loss Payee highlight */}
        <Highlight
          x={headerHighlights[2].x} y={headerHighlights[2].y} w={headerHighlights[2].w} h={headerHighlights[2].h}
          status={scenario.headerFields[2].status}
          delay={FIELD_DELAYS[2]}
          label="Loss Payee"
          pulse={headerPulseIndex === 2}
        />

        {/* ===== Placeholder rows ===== */}
        <rect x={12} y={340} width={DW - 24} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={12} y={348} width={180} height={3} rx={1.5} fill="#e5e7eb" />

        {/* ===== Equipment Schedule Table ===== */}
        <line x1={12} y1={360} x2={DW - 12} y2={360} stroke="#d1d5db" strokeWidth={0.5} />
        <motion.text
          x={16} y={376}
          fontSize={7} fill="#374151" fontFamily={FONT} fontWeight={600} letterSpacing="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: SCHED_DELAY, duration: 0.3 }}
        >
          SCHEDULE OF EQUIPMENT / PROPERTY
        </motion.text>

        {/* Table header */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: SCHED_DELAY + 0.1, duration: 0.3 }}
        >
          <rect x={12} y={382} width={DW - 24} height={16} rx={0} fill="#f9fafb" stroke="#d1d5db" strokeWidth={0.5} />
          <text x={20} y={393} fontSize={6} fill="#6b7280" fontFamily={FONT} fontWeight={600} letterSpacing="0.3">SERIAL / VIN</text>
          <text x={200} y={393} fontSize={6} fill="#6b7280" fontFamily={FONT} fontWeight={600} letterSpacing="0.3">DESCRIPTION</text>
          <text x={380} y={393} fontSize={6} fill="#6b7280" fontFamily={FONT} fontWeight={600} letterSpacing="0.3">ACV</text>
          <text x={DW - 20} y={393} fontSize={6} fill="#6b7280" fontFamily={FONT} fontWeight={600} letterSpacing="0.3" textAnchor="end">DEDUCTIBLE</text>
        </motion.g>

        {/* Asset rows */}
        {scenario.assets.map((asset, i) => {
          const rowY = tableStartY + 16 + i * tableRowH
          return (
            <g key={asset.serial}>
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ASSET_DELAYS[i] - 0.1, duration: 0.3 }}
              >
                <rect x={12} y={rowY} width={DW - 24} height={tableRowH} rx={0} fill="none" stroke="#e5e7eb" strokeWidth={0.5} />
                <text x={20} y={rowY + 14} fontSize={7.5} fill="#374151" fontFamily={FONT} fontWeight={400} style={{ fontVariantNumeric: "tabular-nums" }}>
                  {asset.serial}
                </text>
                <text x={200} y={rowY + 14} fontSize={7.5} fill="#374151" fontFamily={FONT}>{asset.name}</text>
                <text x={380} y={rowY + 14} fontSize={7.5} fill="#374151" fontFamily={FONT}>
                  {asset.details.find(d => d.label === "Actual Cash Value")?.value}
                </text>
                <text x={DW - 20} y={rowY + 14} fontSize={7.5} fill="#374151" fontFamily={FONT} textAnchor="end">
                  {asset.details.find(d => d.label === "Deductible")?.value}
                </text>
              </motion.g>

              <AssetRowHighlight
                x={12} y={rowY} w={DW - 24} h={tableRowH}
                status={asset.status}
                delay={ASSET_DELAYS[i]}
                pulse={assetPulseIndex === i}
              />
            </g>
          )
        })}

        {/* Bottom placeholder — implies document continues */}
        <rect x={12} y={DH - 14} width={180} height={3} rx={1.5} fill="#e5e7eb" />
        <rect x={200} y={DH - 14} width={120} height={3} rx={1.5} fill="#e5e7eb" />

        {/* Spotlight overlay — dims everything except the active highlight */}
        {clicked && spotlightArea && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <defs>
              <mask id="spotlight-mask">
                <rect width={DW} height={DH} fill="white" />
                <rect
                  x={spotlightArea.x - 4}
                  y={spotlightArea.y - 4}
                  width={spotlightArea.w + 8}
                  height={spotlightArea.h + 8}
                  rx={5}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              x={0} y={0} width={DW} height={DH} rx={4}
              fill="rgba(0,0,0,0.18)"
              mask="url(#spotlight-mask)"
            />
          </motion.g>
        )}
      </svg>
    </div>
  )
}

// ---------- Results Panel (1/3 width) ----------

interface ResultHeaderFieldProps {
  field: HeaderField
  delay: number
  pulse: boolean
}

function ResultHeaderField({ field, delay, pulse }: ResultHeaderFieldProps) {
  const borderColor = field.status === "flagged" ? "var(--color-flagged)" : "var(--color-border)"
  const bgColor = field.status === "flagged" ? "var(--color-flagged-light)" : "transparent"

  return (
    <motion.div
      className="flex items-center justify-between rounded-lg border px-2.5 py-1.5"
      style={{ borderColor, background: bgColor }}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: pulse ? [1, 0.975, 1] : 1,
        boxShadow: pulse
          ? [
              `0 0 0 0px ${borderColor}`,
              `0 0 6px 1.5px ${borderColor}`,
              `0 0 4px 1px ${borderColor}`,
            ]
          : "none",
      }}
      transition={pulse
        ? {
            scale: { duration: 0.7, times: [0, 0.35, 1], ease: [0.4, 0, 0.2, 1] },
            boxShadow: { duration: 0.7, times: [0, 0.35, 1], ease: [0.4, 0, 0.2, 1] },
            opacity: { delay, duration: 0.4, ease: EASE.smooth },
            y: { delay, duration: 0.4, ease: EASE.smooth },
          }
        : { delay, duration: 0.4, ease: EASE.smooth }
      }
    >
      <div className="min-w-0">
        <div className="text-[8px] uppercase tracking-wide text-text-tertiary">{field.label}</div>
        <div className="text-[10.5px] font-medium text-text-primary truncate">{field.value}</div>
        {field.status === "flagged" && field.expected && (
          <div className="text-[8px] mt-0.5" style={{ color: "var(--color-flagged)" }}>
            Expected: {field.expected}
          </div>
        )}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.3, ease: EASE.smooth }}
      >
        <StatusIcon status={field.status} size={16} />
      </motion.div>
    </motion.div>
  )
}

function ResultAssetRow({
  asset,
  delay,
  isExpanded,
}: {
  asset: Asset
  delay: number
  isExpanded: boolean
}) {
  const isFlagged = asset.status === "flagged"
  const borderColor = isFlagged ? "var(--color-flagged)" : "var(--color-border)"

  return (
    <motion.div
      className="overflow-hidden rounded-lg border"
      style={{ borderColor }}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isExpanded ? [1, 0.975, 1] : 1,
        boxShadow: isExpanded
          ? [
              `0 0 0 0px ${borderColor}`,
              `0 0 6px 1.5px ${borderColor}`,
              `0 0 4px 1px ${borderColor}`,
            ]
          : "none",
      }}
      transition={isExpanded
        ? {
            scale: { duration: 0.7, times: [0, 0.35, 1], ease: [0.4, 0, 0.2, 1] },
            boxShadow: { duration: 0.7, times: [0, 0.35, 1], ease: [0.4, 0, 0.2, 1] },
            opacity: { delay, duration: 0.35, ease: EASE.smooth },
            y: { delay, duration: 0.35, ease: EASE.smooth },
          }
        : { delay, duration: 0.35, ease: EASE.smooth }
      }
    >
      <div
        className="flex items-center gap-2 px-2.5 py-1.5"
        style={{ background: isFlagged ? "var(--color-flagged-light)" : "var(--color-surface)" }}
      >
        <motion.div
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[8px]"
          style={{
            background: isFlagged ? "var(--color-flagged)" : "var(--color-verified)",
            color: "white",
            fontWeight: 600,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.15, duration: 0.3, ease: EASE.smooth }}
        >
          {isFlagged ? "!" : "\u2713"}
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[10px] font-medium text-text-primary">{asset.name}</div>
          <div className="truncate text-[8px] text-text-tertiary">{asset.shortSerial}</div>
        </div>
        <motion.div
          className="text-text-tertiary"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.easeInOut }}
            className="overflow-hidden"
          >
            <div className="border-t px-2.5 py-1.5 space-y-1" style={{ borderColor: "var(--color-border)" }}>
              {asset.details.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  className="flex items-start justify-between gap-1.5 rounded px-1.5 py-0.5"
                  style={{
                    background: detail.status === "flagged" ? "var(--color-flagged-light)" : "transparent",
                  }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.3, ease: EASE.smooth }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[7.5px] uppercase tracking-wide text-text-tertiary">{detail.label}</div>
                    <div className="text-[9px] font-medium text-text-primary truncate">{detail.value}</div>
                    {detail.status === "flagged" && (
                      <div className="text-[8px] mt-0.5" style={{ color: "var(--color-flagged)" }}>
                        Expected: {detail.expected}
                      </div>
                    )}
                  </div>
                  <motion.div
                    className="mt-0.5 shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.25, ease: EASE.smooth }}
                  >
                    <StatusIcon status={detail.status} size={12} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface ResultsPanelProps {
  scenario: Scenario
  clicked: boolean
}

function ResultsPanel({ scenario, clicked }: ResultsPanelProps) {
  const headerPulseIndex = clicked && scenario.clickTarget === "header" ? scenario.clickIndex : -1
  const assetExpandIndex = clicked && scenario.clickTarget === "asset" ? scenario.clickIndex : -1

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <div className="h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />
        <span className="text-xs font-bold tracking-tight text-text-primary">Verification Results</span>
      </div>

      <div className="p-2.5 space-y-1.5">
        {scenario.headerFields.map((field, i) => (
          <ResultHeaderField
            key={field.label}
            field={field}
            delay={FIELD_DELAYS[i]}
            pulse={headerPulseIndex === i}
          />
        ))}

        <motion.div
          className="text-[8px] font-semibold uppercase tracking-wider text-text-tertiary pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: SCHED_DELAY, duration: 0.3 }}
        >
          Assets ({scenario.assets.length})
        </motion.div>

        <div className="space-y-1">
          {scenario.assets.map((asset, i) => (
            <ResultAssetRow
              key={asset.serial}
              asset={asset}
              delay={ASSET_DELAYS[i]}
              isExpanded={assetExpandIndex === i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Static version for reduced motion ----------

function StaticSolution() {
  const s = scenarios[0]
  return (
    <div className="mx-auto max-w-[60rem] grid items-start gap-4 md:grid-cols-[5fr_3fr] md:gap-5">
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${DW} ${DH}`} fill="none" className="w-full h-auto" style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.08))" }}>
          <rect x={0} y={0} width={DW} height={DH} rx={4} fill="white" stroke="var(--color-border)" strokeWidth={1} />
          <rect x={0} y={0} width={DW} height={44} rx={4} fill="#1a1a2e" />
          <rect x={0} y={20} width={DW} height={24} fill="#1a1a2e" />
          <text x={16} y={20} fontSize={11} fontWeight={800} fill="white" fontFamily={FONT}>ACORD</text>
          <text x={16} y={36} fontSize={8} fill="rgba(255,255,255,0.6)" fontFamily={FONT}>CERTIFICATE OF LIABILITY INSURANCE</text>
        </svg>
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-accent)" }} />
          <span className="text-[11px] font-semibold text-text-primary">Verification Results</span>
        </div>
        <div className="p-2.5 space-y-1.5">
          {s.headerFields.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between rounded-lg border px-2.5 py-1.5"
              style={{
                borderColor: f.status === "flagged" ? "var(--color-flagged)" : "var(--color-border)",
                background: f.status === "flagged" ? "var(--color-flagged-light)" : "transparent",
              }}
            >
              <div>
                <div className="text-[9px] text-text-tertiary">{f.label}</div>
                <div className="text-[11px] font-medium text-text-primary">{f.value}</div>
              </div>
              <StatusIcon status={f.status} size={16} />
            </div>
          ))}
          <div className="text-[9px] font-semibold uppercase tracking-wider text-text-tertiary pt-1">Assets ({s.assets.length})</div>
          <div className="space-y-1">
            {s.assets.map((a) => (
              <div
                key={a.serial}
                className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5"
                style={{
                  borderColor: a.status === "flagged" ? "var(--color-flagged)" : "var(--color-border)",
                  background: a.status === "flagged" ? "var(--color-flagged-light)" : "var(--color-surface)",
                }}
              >
                <div
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[8px]"
                  style={{ background: a.status === "flagged" ? "var(--color-flagged)" : "var(--color-verified)", color: "white", fontWeight: 600 }}
                >
                  {a.status === "flagged" ? "!" : "\u2713"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[9px] font-medium text-text-primary">{a.name}</div>
                  <div className="truncate text-[8px] font-mono text-text-tertiary">{a.shortSerial}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Main component ----------

export function SolutionAnimation() {
  const reduced = useReducedMotion()
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(true)

  const scenario = scenarios[scenarioIndex]

  useEffect(() => {
    if (reduced) return

    const clickTimer = setTimeout(() => setClicked(true), CLICK_S * 1000)
    const fadeTimer = setTimeout(() => setVisible(false), FADE_MS)
    const nextTimer = setTimeout(() => {
      setClicked(false)
      setVisible(true)
      setScenarioIndex((prev) => (prev + 1) % scenarios.length)
    }, CYCLE_MS)

    return () => {
      clearTimeout(clickTimer)
      clearTimeout(fadeTimer)
      clearTimeout(nextTimer)
    }
  }, [scenarioIndex, reduced])

  if (reduced) return <StaticSolution />

  return (
    <motion.div
      key={scenarioIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: EASE.easeInOut }}
      className="mx-auto max-w-[60rem] grid items-start gap-4 md:grid-cols-[5fr_3fr] md:gap-5"
    >
      <DocumentPanel scenario={scenario} clicked={clicked} />
      <ResultsPanel scenario={scenario} clicked={clicked} />
    </motion.div>
  )
}
