'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  Video,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  X,
  Check,
  Brain,
  Rocket,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  TrendingUp, 
  Award
} from 'lucide-react';

// --- Calendly Overlay Component ---
const CalendlyOverlay: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  prefill?: { 
    name?: string; 
    email?: string;
    company?: string;
    website?: string;
    role?: string;
    submissionId?: string;
  } 
}> = ({ isOpen, onClose, prefill }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calendlyUrl = 'https://calendly.com/jay-jdalchemy/discovery-call-w-founders-ams';

  useEffect(() => {
    if (!isOpen) return;

    const loadCalendly = async () => {
      const existing = document.getElementById('calendly-script');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'calendly-script';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = '';
        
        const prefillData: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string | undefined>;
        } = {
          name: prefill?.name,
          email: prefill?.email,
        };

        if (prefill?.company || prefill?.website || prefill?.role) {
          prefillData.customAnswers = {
            a1: prefill?.company,
            a2: prefill?.website,
            a3: prefill?.role
          };
        }

        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: containerRef.current,
          prefill: prefillData,
          utm: {
            utmSource: 'lead_qualification',
            utmMedium: 'beauty_analysis',
            utmCampaign: prefill?.submissionId
          }
        });
      }
    };

    loadCalendly();
  }, [isOpen, prefill]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8" onClick={onClose}>
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 text-slate-800 rounded-full hover:bg-slate-200 transition-colors shadow-lg"
        >
          <X size={24} />
        </button>
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { 
          name?: string; 
          email?: string; 
          customAnswers?: Record<string, string | undefined>;
        };
        utm?: Record<string, string | undefined>;
      }) => void;
    };
  }
}

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

interface BeautyAnalysis {
  executive_diagnosis?: {
    current_status?: string;
    primary_bottleneck?: string;
    root_cause?: string;
  };
  solution_comparison?: {
    option_a_diy?: {
      approach_name?: string;
      timeline?: string;
      risk_level?: string;
      execution_steps?: Array<{
        step_name?: string;
        actions_to_do?: string[];
      }>;
    };
    option_b_digicon?: {
      approach_name?: string;
      best_fit_sku?: string;
      recommended_package?: string;
      timeline?: string;
      risk_level?: string;
      execution_steps?: Array<{
        step_name?: string;
        actions_to_do?: string[];
      }>;
      primary_outcome?: string;
    };
  };
  recommended_next_action?: string;
}

interface BeautyContentProps {
  formatRecommendations?: FormatRecommendations | null;
  actionRecommendations?: ActionRecommendations | null;
  growthReport?: GrowthReport | null;
  beautyAnalysis?: BeautyAnalysis | null;
  submissionId?: string | null;
  basicDetails?: {
    contactName?: string;
    email?: string;
    company?: string;
    website?: string;
    contactRole?: string;
    [key: string]: string | number | boolean | undefined | null;
  } | null;
}

