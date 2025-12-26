import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Program – Indonesian Visas',
  description: 'Join the Indonesian Visas affiliate program and earn commissions by referring clients.',
}

export default function AffiliatePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Affiliate Program
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          The Indonesian Visas Affiliate Program is designed for individuals,
          agencies, and partners who wish to refer clients and earn commissions
          for successful visa service referrals.
        </p>

        <h2>How It Works</h2>
        <p>
          As an affiliate, you may refer clients to Indonesian Visas through
          your network, website, or direct recommendations. When a referred
          client successfully uses our services, you may be eligible for a
          commission.
        </p>

        <h2>Commission Structure</h2>
        <p>
          Commission rates may vary depending on the type of service and volume
          of referrals. Detailed commission terms will be communicated directly
          to approved affiliates.
        </p>

        <h2>Who Can Join</h2>
        <p>
          The affiliate program is open to content creators, travel agents,
          relocation consultants, and individuals with an audience interested
          in Indonesian visa services.
        </p>

        <h2>Getting Started</h2>
        <p>
          If you are interested in joining our affiliate program, please
          contact us through our website. Our team will provide further details
          and next steps.
        </p>

        <h2>Program Updates</h2>
        <p>
          Indonesian Visas reserves the right to update or modify the affiliate
          program structure, commission rates, and requirements at any time.
        </p>
      </div>
    </main>
  )
}
