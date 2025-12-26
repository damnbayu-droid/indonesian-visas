'use client';

import React from 'react';
import GoogleReviewsCollage from '@/components/google-reviews-collage';

import { IconEnvelope, IconMapPin, IconStar } from '@/components/icons';
import {
  IconTelegram,
  IconInstagram,
  IconTikTok,
  IconFacebook,
  IconTwitter,
  IconLinkedIn,
  IconYouTube,
} from '@/components/icons/social-icons';

const contactInfo = [
  {
    icon: IconEnvelope,
    title: 'Email',
    links: [
      { email: 'info@indonesianvisas.com', label: 'info@indonesianvisas.com' },
      { email: 'indonesianvisas@gmail.com', label: 'indonesianvisas@gmail.com' },
    ],
  },
  {
    icon: IconMapPin,
    title: 'Office',
    link: 'https://maps.app.goo.gl/UGs1UGyehNz32Et67',
    address: 'Jl. Tibung Sari No.11C, Bali Indonesia',
  },
];

const socialLinks = [
  { name: 'Telegram', url: 'https://t.me/IndonesianVisas', color: '#1E293B' },
  {
    name: 'Instagram',
    url: 'https://instagram.com/indonesianvisas',
    gradient:
      'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  },
  { name: 'TikTok', url: 'https://www.tiktok.com/@indonesianvisas', color: '#000000' },
  { name: 'Facebook', url: 'https://facebook.com/IndonesianVisas', color: '#1877F2' },
  { name: 'Twitter', url: 'https://twitter.com/IndonesianVisas', color: '#1DA1F2' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/indonesianvisas', color: '#0077B5' },
  { name: 'YouTube', url: 'https://youtube.com/@indonesianvisas', color: '#FF0000' },
];

export default function ContactSection() {
  const whatsappNumber = '+61423854701';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <section id="contact" className="py-20 px-4 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6" style={{ color: '#1E293B' }}>
            Get In Touch
          </h2>
          <p className="text-xl" style={{ color: '#64748B' }}>
            We're here to help with your visa needs
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* WhatsApp */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center shadow-lg">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-4"
              style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}
            >
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1E293B' }}>
              WhatsApp
            </h3>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold hover:text-yellow-600 transition-colors"
              style={{ color: '#1E293B' }}
            >
              {whatsappNumber}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center shadow-lg">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-4"
              style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}
            >
              <IconEnvelope size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1E293B' }}>
              Email
            </h3>
            <div className="space-y-1">
              {contactInfo[0].links.map((link, idx) => (
                <a
                  key={idx}
                  href={`mailto:${link.email}`}
                  className="block text-base hover:text-yellow-600 transition-colors"
                  style={{ color: '#1E293B' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Office */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center shadow-lg">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-4"
              style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}
            >
              <IconMapPin size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1E293B' }}>
              Office
            </h3>
            <a
              href={contactInfo[1].link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base hover:text-yellow-600 transition-colors block"
              style={{ color: '#1E293B' }}
            >
              {contactInfo[1].address}
            </a>
          </div>
        </div>

        {/* GOOGLE REVIEWS COLLAGE */}
        <GoogleReviewsCollage />

        {/* Social Media */}
        <div className="mt-16 bg-white/75 backdrop-blur-xl border border-white/30 max-w-4xl mx-auto p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#1E293B' }}>
            Follow Us
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, idx) => {
              const IconMap: Record<string, React.ComponentType<any>> = {
                Telegram: IconTelegram,
                Instagram: IconInstagram,
                TikTok: IconTikTok,
                Facebook: IconFacebook,
                Twitter: IconTwitter,
                LinkedIn: IconLinkedIn,
                YouTube: IconYouTube,
              };
              const IconComponent = IconMap[social.name];
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                  style={{
                    backgroundColor: social.color,
                    backgroundImage: social.gradient || 'none',
                    color: 'white',
                  }}
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
