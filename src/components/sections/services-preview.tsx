'use client';

import { IconPassport, IconSync, IconTicket, IconBriefcase, IconUmbrellaBeach, IconChartLine } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const quickLinks = [
  {
    icon: IconPassport,
    title: 'Apply for a Visa',
    description: 'Get your Bali visa quickly and hassle-free. Professional support from start to finish.',
    link: '/apply',
  },
  {
    icon: IconSync,
    title: 'Extend Your Visa',
    description: 'Need more time in Bali? Extend your visa without leaving Indonesia.',
    link: '/extend',
  },
];

const visaServices = [
  {
    icon: IconTicket,
    title: 'B1 VOA / Extension',
    description: '30-day visa on arrival with extension options. Perfect for short visits and tourism.',
    link: '#',
  },
  {
    icon: IconBriefcase,
    title: 'C2 Business Visa',
    description: 'Business visa for meetings and conferences. Includes multiple entry options.',
    link: '#',
  },
  {
    icon: IconUmbrellaBeach,
    title: 'D1 Tourist Visa',
    description: '60-day tourist visa (B211A) with extensions up to 180 days total stay.',
    link: '#',
  },
  {
    icon: IconChartLine,
    title: 'D12 Pre Investment',
    description: 'Pre-investment visa for business setup. Ideal for entrepreneurs and investors.',
    link: '#',
  },
];

export default function ServicesPreview() {
  return (
    <>
      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickLinks.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl" style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#1E293B' }}>
                  {item.title}
                </h3>
                <p className="text-lg mb-6" style={{ color: '#64748B' }}>
                  {item.description}
                </p>
                <Link href={item.link}>
                  <Button className="px-8 py-3 text-lg font-semibold rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: '#4B0082' }}>
                    {item.title === 'Apply for a Visa' ? 'Apply Now' : 'Extend Now'} →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#1E293B' }}>
              Our Visa Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#64748B' }}>
              Choose the right visa type for your needs - from tourist to business and investment visas.
              Expert guidance for every visa category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visaServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl" style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1E293B' }}>
                  {service.title}
                </h3>
                <p className="mb-6" style={{ color: '#64748B' }}>
                  {service.description}
                </p>
                <Link href={service.link}>
                  <Button variant="link" className="p-0 font-semibold" style={{ color: '#4B0082' }}>
                    Learn More →
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="px-10 py-4 text-lg font-semibold rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: '#4B0082' }}>
                View All Visa Types →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
