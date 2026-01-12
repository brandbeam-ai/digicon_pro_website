'use client';

import React, { useState, useEffect } from 'react';
import { getPageTexts } from './utils/textExtractor';

interface TranslationEntry {
  key: string;
  original: string;
  korean: string;
  context?: string;
}

interface PageTranslations {
  pageName: string;
  translations: TranslationEntry[];
}

export default function TranslateToKoreanPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [translations, setTranslations] = useState<PageTranslations | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [searchQuery, setSearchBox] = useState('');

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'creative-intelligence-agent', label: 'Creative Intelligence Agent' },
    { value: 'book-a-call', label: 'Book a Call' },
  ];

  // Check for existing session
  useEffect(() => {
    const auth = sessionStorage.getItem('translation-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Digicon@2026') {
      setIsAuthenticated(true);
      setLoginError(false);
      sessionStorage.setItem('translation-auth', 'true');
    } else {
      setLoginError(true);
    }
  };

  // Load translations for selected page
  useEffect(() => {
    if (isAuthenticated && selectedPage) {
      loadTranslations(selectedPage);
    } else {
      setTranslations(null);
    }
  }, [selectedPage, isAuthenticated]);

  const loadTranslations = async (pageName: string) => {
    try {
      console.log(`Loading translations for ${pageName}...`);
      const originalTexts = getOriginalTexts(pageName);
      console.log(`Found ${originalTexts.length} keys in textExtractor for ${pageName}`);

      // First, try to fetch from the public folder (the real JSON file)
      const response = await fetch(`/translations/${pageName}-ko.json?v=${new Date().getTime()}`);
      
      let mergedTranslations: TranslationEntry[] = [];

      if (response.ok) {
        const fileData = await response.json();
        console.log(`Successfully fetched ${fileData.translations?.length || 0} translations from JSON file`);
        
        // Merge with original texts to ensure we have all keys from the extractor
        mergedTranslations = originalTexts.map(original => {
          const existing = fileData.translations?.find((t: any) => t.key === original.key);
          return {
            ...original,
            korean: existing ? existing.korean : ''
          };
        });
      } else {
        console.warn(`Failed to fetch JSON file for ${pageName}, using source keys only.`);
        mergedTranslations = originalTexts;
      }

      setTranslations({
        pageName,
        translations: mergedTranslations
      });
    } catch (error) {
      console.error('Error loading translations:', error);
      const originalTexts = getOriginalTexts(pageName);
      setTranslations({
        pageName,
        translations: originalTexts,
      });
    }
  };

  const getOriginalTexts = (pageName: string): TranslationEntry[] => {
    const pageTexts = getPageTexts(pageName);
    return pageTexts.map((text) => ({
      key: text.key,
      original: text.original,
      korean: '',
      context: text.context,
    }));
  };

  const handleTranslationChange = (key: string, value: string) => {
    if (!translations) return;
    
    setTranslations({
      ...translations,
      translations: translations.translations.map((t) =>
        t.key === key ? { ...t, korean: value } : t
      ),
    });
  };

  const handleSave = async () => {
    if (!translations || !selectedPage) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Send to API to save to the real JSON file
      const response = await fetch('/api/save-translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translations),
      });

      if (!response.ok) {
        throw new Error('Failed to save to server');
      }

      const result = await response.json();
      
      // Also update localStorage as backup
      localStorage.setItem(`translation-${selectedPage}`, JSON.stringify(translations));
      
      setSaveMessage(result.message || 'Translations saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving translations:', error);
      setSaveMessage('Error saving translations to server. Make sure you are running in a node environment.');
      
      // Fallback: still offer download if server save fails
      const dataStr = JSON.stringify(translations, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedPage}-ko.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTranslations = translations?.translations.filter(t => 
    t.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.korean.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-slate-200 font-sans flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Translation Manager</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">
                Password Required
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 bg-black/50 border ${loginError ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                placeholder="Enter password..."
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 font-medium">Incorrect password. Please try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold uppercase tracking-widest text-sm"
            >
              Unlock Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Korean Translation Manager</h1>
          <button 
            onClick={() => {
              sessionStorage.removeItem('translation-auth');
              setIsAuthenticated(false);
            }}
            className="text-xs text-slate-500 hover:text-slate-300 uppercase tracking-widest"
          >
            Logout
          </button>
        </div>

        {/* Page Selection and Search */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card rounded-2xl p-6">
            <label className="block text-white font-medium mb-2">Select Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">-- Select a page --</option>
              {pages.map((page) => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>
          
          {translations && (
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-white font-medium mb-2">Search Keys or Text</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchBox(e.target.value)}
                placeholder="Search keys, English or Korean text..."
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Translations Editor */}
        {translations && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Translations for {pages.find((p) => p.value === selectedPage)?.label}
                </h2>
                <div className="text-sm text-slate-400 mt-1">
                  Showing <span className="text-indigo-400 font-bold">{filteredTranslations.length}</span> of <span className="text-slate-300">{translations.translations.length}</span> total keys
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => loadTranslations(selectedPage)}
                  className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Reload from Source
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Translations'}
                </button>
              </div>
            </div>

            {saveMessage && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  saveMessage.includes('Error')
                    ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                    : 'bg-green-500/20 text-green-300 border border-green-500/50'
                }`}
              >
                {saveMessage}
              </div>
            )}

            <div className="space-y-6">
              {filteredTranslations.map((entry, index) => (
                <div key={entry.key} className="bg-black/30 rounded-lg p-4 border border-white/5 hover:border-indigo-500/30 transition-colors">
                  <div className="mb-2">
                    <div className="text-sm text-slate-400 mb-1">
                      Key: <span className="font-mono text-indigo-400">{entry.key}</span>
                    </div>
                    {entry.context && (
                      <div className="text-xs text-slate-500 italic mb-2">{entry.context}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm text-slate-300 mb-1">Original (English)</label>
                    <div className="px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-slate-300">
                      {entry.original}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Korean Translation</label>
                    <textarea
                      value={entry.korean}
                      onChange={(e) => handleTranslationChange(entry.key, e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      rows={3}
                      placeholder="Enter Korean translation..."
                    />
                  </div>
                </div>
              ))}
              
              {filteredTranslations.length === 0 && (
                <div className="text-center py-12 bg-black/20 rounded-xl border border-dashed border-white/10">
                  <p className="text-slate-500 text-lg">No keys found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedPage && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-slate-400">Please select a page to start translating</p>
          </div>
        )}
      </div>
    </div>
  );
}
