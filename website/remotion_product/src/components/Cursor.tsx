import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

interface CursorProps {
  /** Starting position [x, y] */
  from: [number, number];
  /** Ending position [x, y] */
  to: [number, number];
  /** Frame at which the cursor starts moving */
  startFrame: number;
  /** Whether to show a click animation at the end */
  click?: boolean;
  /** Delay before click animation (in frames) */
  clickDelay?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  from,
  to,
  startFrame,
  click = false,
  clickDelay = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moveDuration = Math.round(0.8 * fps);
  const moveEnd = startFrame + moveDuration;
  const clickStart = moveEnd + clickDelay;
  const clickDuration = Math.round(0.15 * fps);

  const x = interpolate(frame, [startFrame, moveEnd], [from[0], to[0]], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const y = interpolate(frame, [startFrame, moveEnd], [from[1], to[1]], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const clickScale = click
    ? interpolate(
        frame,
        [clickStart, clickStart + clickDuration, clickStart + clickDuration * 2],
        [1, 0.85, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  const opacity = interpolate(frame, [startFrame - 5, startFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame - 5) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 100,
        opacity,
        transform: `scale(${clickScale})`,
        pointerEvents: "none",
      }}
    >
      {/* macOS-style cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.3))" }}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};
