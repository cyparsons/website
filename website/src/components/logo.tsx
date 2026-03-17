export function Logo({ textColor = "#0F172A", className = "" }: { textColor?: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 80"
      fill="none"
      className={className}
      aria-label="Swift Stack Solutions"
    >
      <svg x="0" y="8" width="112" height="64" viewBox="0 0 200 114">
        <rect x="0" y="0" width="100" height="30" rx="15" fill="#2AA0E6" />
        <rect x="0" y="42" width="150" height="30" rx="15" fill="#006AAE" />
        <rect x="0" y="84" width="200" height="30" rx="15" fill="#003263" />
      </svg>
      <text
        x="128"
        y="40"
        fontFamily="'Geist', 'Gotham', sans-serif"
        fontWeight="700"
        fontSize="38"
        fill={textColor}
        dominantBaseline="central"
      >
        SWIFT STACK
      </text>
    </svg>
  )
}
