'use client'

import React from 'react'
import Link from 'next/link'

const domains = [
  { name: 'bali.enterprises', url: 'https://bali.enterprises' },
  { name: 'visa.biz.id', url: 'https://visa.biz.id' },
  { name: 'visas.agency', url: 'https://visas.agency' },
  { name: 'www.balihelp.id', url: 'https://www.balihelp.id' },
  { name: 'voajakarta.com', url: 'https://voajakarta.com' },
  { name: 'voabali.com', url: 'https://voabali.com' },
]

const legalLinks = [
  { name: 'Privacy & Policy', url: '/privacy-policy' },
  { name: 'Terms & Conditions', url: '/terms-and-condition' },
  { name: 'Refund Policy', url: '/refund' },
  { name: 'Affiliate Program', url: '/affiliate' },
]

export default function Footer() {
  return (
    <footer className="py-10 px-4 bg-gradient-to-br from-[#1E293B] to-[#334155]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-white text-2xl font-bold mb-3">
            INDONESIAN VISAS
          </h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto mb-4 leading-relaxed">
            Professional Indonesian Visa services with 16+ years experience. Fast, reliable and trusted by thousands worldwide.
          </p>
        </div>

        <div className="border-t border-gray-600 pt-6 pb-4 text-center">
          <p className="text-gray-300 text-sm mb-4 font-semibold">
            © Indonesian Visas - All Rights Reserved
          </p>

          {/* Domains */}
          <div className="mb-4">
            <Link
              href="https://visa.biz.id/all-service-domain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors font-bold text-xs"
            >
              All Service Domain
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-600">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
