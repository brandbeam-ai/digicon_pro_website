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

interface OtherContentProps {
  formatRecommendations?: FormatRecommendations | null;
  actionRecommendations?: ActionRecommendations | null;
  growthReport?: GrowthReport | null;
}

export const OtherContent: React.FC<OtherContentProps> = ({ formatRecommendations, actionRecommendations, growthReport }) => {
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
          Your Action Plan
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

      {/* 1. The Core Problem - Full Width Layout */}
      <div className="mb-24 max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h4 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {growthReport?.problem_section?.title || 'The Obscurity Problem'}
          </h4>
          <p className="text-slate-400 text-xl leading-relaxed max-w-3xl mx-auto">
            {growthReport?.problem_section?.urgency_statement || "You have a product, but nobody knows it exists. You're spending money on ads and content, but you're not sure what's working."}
          </p>
          
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-red-500/20 max-w-2xl mx-auto">
            <p className="text-slate-200 font-medium italic">
              {growthReport?.diagnostic_summary?.your_core_challenge ? `The Core Challenge: ${growthReport.diagnostic_summary.your_core_challenge}` : 'The Core Challenge: You need proof that strangers will stop scrolling for you.'}
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

      {/* 2. Why Manual Testing Fails - Redesigned for better layout and consistency */}
      <div className="mb-32 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            The Bottleneck
          </div>
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Manual Testing Fails</h4>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Guessing doesn&apos;t just waste money—it kills your momentum.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "No Feedback Loop",
              desc: "Without automated signal mining, you never know exactly WHY a video won. You're left chasing patterns that might not exist.",
              icon: AlertTriangle,
              color: "red"
            },
            {
              title: "Wasted Budget",
              desc: "Spending $1,000 on a video that hasn't been validated is a gamble. Manual teams can't test enough variations to find the winner safely.",
              icon: TrendingUp,
              color: "orange"
            },
            {
              title: "Too Slow to Learn",
              desc: "The market moves in days. A manual production cycle takes weeks. By the time you find a winner, the trend has already passed.",
              icon: Clock,
              color: "yellow"
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
          To stop the guesswork, you have two paths. <br />
          <strong className="text-white font-bold">Option 1</strong> is to build your own manual research loop.
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
              <p className="text-slate-400 text-lg">{growthReport?.diy_solution_section?.description || 'Build your own research and testing loop by hand.'}</p>
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
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 font-bold text-lg group-hover:border-indigo-500/30 transition-colors">
                    0{idx + 1}
                  </div>
                  <h5 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{step.step_name}</h5>
                </div>
                <ul className="space-y-4">
                  {step.actions_to_do.map((action, actionIdx) => (
                    <li key={actionIdx} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-indigo-500/50 mt-1.5 flex-shrink-0">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            [
              { 
                title: "Identify Hooks", 
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
                      <span className="text-indigo-500/50 mt-1.5 flex-shrink-0">•</span>
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
        <div className="mb-32">
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

      {/* Choice B Bridge: The Story Pivot */}
      <div className="max-w-3xl mx-auto text-center mb-32 pt-4">
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
      <div className="mb-20 border-y border-white/5 bg-gradient-to-b from-indigo-950/20 via-black to-black relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center mb-20 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>The Creative Intelligence Advantage</span>
          </div>
          <h4 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {growthReport?.digicon_solution_section?.public_title || 'Stop Guessing. Start Knowing.'}
          </h4>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            {growthReport?.digicon_solution_section?.pitch || 'You are shouting, but nobody is listening. We will test 100 small ideas to find the one hook that makes strangers stop and look at you.'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {(growthReport?.digicon_solution_section?.whats_included || [
            "1. We Test Fast: We turn 1 manual video into 100+ controlled variants. Our Agents test hooks, scripts, and styles at 10x the speed.",
            "2. We Keep Score: We ignore vanity views. Our Intent Scorecards track real buying signals: saves, shares, and intent.",
            "3. You Own Winners: When we find a winner, we give you the Play. This is your recipe for results. You own the data."
          ]).map((itemText: string, idx: number) => {
            const parts = itemText.split(':');
            const title = parts.length > 1 ? parts[0] : `Feature ${idx + 1}`;
            const desc = parts.length > 1 ? parts[1].trim() : itemText;
            const Icons = [Zap, Target, Award];
            const Icon = Icons[idx % 3];
            const colors = ["indigo", "purple", "pink"];
            const color = colors[idx % 3];
            
            return (
              <div key={idx} className={`group relative bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 hover:border-${color}-500/50 transition-all hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <Icon className={`text-${color}-400`} size={32} />
                </div>
                <h5 className="text-2xl font-bold text-white mb-4">{title}</h5>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5">
                  <span>{idx === 0 ? 'Scale' : idx === 1 ? 'Intelligence' : 'Ownership'}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-20 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
          <div className="p-4 bg-green-500/10 rounded-full text-green-400 shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-2 italic">Why this is Safe & Real:</h5>
            <p className="text-slate-400 leading-relaxed text-sm">
              {growthReport?.digicon_solution_section?.why_better_than_diy || 'We never let a robot ruin your brand name. We use Trust-Safe Governance—pre-flight validation, disclosure compliance, and measurement integrity.'}
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-lg italic max-w-xl mx-auto">
            {growthReport?.digicon_solution_section?.closing_value ? `"${growthReport.digicon_solution_section.closing_value}"` : '"We don\'t just sell you videos. We sell you the recipe for winning."'}
          </p>
        </div>
      </div>
    </div>
  );
};