export const BeautyContent: React.FC<BeautyContentProps> = ({ 
  formatRecommendations, 
  actionRecommendations, 
  beautyAnalysis, 
  basicDetails,
  submissionId
}) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const hasBeautyAnalysis = !!beautyAnalysis?.executive_diagnosis;

  return (
    <div className="mt-12 pt-8">
      <CalendlyOverlay 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
        prefill={{
          name: basicDetails?.contactName || '',
          email: basicDetails?.email || '',
          company: basicDetails?.company || '',
          website: basicDetails?.website || '',
          role: basicDetails?.contactRole || '',
          submissionId: submissionId || ''
        }}
      />
      {/* Executive Diagnosis Section */}
      {hasBeautyAnalysis && beautyAnalysis.executive_diagnosis && (
        <div className="mb-24 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[100px] -z-10"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold uppercase tracking-widest mb-6">
              <Brain size={16} className="animate-pulse" />
              <span>Strategic Diagnosis</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-indigo-400">Executive Report</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A deep-dive analysis of your brand&apos;s current position in the market landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Current Status Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900/90 border border-white/10 backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <TrendingUp size={160} />
                </div>
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex-shrink-0">
                    <Target size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black text-teal-500 uppercase tracking-[0.2em] mb-4">Market Status</div>
                    <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
                      {beautyAnalysis.executive_diagnosis.current_status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottleneck & Cause Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Primary Bottleneck */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-slate-950 border border-red-500/20 overflow-hidden h-full">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex-shrink-0">
                      <AlertTriangle size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-4">Primary Bottleneck</div>
                      <p className="text-white text-lg font-semibold leading-relaxed">
                        {beautyAnalysis.executive_diagnosis.primary_bottleneck}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Root Cause */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-slate-950 border border-orange-500/20 overflow-hidden h-full">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex-shrink-0">
                      <Lightbulb size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-black text-orange-400 uppercase tracking-[0.2em] mb-4">Root Cause</div>
                      <p className="text-white text-lg font-semibold leading-relaxed">
                        {beautyAnalysis.executive_diagnosis.root_cause}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solution Comparison Section */}
      {beautyAnalysis?.solution_comparison && (
        <div className="mb-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pathways</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Compare the traditional &quot;Guess &amp; Burn&quot; approach versus our systematic &quot;Signal-First&quot; engine.
            </p>
          </div>

          {/* Vertical Stack Comparison */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Option A: DIY Path */}
            {beautyAnalysis.solution_comparison.option_a_diy && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/5 rounded-[2.5rem] blur-sm"></div>
                <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-black border border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                        <X size={24} />
                      </div>
                      <h4 className="text-2xl font-bold text-white">The Traditional Path (Manual & High Risk)</h4>
                    </div>
                    <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-[10px] font-black text-red-400 uppercase tracking-tighter">Option A</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-center sm:text-left">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Timeline</div>
                      <div className="text-white font-medium">{beautyAnalysis.solution_comparison.option_a_diy.timeline}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Risk Level</div>
                      <div className="text-red-400 font-bold">{beautyAnalysis.solution_comparison.option_a_diy.risk_level}</div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {beautyAnalysis.solution_comparison.option_a_diy.execution_steps?.map((step, idx) => (
                      <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-red-500/50 before:rounded-full after:absolute after:left-[3px] after:top-6 after:bottom-[-20px] after:w-[2px] after:bg-white/5 last:after:hidden">
                        <h5 className="text-slate-200 font-bold mb-3 text-lg">{step.step_name}</h5>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                          {step.actions_to_do?.map((action, aidx) => (
                            <li key={aidx} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                              <span className="text-red-500/40 mt-1.5 flex-shrink-0">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Separator / Transition */}
            <div className="flex items-center justify-center py-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="px-6 text-xs font-black text-slate-500 uppercase tracking-[0.3em] italic">VS</div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            {/* Option B: DIGICON Path */}
            {beautyAnalysis.solution_comparison.option_b_digicon && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-teal-500/40 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative h-full p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-2 border-indigo-500/30 flex flex-col shadow-2xl">
                  {/* Floating Recommended Badge */}
                  <div className="absolute -top-4 right-10 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg border border-white/20 z-10">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-300 fill-yellow-300" />
                      <span className="text-white text-xs font-black uppercase tracking-widest">Recommended Strategy</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-inner">
                        <ShieldCheck size={32} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">The DIGICON System</div>
                        <h4 className="text-3xl font-black text-white">{beautyAnalysis.solution_comparison.option_b_digicon.approach_name}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Specific Package Info */}
                  {(beautyAnalysis.solution_comparison.option_b_digicon.recommended_package || beautyAnalysis.solution_comparison.option_b_digicon.best_fit_sku) && (
                    <div className="mb-8 p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 relative group/pkg overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -z-10 group-hover/pkg:scale-150 transition-transform duration-1000"></div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Selected Module</span>
                          </div>
                          <h5 className="text-xl font-bold text-white mb-1">
                            {beautyAnalysis.solution_comparison.option_b_digicon.recommended_package}
                          </h5>
                          {beautyAnalysis.solution_comparison.option_b_digicon.best_fit_sku && (
                            <span className="text-xs font-mono text-indigo-400/80">{beautyAnalysis.solution_comparison.option_b_digicon.best_fit_sku}</span>
                          )}
                        </div>
                        <div className="hidden sm:block">
                          <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1 text-right">Success Logic</div>
                          <div className="text-white font-bold text-right">Data-Driven</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                        <Award size={12} className="text-indigo-400" /> Timeline
                      </div>
                      <div className="text-white font-black text-lg">{beautyAnalysis.solution_comparison.option_b_digicon.timeline}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                        <ShieldCheck size={12} className="text-green-400" /> Risk Level
                      </div>
                      <div className="text-green-400 font-black text-lg">{beautyAnalysis.solution_comparison.option_b_digicon.risk_level}</div>
                    </div>
                  </div>

                  <div className="space-y-6 flex-1 mb-10">
                    {beautyAnalysis.solution_comparison.option_b_digicon.execution_steps?.map((step, idx) => (
                      <div key={idx} className="relative p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/10 group/step hover:border-indigo-500/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-black text-lg flex-shrink-0 group-hover/step:scale-110 transition-transform">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-bold mb-2 text-lg">{step.step_name}</h5>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                              {step.actions_to_do?.map((action, aidx) => (
                                <li key={aidx} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                                  <Check size={14} className="text-indigo-400 mt-1 flex-shrink-0" />
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {beautyAnalysis.solution_comparison.option_b_digicon.primary_outcome && (
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-2 border-teal-500/30 flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0 shadow-lg">
                        <CheckCircle size={32} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.2em] mb-1">Guaranteed Output</div>
                        <p className="text-white font-bold text-lg leading-tight">
                          {beautyAnalysis.solution_comparison.option_b_digicon.primary_outcome}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommended Next Action - Prominent CTA */}
      {beautyAnalysis?.recommended_next_action && (
        <div className="mb-32 max-w-4xl mx-auto px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative p-10 md:p-14 rounded-[3rem] bg-slate-900 border border-white/10 overflow-hidden text-center shadow-2xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
              
              <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Rocket size={48} />
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-6">Strategic Recommendation</div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
                  {beautyAnalysis.recommended_next_action}
                </h3>
                
                <button 
                  onClick={() => setShowCalendly(true)}
                  className="px-10 py-5 bg-white text-indigo-950 rounded-2xl font-black text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Execute This Strategy <ArrowRight size={20} />
                </button>
                
                <p className="mt-8 text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="text-teal-500" /> 
                  100% Data-Validated Approach
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Format Recommendations Section */}
      {formatRecommendations && formatRecommendations.recommendations && formatRecommendations.recommendations.length > 0 && (
        <div className="mb-32 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-bold uppercase tracking-widest mb-6">
              <Video size={16} className="animate-pulse" />
              <span>Creative Intelligence</span>
            </div>
            <h4 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Content Formats</span>
            </h4>
            {formatRecommendations.analysis_context?.strategy_note && (
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                {formatRecommendations.analysis_context.strategy_note}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formatRecommendations.recommendations.map((rec) => (
              <div key={rec.rank} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[2rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full bg-slate-950 p-8 rounded-[2rem] border border-white/5 flex flex-col hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 font-black text-xl border border-purple-500/20">
                      {rec.rank}
                    </div>
                  </div>

                  <h5 className="text-xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors">{rec.format_name}</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">{rec.concept}</p>

                  <div className="mb-8 p-4 bg-indigo-500/5 border-l-4 border-indigo-500/30 rounded-r-xl">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Target size={12} /> Comment Trigger
                    </div>
                    <p className="text-slate-200 text-sm font-medium">{rec.comment_trigger}</p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {[
                      { label: "Scalability", value: rec.viability_matrix.operational_scalability },
                      { label: "Positioning", value: rec.viability_matrix.strategic_positioning },
                      { label: "Adaptability", value: rec.viability_matrix.cultural_adaptability }
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 uppercase font-bold">{stat.label}</span>
                        <span className="text-slate-300 font-medium">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Recommendations Section */}
      {actionRecommendations && actionRecommendations.recommended_actions && actionRecommendations.recommended_actions.length > 0 && (
        <div className="mb-32 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
              <Zap size={16} className="text-blue-400 animate-bounce" />
              <span>Implementation Roadmap</span>
            </div>
            <h4 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Next Actions</span>
            </h4>
            
            {actionRecommendations.intelligence_strategy && (
              <div className="max-w-2xl mx-auto mb-16 space-y-4">
                {actionRecommendations.intelligence_strategy.diagnosis && (
                  <p className="text-slate-400 text-lg leading-relaxed italic">
                    &quot;{actionRecommendations.intelligence_strategy.diagnosis}&quot;
                  </p>
                )}
                {actionRecommendations.intelligence_strategy.target_insight && (
                  <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
                    <p className="text-blue-300 font-medium flex items-center gap-3">
                      <Target size={18} />
                      <span className="text-xs uppercase tracking-widest font-black mr-2">Core Target:</span>
                      {actionRecommendations.intelligence_strategy.target_insight}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {actionRecommendations.recommended_actions.map((action) => (
              <div key={action.rank} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-sm opacity-40 group-hover:opacity-80 transition duration-500"></div>
                <div className="relative bg-slate-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 font-black text-2xl border border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform">
                        {action.rank}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <h5 className="text-2xl md:text-3xl font-black text-white">{action.action_name}</h5>
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">
                          {action.mechanism_type}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative p-6 rounded-3xl bg-black/40 border border-white/5 group/box hover:border-blue-500/20 transition-colors">
                          <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <CheckCircle size={14} /> Implementation Guide
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{action.implementation_guide}</p>
                        </div>
                        <div className="relative p-6 rounded-3xl bg-black/40 border border-white/5 group/box hover:border-purple-500/20 transition-colors">
                          <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Brain size={14} /> Expected Insight
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed font-medium">{action.expected_insight}</p>
                        </div>
                      </div>
                    </div>
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
