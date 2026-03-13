import type { Metadata } from "next"
import { FAQSchema, BreadcrumbSchema } from "@/components/schema"
import COIVerificationContent from "./content"

export const metadata: Metadata = {
  title: "COI Verification for Equipment Finance",
  description:
    "Automate COI verification for equipment finance. Serial numbers, asset descriptions, actual cash value, deductibles, and endorsements verified automatically.",
  openGraph: {
    title: "COI Verification for Equipment Finance | Swift Stack",
    description:
      "Automate COI verification for equipment finance. Serial numbers, asset descriptions, actual cash value, deductibles, and endorsements verified automatically.",
    type: "website",
  },
}

const faqItems = [
  {
    question: "What COI formats does Swift Stack support?",
    answer:
      "PDF, scanned images, and digital certificates. The AI extraction layer handles format variations without manual intervention.",
  },
  {
    question: "How does asset verification work for large deals?",
    answer:
      "For each asset on the insurance, Swift Stack verifies the serial number, asset name, actual cash value, and deductible against the equipment schedule, enabling seamless verification of asset accuracy. Serial number formats are normalized automatically (dashes, spaces, and leading zeros handled for accurate matching). For a 50-asset deal, the full comparison runs in seconds. Mismatches are flagged with specific field-level detail so your team knows exactly what to follow up on.",
  },
  {
    question: "What happens when a COI fails verification?",
    answer:
      "Flagged COIs show each specific deficiency: the field, the expected value, the actual value, and the reason for the flag. Your team knows exactly what to follow up on without re-reading the entire document.",
  },
  {
    question: "Is this just COI tracking?",
    answer:
      "No. COI tracking tools tell you whether a document has been received. Swift Stack reads the document, compares every field against your deal requirements and equipment schedule, and tells you whether the contents are correct. It's document analysis, not document tracking.",
  },
]

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/#solutions" },
  { name: "COI Verification", href: "/solutions/coi-verification" },
]

export default function COIVerificationPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={faqItems} />
      <COIVerificationContent />
    </>
  )
}
