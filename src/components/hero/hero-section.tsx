'use client';

import { useApplicationFlow } from '@/lib/application-flow';
import StepPanel from '@/components/steps/step-panel';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { openPanel, currentStep, formData } = useApplicationFlow();

  return (
    <section className="pt-24 pb-16 px-4 bg-purple-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="text-center md:text-left">
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{ color: 'rgba(75, 0, 130, 0.9)' }}
            >
              INDONESIAN VISAS
            </h1>
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ color: 'rgba(75, 0, 130, 0.8)' }}
            >
              Your Gateway to Indonesia
            </h2>
            <p
              className="text-lg md:text-xl mb-8"
              style={{ color: 'rgba(30, 0, 90, 0.7)' }}
            >
              Fast, reliable, and professional visa services for your Indonesia adventure. We serve 97
              countries with expert support and dedicated customer service available 24/7.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#4B0082' }}
                >
                  16+
                </div>
                <div className="text-sm font-semibold" style={{ color: '#64748B' }}>
                  Years Experience
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#4B0082' }}
                >
                  15,000+
                </div>
                <div className="text-sm font-semibold" style={{ color: '#64748B' }}>
                  Visas Processed
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#4B0082' }}
                >
                  98%
                </div>
                <div className="text-sm font-semibold" style={{ color: '#64748B' }}>
                  Success Rate
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                onClick={openPanel}
                className="px-8 py-4 text-lg font-semibold rounded-full text-white hover:scale-105 transition-transform shadow-lg"
                style={{ backgroundColor: 'rgba(75, 0, 130, 0.9)' }}
              >
                Select Your Country
              </Button>
            </div>
          </div>

          {/* Right Side: 4-Step Process Panel */}
          <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <h2
              className="text-2xl font-bold text-center mb-6"
              style={{ color: '#1E293B' }}
            >
              Simple 4-Step Application Process
            </h2>

            <StepPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
