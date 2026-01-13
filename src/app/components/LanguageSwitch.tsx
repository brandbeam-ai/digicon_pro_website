'use client';

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitchProps {
  currentLanguage: 'en' | 'ko';
  onLanguageChange: (lang: 'en' | 'ko') => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering language-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a consistent default during SSR to prevent hydration mismatch
  const displayLanguage = mounted ? currentLanguage : 'en';
  const nextLanguage = displayLanguage === 'en' ? 'ko' : 'en';
  const buttonText = displayLanguage === 'en' ? '한국어' : 'English';
  const ariaLabel = `Switch to ${nextLanguage === 'en' ? 'English' : 'Korean'}`;

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-slate-400" />
      <button
        onClick={() => onLanguageChange(nextLanguage)}
        className="px-3 py-1.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
        aria-label={ariaLabel}
      >
        {buttonText}
      </button>
    </div>
  );
};

