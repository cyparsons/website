import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../design";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow pulse
  const glowOpacity = interpolate(frame, [0, 1 * fps], [0, 0.4], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Main text
  const textOpacity = interpolate(frame, [0.2 * fps, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const textY = interpolate(frame, [0.2 * fps, 0.8 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Button
  const btnOpacity = interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const btnScale = interpolate(frame, [0.8 * fps, 1.3 * fps], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // URL
  const urlOpacity = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navy,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}50 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(100px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textPrimary,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 700,
          }}
        >
          Stop reviewing COIs manually
        </div>

        {/* Subheadline */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 22,
            color: COLORS.textSecondary,
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          See how Swift Stack automates pre-funding document verification for
          your team.
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            marginTop: 16,
            padding: "18px 48px",
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.white,
            boxShadow: `0 0 40px ${COLORS.accent}40`,
          }}
        >
          Get Started
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontSize: 16,
            color: COLORS.textTertiary,
            marginTop: 8,
          }}
        >
          swiftstacksolutions.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
