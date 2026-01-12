'use client';

import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitchProps {
  currentLanguage: 'en' | 'ko';
  onLanguageChange: (lang: 'en' | 'ko') => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-slate-400" />
      <button
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ko' : 'en')}
        className="px-3 py-1.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
        aria-label={`Switch to ${currentLanguage === 'en' ? 'Korean' : 'English'}`}
      >
        {currentLanguage === 'en' ? '한국어' : 'English'}
      </button>
    </div>
  );
};

