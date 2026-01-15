'use client';

import React from 'react';
import { 
  Target, 
  Video,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  X,
  Check,
  Brain,
  Rocket
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
}

export const BeautyContent: React.FC<BeautyContentProps> = ({ formatRecommendations, actionRecommendations, beautyAnalysis }) => {
  // Use beautyAnalysis if available, otherwise fall back to growthReport
  const hasBeautyAnalysis = !!beautyAnalysis?.executive_diagnosis;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      {/* Executive Diagnosis Section - Only show if beautyAnalysis exists */}
      {hasBeautyAnalysis && beautyAnalysis.executive_diagnosis && (
        <div className="mb-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
              <Brain size={16} />
              <span>Executive Diagnosis</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Strategic Assessment</span>
            </h2>
          </div>

          {/* Current Status Card */}
          <div className="mb-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-black border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex-shrink-0">
                  <Target size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Current Status</div>
                  <p className="text-white text-lg leading-relaxed">
                    {beautyAnalysis.executive_diagnosis.current_status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Bottleneck & Root Cause Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Primary Bottleneck */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 relative overflow-hidden group hover:border-red-500/40 transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 blur-3xl rounded-full -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex-shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Primary Bottleneck</div>
                  <p className="text-white text-base leading-relaxed font-medium">
                    {beautyAnalysis.executive_diagnosis.primary_bottleneck}
                  </p>
                </div>
              </div>
            </div>

            {/* Root Cause */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/20 relative overflow-hidden group hover:border-orange-500/40 transition-all">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-3xl rounded-full -z-10"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex-shrink-0">
                  <Lightbulb size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Root Cause</div>
                  <p className="text-white text-base leading-relaxed font-medium">
                    {beautyAnalysis.executive_diagnosis.root_cause}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solution Comparison Section */}
      {beautyAnalysis?.solution_comparison && (
        <div className="mb-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Two Paths Forward: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400">Choose Your Journey</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Compare the traditional manual approach versus our data-driven system
            </p>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Option A: DIY Path */}
            {beautyAnalysis.solution_comparison.option_a_diy && (
              <div className="relative">
                <div className="absolute -top-4 left-6 px-4 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                  <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Option A</span>
                </div>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-red-950/30 to-black border-2 border-red-500/30 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-3xl rounded-full -z-10"></div>
                  
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                        <X size={20} />
                      </div>
                      <h4 className="text-2xl font-bold text-white">
                        {beautyAnalysis.solution_comparison.option_a_diy.approach_name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {beautyAnalysis.solution_comparison.option_a_diy.timeline && (
                        <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <span className="text-red-300 text-xs font-medium">⏱ {beautyAnalysis.solution_comparison.option_a_diy.timeline}</span>
                        </div>
                      )}
                      {beautyAnalysis.solution_comparison.option_a_diy.risk_level && (
                        <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <span className="text-red-300 text-xs font-medium">⚠️ {beautyAnalysis.solution_comparison.option_a_diy.risk_level}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Execution Steps */}
                  {beautyAnalysis.solution_comparison.option_a_diy.execution_steps && (
                    <div className="space-y-6">
                      {beautyAnalysis.solution_comparison.option_a_diy.execution_steps.map((step, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-red-500/20">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300 font-bold text-lg flex-shrink-0">
                              {idx + 1}
                            </div>
                            <h5 className="text-lg font-bold text-white flex-1">{step.step_name}</h5>
                          </div>
                          <ul className="space-y-3 ml-14">
                            {step.actions_to_do?.map((action, actionIdx) => (
                              <li key={actionIdx} className="text-slate-300 text-sm leading-relaxed flex gap-3">
                                <span className="text-red-400 mt-1.5 flex-shrink-0">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Option B: DIGICON Path */}
            {beautyAnalysis.solution_comparison.option_b_digicon && (
              <div className="relative">
                <div className="absolute -top-4 left-6 px-4 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Option B</span>
                </div>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-green-950/30 to-black border-2 border-green-500/30 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl rounded-full -z-10"></div>
                  
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                        <Check size={20} />
                      </div>
                      <h4 className="text-2xl font-bold text-white">
                        {beautyAnalysis.solution_comparison.option_b_digicon.approach_name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {beautyAnalysis.solution_comparison.option_b_digicon.timeline && (
                        <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <span className="text-green-300 text-xs font-medium">⚡ {beautyAnalysis.solution_comparison.option_b_digicon.timeline}</span>
                        </div>
                      )}
                      {beautyAnalysis.solution_comparison.option_b_digicon.risk_level && (
                        <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <span className="text-green-300 text-xs font-medium">✓ {beautyAnalysis.solution_comparison.option_b_digicon.risk_level}</span>
                        </div>
                      )}
                    </div>
                    {beautyAnalysis.solution_comparison.option_b_digicon.primary_outcome && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Primary Outcome</div>
                        <p className="text-green-200 text-sm font-medium">{beautyAnalysis.solution_comparison.option_b_digicon.primary_outcome}</p>
                      </div>
                    )}
                  </div>

                  {/* Execution Steps */}
                  {beautyAnalysis.solution_comparison.option_b_digicon.execution_steps && (
                    <div className="space-y-6">
                      {beautyAnalysis.solution_comparison.option_b_digicon.execution_steps.map((step, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-green-500/20">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-300 font-bold text-lg flex-shrink-0">
                              {idx + 1}
                            </div>
                            <h5 className="text-lg font-bold text-white flex-1">{step.step_name}</h5>
                          </div>
                          <ul className="space-y-3 ml-14">
                            {step.actions_to_do?.map((action, actionIdx) => (
                              <li key={actionIdx} className="text-slate-200 text-sm leading-relaxed flex gap-3">
                                <span className="text-green-400 mt-1.5 flex-shrink-0">✓</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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
        <div className="mb-20 max-w-4xl mx-auto px-4">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black border-2 border-indigo-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full -z-10"></div>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 flex-shrink-0">
                <Rocket size={32} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Recommended Next Action</div>
                <p className="text-white text-xl font-bold leading-relaxed mb-4">
                  {beautyAnalysis.recommended_next_action}
                </p>
                <div className="flex items-center gap-2 text-indigo-300 text-sm">
                  <CheckCircle size={16} />
                  <span>Ready to proceed when you are</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Format Recommendations Section */}
      {formatRecommendations && formatRecommendations.recommendations && formatRecommendations.recommendations.length > 0 && (
        <div className="mb-20 px-4">
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

      {/* Action Recommendations Section */}
      {actionRecommendations && actionRecommendations.recommended_actions && actionRecommendations.recommended_actions.length > 0 && (
        <div className="mb-20">
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
    </div>
  );
};
