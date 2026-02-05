'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BookCalendlyMeetingProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
        };
        utm?: Record<string, string | undefined>;
      }) => void;
    };
  }
}

export const BookCalendlyMeeting: React.FC<BookCalendlyMeetingProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calendlyUrl = 'https://calendly.com/jay-jdalchemy/talk-to-our-founders-to-clarify-anything';

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const loadCalendlyScript = () => new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.Calendly) {
        resolve();
        return;
      }
      const existing = document.getElementById('calendly-embed-script');
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'calendly-embed-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Calendly script'));
      document.head.appendChild(script);
    });

    const initCalendly = async () => {
      try {
        await loadCalendlyScript();
        if (cancelled || !containerRef.current || !window.Calendly) return;

        containerRef.current.innerHTML = ''; // Clear existing widget

        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: containerRef.current,
          utm: {
            utmSource: 'website',
            utmMedium: 'homepage',
            utmCampaign: 'talk_to_us',
          },
        });
      } catch (error) {
        console.error('Error initializing Calendly:', error);
      }
    };

    initCalendly();
    return () => { cancelled = true; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8" 
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Book Your Strategy Call</h3>
          <p className="text-slate-400 mb-6">Schedule a call with our founders to clarify anything.</p>
        </div>
        <div ref={containerRef} className="w-full" style={{ height: '700px' }} />
      </div>
    </div>
  );
};
