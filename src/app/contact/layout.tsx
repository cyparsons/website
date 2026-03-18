import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started with Swift Stack COI verification for equipment finance. See how automated document review fits into your workflow.",
  openGraph: {
    title: "Get Started | Swift Stack",
    description:
      "Get started with Swift Stack COI verification for equipment finance. See how automated document review fits into your workflow.",
    url: "https://swiftstacksolutions.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
