import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema } from "@/components/schema"

export const metadata: Metadata = {
  title: {
    default: "Document Verification for Equipment Finance | Swift Stack",
    template: "%s | Swift Stack",
  },
  description:
    "Swift Stack automates COI verification, lien validation, and debtor search analysis for equipment finance lenders. 4x faster document verification.",
  metadataBase: new URL("https://swiftstacksolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swift Stack Solutions",
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
