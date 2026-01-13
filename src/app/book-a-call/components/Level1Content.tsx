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
  Search,
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

interface Level1ContentProps {
  formatRecommendations?: FormatRecommendations | null;
}

export const Level1Content: React.FC<Level1ContentProps> = ({ formatRecommendations }) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
          <Sparkles size={16} />
          <span>Level 1: Signal Seeker</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Your Action Plan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Level 1 Brand</span>
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          As a <strong className="text-white">Signal Seeker</strong>, you are shouting into the void. Your immediate goal is to find what resonates and prove that your products matter to real customers.
        </p>
      </div>

      {/* 1. The Core Problem */}
      <div className="mb-20 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h4 className="text-3xl font-bold text-white">
              The <span className="text-red-400">Obscurity Problem</span>
            </h4>
            <p className="text-slate-400 text-lg leading-relaxed">
              You have a product, but <strong className="text-white">nobody knows it exists</strong>. You&apos;re spending money on ads and content, but you&apos;re not sure what&apos;s working. The algorithm is a black box, and you&apos;re guessing.
            </p>
            <div className="p-4 border-l-4 border-red-500 bg-red-500/5">
              <p className="text-slate-300 italic">
                The Core Challenge: You need to know if anyone cares about your product. You need proof that strangers will stop scrolling for you. Without signals, you&apos;re just making noise.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">Your Reality</div>
                  <div className="text-3xl font-bold text-white">Zero Signals</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">The Goal</div>
                  <div className="text-3xl font-bold text-teal-400">Stop the Scroll</div>
                </div>
                <div className="col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-between">
                  <div className="text-sm text-slate-500">Current Strategy</div>
                  <div className="text-white font-medium">Spray & Pray</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Why Manual Testing Fails */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold text-white mb-2">Why Guessing Doesn&apos;t Work</h4>
          <p className="text-slate-400">The old &quot;post and hope&quot; model is broken. Here&apos;s why:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Problem 1 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Search size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">No Feedback Loop</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              You post content but don&apos;t know why it fails. Is it the hook? The product? The timing? You&apos;re flying blind.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <TrendingUp size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">Wasted Budget</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              You spend money on content that doesn&apos;t work. Each failed test costs time and money, with no clear lesson learned.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <Clock size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">Too Slow</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              By the time you figure out what works, competitors have already moved. Manual testing is a luxury you can&apos;t afford.
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
            <p className="text-slate-400 text-lg">You can build your first signals with a simple DIY approach.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for DIY */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-800 border-t border-dashed border-slate-700 -z-10"></div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">1</div>
            <h5 className="text-xl font-bold text-white">Identify Hooks</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Manually research what resonates in your category. <strong className="text-slate-300 italic">Guess</strong> which hooks, benefits, or stories will stop the scroll.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">2</div>
            <h5 className="text-xl font-bold text-white">Create & Hope</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Make one piece of content per hook idea. <strong className="text-slate-300 italic">Hope</strong> the quality is good enough and the message is clear.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">3</div>
            <h5 className="text-xl font-bold text-white">Publish & Wait</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Post and watch the metrics. If views are low, you don&apos;t know why. <strong className="text-slate-300 italic">Repeat</strong> next week and try again.
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
          When you guess, you waste time and money. High views mean nothing if you don&apos;t have the <strong className="text-white">recipe</strong> to repeat them. You need signals, not just metrics.
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
            <span>The Creative Intelligence Advantage</span>
          </div>
          <h4 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Start Knowing.</span>
          </h4>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            You are shouting, but nobody is listening. We will test <strong className="text-white">100 small ideas</strong> to find the <strong className="text-white">one hook</strong> that makes strangers stop and look at you.
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
              We turn 1 manual video into <strong className="text-indigo-300">100+ controlled variants</strong>. Our Creative Intelligence Agents test hooks, scripts, and styles at 10x the speed. We find the signal while you&apos;re still brainstorming.
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
              We don&apos;t trust &quot;gut feelings.&quot; Our <strong className="text-purple-300">Attention Scorecards</strong> track what matters: retention, saves, shares, and engagement quality. We kill the losers and double down on winners.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
              <span>Intelligence</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>L1 Attention Winner</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-pink-500/50 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Award className="text-pink-400" size={32} />
            </div>
            <h5 className="text-2xl font-bold text-white mb-4">3. You Own Winners</h5>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              When we find a winner, we give you the <strong className="text-pink-300">Validated Creative Play</strong>. This is your recipe for results. You own the data, the taxonomy, and the decision logs. You stop wasting money.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
              <span>Ownership</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span>Compounding IP</span>
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
              We never let a robot ruin your brand name. We use <strong className="text-white">Trust-Safe Governance</strong>—pre-flight validation, disclosure compliance, and measurement integrity. Real trust, backed by real data.
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
            {formatRecommendations.recommendations.map((rec, index) => (
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

