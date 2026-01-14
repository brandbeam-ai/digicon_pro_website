'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { getTranslation } from '../utils/translations';
import { OtherContent } from './components/OtherContent';
import { BeautyContent } from './components/BeautyContent';

function CreativeIntelligenceAgentPageContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [businessType, setBusinessType] = useState<'Beauty' | 'Other' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Use a dynamic page name based on business type
  const pageName = businessType === 'Beauty' 
    ? 'creative-intelligence-agent-beauty' 
    : businessType === 'Other' 
      ? 'creative-intelligence-agent-other' 
      : 'creative-intelligence-agent-other'; // Fallback for overlay

  return (
    <LanguageProvider pageName={pageName}>
      <CreativeIntelligenceAgentPageInternal 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        businessType={businessType}
        setBusinessType={setBusinessType}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </LanguageProvider>
  );
}

interface InternalProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  businessType: 'Beauty' | 'Other' | null;
  setBusinessType: (val: 'Beauty' | 'Other' | null) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
}

function CreativeIntelligenceAgentPageInternal({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  businessType, 
  setBusinessType, 
  isDropdownOpen, 
  setIsDropdownOpen 
}: InternalProps) {
  const { language, setLanguage, translations } = useLanguage();

  const handleBusinessTypeSelect = (type: 'Beauty' | 'Other') => {
    setBusinessType(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Overlay with Dropdown - Show only if businessType is not selected */}
      {!businessType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {getTranslation(translations, 'overlay.title', 'Choose Your Business Type')}
            </h2>
            <p className="text-slate-400 text-center mb-6">
              {getTranslation(translations, 'overlay.description', 'Select the type of business you\'re looking for solutions for:')}
            </p>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-left flex items-center justify-between text-white hover:border-indigo-500/50 transition-colors"
              >
                <span className="text-slate-300">
                  {getTranslation(translations, 'overlay.select_placeholder', 'Select business type')}
                </span>
                <ChevronDown 
                  className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl overflow-hidden z-10">
                  <button
                    onClick={() => handleBusinessTypeSelect('Beauty')}
                    className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors"
                  >
                    {getTranslation(translations, 'overlay.option.beauty', 'Beauty')}
                  </button>
                  <button
                    onClick={() => handleBusinessTypeSelect('Other')}
                    className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors border-t border-white/10"
                  >
                    {getTranslation(translations, 'overlay.option.other', 'Other')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header with Logo and Button */}
      <header className="w-full px-4 py-8 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="logo-container">
            <Image
              src="/Digicon_Logo_white.png"
              alt="Digicon Logo"
              width={200}
              height={80}
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitch currentLanguage={language} onLanguageChange={setLanguage} />
            {/* Desktop Button - Hidden on mobile */}
            <Link href="/" className="primary-button-outline hidden md:flex">
              {getTranslation(translations, 'header.button', 'Visibility Scaling AI Agents')}
            </Link>
            {/* Mobile Burger Menu - Only visible on mobile */}
            <button
              className="flex md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 px-4 py-4 z-50">
            <div className="mb-4">
              <LanguageSwitch currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
            <Link
              href="/"
              className="primary-button-outline w-full block text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getTranslation(translations, 'header.button', 'Visibility Scaling AI Agents')}
            </Link>
          </div>
        )}
      </header>
      
      {/* Conditionally render content based on business type */}
      {businessType === 'Beauty' && <BeautyContent />}
      {businessType === 'Other' && <OtherContent />}
    </div>
  );
}

export default function CreativeIntelligenceAgentPage() {
  return (
    <CreativeIntelligenceAgentPageContent />
  );
}

