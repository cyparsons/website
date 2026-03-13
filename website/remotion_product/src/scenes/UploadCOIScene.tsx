import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { colors } from "../theme";
import { AppShell } from "../components/AppShell";
import { Cursor } from "../components/Cursor";

export const UploadCOIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // File appears
  const fileAppearFrame = Math.round(1 * fps);
  const fileOpacity = interpolate(
    frame,
    [fileAppearFrame, fileAppearFrame + 0.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fileSlideX = interpolate(
    frame,
    [fileAppearFrame, fileAppearFrame + 0.4 * fps],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // Lender dropdown appears
  const lenderAppearFrame = Math.round(2.5 * fps);
  const lenderOpacity = interpolate(
    frame,
    [lenderAppearFrame, lenderAppearFrame + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor to Compare button
  const cursorStartFrame = Math.round(4.5 * fps);

  return (
    <AbsoluteFill>
      <AppShell breadcrumbs={["New Comparison", "Upload Documents"]}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          {/* Step Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <StepPill label="Comparison Docs" completed />
            <div
              style={{
                width: 40,
                height: 1,
                backgroundColor: colors.border.strong,
              }}
            />
            <StepPill number={2} label="COI Docs" active />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: colors.text.primary,
              margin: "0 0 8px",
            }}
          >
            Upload COI Documents
          </h1>
          <p
            style={{
              fontSize: 14,
              color: colors.text.secondary,
              margin: "0 0 24px",
            }}
          >
            Upload your new COI documents for comparison against the source of
            truth
          </p>

          {/* Two-column layout */}
          <div style={{ display: "flex", gap: 24 }}>
            {/* Upload Zone */}
            <div style={{ flex: 1.2 }}>
              <div
                style={{
                  border: `2px dashed ${colors.border.strong}`,
                  borderRadius: 12,
                  padding: "48px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.bg.card,
                  minHeight: 200,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: colors.bg.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.text.tertiary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: colors.text.primary,
                    marginBottom: 6,
                  }}
                >
                  Upload your documents
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: colors.text.secondary,
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Drag files or outlook attachments, or paste
                  <br />
                  Sharepoint links here.
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      height: 32,
                      padding: "0 12px",
                      border: `1px solid ${colors.border.strong}`,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.text.secondary}
                      strokeWidth="2"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div
                    style={{
                      height: 32,
                      padding: "0 12px",
                      border: `1px solid ${colors.border.strong}`,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      backgroundColor: "white",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.text.secondary}
                      strokeWidth="2"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span style={{ fontSize: 13, color: colors.text.secondary }}>
                      Paste Link
                    </span>
                  </div>
                </div>
              </div>

              {/* Lender dropdown */}
              <div
                style={{
                  opacity: lenderOpacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 20,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: colors.text.secondary,
                  }}
                >
                  Lender:
                </span>
                <div
                  style={{
                    height: 36,
                    padding: "0 14px",
                    border: `1px solid ${colors.border.strong}`,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "white",
                    minWidth: 180,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: colors.text.primary,
                    }}
                  >
                    Maple Leaf Financing
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.text.tertiary}
                    strokeWidth="2"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File List */}
            <div
              style={{
                flex: 1,
                opacity: fileOpacity,
                transform: `translateX(${fileSlideX}px)`,
              }}
            >
              <FileCard
                name="Incoming COI - Simple 1.pdf"
                size="216 KB"
                date="3/11/2026"
              />
            </div>
          </div>

          {/* Bottom buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.text.secondary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.text.secondary,
                }}
              >
                Back
              </span>
            </div>

            <div
              style={{
                height: 40,
                padding: "0 20px",
                backgroundColor: colors.accent.blue,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Compare Documents
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>
      </AppShell>

      <Cursor
        from={[770, 380]}
        to={[1340, 530]}
        startFrame={cursorStartFrame}
        click
        clickDelay={Math.round(0.15 * fps)}
      />
    </AbsoluteFill>
  );
};

const StepPill: React.FC<{
  number?: number;
  label: string;
  active?: boolean;
  completed?: boolean;
}> = ({ number, label, active = false, completed = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 14px",
      borderRadius: 20,
      backgroundColor: completed
        ? "rgba(34, 197, 94, 0.08)"
        : active
          ? "rgba(79, 123, 247, 0.08)"
          : "transparent",
      border: active
        ? "1px solid rgba(79, 123, 247, 0.2)"
        : "1px solid transparent",
    }}
  >
    {completed ? (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.status.compliant}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) : (
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: active ? colors.accent.blue : colors.text.tertiary,
        }}
      >
        {number}.
      </span>
    )}
    <span
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: completed
          ? colors.status.compliant
          : active
            ? colors.accent.blue
            : colors.text.tertiary,
      }}
    >
      {label}
    </span>
  </div>
);

const FileCard: React.FC<{
  name: string;
  size: string;
  date: string;
}> = ({ name, size, date }) => (
  <div
    style={{
      padding: 14,
      backgroundColor: colors.bg.card,
      borderRadius: 8,
      border: `1px solid ${colors.border.default}`,
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: colors.accent.lightBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.accent.blue}
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: colors.text.primary,
          marginBottom: 2,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 12, color: colors.text.tertiary }}>
        {size} · {date}
      </div>
    </div>
  </div>
);
