'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: { [key: string]: string } | null;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  pageName: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, pageName }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ko')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    if (language === 'ko') {
      loadTranslations(pageName);
    } else {
      setTranslations(null);
    }
  }, [language, pageName]);

  const loadTranslations = async (page: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/translations/${page}-ko.json?v=${new Date().getTime()}`);
      if (response.ok) {
        const data = await response.json();
        // Convert array to object with keys
        const translationsObj: { [key: string]: string } = {};
        data.translations.forEach((item: { key: string; korean: string }) => {
          if (item.korean) {
            translationsObj[item.key] = item.korean;
          }
        });
        setTranslations(translationsObj);
      } else {
        setTranslations(null);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      setTranslations(null);
    } finally {
      setLoading(false);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

