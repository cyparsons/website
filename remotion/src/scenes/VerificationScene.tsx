import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

// Comparison fields matching the product's actual verification checks
const fields = [
  {
    leftLabel: "Named Insured",
    rightLabel: "Lessee",
    left: "Nexus Freight Corp",
    right: "Nexus Freight Corp",
    status: "verified" as const,
  },
  {
    leftLabel: "Policy Number",
    rightLabel: "Policy on File",
    left: "PLH-0042819",
    right: "PLH-0042819",
    status: "verified" as const,
  },
  {
    leftLabel: "Serial Number",
    rightLabel: "Equipment S/N",
    left: "4UZAANDH5BC...",
    right: "4UZAANDH5BC...",
    status: "verified" as const,
  },
  {
    leftLabel: "Loss Payee",
    rightLabel: "Lessor",
    left: "Maple Leaf Leasing",
    right: "Northern Credit Corp",
    status: "flagged" as const,
  },
  {
    leftLabel: "Policy Expiry",
    rightLabel: "Coverage Through",
    left: "08/15/2026",
    right: "08/15/2026",
    status: "verified" as const,
  },
  {
    leftLabel: "Deductible",
    rightLabel: "Max Deductible",
    left: "$5,000",
    right: "$2,500",
    status: "flagged" as const,
  },
];

// SVG Layout constants
const LX = 0;
const LW = 340;
const RX = 420;
const RW = 320;
const PAD = 14;
const FW_L = LW - PAD * 2;
const FW_R = RW - PAD * 2;
const FSTART = 110;
const FH = 42;
const FGAP = 48;
const DOC_H = FSTART + fields.length * FGAP + 12;
const MID = (LX + LW + RX) / 2;
const SUM_Y = DOC_H + 14;
const TOTAL_H = SUM_Y + 44;
const VW = RX + RW;

function Bar({
  x,
  y,
  w,
  h = 5,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={2.5}
      fill={COLORS.borderLight}
      opacity={0.5}
    />
  );
}

function COIChrome() {
  return (
    <g>
      <rect
        x={LX}
        y={0}
        width={LW}
        height={DOC_H}
        rx={10}
        fill={COLORS.bgSurface}
        stroke={COLORS.borderLight}
        strokeWidth={1}
      />
      {/* ACORD header */}
      <rect x={LX} y={0} width={LW} height={26} rx={10} fill={COLORS.navy} />
      <rect x={LX} y={14} width={LW} height={12} fill={COLORS.navy} />
      <text
        x={LX + PAD}
        y={18}
        fontSize={10}
        fontWeight={700}
        fill="white"
        fontFamily={FONT_FAMILY}
      >
        ACORD
      </text>
      <text
        x={LX + LW - PAD}
        y={18}
        fontSize={7}
        fill="rgba(255,255,255,0.5)"
        fontFamily={FONT_FAMILY}
        textAnchor="end"
      >
        01/15/2026
      </text>
      {/* Form title */}
      <text
        x={LX + PAD}
        y={42}
        fontSize={8}
        fontWeight={600}
        fill={COLORS.textSecondary}
        fontFamily={FONT_FAMILY}
        letterSpacing={0.4}
      >
        CERTIFICATE OF LIABILITY INSURANCE
      </text>
      {/* Producer/Insured boxes */}
      <rect
        x={LX + PAD}
        y={50}
        width={148}
        height={34}
        rx={4}
        fill="none"
        stroke={COLORS.borderLight}
        strokeWidth={0.5}
      />
      <text
        x={LX + PAD + 4}
        y={60}
        fontSize={6}
        fill={COLORS.textTertiary}
        fontFamily={FONT_FAMILY}
      >
        PRODUCER
      </text>
      <Bar x={LX + PAD + 4} y={65} w={90} />
      <Bar x={LX + PAD + 4} y={74} w={65} />
      <rect
        x={LX + PAD + 155}
        y={50}
        width={148}
        height={34}
        rx={4}
        fill="none"
        stroke={COLORS.borderLight}
        strokeWidth={0.5}
      />
      <text
        x={LX + PAD + 159}
        y={60}
        fontSize={6}
        fill={COLORS.textTertiary}
        fontFamily={FONT_FAMILY}
      >
        INSURED
      </text>
      <Bar x={LX + PAD + 159} y={65} w={100} />
      <Bar x={LX + PAD + 159} y={74} w={75} />
      {/* Coverages header */}
      <rect
        x={LX + PAD}
        y={90}
        width={FW_L}
        height={16}
        rx={3}
        fill={COLORS.bgCard}
        stroke={COLORS.borderLight}
        strokeWidth={0.3}
      />
      <text
        x={LX + PAD + 6}
        y={101}
        fontSize={7}
        fontWeight={600}
        fill={COLORS.textSecondary}
        fontFamily={FONT_FAMILY}
        letterSpacing={0.3}
      >
        COVERAGES
      </text>
      {/* Grid lines */}
      {fields.map((_, i) => (
        <line
          key={i}
          x1={LX + PAD}
          y1={FSTART + i * FGAP + FH + 2}
          x2={LX + LW - PAD}
          y2={FSTART + i * FGAP + FH + 2}
          stroke={COLORS.borderLight}
          strokeWidth={0.3}
          opacity={0.4}
        />
      ))}
    </g>
  );
}

