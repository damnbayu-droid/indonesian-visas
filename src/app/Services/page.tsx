import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visa Services – Indonesian Visas',
  description: 'Explore the range of Indonesian visa services offered by Indonesian Visas.',
}

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Our Visa Services
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          Indonesian Visas provides structured visa assistance services designed
          to help individuals and businesses apply for Indonesian visas with
          clarity and confidence.
        </p>

        <h2>Visa Consultation</h2>
        <p>
          We help you identify the most appropriate visa type based on your
          purpose of visit, duration of stay, and eligibility under Indonesian
          immigration regulations.
        </p>

        <h2>Tourist & Visit Visas</h2>
        <p>
          Assistance for Visa on Arrival (VOA), tourist visas, and visit visas,
          including information on extensions and permitted activities during
          your stay in Indonesia.
        </p>

        <h2>Business & Professional Visas</h2>
        <p>
          Support for business-related visas, professional visits, meetings,
          and other non-employment activities in accordance with Indonesian
          immigration rules.
        </p>

        <h2>KITAS & Long-Term Stay</h2>
        <p>
          Guidance and application support for limited stay permits (KITAS) and
          other long-term stay options, including renewals and status changes
          where applicable.
        </p>

        <h2>Application Assistance</h2>
        <p>
          We assist with document preparation, application submission, and
          communication related to your visa process, helping reduce errors and
          delays.
        </p>

        <h2>Compliance & Transparency</h2>
        <p>
          All services are provided in compliance with Indonesian immigration
          laws. We do not offer guarantees of approval and do not engage in
          unlawful practices.
        </p>
      </div>
    </main>
  )
}
