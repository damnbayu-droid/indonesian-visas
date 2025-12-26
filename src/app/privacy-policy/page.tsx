import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – Indonesian Visas',
  description: 'Privacy Policy for Indonesian Visas website and services.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          At Indonesian Visas, we respect your privacy and are committed to
          protecting any personal information you share with us. This Privacy
          Policy explains how we collect, use, and safeguard your data when you
          visit our website or use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, passport details, and other information required for
          visa processing. We also collect non-personal information such as
          browser type, device information, and usage data to improve our
          website performance.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Your information is used solely to provide our services, including
          visa consultation, application processing, customer support, and
          communication related to your inquiry or application.
        </p>

        <h2>Data Protection</h2>
        <p>
          We take reasonable technical and organizational measures to protect
          your personal data from unauthorized access, loss, misuse, or
          alteration. Access to personal information is limited to authorized
          personnel only.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use trusted third-party services to support our operations,
          such as payment processors or analytics tools. These third parties
          are obligated to keep your information confidential and use it only
          for the intended purpose.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this policy or to comply with legal
          obligations.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to request access, correction, or deletion of your
          personal data. If you have any concerns regarding your privacy, you
          may contact us directly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page and become effective immediately.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your data, please contact us through the contact information provided
          on our website.
        </p>
      </div>
    </main>
  )
}