function ScheduleChrome() {
  return (
    <g>
      <rect
        x={RX}
        y={0}
        width={RW}
        height={DOC_H}
        rx={10}
        fill={COLORS.bgSurface}
        stroke={COLORS.borderLight}
        strokeWidth={1}
      />
      {/* Header */}
      <rect x={RX} y={0} width={RW} height={26} rx={10} fill={COLORS.accent} />
      <rect x={RX} y={14} width={RW} height={12} fill={COLORS.accent} />
      <text
        x={RX + PAD}
        y={18}
        fontSize={9}
        fontWeight={600}
        fill="white"
        fontFamily={FONT_FAMILY}
      >
        EQUIPMENT SCHEDULE
      </text>
      {/* Deal info */}
      <text
        x={RX + PAD}
        y={42}
        fontSize={7}
        fill={COLORS.textTertiary}
        fontFamily={FONT_FAMILY}
      >
        Deal #EF-2024-0847
      </text>
      <Bar x={RX + PAD} y={50} w={120} />
      <Bar x={RX + PAD} y={60} w={90} />
      {/* Requirements header */}
      <rect
        x={RX + PAD}
        y={72}
        width={FW_R}
        height={16}
        rx={3}
        fill={COLORS.bgCard}
        stroke={COLORS.borderLight}
        strokeWidth={0.3}
      />
      <text
        x={RX + PAD + 6}
        y={83}
        fontSize={7}
        fontWeight={600}
        fill={COLORS.textSecondary}
        fontFamily={FONT_FAMILY}
        letterSpacing={0.3}
      >
        VERIFICATION REQUIREMENTS
      </text>
      {/* Equipment info */}
      <text
        x={RX + PAD + 6}
        y={100}
        fontSize={7}
        fill={COLORS.textTertiary}
        fontFamily={FONT_FAMILY}
      >
        2024 Volvo VNL 860
      </text>
      {/* Grid lines */}
      {fields.map((_, i) => (
        <line
          key={i}
          x1={RX + PAD}
          y1={FSTART + i * FGAP + FH + 2}
          x2={RX + RW - PAD}
          y2={FSTART + i * FGAP + FH + 2}
          stroke={COLORS.borderLight}
          strokeWidth={0.3}
          opacity={0.4}
        />
      ))}
    </g>
  );
}

