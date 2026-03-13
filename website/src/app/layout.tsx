import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema } from "@/components/schema"

export const metadata: Metadata = {
  title: {
    default: "COI Verification for Equipment Finance | Swift Stack",
    template: "%s | Swift Stack",
  },
  description:
    "COI verification for equipment finance. Serial numbers, coverage limits, endorsements, and entity matching verified against your requirements and equipment schedules.",
  metadataBase: new URL("https://swiftstacksolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swift Stack Solutions",
    title: "COI Verification for Equipment Finance | Swift Stack",
    description:
      "COI verification for equipment finance. Serial numbers, coverage limits, endorsements, and entity matching verified against your requirements and equipment schedules.",
    url: "https://swiftstacksolutions.com/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased">
        <OrganizationSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
