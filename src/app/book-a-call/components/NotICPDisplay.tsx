'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NotICPContent } from './NotICPContent';

interface NotICPDisplayProps {
  submissionId?: string;
  onClose?: () => void;
}

export const NotICPDisplay: React.FC<NotICPDisplayProps> = ({ submissionId, onClose }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

        {/* Header Section */}
        <div className="text-center mb-16">
          {submissionId && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Submission ID</span>
              <span className="text-white font-mono text-sm">{submissionId}</span>
            </div>
          )}
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Adapting AI in Marketing: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Your Strategic Action Plan</span>
          </h2>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            While our direct service focuses on specific scale stages, we want to equip you with the exact framework we use to help brands navigate the AI transition.
          </p>
        </div>

        {/* Content Container */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          <NotICPContent />

          {onClose && (
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <button
                onClick={onClose}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105"
              >
                <span>Return to Home</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
