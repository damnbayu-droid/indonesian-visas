import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions – Indonesian Visas',
  description: 'Common questions and answers about Indonesian visa services.',
}

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Frequently Asked Questions
      </h1>

      <div className="prose prose-neutral max-w-none">
        <h2>What types of visas do you assist with?</h2>
        <p>
          We assist with various Indonesian visa types, including Visa on
          Arrival (VOA), tourist visas, business visit visas, and limited stay
          permits (KITAS), depending on eligibility and purpose of visit.
        </p>

        <h2>Do you guarantee visa approval?</h2>
        <p>
          No. Visa approval is solely determined by the Indonesian Immigration
          Authority. We provide guidance and application assistance but cannot
          guarantee approval.
        </p>

        <h2>How long does the visa process take?</h2>
        <p>
          Processing times vary depending on the visa type, applicant profile,
          and government processing timelines. Estimated processing times will
          be explained during consultation.
        </p>

        <h2>Can I extend my visa in Indonesia?</h2>
        <p>
          Some visas are eligible for extension, while others are not. Extension
          options depend on the visa type and current immigration regulations.
        </p>

        <h2>What documents are required?</h2>
        <p>
          Required documents vary by visa type but generally include a passport,
          photographs, application forms, and supporting documents relevant to
          your purpose of stay.
        </p>

        <h2>Is my personal data safe?</h2>
        <p>
          Yes. We handle personal information responsibly and in accordance with
          our Privacy Policy. Access to data is limited to authorized personnel
          only.
        </p>

        <h2>How do I start an application?</h2>
        <p>
          You can begin by submitting your inquiry through our website. Our team
          will guide you through the next steps based on your visa needs.
        </p>
      </div>
    </main>
  )
}
