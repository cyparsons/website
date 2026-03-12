import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { colors } from "../theme";
import { Cursor } from "../components/Cursor";

export const LoginScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card fade in
  const cardOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [0, 0.5 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Email typing animation
  const email = "cyrus@swiftcoi.ai";
  const typingStart = Math.round(0.8 * fps);
  const charsPerFrame = 0.4;
  const emailChars = Math.min(
    email.length,
    Math.max(0, Math.floor((frame - typingStart) * charsPerFrame))
  );
  const displayEmail = email.slice(0, emailChars);

  // Password dots (appear after email finishes)
  const passwordStart = typingStart + Math.ceil(email.length / charsPerFrame) + Math.round(0.3 * fps);
  const passwordDots = Math.min(
    8,
    Math.max(0, Math.floor((frame - passwordStart) * 0.5))
  );

  // Cursor starts moving to Continue button after password
  const cursorStartFrame = passwordStart + Math.ceil(8 / 0.5) + Math.round(0.5 * fps);

  // Button highlight on hover
  const buttonHoverProgress = interpolate(
    frame,
    [cursorStartFrame + Math.round(0.6 * fps), cursorStartFrame + Math.round(0.8 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F0F0F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo top-left */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          display: "flex",
          gap: 3,
          opacity: cardOpacity,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.text.primary,
          }}
        >
          SWIFT
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.accent.blue,
            marginLeft: 3,
          }}
        >
          COI
        </span>
      </div>

      {/* Login Card */}
      <div
        style={{
          width: 420,
          backgroundColor: "white",
          borderRadius: 16,
          padding: "40px 36px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.text.primary,
              margin: 0,
            }}
          >
            Sign in to Swift COI
          </h2>
          <p
            style={{
              fontSize: 14,
              color: colors.text.secondary,
              margin: "8px 0 0",
            }}
          >
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* Microsoft SSO Button */}
        <div
          style={{
            width: "100%",
            height: 44,
            border: `1px solid ${colors.border.strong}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 4,
            position: "relative",
          }}
        >
          {/* MS logo simplified */}
          <div style={{ display: "flex", gap: 2 }}>
            <div style={{ width: 8, height: 8, backgroundColor: "#F25022" }} />
            <div style={{ width: 8, height: 8, backgroundColor: "#7FBA00" }} />
          </div>
          <div style={{ display: "flex", gap: 2, marginTop: -2 }}>
            <div style={{ width: 8, height: 8, backgroundColor: "#00A4EF" }} />
            <div style={{ width: 8, height: 8, backgroundColor: "#FFB900" }} />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: colors.text.primary,
              marginLeft: 4,
            }}
          >
            Continue with Microsoft
          </span>
          <span
            style={{
              position: "absolute",
              right: 12,
              fontSize: 11,
              color: colors.text.tertiary,
            }}
          >
            Last used
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "20px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.border.strong,
            }}
          />
          <span
            style={{ fontSize: 13, color: colors.text.tertiary }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.border.strong,
            }}
          />
        </div>

        {/* Email field */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.text.primary,
              display: "block",
              marginBottom: 6,
            }}
          >
            Email address
          </label>
          <div
            style={{
              width: "100%",
              height: 40,
              border: emailChars > 0 ? "2px solid #B4C7F7" : `1px solid ${colors.border.strong}`,
              borderRadius: 8,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                emailChars > 0 ? "#F0F4FF" : "white",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: colors.text.primary,
              }}
            >
              {displayEmail}
              {emailChars < email.length && emailChars > 0 && (
                <span
                  style={{
                    opacity: frame % Math.round(fps * 0.5) < Math.round(fps * 0.25) ? 1 : 0,
                    color: colors.accent.blue,
                  }}
                >
                  |
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.text.primary,
              display: "block",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <div
            style={{
              width: "100%",
              height: 40,
              border: passwordDots > 0 ? "2px solid #B4C7F7" : `1px solid ${colors.border.strong}`,
              borderRadius: 8,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                passwordDots > 0 ? "#F0F4FF" : "white",
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: colors.text.primary,
                letterSpacing: 3,
              }}
            >
              {"●".repeat(passwordDots)}
            </span>
          </div>
        </div>

        {/* Continue button */}
        <div
          style={{
            width: "100%",
            height: 44,
            backgroundColor: interpolate(
              buttonHoverProgress,
              [0, 1],
              [0.85, 0.95]
            )
              ? colors.accent.blue
              : colors.accent.blueHover,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            opacity: interpolate(buttonHoverProgress, [0, 1], [0.85, 1]),
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "white",
            }}
          >
            Continue
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* Clerk footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            paddingTop: 16,
            borderTop: `1px solid ${colors.border.default}`,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: colors.text.tertiary,
            }}
          >
            Secured by clerk
          </span>
        </div>
      </div>

      {/* Animated cursor */}
      <Cursor
        from={[900, 640]}
        to={[960, 710]}
        startFrame={cursorStartFrame}
        click
        clickDelay={Math.round(0.15 * fps)}
      />
    </AbsoluteFill>
  );
};
