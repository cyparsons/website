import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

const problems = [
  {
    icon: "🔍",
    title: "Manual Review",
    desc: "Teams spend hours reading every COI line by line",
  },
  {
    icon: "🔄",
    title: "Repetitive Work",
    desc: "Same 15+ checks repeated on every single deal",
  },
  {
    icon: "⚠️",
    title: "Missed Deficiencies",
    desc: "Human fatigue leads to costly coverage gaps",
  },
];

const ProblemCard: React.FC<{ problem: (typeof problems)[0]; index: number }> =
  ({ problem, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const delay = index * 0.25 * fps;

    const opacity = interpolate(frame, [delay, delay + 0.5 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });

    const y = interpolate(frame, [delay, delay + 0.5 * fps], [30, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });

    return (
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.borderLight}`,
          borderRadius: 16,
          padding: "32px 28px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 36 }}>{problem.icon}</div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.textPrimary,
          }}
        >
          {problem.title}
        </div>
        <div
          style={{
            fontSize: 16,
            color: COLORS.textSecondary,
            lineHeight: 1.5,
          }}
        >
          {problem.desc}
        </div>
      </div>
    );
  };

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Headline
  const headOpacity = interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const headY = interpolate(frame, [0.2 * fps, 0.7 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Stat counter (60%)
  const statProgress = interpolate(frame, [1.5 * fps, 3.5 * fps], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const statOpacity = interpolate(frame, [1.5 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.deepNavy,
        fontFamily: FONT_FAMILY,
        padding: "80px 100px",
        justifyContent: "center",
      }}
    >
      {/* Section label */}
      <div
        style={{
          opacity: labelOpacity,
          fontSize: 13,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        The Problem
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.textPrimary,
          lineHeight: 1.2,
          marginBottom: 48,
          maxWidth: 700,
        }}
      >
        Manual COI verification is slow, repetitive, and risky
      </div>

      {/* Problem cards */}
      <Sequence from={Math.round(0.6 * fps)} layout="none">
        <div style={{ display: "flex", gap: 24 }}>
          {problems.map((p, i) => (
            <ProblemCard key={i} problem={p} index={i} />
          ))}
        </div>
      </Sequence>

      {/* Stat callout */}
      <div
        style={{
          opacity: statOpacity,
          marginTop: 48,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.flagged,
          }}
        >
          {Math.round(statProgress)}%
        </span>
        <span
          style={{
            fontSize: 22,
            color: COLORS.textSecondary,
          }}
        >
          of COIs contain deficiencies
        </span>
      </div>
    </AbsoluteFill>
  );
};
