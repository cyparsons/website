// Shared animation constants for the Swift Stack website.
// Import these in any component that uses Motion animations.

export const DURATION = {
  hover: 0.2,
  fast: 0.15,
  normal: 0.5,
  slow: 0.8,
  countUp: 1.8,
  hero: 5,
  accordion: 0.35,
  staggerItem: 0.12,
} as const

export const EASE = {
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  smooth: [0.22, 1, 0.36, 1] as const,
}

export const OFFSET = {
  fadeIn: 24,
  hoverLift: -4,
  slideIn: 40,
} as const

// Standard scroll-reveal variants
export const fadeInUp = {
  hidden: { opacity: 0, y: OFFSET.fadeIn },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.easeInOut,
    },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DURATION.staggerItem,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: OFFSET.fadeIn },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.easeInOut,
    },
  },
}

// Default viewport config for scroll-triggered animations
export const viewportOnce = { once: true, amount: 0.2 } as const
