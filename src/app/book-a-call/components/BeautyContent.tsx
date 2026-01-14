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
  ArrowRight,
  Video,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle
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

interface GrowthReport {
  report_title: string;
  diagnostic_summary: {
    your_current_strategy: string;
    your_current_reality: string;
    your_current_goal: string;
    your_core_challenge: string;
  };
  problem_section: {
    title: string;
    urgency_statement: string;
  };
  growth_ladder_section: {
    intro: string;
    steps: Array<{
      step_name: string;
      goal: string;
      success: string;
      is_current_level: boolean;
    }>;
    current_status_explanation: string;
  };
  diy_solution_section: {
    title: string;
    description: string;
    steps: Array<{
      step_name: string;
      actions_to_do: string[];
    }>;
    timeline: string;
  };
  digicon_solution_section: {
    sku_info: {
      internal_code: string;
      technical_name: string;
      ladder_target: string;
    };
    public_title: string;
    pitch: string;
    whats_included: string[];
    why_better_than_diy: string;
    closing_value: string;
  };
}

interface BeautyContentProps {
  formatRecommendations?: FormatRecommendations | null;
  actionRecommendations?: ActionRecommendations | null;
  growthReport?: GrowthReport | null;
}

export const BeautyContent: React.FC<BeautyContentProps> = ({ formatRecommendations, actionRecommendations, growthReport }) => {
  const currentStep = growthReport?.growth_ladder_section?.steps.find(s => s.is_current_level);
  const stepName = currentStep?.step_name || 'Your Goal';
  const stepGoal = currentStep?.goal || 'Scale your brand.';
  const stepSuccess = currentStep?.success || 'Predictable growth.';
  const stepColor = stepName.includes('Step 1') ? 'teal' : stepName.includes('Step 2') ? 'blue' : 'purple';

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      {/* Header */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${stepColor}-500/10 border border-${stepColor}-500/30 text-${stepColor}-400 text-sm font-medium mb-6`}>
          <Sparkles size={16} />
          <span>{stepName} — You are here</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Your Action Plan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Beauty Brand</span>
        </h3>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-slate-200 text-xl font-semibold leading-relaxed">
            Goal: {stepGoal}
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            Success: {stepSuccess}
          </p>
        </div>
      </div>

      {/* 1. Market Reality - Full Width Layout */}
      <div className="mb-24 max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h4 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {growthReport?.problem_section?.title || 'The $2.74B Opportunity Behind a Wall of Distrust'}
          </h4>
          <p className="text-slate-400 text-xl leading-relaxed max-w-3xl mx-auto">
            {growthReport?.problem_section?.urgency_statement || "Vietnam's Beauty Market is growing fast, but access is blocked by a massive Trust Crisis. \"Kem Tron\" scams and counterfeits have put consumers on high alert."}
          </p>
          
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-red-500/20 max-w-2xl mx-auto">
            <p className="text-slate-200 font-medium italic text-sm md:text-base">
              {growthReport?.diagnostic_summary?.your_core_challenge ? `The Core Challenge: ${growthReport.diagnostic_summary.your_core_challenge}` : 'The Core Insight: Unproven = Potential Scam. You must earn the right to be verified.'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reality Card */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:bg-white/[0.05] transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -z-10"></div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Reality</div>
              <p className="text-white text-xl font-bold leading-snug">
                {growthReport?.diagnostic_summary?.your_current_reality || 'Current Reality'}
              </p>
            </div>

            {/* Goal Card */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:bg-white/[0.05] transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full -z-10"></div>
              <div className="text-xs font-bold text-teal-500/70 uppercase tracking-widest mb-4">Your Goal</div>
              <p className="text-teal-400 text-xl font-bold leading-snug">
                {growthReport?.diagnostic_summary?.your_current_goal || 'Stop Scroll'}
              </p>
            </div>
          </div>

          {/* Strategy Bar */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <span className="text-sm text-slate-500 uppercase tracking-widest font-medium">Current Strategy</span>
            </div>
            <div className="text-white font-bold text-lg md:text-right">
              {growthReport?.diagnostic_summary?.your_current_strategy || 'Spray & Pray'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Shift - Minimal Cards */}
      <div className="mb-20 px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            The Bottleneck
          </div>
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">Why The Old Ways Failed</h4>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">The &quot;Spray and Pray&quot; era is over. Here is the new reality.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Influencer Inflation",
              desc: "Costs are rising while ROI plateaus. Mega influencers cost $2k-$20k+ with untrackable ROI. Even Nano influencers demand booking fees to offset their risk.",
              icon: TrendingUp,
              color: "orange"
            },
            {
              title: "KOC Risk Aversion",
              desc: "KOCs fear \"Scam Brands.\" If product quality fails, they are labeled \"liars.\" They need visual proof of legitimacy before risking their reputation.",
              icon: ShieldCheck,
              color: "red"
            },
            {
              title: "2026 Regulations",
              desc: "Jan 1, 2026: Influencers become legally liable. They will demand physical samples and strict paperwork. Compliance is now a competitive advantage.",
              icon: Clock,
              color: "indigo"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group">
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h5 className="text-2xl font-bold text-white mb-4">{item.title}</h5>
              <p className="text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Choice A Bridge */}
      <div className="max-w-2xl mx-auto text-center mb-16 px-4">
        <div className="h-px w-12 bg-indigo-500/30 mx-auto mb-8"></div>
        <p className="text-slate-300 text-lg leading-relaxed">
          To overcome this trust barrier, you have two paths. <br />
          <strong className="text-white font-bold">Option 1</strong> is to build your own manual proof engine.
        </p>
      </div>

      {/* 3. The DIY Path - Redesigned for consistency */}
      <div className="max-w-6xl mx-auto mb-32 px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-800/50 text-slate-400 border border-white/5">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-2">{growthReport?.diy_solution_section?.title || 'Option 1: The Manual Roadmap'}</h4>
              <p className="text-slate-400 text-lg">{growthReport?.diy_solution_section?.description || 'Build your own proof engine by hand.'}</p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-500 text-xs font-mono uppercase tracking-widest">
            Manual Effort Required
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {growthReport?.diy_solution_section?.steps ? (
            growthReport.diy_solution_section.steps.map((step, idx) => (
              <div key={idx} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 transition-all hover:bg-white/[0.04]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 font-bold text-lg group-hover:border-teal-500/30 transition-colors">
                    0{idx + 1}
                  </div>
                  <h5 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{step.step_name}</h5>
                </div>
                <ul className="space-y-4">
                  {step.actions_to_do.map((action, actionIdx) => (
                    <li key={actionIdx} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-teal-500/50 mt-1.5 flex-shrink-0">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            [
              { 
                title: "Identify Signals", 
                actions: ["Research competitor winning ads.", "Identify visual patterns.", "Guess hook concepts."] 
              },
              { 
                title: "Create & Hope", 
                actions: ["Film and edit manually.", "Maintain consistent quality.", "Publish on schedule."] 
              },
              { 
                title: "Publish & Wait", 
                actions: ["Monitor basic views.", "Compare results by hand.", "Guess the winner."] 
              }
            ].map((step, idx) => (
              <div key={idx} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 transition-all hover:bg-white/[0.04]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 font-bold text-lg">
                    0{idx + 1}
                  </div>
                  <h5 className="text-xl font-bold text-white">{step.title}</h5>
                </div>
                <ul className="space-y-4">
                  {step.actions.map((action, actionIdx) => (
                    <li key={actionIdx} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-teal-500/50 mt-1.5 flex-shrink-0">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {growthReport?.diy_solution_section?.timeline && (
          <div className="mt-12 p-8 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center gap-6 max-w-2xl mx-auto shadow-2xl shadow-red-900/10">
            <div className="p-4 bg-red-500/10 rounded-2xl text-red-400 flex-shrink-0">
              <AlertTriangle size={32} />
            </div>
            <p className="text-red-400/90 text-base font-medium italic leading-relaxed">
              {growthReport.diy_solution_section.timeline}
            </p>
          </div>
        )}
      </div>

      {/* Concept Bridge */}
      <div className="max-w-2xl mx-auto text-center mb-16 px-4">
        <div className="h-px w-12 bg-indigo-500/30 mx-auto mb-8"></div>
        <p className="text-slate-300 text-lg leading-relaxed">
          Whether you do it manually or use our system, these are the <strong className="text-white font-bold">3 concepts</strong> we recommend you start testing immediately to find your first winners.
        </p>
      </div>

      {/* Format Recommendations Section */}
      {formatRecommendations && formatRecommendations.recommendations && formatRecommendations.recommendations.length > 0 && (
        <div className="mb-32 px-4">
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

          <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto px-4">
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

      {/* Action Recommendations Section */}
      {actionRecommendations && actionRecommendations.recommended_actions && actionRecommendations.recommended_actions.length > 0 && (
        <div className="mb-32">
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

          <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto px-4">
            {actionRecommendations.recommended_actions.map((action) => (
              <div key={action.rank} className="group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl border border-blue-500/30">
                    #{action.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex wrap items-center gap-3 mb-2">
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

      {/* Choice B Bridge: The Story Pivot */}
      <div className="max-w-3xl mx-auto text-center mb-32 px-6">
        <div className="inline-block p-1 rounded-full bg-indigo-500/10 mb-8">
          <div className="px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">Option 2</div>
        </div>
        <h4 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          Manual testing is a slow <span className="text-red-400">vanity trap.</span>
        </h4>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Testing these formats yourself takes months of production and guesswork. When you guess, you waste time and money. <br />
          You need a <strong className="text-white">proven recipe</strong> that works in weeks, not years.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-mono uppercase tracking-tighter">
          <span className="text-slate-500 line-through">Spray & Pray</span>
          <ArrowRight className="text-indigo-500 rotate-90 md:rotate-0" />
          <span className="text-indigo-400">Creative Intelligence</span>
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
    </div>
  );
};
