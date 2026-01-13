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
  AlertTriangle,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

interface ActionRecommendations {
  company_name?: string;
  intelligence_strategy?: {
    diagnosis?: string;
    target_insight?: string;
  };
  recommended_actions?: Array<{
    rank: number;
    action_name: string;
    mechanism_type: string;
    implementation_guide: string;
    expected_insight: string;
  }>;
}

interface Level2ContentProps {
  actionRecommendations?: ActionRecommendations | null;
}

export const Level2Content: React.FC<Level2ContentProps> = ({ actionRecommendations }) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
          <Sparkles size={16} />
          <span>Level 2: System Builder</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Your Action Plan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Level 2 Brand</span>
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          As a <strong className="text-white">System Builder</strong>, you have traffic but you don&apos;t truly understand your customer intent. You need to know WHY they click, WHAT drives them to act, and HOW to scale what works—without breaking your brand trust.
        </p>
      </div>

      {/* 1. The Core Problem */}
      <div className="mb-20 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h4 className="text-3xl font-bold text-white">
              The <span className="text-orange-400">Intent Blindness Problem</span>
            </h4>
            <p className="text-slate-400 text-lg leading-relaxed">
              You have traffic, but you <strong className="text-white">don&apos;t know your customer intent</strong>. You see clicks, but not WHY they clicked. You see views, but not WHAT makes them want to buy. You&apos;re scaling in the dark, hoping you&apos;re targeting the right people with the right message.
            </p>
            <div className="p-4 border-l-4 border-orange-500 bg-orange-500/5">
              <p className="text-slate-300 italic">
                The Core Challenge: You need to <strong className="text-white">understand customer intent</strong>—not just measure clicks, but know WHY they click, WHAT drives action, and HOW to replicate it. You need intent-quality signals (click quality, ATC, leads/inquiries) to make decisions, not vanity metrics.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">Your Reality</div>
                  <div className="text-3xl font-bold text-white">Intent Blindness</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-sm text-slate-500 mb-1">The Goal</div>
                  <div className="text-3xl font-bold text-blue-400">Know Intent</div>
                </div>
                <div className="col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-between">
                  <div className="text-sm text-slate-500">Your Challenge</div>
                  <div className="text-white font-medium">Understanding WHY They Act</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Why Manual Testing Fails for Level 2 */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold text-white mb-2">Why You Can&apos;t Understand Intent Manually</h4>
          <p className="text-slate-400">Views don&apos;t tell you intent. Clicks don&apos;t tell you WHY. Here&apos;s what&apos;s missing:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Problem 1 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <AlertTriangle size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">No Intent Signals</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              You see views and clicks, but you don&apos;t know <strong className="text-white">click quality</strong>, ATC rates, or lead/inquiry signals. You&apos;re missing the data that tells you WHO is ready to buy and WHY.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <TrendingUp size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">No Attribution Tracking</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Without clean <strong className="text-white">attribution tagging</strong> (link IDs, UTMs, experiment IDs), you can&apos;t connect creative variants to intent outcomes. You don&apos;t know which message drives which action.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <Clock size={24} />
            </div>
            <h5 className="text-xl font-bold text-white">No Experiment Discipline</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Without clean <strong className="text-white">variable isolation</strong>, you can&apos;t learn. You don&apos;t know if it was the hook, the proof, or the format that drove intent. You&apos;re guessing, not learning.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Manual Path */}
      <div className="max-w-4xl mx-auto mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-full bg-slate-800 text-slate-400">
            <Play fill="currentColor" size={24} />
          </div>
          <div>
            <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-2">The Manual Path: Governance at Human Speed</h4>
            <p className="text-slate-400 text-lg">You can build systems manually, but it comes with limitations.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for DIY */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-800 border-t border-dashed border-slate-700 -z-10"></div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">1</div>
            <h5 className="text-xl font-bold text-white">Track Clicks, Not Intent</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Set up basic tracking. See clicks, but not <strong className="text-slate-300 italic">click quality</strong>. See views, but not intent signals. You&apos;re measuring, not understanding.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">2</div>
            <h5 className="text-xl font-bold text-white">Guess What Works</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create variants, run tests. <strong className="text-slate-300 italic">Guess</strong> which message drove action. Without clean attribution, you don&apos;t know WHY they clicked or WHAT made them ready to buy.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-bold mb-6">3</div>
            <h5 className="text-xl font-bold text-white">Scale Without Understanding</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Double down on high-click creatives. <strong className="text-slate-300 italic">Hope</strong> they drive real intent. Hope you&apos;re targeting the right people. Hope you understand your customer intent.
            </p>
          </div>
        </div>
      </div>

      {/* The Story Pivot / Transition */}
      <div className="max-w-3xl mx-auto text-center mb-32 px-6">
        <div className="inline-block p-1 rounded-full bg-blue-500/10 mb-8">
          <div className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">The Problem</div>
        </div>
        <h4 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Understanding intent manually is <span className="text-red-400">too slow and too incomplete.</span>
        </h4>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          You need to know your customer intent NOW—not in weeks. You need to understand WHY they click, WHAT drives action, and HOW to replicate it. You need a system that gives you <strong className="text-white">intent intelligence</strong> at the speed of decision-making.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono uppercase tracking-tighter">
          <span className="text-slate-500 line-through">Views & Clicks</span>
          <ArrowRight className="text-blue-500 rotate-90 md:rotate-0" />
          <span className="text-blue-400">Intent Intelligence</span>
        </div>
      </div>

      {/* 4. How Our Agent System Works */}
      <div className="mb-20 py-24 border-y border-white/5 bg-gradient-to-b from-blue-950/20 via-black to-black relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center mb-20 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>How Our Creative Intelligence Agent System Works</span>
          </div>
          <h4 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Stop Guessing Intent. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Start Knowing It.</span>
          </h4>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            Our <strong className="text-white">Creative Intelligence (CI) Agent Stack</strong> is a trust-safe, closed-loop system that mines your data, ships controlled variants fast, and measures <strong className="text-white">customer intent signals</strong> (click quality, ATC, leads/inquiries) to turn results into <strong className="text-white">Validated Creative Plays</strong> you own—so you know WHY customers act and HOW to replicate it.
          </p>
        </div>

        {/* Agent System Architecture - Visual Pipeline */}
        <div className="max-w-5xl mx-auto px-6 mb-24">
          <div className="bg-gradient-to-b from-blue-900/10 via-black to-black rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <h5 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">The CI Agent Stack: Your Operating System</h5>
            
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="absolute left-[39px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500/30 via-indigo-500/30 to-purple-500/30 hidden md:block"></div>

              <div className="space-y-12">
                {/* Phase 1: Input */}
                <div className="relative flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
                      <Target className="text-blue-400" size={36} />
                    </div>
                    {/* Mobile connecting line */}
                    <div className="h-12 w-0.5 bg-gradient-to-b from-blue-500/30 to-indigo-500/30 mx-auto md:hidden"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-slate-900/50 border border-blue-500/20 rounded-2xl p-6 md:p-8 hover:border-blue-500/40 transition-colors group">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h6 className="text-xl font-bold text-white">Phase 1: Decision Intelligence</h6>
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/20 uppercase tracking-wider">Input Layer</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        Our agents mine your first-party data and market signals to build a <strong className="text-white">Market Message Map</strong>. We identify what drives customer intent: the messages, proof points, and hooks that trigger action—not just views.
                      </p>
                      <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                        <span className="text-sm text-slate-300">Output: <strong className="text-blue-100">Message Map + Objection Assets</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2: Process */}
                <div className="relative flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]">
                      <Zap className="text-indigo-400" size={36} />
                    </div>
                    {/* Mobile connecting line */}
                    <div className="h-12 w-0.5 bg-gradient-to-b from-indigo-500/30 to-purple-500/30 mx-auto md:hidden"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 md:p-8 hover:border-indigo-500/40 transition-colors group">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h6 className="text-xl font-bold text-white">Phase 2: AI-Accelerated Throughput</h6>
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">Processing Layer</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        Our <strong className="text-white">Creative Throughput Engine</strong> generates controlled variants fast. We test hooks, scripts, formats, and styles at 10x human speed. Every variant is tagged, tracked, and ready for intent measurement.
                      </p>
                      <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                        <span className="text-sm text-slate-300">Output: <strong className="text-indigo-100">20-60 Variants/Week + Attribution Tags</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3: Result */}
                <div className="relative flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]">
                      <Award className="text-purple-400" size={36} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 transition-colors group">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h6 className="text-xl font-bold text-white">Phase 3: Scale Decision Layer</h6>
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/20 uppercase tracking-wider">Decision Layer</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        Our <strong className="text-white">Intent Scorecards</strong> measure customer intent: click quality, ATC rates, leads/inquiries. Our agents automate promote/kill decisions based on intent signals—so you know WHAT drives action and WHY.
                      </p>
                      <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]"></div>
                        <span className="text-sm text-slate-300">Output: <strong className="text-purple-100">Intent Scorecards + Validated Plays</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Intent Governance Engine - Visual Workflow */}
        <div className="max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-12">
            <h5 className="text-3xl font-bold text-white mb-4">The Intent Governance Engine</h5>
            <p className="text-slate-400">How our agents work together to solve your variance problem.</p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {/* Step 1: Validation */}
              <div className="group">
                <div className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 h-full hover:border-blue-500/60 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-4xl font-bold text-blue-500">01</span>
                  </div>
                  
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
                    <ShieldCheck size={28} />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Gate 1: Safety</span>
                    <h6 className="text-lg font-bold text-white mt-1">Pre-Flight Validation</h6>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">
                    <strong className="text-white">Problem:</strong> Risk & Variance.<br/>
                    <strong className="text-blue-300">Solution:</strong> We score every creative before launch. If it fails brand safety, it never ships. Governance before scale.
                  </p>
                </div>
              </div>

              {/* Step 2: Discipline */}
              <div className="group">
                <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 h-full hover:border-indigo-500/60 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-4xl font-bold text-indigo-500">02</span>
                  </div>

                  <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20 shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]">
                    <CheckCircle size={28} />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Process: Control</span>
                    <h6 className="text-lg font-bold text-white mt-1">Experiment Discipline</h6>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">
                    <strong className="text-white">Problem:</strong> Chaotic Results.<br/>
                    <strong className="text-indigo-300">Solution:</strong> Auto-tagging ensures clean variable isolation. We know exactly which hook or format drove the result.
                  </p>
                </div>
              </div>

              {/* Step 3: Measurement */}
              <div className="group">
                <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6 h-full hover:border-purple-500/60 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-4xl font-bold text-purple-500">03</span>
                  </div>

                  <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]">
                    <Target size={28} />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Output: Intelligence</span>
                    <h6 className="text-lg font-bold text-white mt-1">Intent Scorecards</h6>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">
                    <strong className="text-white">Problem:</strong> Blindness.<br/>
                    <strong className="text-purple-300">Solution:</strong> We track click quality & ATC, not just views. We find the winners that actually sell.
                  </p>
                </div>
              </div>

              {/* Step 4: Asset */}
              <div className="group">
                <div className="bg-slate-900/80 border border-pink-500/30 rounded-2xl p-6 h-full hover:border-pink-500/60 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-4xl font-bold text-pink-500">04</span>
                  </div>

                  <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300 border border-pink-500/20 shadow-[0_0_15px_-3px_rgba(236,72,153,0.3)]">
                    <Award size={28} />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Result: Asset</span>
                    <h6 className="text-lg font-bold text-white mt-1">Validated Plays</h6>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">
                    <strong className="text-white">Problem:</strong> Fatigue.<br/>
                    <strong className="text-pink-300">Solution:</strong> You get a library of proven patterns. Scale the winners without guessing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
          <div className="p-4 bg-green-500/10 rounded-full text-green-400 shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-2 italic">Trust-Safe Governance:</h5>
            <p className="text-slate-400 leading-relaxed text-sm">
              We use <strong className="text-white">Human Trust Governance</strong>—pre-flight validation, disclosure compliance, and measurement integrity. Our agents automate workflows, but humans review brand safety. Real governance, backed by real data.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-lg italic max-w-xl mx-auto">
            &quot;We don&apos;t sell you more creatives. We sell you a system that reveals customer intent, finds winners fast, and scales what works—so you know WHY customers act and HOW to replicate it.&quot;
          </p>
        </div>
      </div>

      {/* Action Recommendations Section */}
      {actionRecommendations && actionRecommendations.recommended_actions && actionRecommendations.recommended_actions.length > 0 && (
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              <Lightbulb size={16} />
              <span>Recommended Next Actions</span>
            </div>
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Next Actions</span>
            </h4>
            {actionRecommendations.intelligence_strategy?.diagnosis && (
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-4">
                <strong>Diagnosis:</strong> {actionRecommendations.intelligence_strategy.diagnosis}
              </p>
            )}
            {actionRecommendations.intelligence_strategy?.target_insight && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 max-w-2xl mx-auto">
                <p className="text-blue-300">
                  <strong>Target Insight:</strong> {actionRecommendations.intelligence_strategy.target_insight}
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
            {actionRecommendations.recommended_actions.map((action) => (
              <div key={action.rank} className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl border border-blue-500/30">
                    #{action.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h5 className="text-2xl font-bold text-white">{action.action_name}</h5>
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10 uppercase tracking-wider">
                        {action.mechanism_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-black/30 rounded-xl border border-white/5">
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle size={14} /> Implementation
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{action.implementation_guide}</p>
                  </div>
                  <div className="p-5 bg-black/30 rounded-xl border border-white/5">
                    <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Target size={14} /> Expected Insight
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{action.expected_insight}</p>
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

