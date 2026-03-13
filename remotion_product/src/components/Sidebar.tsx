import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

interface SidebarProps {
  /** Whether the sidebar is in collapsed (icon-only) mode */
  collapsed?: boolean;
  /** Active nav item index */
  activeItem?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = true,
  activeItem = -1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = collapsed ? 48 : 220;

  const slideIn = interpolate(frame, [0, 0.4 * fps], [-width, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const navItems = [
    { icon: "clock", label: "History" },
    { icon: "doc", label: "Documents" },
    { icon: "chart", label: "Reports" },
  ];

  return (
    <div
      style={{
        width,
        height: "100%",
        backgroundColor: colors.bg.sidebar,
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${colors.border.default}`,
        transform: `translateX(${slideIn}px)`,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? 0 : "0 16px",
        }}
      >
        {collapsed ? (
          <div style={{ display: "flex", gap: 1 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.text.primary,
              }}
            >
              S
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.accent.blue,
              }}
            >
              C
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 2 }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.text.primary,
                letterSpacing: "0.02em",
              }}
            >
              SWIFT
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.accent.blue,
                letterSpacing: "0.02em",
                marginLeft: 2,
              }}
            >
              COI
            </span>
          </div>
        )}
      </div>

      {/* New Comparison Button */}
      <div
        style={{
          padding: collapsed ? "0 8px" : "0 12px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: collapsed ? 32 : "100%",
            height: 32,
            backgroundColor: colors.accent.blue,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            margin: collapsed ? "0 auto" : 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {!collapsed && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "white",
              }}
            >
              New Comparison
            </span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "0 8px",
        }}
      >
        {navItems.map((item, i) => (
          <div
            key={item.label}
            style={{
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? 0 : "0 8px",
              borderRadius: 4,
              backgroundColor:
                i === activeItem ? "rgba(0,0,0,0.05)" : "transparent",
            }}
          >
            <NavIcon
              type={item.icon}
              color={
                i === activeItem
                  ? colors.text.primary
                  : colors.text.tertiary
              }
            />
            {!collapsed && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color:
                    i === activeItem
                      ? colors.text.primary
                      : colors.text.secondary,
                  marginLeft: 10,
                }}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "0 8px 12px",
        }}
      >
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? 0 : "0 8px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.tertiary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? 0 : "0 8px",
          }}
        >
          {/* Moon icon for dark mode toggle */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.tertiary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? 0 : "0 8px",
          }}
        >
          {/* Collapse chevrons */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.tertiary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </div>

        {/* User avatar */}
        <div
          style={{
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: colors.accent.blue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "white",
              }}
            >
              CP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavIcon: React.FC<{ type: string; color: string }> = ({
  type,
  color,
}) => {
  if (type === "clock") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (type === "doc") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }
  if (type === "chart") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  return null;
};
