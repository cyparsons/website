import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swift Stack Solutions collects, uses, and protects personal information through swiftstacksolutions.com.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-text-tertiary">
          Effective Date: March 12, 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-text-secondary">
          <p>
            Swift Stack Solutions (&quot;Swift Stack,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
            committed to handling personal information responsibly.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and
            protect personal information through swiftstacksolutions.com (the
            &quot;Website&quot;).
          </p>

          {/* 1. Scope */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              1. Scope
            </h2>
            <p>
              This Privacy Policy applies to personal information collected
              through our Website, including:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Contact form submissions</li>
              <li>
                Website analytics collected through cookies and similar
                technologies
              </li>
              <li>
                Information collected by third-party tracking tools embedded on
                the Website
              </li>
            </ul>
            <p className="mt-3">
              At this time, we do not provide user accounts, logins, or payment
              processing through the Website.
            </p>
            <p className="mt-3">
              This Privacy Policy does not govern any separate client-facing
              product or document processing service that may be launched in the
              future unless that service includes its own privacy notice or this
              policy is updated to cover it.
            </p>
          </section>

          {/* 2. Who We Are */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              2. Who We Are
            </h2>
            <p>
              Swift Stack Solutions is a British Columbia technology company. We
              build pre-funding document verification automation for equipment
              finance lenders, including automation relating to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Certificates of insurance (COIs)</li>
              <li>PPSA and UCC filings</li>
              <li>Debtor search results</li>
            </ul>
            <p className="mt-3">
              If you have questions about this Privacy Policy or our privacy
              practices, you can contact us at{" "}
              <a
                href="mailto:hello@swiftstacksolutions.com"
                className="text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                hello@swiftstacksolutions.com
              </a>
              .
            </p>
          </section>

          {/* 3. Personal Information We Collect */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              3. Personal Information We Collect
            </h2>
            <p>
              We collect only limited personal information through the Website.
            </p>

            <h3 className="mt-5 mb-2 text-lg font-medium text-text-primary">
              A. Information you provide directly
            </h3>
            <p className="font-medium text-text-primary">Contact form:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>Full name</li>
              <li>Work email address</li>
              <li>Company name</li>
              <li>Job title (optional)</li>
              <li>Message or inquiry details (optional)</li>
            </ul>

            <h3 className="mt-5 mb-2 text-lg font-medium text-text-primary">
              B. Information collected automatically
            </h3>
            <p>
              We use Google Analytics 4 (GA4) and the HubSpot tracking script to
              understand how people use the Website. This may include information
              such as:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>Pages visited and traffic source</li>
              <li>Session activity and general website usage information</li>
              <li>
                Browser type, device information, and approximate geographic
                location
              </li>
              <li>
                Returning visitor recognition through cookies set by HubSpot and
                Google Analytics
              </li>
            </ul>
            <p className="mt-3">
              We do not use advertising cookies or retargeting cookies on the
              Website.
            </p>
          </section>

          {/* 4. How We Use Personal Information */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              4. How We Use Personal Information
            </h2>
            <p>
              We use personal information collected through the Website for the
              following purposes:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>
                To respond to your inquiries and communicate with you about your
                request
              </li>
              <li>
                To send product updates, launch announcements, and related
                communications if you consent to receive them
              </li>
              <li>To operate, maintain, and improve the Website</li>
              <li>
                To understand Website traffic and user engagement through
                analytics
              </li>
              <li>
                To maintain records of consent, unsubscribe requests, and
                privacy requests
              </li>
              <li>
                To comply with applicable legal and regulatory obligations
              </li>
            </ul>
            <p className="mt-3">
              We collect and use personal information only for purposes that are
              reasonable in the circumstances and that are described in this
              Privacy Policy or otherwise disclosed at the time of collection.
            </p>
          </section>

          {/* 5. Cookies and Analytics */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              5. Cookies and Analytics
            </h2>
            <p>
              We use Google Analytics 4 and HubSpot to help us understand how
              visitors use the Website.
            </p>
            <p className="mt-3">
              These tools may use cookies or similar technologies to collect
              information about how visitors interact with the Website, such as
              page views, traffic sources, session information, and returning
              visitor recognition.
            </p>
            <p className="mt-3">We use these analytics tools to:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>Measure traffic and engagement</li>
              <li>Improve Website performance and content</li>
              <li>Better understand interest in our services</li>
              <li>
                Identify returning visitors and understand their journey across
                pages
              </li>
            </ul>
            <p className="mt-3">
              We do not use cookies for targeted advertising.
            </p>
            <p className="mt-3">
              You can control or disable cookies through your browser settings.
              If you disable cookies, some Website features may not function as
              intended.
            </p>
          </section>

          {/* 6. Third-Party Services */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              6. Third-Party Services
            </h2>
            <p>
              We use third-party service providers to support the Website and our
              communications.
            </p>
            <p className="mt-4 font-medium text-text-primary">HubSpot</p>
            <p className="mt-1">
              We use HubSpot to power our contact forms, store submitted
              information, and track visitor activity on the Website through the
              HubSpot tracking script.
            </p>
            <p className="mt-4 font-medium text-text-primary">
              Google Analytics
            </p>
            <p className="mt-1">
              We use Google Analytics 4 to measure Website traffic and usage.
            </p>
            <p className="mt-4">
              These service providers process information on our behalf in
              connection with the purposes described in this Privacy Policy. We
              do not sell personal information to third parties.
            </p>
            <p className="mt-3">
              We may also disclose personal information where required by law,
              regulation, court order, or lawful request, or where reasonably
              necessary to protect our rights, property, or safety.
            </p>
          </section>

          {/* 7. Cross-Border Processing */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              7. Cross-Border Processing
            </h2>
            <p>
              Some of our service providers may process or store personal
              information outside your province or country, including in
              jurisdictions that may have different privacy laws than your home
              jurisdiction.
            </p>
            <p className="mt-3">
              When we use third-party service providers, we take reasonable steps
              to require that personal information be protected in a manner
              appropriate to its sensitivity.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              8. Data Retention
            </h2>
            <p>
              We keep personal information only for as long as it is reasonably
              necessary for the purposes described in this Privacy Policy and to
              meet legal, operational, or compliance requirements.
            </p>
            <p className="mt-3">In general:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>
                Contact form submissions are kept for as long as needed to
                respond to your inquiry and manage any related follow-up, and
                then for a reasonable period afterward for recordkeeping.
              </li>
              <li>
                If you consent to marketing communications, your information is
                kept until you unsubscribe, ask us to delete it, or we determine
                it is no longer needed.
              </li>
              <li>
                Analytics information is retained according to our configured
                analytics retention settings and may be deleted, aggregated, or
                anonymized when no longer needed.
              </li>
              <li>
                Consent records, unsubscribe records, and privacy request
                records may be retained for as long as reasonably necessary to
                demonstrate compliance and honour your preferences.
              </li>
            </ul>
            <p className="mt-3">
              When personal information is no longer required, we will delete it,
              anonymize it, or securely destroy it where appropriate.
            </p>
          </section>

          {/* 9. Your Rights and Choices */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              9. Your Rights and Choices
            </h2>
            <p>Subject to applicable law, you may request to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent to marketing communications</li>
              <li>
                Ask questions about how your information has been used or
                disclosed
              </li>
            </ul>
            <p className="mt-3">
              You may unsubscribe from our email communications at any time by
              clicking the unsubscribe link in the email or by contacting us at{" "}
              <a
                href="mailto:hello@swiftstacksolutions.com"
                className="text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                hello@swiftstacksolutions.com
              </a>
              .
            </p>
            <p className="mt-3">
              To protect your privacy, we may ask you to verify your identity
              before responding to certain requests.
            </p>
          </section>

          {/* 10. Security */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              10. Security
            </h2>
            <p>
              We use reasonable administrative, technical, and organizational
              safeguards appropriate to the sensitivity of the information we
              hold.
            </p>
            <p className="mt-3">
              These measures are designed to help protect personal information
              against unauthorized access, use, disclosure, loss, or misuse.
            </p>
            <p className="mt-3">
              However, no method of transmission over the internet or method of
              electronic storage is completely secure, so we cannot guarantee
              absolute security.
            </p>
          </section>

          {/* 11. Changes to This Privacy Policy */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              11. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our Website, our practices, or legal requirements.
            </p>
            <p className="mt-3">
              When we update this Privacy Policy, we will post the revised
              version on this page and update the Effective Date above.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">
              12. Contact Us
            </h2>
            <p>
              For privacy questions, requests, or complaints, please contact:
            </p>
            <div className="mt-3">
              <p className="font-medium text-text-primary">
                Swift Stack Solutions
              </p>
              <p>
                <a
                  href="mailto:hello@swiftstacksolutions.com"
                  className="text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  hello@swiftstacksolutions.com
                </a>
              </p>
              <p>
                <a
                  href="https://swiftstacksolutions.com"
                  className="text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  swiftstacksolutions.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
