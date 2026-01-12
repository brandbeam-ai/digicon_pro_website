'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { GetLeadInfo } from './components/GetLeadInfo';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { getTranslation } from '../utils/translations';

function BookACallPageContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Header with Logo */}
      <header className="w-full px-4 py-8 relative border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="logo-container">
            <Image
              src="/Digicon_Logo_white.png"
              alt="Digicon Logo"
              width={200}
              height={80}
              priority
            />
          </Link>
          <LanguageSwitch currentLanguage={language} onLanguageChange={setLanguage} />
          {/* Mobile Burger Menu - Only visible on mobile */}
          <button
            className="flex md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 px-4 py-4 z-50">
            <Link
              href="/"
              className="block text-white py-2 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/creative-intelligence-agent"
              className="block text-white py-2 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Creative Intelligence Agent
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book a Call
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">
            Help us understand your needs so we can provide the best solution for your business.
          </p>
        </div>

        <GetLeadInfo />
      </main>

      {/* Footer */}
      <footer className="pb-12 border-t border-white/10 bg-black text-center text-slate-500 text-sm mt-16">
        <p>&copy; {new Date().getFullYear()} Digicon Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function BookACallPage() {
  return (
    <LanguageProvider pageName="book-a-call">
      <BookACallPageContent />
    </LanguageProvider>
  );
}

