import LandingHeader from '@/components/header/landing-header';
import HeroSection from '@/components/hero/hero-section';
import ApplicationPanel from '@/components/steps/application-panel-new';
import ServicesPreview from '@/components/sections/services-preview';
import GoogleReviewsCollage from '@/components/google-reviews-collage'
import AboutAndFaqPreview from '@/components/sections/about-faq-preview';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <LandingHeader />

      <div className="flex-1">
        <HeroSection />
        <ServicesPreview />
        <AboutAndFaqPreview />
        <ContactSection />
      </div>

      <ApplicationPanel />

      <Footer />
    </main>
  );
}
