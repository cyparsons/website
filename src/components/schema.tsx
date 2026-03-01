// JSON-LD schema markup components

interface FAQItem {
  question: string
  answer: string
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swift Stack Solutions",
    url: "https://swiftstacksolutions.com",
    logo: "https://swiftstacksolutions.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@swiftstacksolutions.com",
      contactType: "sales",
    },
    description:
      "AI-powered pre-funding document verification for equipment finance lenders.",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
