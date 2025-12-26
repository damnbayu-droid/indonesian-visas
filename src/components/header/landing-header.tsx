'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconMenu } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '+61423854701';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-purple-900/60 backdrop-blur-lg shadow-lg'
          : 'bg-purple-900/60 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-decoration-none">
          <span className="text-white font-bold text-xl tracking-tight">
            INDONESIAN VISAS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/services"
            className="text-white hover:opacity-80 transition-colors font-medium"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="text-white hover:opacity-80 transition-colors font-medium"
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="text-white hover:opacity-80 transition-colors font-medium"
          >
            Sign In
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-md"
            style={{ backgroundColor: '#FFD700' }}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <IconMenu size={24} />
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4">
          <Link
            href="/services"
            className="text-white hover:opacity-80 transition-colors font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-white hover:opacity-80 transition-colors font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/faq"
            className="text-white hover:opacity-80 transition-colors font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="text-white hover:opacity-80 transition-colors font-medium py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-black font-semibold px-6 py-3 rounded-full shadow-md"
            style={{ backgroundColor: '#FFD700' }}
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
