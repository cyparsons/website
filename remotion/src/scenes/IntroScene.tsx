import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient glow pulse
  const glowOpacity = interpolate(frame, [0, 2 * fps], [0, 0.3], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Logo/brand entrance
  const logoOpacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const logoY = interpolate(frame, [0.2 * fps, 1 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Tagline entrance (delayed)
  const taglineOpacity = interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const taglineY = interpolate(frame, [1 * fps, 1.8 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Subtitle entrance
  const subOpacity = interpolate(frame, [1.6 * fps, 2.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.deepNavy,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}40 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Stylized S logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 60px ${COLORS.accent}40`,
          }}
        >
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1,
            }}
          >
            S
          </span>
        </div>

        {/* Company name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          Swift Stack
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.accent,
          marginTop: 16,
          letterSpacing: "0.5px",
        }}
      >
        AI-Powered Document Verification
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          fontSize: 20,
          color: COLORS.textSecondary,
          marginTop: 12,
        }}
      >
        for Equipment Finance
      </div>
    </AbsoluteFill>
  );
};
