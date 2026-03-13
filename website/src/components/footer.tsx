import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Row 1: Logo/name + links */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2">
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

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/blog"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Blog
            </Link>
            <span className="text-gray-600" aria-hidden="true">&middot;</span>
            <Link
              href="/contact"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
            <span className="text-gray-600" aria-hidden="true">&middot;</span>
            <Link
              href="/privacy-policy"
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Row 2: Email + copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:flex-row md:justify-between">
          <a
            href="mailto:hello@swiftstacksolutions.com"
            className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
          >
            hello@swiftstacksolutions.com
          </a>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Swift Stack Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
