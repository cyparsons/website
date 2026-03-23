import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationSchema } from "@/components/schema"

export const metadata: Metadata = {
  title: {
    default: "Swift Stack | COI Verification for Equipment Finance",
    template: "Swift Stack | %s",
  },
  description:
    "Pre-funding document verification for equipment finance. COI deficiencies caught automatically across multi-asset deals.",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://swiftstacksolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swift Stack Solutions",
    title: "Swift Stack | COI Verification for Equipment Finance",
    description:
      "Pre-funding document verification for equipment finance. COI deficiencies caught automatically across multi-asset deals.",
    url: "https://swiftstacksolutions.com/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Swift Stack - COI Verification for Equipment Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Stack | COI Verification for Equipment Finance",
    description:
      "Pre-funding document verification for equipment finance. COI deficiencies caught automatically across multi-asset deals.",
    images: ["/og.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SZ54FS4J23"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SZ54FS4J23');
          `}
        </Script>

        {/* HubSpot Tracking */}
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/342638668.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <OrganizationSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
