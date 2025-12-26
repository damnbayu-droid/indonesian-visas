import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy – Indonesian Visas',
  description: 'Refund Policy for Indonesian Visas services.',
}

export default function RefundPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Refund Policy
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          At Indonesian Visas, we strive to provide transparent and fair service
          to all our clients. This Refund Policy explains the conditions under
          which refunds may or may not be issued.
        </p>

        <h2>Visa Application Denial</h2>
        <p>
          If your visa application is rejected by the Indonesian Government,
          refunds may be provided in accordance with the conditions below.
          Government fees, immigration charges, and other non-refundable costs
          are not eligible for refund.
        </p>

        <h2>Service Fees</h2>
        <p>
          Service fees charged by Indonesian Visas cover consultation,
          document review, and application assistance. These fees may be
          partially refundable depending on the stage of the application
          process.
        </p>

        <h2>Non-Refundable Items</h2>
        <p>
          Certain costs are non-refundable, including but not limited to
          government visa fees, administrative charges, and third-party service
          costs that have already been incurred.
        </p>

        <h2>Client Responsibility</h2>
        <p>
          Refunds will not be issued if a visa application is rejected due to
          incorrect, incomplete, or misleading information provided by the
          applicant.
        </p>

        <h2>Processing Time</h2>
        <p>
          Approved refunds will be processed within a reasonable timeframe,
          depending on the original payment method and administrative
          procedures.
        </p>

        <h2>Policy Changes</h2>
        <p>
          Indonesian Visas reserves the right to update or modify this Refund
          Policy at any time. Any changes will be effective immediately upon
          posting on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions regarding our Refund Policy, please contact
          us through the contact information available on our website.
        </p>
      </div>
    </main>
  )
}
