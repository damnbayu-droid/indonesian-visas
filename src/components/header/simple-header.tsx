'use client';

import Link from 'next/link';

export default function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto">
        <Link href="/" className="text-decoration-none">
          <span className="font-bold text-xl tracking-tight" style={{ color: '#4B0082' }}>
            INDONESIAN VISAS
          </span>
        </Link>
      </nav>
    </header>
  );
}