export const VerificationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Headline
  const headOpacity = interpolate(frame, [0.1 * fps, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Left doc slide in
  const leftDocOpacity = interpolate(
    frame,
    [0.5 * fps, 1 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
  const leftDocX = interpolate(
    frame,
    [0.5 * fps, 1 * fps],
    [-40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  // Right doc slide in
  const rightDocOpacity = interpolate(
    frame,
    [0.7 * fps, 1.2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
  const rightDocX = interpolate(
    frame,
    [0.7 * fps, 1.2 * fps],
    [40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.deepNavy,
        fontFamily: FONT_FAMILY,
        padding: "40px 80px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Ambient glow behind SVG */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}20 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            opacity: labelOpacity,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          How It Works
        </div>
        <div
          style={{
            opacity: headOpacity,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.textPrimary,
            lineHeight: 1.2,
          }}
        >
          Automated field-by-field comparison
        </div>
      </div>

      {/* SVG Document Comparison */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          viewBox={`0 0 ${VW} ${TOTAL_H}`}
          fill="none"
          style={{ width: "100%", maxHeight: "100%" }}
        >
          {/* Left document */}
          <g
            style={{
              opacity: leftDocOpacity,
              transform: `translateX(${leftDocX}px)`,
            }}
          >
            <COIChrome />
          </g>

          {/* Right document */}
          <g
            style={{
              opacity: rightDocOpacity,
              transform: `translateX(${rightDocX}px)`,
            }}
          >
            <ScheduleChrome />
          </g>

          {/* Field-by-field comparisons */}
          <Sequence from={Math.round(1.5 * fps)} layout="none">
            <FieldComparisons />
          </Sequence>

          {/* Summary bar */}
          <Sequence from={Math.round(1.5 * fps + fields.length * 0.5 * fps + 0.5 * fps)} layout="none">
            <SummaryBar />
          </Sequence>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const FieldComparisons: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {fields.map((f, i) => {
        const y = FSTART + i * FGAP;
        const delay = i * 0.5 * fps;
        const color =
          f.status === "verified" ? COLORS.verified : COLORS.flagged;
        const bg =
          f.status === "verified" ? COLORS.verifiedLight : COLORS.flaggedLight;

        // Left field highlight
        const leftOpacity = interpolate(
          frame,
          [delay, delay + 0.3 * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Right field highlight (slightly delayed)
        const rightOpacity = interpolate(
          frame,
          [delay + 0.1 * fps, delay + 0.4 * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Connection line
        const lineLength = interpolate(
          frame,
          [delay + 0.2 * fps, delay + 0.45 * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
        );
        const lineOpacity = interpolate(
          frame,
          [delay + 0.2 * fps, delay + 0.35 * fps],
          [0, 0.7],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Status dot
        const dotScale = interpolate(
          frame,
          [delay + 0.35 * fps, delay + 0.5 * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
        );
        const dotOpacity = interpolate(
          frame,
          [delay + 0.35 * fps, delay + 0.45 * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Connection line endpoints
        const lineX1 = LX + LW;
        const lineX2 = RX;
        const lineY = y + FH / 2;
        const actualX2 = lineX1 + (lineX2 - lineX1) * lineLength;

        return (
          <g key={i}>
            {/* Left field */}
            <rect
              x={LX + PAD}
              y={y}
              width={FW_L}
              height={FH}
              rx={5}
              fill={bg}
              opacity={leftOpacity}
            />
            <g opacity={leftOpacity}>
              <text
                x={LX + PAD + 10}
                y={y + 16}
                fontSize={9}
                fill={COLORS.textSecondary}
                fontFamily={FONT_FAMILY}
              >
                {f.leftLabel}
              </text>
              <text
                x={LX + PAD + 10}
                y={y + 32}
                fontSize={12}
                fontWeight={500}
                fill={COLORS.textPrimary}
                fontFamily={FONT_FAMILY}
              >
                {f.left}
              </text>
            </g>

            {/* Right field */}
            <rect
              x={RX + PAD}
              y={y}
              width={FW_R}
              height={FH}
              rx={5}
              fill={bg}
              opacity={rightOpacity}
            />
            <g opacity={rightOpacity}>
              <text
                x={RX + PAD + 10}
                y={y + 16}
                fontSize={9}
                fill={COLORS.textSecondary}
                fontFamily={FONT_FAMILY}
              >
                {f.rightLabel}
              </text>
              <text
                x={RX + PAD + 10}
                y={y + 32}
                fontSize={12}
                fontWeight={500}
                fill={COLORS.textPrimary}
                fontFamily={FONT_FAMILY}
              >
                {f.right}
              </text>
            </g>

            {/* Connection line */}
            <line
              x1={lineX1}
              y1={lineY}
              x2={actualX2}
              y2={lineY}
              stroke={color}
              strokeWidth={2}
              strokeDasharray="5,5"
              opacity={lineOpacity}
            />

            {/* Status dot */}
            <circle
              cx={MID}
              cy={lineY}
              r={7 * dotScale}
              fill={color}
              opacity={dotOpacity}
            />
            {/* Checkmark or flag icon in dot */}
            {dotScale > 0.8 && f.status === "verified" && (
              <text
                x={MID}
                y={lineY + 4}
                fontSize={9}
                fill="white"
                fontFamily={FONT_FAMILY}
                textAnchor="middle"
                fontWeight={700}
                opacity={dotOpacity}
              >
                ✓
              </text>
            )}
            {dotScale > 0.8 && f.status === "flagged" && (
              <text
                x={MID}
                y={lineY + 4}
                fontSize={9}
                fill="white"
                fontFamily={FONT_FAMILY}
                textAnchor="middle"
                fontWeight={700}
                opacity={dotOpacity}
              >
                !
              </text>
            )}
          </g>
        );
      })}
    </>
  );
};

const SummaryBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const y = interpolate(frame, [0, 0.5 * fps], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <g style={{ opacity, transform: `translateY(${y}px)` }}>
      <rect
        x={LX}
        y={SUM_Y}
        width={VW}
        height={44}
        rx={10}
        fill={COLORS.bgCard}
        stroke={COLORS.borderLight}
        strokeWidth={1}
      />
      {/* Verified count */}
      <circle cx={30} cy={SUM_Y + 22} r={7} fill={COLORS.verified} />
      <text
        x={44}
        y={SUM_Y + 26}
        fontSize={14}
        fontWeight={600}
        fill={COLORS.textPrimary}
        fontFamily={FONT_FAMILY}
      >
        4 Verified
      </text>
      {/* Flagged count */}
      <circle cx={160} cy={SUM_Y + 22} r={7} fill={COLORS.flagged} />
      <text
        x={174}
        y={SUM_Y + 26}
        fontSize={14}
        fontWeight={600}
        fill={COLORS.textPrimary}
        fontFamily={FONT_FAMILY}
      >
        2 Flagged
      </text>
      {/* Timestamp */}
      <text
        x={VW - 20}
        y={SUM_Y + 26}
        fontSize={11}
        fill={COLORS.textTertiary}
        fontFamily={FONT_FAMILY}
        textAnchor="end"
      >
        Verified in 4.2s
      </text>
    </g>
  );
};
