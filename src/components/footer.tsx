import Link from "next/link"
import Image from "next/image"

const solutions = [
  { label: "COI Verification", href: "/solutions/coi-verification" },
  { label: "Lien Validation", href: "/solutions/lien-validation" },
  { label: "Debtor Search Intelligence", href: "/solutions/debtor-search" },
]

const company = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo + email */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Swift Stack Solutions"
                width={28}
                height={28}
                className="h-7 w-auto brightness-200"
              />
              <span className="text-lg font-semibold text-white">
                Swift Stack
              </span>
            </Link>
            <a
              href="mailto:hello@swiftstacksolutions.com"
              className="mt-4 block text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              hello@swiftstacksolutions.com
            </a>
          </div>

          {/* Solutions */}
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Solutions</p>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Company</p>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <Link
            href="/privacy-policy"
            className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Swift Stack Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
