'use client';

import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target, 
  Award, 
  Play,
  ArrowRight,
  Video
} from 'lucide-react';

interface FormatRecommendations {
  company_name?: string;
  analysis_context?: {
    category?: string;
    objective?: string;
    strategy_note?: string;
  };
  recommendations?: Array<{
    rank: number;
    format_name: string;
    concept: string;
    comment_trigger: string;
    viability_matrix: {
      operational_scalability: string;
      strategic_positioning: string;
      cultural_adaptability: string;
    };
  }>;
  system_check?: {
    all_formats_scalable?: boolean;
    ai_leverage_possible?: boolean;
  };
}

interface BeautyLevel1ContentProps {
  formatRecommendations?: FormatRecommendations | null;
}

export const BeautyLevel1Content: React.FC<BeautyLevel1ContentProps> = ({ formatRecommendations }) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
          <Sparkles size={16} />
          <span>Tailored for Beauty Brands</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Your Action Plan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Level 1 Beauty Brand</span>
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          As a <strong className="text-white">Signal Seeker</strong>, your immediate goal is to find what resonates and prove that your products matter to real customers.
        </p>
      </div>

      {/* 1. Market Reality - Unboxed Layout */}
      <div className="mb-20 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h4 className="text-3xl font-bold text-white">
              The <span className="text-orange-400">$2.74B Opportunity</span> Behind a Wall of Distrust
            </h4>
            <p className="text-slate-400 text-lg leading-relaxed">
              Vietnam&apos;s Beauty Market is growing at 3.26% CAGR, but access is blocked by a massive <strong className="text-red-400">Trust Crisis</strong>. &quot;Kem Tron&quot; scams, deepfakes, and counterfeits have put consumers on high alert.
            </p>
            <div className="p-4 border-l-4 border-red-500 bg-red-500/5">
              <p className="text-slate-300 italic">
                The Core Insight: The explosion of e-commerce is accompanied by a rise in scams. Consumers are on high alert. &quot;Unproven = Potential Scam.&quot; You cannot simply buy traffic; you must earn the right to be verified.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">Market Size</div>
                  <div className="text-3xl font-bold text-white">$2.74B</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">Barrier</div>
                  <div className="text-3xl font-bold text-red-400">Trust</div>
                </div>
                <div className="col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-between">
                  <div className="text-sm text-slate-500">Consumer Mindset</div>
                  <div className="text-white font-medium">Guilty until proven innocent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Shift - Minimal Cards */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold text-white mb-2">Why The Old Ways Failed</h4>
          <p className="text-slate-400">The &quot;Spray and Pray&quot; era is over. Here is the new reality.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Cost Card */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <TrendingUp size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">Influencer Inflation</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Costs are rising while ROI plateaus. Mega influencers cost $2k-$20k+ with untrackable ROI. Even Nano influencers demand booking fees to offset their risk.
            </p>
          </div>

          {/* Risk Card */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <ShieldCheck size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">KOC Risk Aversion</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              KOCs fear &quot;Scam Brands.&quot; If product quality fails, they are labeled &quot;liars.&quot; They need visual proof of legitimacy before risking their reputation.
            </p>
          </div>

          {/* Law Card */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Clock size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">2026 Regulations</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Jan 1, 2026: Influencers become legally liable. They will demand physical samples and strict paperwork. Compliance is now a competitive advantage.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The DIY Path */}
      <div className="max-w-4xl mx-auto mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-full bg-slate-800 text-slate-400">
            <Play fill="currentColor" size={24} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-2">The Manual Path: How to Start Today</h4>
            <p className="text-slate-400 text-lg">You can build your first signals with a simple 7-day DIY loop.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for DIY */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-800 border-t border-dashed border-slate-700 -z-10"></div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">1</div>
            <h5 className="text-xl font-bold text-white">Identify Signals</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Manually research 3-5 existing customer results or ingredient benefits. <strong className="text-slate-300 italic">Guess</strong> which ones will stop the scroll.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">2</div>
            <h5 className="text-xl font-bold text-white">Create & Hope</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Film and edit one piece of content per proof point on your phone. <strong className="text-slate-300 italic">Hope</strong> the quality is enough to earn trust.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">3</div>
            <h5 className="text-xl font-bold text-white">Publish & Wait</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Post and wait for views. If it fails, you don&apos;t know why. <strong className="text-slate-300 italic">Repeat</strong> the cycle next week and try again.
            </p>
          </div>
        </div>
      </div>

      {/* The Story Pivot / Transition */}
      <div className="max-w-3xl mx-auto text-center mb-32 px-6">
        <div className="inline-block p-1 rounded-full bg-indigo-500/10 mb-8">
          <div className="px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">The Problem</div>
        </div>
        <h4 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Manual testing is a slow <span className="text-red-400">vanity trap.</span>
        </h4>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          When you guess, you waste time and money. 100k views means nothing if you don&apos;t have the <strong className="text-white">recipe</strong> to repeat it. 
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono uppercase tracking-tighter">
          <span className="text-slate-500 line-through">Spray & Pray</span>
          <ArrowRight className="text-indigo-500 rotate-90 md:rotate-0" />
          <span className="text-indigo-400">Sense & Respond</span>
        </div>
      </div>

      {/* 4. The Digicon Advantage */}
      <div className="mb-20 py-24 border-y border-white/5 bg-gradient-to-b from-indigo-950/20 via-black to-black relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center mb-20 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Option 2: The Creative Intelligence Advantage</span>
          </div>
          <h4 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Start Knowing.</span>
          </h4>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            We don&apos;t sell videos. We sell the <strong className="text-white">recipe for winning</strong> using an automated Agent Stack that learns what your customers love.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {/* Feature 1 */}
          <div className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Zap className="text-indigo-400" size={32} />
            </div>
            <h5 className="text-2xl font-bold text-white mb-4">1. We Test Fast</h5>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We turn 1 manual video into <strong className="text-indigo-300">100+ controlled variants</strong>. Our Agents test hooks, scripts, and styles at 10x the speed of a human team.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
              <span>Scale</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Synthetic Visibility</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="text-purple-400" size={32} />
            </div>
            <h5 className="text-2xl font-bold text-white mb-4">2. We Keep Score</h5>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We ignore vanity views. Our <strong className="text-purple-300">Intent Scorecards</strong> track real buying signals: saves, shares, and &quot;where to buy&quot; intent. We find the winner, fast.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
              <span>Intelligence</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Predictive QA</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-pink-500/50 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Award className="text-pink-400" size={32} />
            </div>
            <h5 className="text-2xl font-bold text-white mb-4">3. You Own Winners</h5>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              When we find a winner, we give you the <strong className="text-pink-300">Play.</strong> This is your recipe for results. You own the data and the creative lessons. You stop wasting money.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
              <span>Ownership</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Validated Creative Play</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
          <div className="p-4 bg-green-500/10 rounded-full text-green-400 shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-2 italic">Why this is Safe & Real:</h5>
            <p className="text-slate-400 leading-relaxed text-sm">
              We never let a robot ruin your brand name. We use <strong className="text-white">Human Trust Governance</strong>—real human checks to ensure AI visuals are high-fidelity and trust-safe. Real trust, backed by real data.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-lg italic max-w-xl mx-auto">
            &quot;We don&apos;t just sell you videos. We sell you the recipe for winning.&quot;
          </p>
        </div>
      </div>

      {/* Format Recommendations Section */}
      {formatRecommendations && formatRecommendations.recommendations && formatRecommendations.recommendations.length > 0 && (
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6">
              <Video size={16} />
              <span>Recommended Video Formats to Test</span>
            </div>
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Creative Format Strategy</span>
            </h4>
            {formatRecommendations.analysis_context?.strategy_note && (
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {formatRecommendations.analysis_context.strategy_note}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
            {formatRecommendations.recommendations.map((rec) => (
              <div key={rec.rank} className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 font-bold text-xl border border-purple-500/30">
                    #{rec.rank}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-2xl font-bold text-white mb-2">{rec.format_name}</h5>
                    <p className="text-slate-300 text-base leading-relaxed">{rec.concept}</p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-indigo-500/5 border-l-4 border-indigo-500/50 rounded-r-lg">
                  <div className="text-sm font-semibold text-indigo-400 mb-2">Comment Trigger</div>
                  <p className="text-slate-300 text-sm">{rec.comment_trigger}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Operational Scalability</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{rec.viability_matrix.operational_scalability}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Strategic Positioning</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{rec.viability_matrix.strategic_positioning}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cultural Adaptability</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{rec.viability_matrix.cultural_adaptability}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
