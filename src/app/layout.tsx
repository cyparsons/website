import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema } from "@/components/schema"

export const metadata: Metadata = {
  title: {
    default: "Intelligent COI Verification for Equipment Finance | Swift Stack",
    template: "%s | Swift Stack",
  },
  description:
    "Pre-funding COI verification for equipment finance lenders. Serial numbers, coverage, and deficiencies verified across multi-asset deals. 4x faster.",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://swiftstacksolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swift Stack Solutions",
    title: "Intelligent COI Verification for Equipment Finance | Swift Stack",
    description:
      "Pre-funding COI verification for equipment finance lenders. Serial numbers, coverage, and deficiencies verified across multi-asset deals. 4x faster.",
    url: "https://swiftstacksolutions.com/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swift Stack Solutions - COI Verification for Equipment Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelligent COI Verification for Equipment Finance | Swift Stack",
    description:
      "Pre-funding COI verification for equipment finance lenders. Serial numbers, coverage, and deficiencies verified across multi-asset deals. 4x faster.",
    images: ["/og-image.png"],
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
