import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions – Indonesian Visas',
  description: 'Terms and Conditions for using Indonesian Visas services.',
}

export default function TermsAndConditionPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Terms and Conditions
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          These Terms and Conditions govern your use of the Indonesian Visas
          website and services. By accessing our website or using our services,
          you agree to be bound by these terms.
        </p>

        <h2>Scope of Services</h2>
        <p>
          Indonesian Visas provides visa consultation and application assistance
          services. We do not guarantee visa approval, as all decisions are made
          solely by the Indonesian Immigration Authority.
        </p>

        <h2>User Responsibilities</h2>
        <p>
          You agree to provide accurate, complete, and truthful information
          during the application process. Indonesian Visas is not responsible
          for delays or rejections caused by incorrect or incomplete data
          provided by the applicant.
        </p>

        <h2>Payment Terms</h2>
        <p>
          All service fees must be paid in full before application processing
          begins. Fees may include government charges and service fees, which
          will be clearly communicated prior to payment.
        </p>

        <h2>Visa Approval</h2>
        <p>
          Visa approval or rejection is entirely at the discretion of the
          Indonesian Government. Indonesian Visas shall not be held liable for
          any rejection, delay, or additional requirements imposed by the
          authorities.
        </p>

        <h2>Refund Policy</h2>
        <p>
          Refunds are subject to our Refund Policy. Certain fees, including
          government fees and administrative charges, may be non-refundable.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Indonesian Visas shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our services or
          website.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time.
          Any changes will be effective immediately upon posting on this page.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of the Republic of Indonesia.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions regarding these Terms and Conditions, please
          contact us through the contact details provided on our website.
        </p>
      </div>
    </main>
  )
}
