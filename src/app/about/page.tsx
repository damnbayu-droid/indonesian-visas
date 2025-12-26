import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us – Indonesian Visas',
  description: 'Learn more about Indonesian Visas and our commitment to providing reliable visa services for Indonesia.',
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        About Indonesian Visas
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          Indonesian Visas is a professional visa assistance service dedicated
          to helping individuals and businesses navigate the Indonesian
          immigration process with clarity and confidence.
        </p>

        <p>
          We understand that visa regulations can be complex and time-consuming.
          Our role is to simplify the process by providing clear guidance,
          accurate information, and structured support throughout each stage of
          the application.
        </p>

        <h2>Our Approach</h2>
        <p>
          We focus on transparency, compliance, and efficiency. Every
          application is handled carefully to ensure it aligns with current
          immigration requirements and official regulations.
        </p>

        <p>
          Indonesian Visas does not promise shortcuts or guaranteed approvals.
          Instead, we prioritize lawful procedures and honest communication so
          applicants know exactly what to expect.
        </p>

        <h2>Who We Serve</h2>
        <p>
          Our services are designed for tourists, business travelers,
          professionals, and long-term visitors who require assistance with
          Indonesian visa applications or related inquiries.
        </p>

        <h2>Our Commitment</h2>
        <p>
          We are committed to providing reliable support, timely responses, and
          responsible handling of personal data. Our goal is to help clients
          move forward with confidence while respecting Indonesian immigration
          laws.
        </p>
      </div>
    </main>
  )
}
