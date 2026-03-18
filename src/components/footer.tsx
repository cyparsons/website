import Link from "next/link"
import { Linkedin } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="text-gray-300" style={{ backgroundColor: "#0A1628" }}>
      {/* Separator line */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(42, 160, 230, 0.2) 50%, transparent 90%)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Row 1: Logo/name + links */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center">
            <Logo textColor="#FFFFFF" className="h-7 w-auto" />
          </Link>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:flex-nowrap md:justify-end">
            <a
              href="/#solution"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Solution
            </a>
            <a
              href="/#how-it-works"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="/#results"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Results
            </a>
            <a
              href="/#faq"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              FAQ
            </a>
            <Link
              href="/blog"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Row 2: Email + LinkedIn + copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@swiftstacksolutions.com"
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              hello@swiftstacksolutions.com
            </a>
            <a
              href="https://www.linkedin.com/company/swift-stack-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Swift Stack Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
