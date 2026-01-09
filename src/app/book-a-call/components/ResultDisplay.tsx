'use client';

import React from 'react';

export interface AnalysisResult {
  dominantLevel: string;
  levelDistribution: {
    'Level 1': number;
    'Level 2': number;
    'Level 3': number;
    'N/A': number;
  };
  levelDescription: string;
  dominantICP: string;
  icpDistribution: {
    ICP1: number;
    ICP2: number;
    ICP3: number;
    NOT_ICP: number;
  };
  status: string;
  flags?: string[];
  breakdown: {
    nA: number;
    nB: number;
    nC: number;
    nD: number;
    totalQuestions: number;
  };
}

interface ResultDisplayProps {
  analysis: AnalysisResult;
  onClose?: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis, onClose }) => {
  const levelColors: { [key: string]: string } = {
    'Level 1': 'bg-teal-500/20 border-teal-500 text-teal-300',
    'Level 2': 'bg-blue-500/20 border-blue-500 text-blue-300',
    'Level 3': 'bg-purple-500/20 border-purple-500 text-purple-300',
    'N/A': 'bg-gray-500/20 border-gray-500 text-gray-300',
  };

  const getLevelColor = (level: string) => {
    return levelColors[level] || levelColors['N/A'];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-card rounded-2xl p-8 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Customr Intelligence System Readiness Score
          </h2>
          <div
            className={`inline-block px-6 py-3 rounded-lg border-2 ${getLevelColor(
              analysis.dominantLevel
            )} mb-4`}
          >
            <div className="text-2xl font-bold mb-1">{analysis.dominantLevel}</div>
            <div className="text-sm opacity-90">{analysis.levelDescription}</div>
          </div>
        </div>

        {/* Level Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Level Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(analysis.levelDistribution).map(([level, percentage]) => (
              <div key={level} className="bg-black/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    {level}
                    {level === 'Level 1' && ' (L1: attention wins)'}
                    {level === 'Level 2' && ' (L2: intent wins)'}
                    {level === 'Level 3' && ' (L3: purchase wins)'}
                  </span>
                  <span className="text-white font-bold">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      level === 'Level 1'
                        ? 'bg-teal-500'
                        : level === 'Level 2'
                        ? 'bg-blue-500'
                        : level === 'Level 3'
                        ? 'bg-purple-500'
                        : 'bg-gray-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Scores */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Score Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-400 mb-1">{analysis.breakdown.nA}</div>
              <div className="text-sm text-slate-400">Answer A (Level 1)</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{analysis.breakdown.nB}</div>
              <div className="text-sm text-slate-400">Answer B (Level 2)</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{analysis.breakdown.nC}</div>
              <div className="text-sm text-slate-400">Answer C (Level 3)</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-400 mb-1">{analysis.breakdown.nD}</div>
              <div className="text-sm text-slate-400">Answer D (N/A)</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Status</h3>
          <div
            className={`inline-block px-6 py-3 rounded-lg border-2 ${
              analysis.status === 'READY'
                ? 'bg-green-500/20 border-green-500 text-green-300'
                : 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
            }`}
          >
            <div className="font-semibold">{analysis.status}</div>
            {analysis.flags && analysis.flags.length > 0 && (
              <div className="text-sm mt-1 opacity-90">
                Flags: {analysis.flags.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Level Descriptions */}
        <div className="mb-6 p-6 bg-black/20 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Level Definitions</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div>
              <strong className="text-teal-400">Level 1 (L1):</strong> Attention wins (distribution
              + quality + trust proxies)
            </div>
            <div>
              <strong className="text-blue-400">Level 2 (L2):</strong> Intent wins (instrumented
              click quality / ATC / leads)
            </div>
            <div>
              <strong className="text-purple-400">Level 3 (L3):</strong> Purchase wins (unit
              economics movement under agreed measurement design)
            </div>
          </div>
        </div>

        {onClose && (
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

