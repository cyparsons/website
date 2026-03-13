import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

const metrics = [
  { value: 4, suffix: "x", label: "Faster verification" },
  { value: 60, suffix: "%", label: "COI deficiency rate" },
  { value: 99, suffix: "%", label: "Accuracy" },
];

const MetricCard: React.FC<{
  metric: (typeof metrics)[0];
  index: number;
}> = ({ metric, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 0.3 * fps;

  const cardOpacity = interpolate(
    frame,
    [delay, delay + 0.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
  const cardY = interpolate(
    frame,
    [delay, delay + 0.4 * fps],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  // Count-up animation
  const countProgress = interpolate(
    frame,
    [delay + 0.2 * fps, delay + 1.8 * fps],
    [0, metric.value],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        flex: 1,
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.borderLight}`,
        borderRadius: 20,
        padding: "48px 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          color: COLORS.accent,
          lineHeight: 1,
        }}
      >
        {Math.round(countProgress)}
        {metric.suffix}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: COLORS.textSecondary,
          textAlign: "center",
        }}
      >
        {metric.label}
      </div>
    </div>
  );
};

export const MetricsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline
  const headOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const headY = interpolate(frame, [0, 0.5 * fps], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.deepNavy,
        fontFamily: FONT_FAMILY,
        padding: "80px 100px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.accent}15 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          fontSize: 13,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Proven Results
      </div>
      <div
        style={{
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.textPrimary,
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 64,
          maxWidth: 700,
        }}
      >
        Built for equipment finance. Proven in production.
      </div>

      {/* Metric cards */}
      <Sequence from={Math.round(0.3 * fps)} layout="none">
        <div style={{ display: "flex", gap: 32, width: "100%" }}>
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} index={i} />
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
