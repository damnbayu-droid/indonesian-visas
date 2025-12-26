'use client';

import { IconBolt, IconCheckCircle, IconHeadset, IconGlobe } from '@/components/icons';
import { IconQuestionCircle, IconInfoCircle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
  {
    icon: IconBolt,
    title: 'Fast Processing',
    description: 'Express service available with same-day processing options for urgent applications',
  },
  {
    icon: IconCheckCircle,
    title: '98% Success Rate',
    description: 'Proven track record with 15,000+ visas processed successfully worldwide',
  },
  {
    icon: IconHeadset,
    title: '24/7 Support',
    description: 'Round-the-clock WhatsApp support for your peace of mind anytime, anywhere',
  },
  {
    icon: IconGlobe,
    title: '97 Countries',
    description: 'We serve applicants from 97 countries worldwide with local expertise',
  },
];

const previewCards = [
  {
    icon: IconQuestionCircle,
    title: 'Frequently Asked Questions',
    description: 'Find answers to common visa questions and requirements. Learn about processing times, required documents, and more.',
    link: '/faq',
    buttonText: 'View FAQ',
  },
  {
    icon: IconInfoCircle,
    title: 'About BALI VISAS AGENCY',
    description: 'Learn more about our company, experienced team, and our mission to provide excellent visa services.',
    link: '/about',
    buttonText: 'Learn More',
  },
];

export default function AboutAndFaqPreview() {
  return (
    <>
      {/* Why Choose Us Section */}
      <section id="why" className="py-20 px-4 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#1E293B' }}>
              Why Choose BALI VISAS AGENCY?
            </h2>
            <p className="text-xl" style={{ color: '#64748B' }}>
              Your trusted partner for seamless Indonesian visa processing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4" style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}>
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1E293B' }}>
                  {benefit.title}
                </h3>
                <p style={{ color: '#64748B' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & About Preview Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previewCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6" style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}>
                  <card.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#1E293B' }}>
                  {card.title}
                </h3>
                <p className="text-lg mb-6" style={{ color: '#64748B' }}>
                  {card.description}
                </p>
                <Link href={card.link}>
                  <Button className="px-8 py-3 text-lg font-semibold rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: '#4B0082' }}>
                    {card.buttonText} →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
