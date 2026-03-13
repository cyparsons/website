import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

const exceptions = [
  {
    field: "Loss Payee",
    message: "Entity doesn't match approved lessee",
    severity: "error" as const,
  },
  {
    field: "Deductible",
    message: "Exceeds maximum allowed ($2,500)",
    severity: "error" as const,
  },
  {
    field: "Cancellation Notice",
    message: "30 days required, 15 days listed",
    severity: "warning" as const,
  },
];

const compliant = [
  { field: "Named Insured", message: "Matches lessee on file" },
  { field: "Policy Number", message: "Matches previous approval" },
  { field: "Serial Number", message: "Equipment serial verified" },
  { field: "Policy Expiry", message: "Active coverage confirmed" },
];

const ExceptionItem: React.FC<{
  item: (typeof exceptions)[0];
  index: number;
}> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 0.2 * fps;
  const opacity = interpolate(frame, [delay, delay + 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const x = interpolate(frame, [delay, delay + 0.3 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const color = item.severity === "error" ? COLORS.error : COLORS.flagged;
  const bg = item.severity === "error" ? COLORS.errorLight : COLORS.flaggedLight;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        background: bg,
        border: `1px solid ${color}30`,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.textPrimary,
            marginBottom: 4,
          }}
        >
          {item.field}
        </div>
        <div style={{ fontSize: 14, color: COLORS.textSecondary }}>
          {item.message}
        </div>
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {item.severity === "error" ? "Non-Compliant" : "Advisory"}
      </div>
    </div>
  );
};

const CompliantItem: React.FC<{
  item: (typeof compliant)[0];
  index: number;
}> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 0.15 * fps;
  const opacity = interpolate(frame, [delay, delay + 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        background: COLORS.verifiedLight,
        border: `1px solid ${COLORS.verified}20`,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: COLORS.verified,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "white",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div>
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.textPrimary,
            marginRight: 8,
          }}
        >
          {item.field}
        </span>
        <span style={{ fontSize: 14, color: COLORS.textSecondary }}>
          {item.message}
        </span>
      </div>
    </div>
  );
};

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel slide in
  const panelOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const panelX = interpolate(frame, [0, 0.5 * fps], [60, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Summary counters
  const counterStart = 0.5 * fps;
  const errorCount = Math.round(
    interpolate(frame, [counterStart, counterStart + 0.6 * fps], [0, 2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }),
  );
  const warningCount = Math.round(
    interpolate(
      frame,
      [counterStart + 0.1 * fps, counterStart + 0.7 * fps],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      },
    ),
  );
  const compliantCount = Math.round(
    interpolate(
      frame,
      [counterStart + 0.2 * fps, counterStart + 0.8 * fps],
      [0, 4],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      },
    ),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.deepNavy,
        fontFamily: FONT_FAMILY,
        flexDirection: "row",
        padding: "60px 80px",
        gap: 60,
      }}
    >
      {/* Left: context */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: panelOpacity,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Analysis Results
        </div>
        <div
          style={{
            opacity: panelOpacity,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.textPrimary,
            lineHeight: 1.2,
            marginBottom: 32,
          }}
        >
          Every deficiency surfaced instantly
        </div>
        <div
          style={{
            opacity: panelOpacity,
            fontSize: 18,
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            maxWidth: 420,
          }}
        >
          Swift Stack checks policy coverage, serial numbers, loss payees,
          deductibles, and endorsements in seconds, not hours.
        </div>

        {/* Summary badges */}
        <Sequence from={Math.round(counterStart)} layout="none">
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
            }}
          >
            <SummaryBadge
              count={errorCount}
              label="Non-Compliant"
              color={COLORS.error}
              bg={COLORS.errorLight}
            />
            <SummaryBadge
              count={warningCount}
              label="Advisory"
              color={COLORS.flagged}
              bg={COLORS.flaggedLight}
            />
            <SummaryBadge
              count={compliantCount}
              label="Compliant"
              color={COLORS.verified}
              bg={COLORS.verifiedLight}
            />
          </div>
        </Sequence>
      </div>

      {/* Right: results panel */}
      <div
        style={{
          width: 480,
          opacity: panelOpacity,
          transform: `translateX(${panelX}px)`,
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.borderLight}`,
          borderRadius: 16,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflow: "hidden",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.error,
            }}
          />
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.textPrimary,
            }}
          >
            Exceptions Detected
          </div>
        </div>

        {/* Exception items */}
        <Sequence from={Math.round(0.6 * fps)} layout="none">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exceptions.map((e, i) => (
              <ExceptionItem key={i} item={e} index={i} />
            ))}
          </div>
        </Sequence>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: COLORS.borderLight,
            margin: "8px 0",
          }}
        />

        {/* Compliant items */}
        <Sequence from={Math.round(1.5 * fps)} layout="none">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {compliant.map((c, i) => (
              <CompliantItem key={i} item={c} index={i} />
            ))}
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

const SummaryBadge: React.FC<{
  count: number;
  label: string;
  color: string;
  bg: string;
}> = ({ count, label, color, bg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        background: bg,
        border: `1px solid ${color}30`,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
        }}
      />
      <span
        style={{
          fontSize: 20,
          fontWeight: 700,
          color,
        }}
      >
        {count}
      </span>
      <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{label}</span>
    </div>
  );
};
