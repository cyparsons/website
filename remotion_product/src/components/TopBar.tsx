import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

interface TopBarProps {
  breadcrumbs: string[];
  rightContent?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  breadcrumbs,
  rightContent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: `1px solid ${colors.border.default}`,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        opacity,
        flexShrink: 0,
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {breadcrumbs.map((crumb, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.text.tertiary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color:
                  i === breadcrumbs.length - 1
                    ? colors.text.primary
                    : colors.text.secondary,
              }}
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* Right content */}
      {rightContent && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rightContent}
        </div>
      )}
    </div>
  );
};
