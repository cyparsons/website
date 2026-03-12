// Shared design tokens for the Swift Stack Remotion video.
// Colors match the marketing site brand palette.

export const COLORS = {
  // Brand blues (from logo)
  accent: "#2AA0E6",
  accentHover: "#006AAE",
  navy: "#003263",
  deepNavy: "#001A33",

  // Backgrounds
  bgDark: "#001A33",
  bgSurface: "#002244",
  bgCard: "#00305A",

  // Text
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textTertiary: "#64748B",

  // Status
  verified: "#22C55E",
  verifiedLight: "rgba(34, 197, 94, 0.12)",
  flagged: "#F59E0B",
  flaggedLight: "rgba(245, 158, 11, 0.12)",
  error: "#EF4444",
  errorLight: "rgba(239, 68, 68, 0.12)",

  // Misc
  white: "#FFFFFF",
  border: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(255, 255, 255, 0.12)",
} as const;

export const FONT_FAMILY = "Inter, system-ui, sans-serif";
