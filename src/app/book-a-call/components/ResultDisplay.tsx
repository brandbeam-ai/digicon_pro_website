'use client';

import React, { useState, useEffect } from 'react';
import { NotICPContent } from './NotICPContent';
import { BeautyContent } from './BeautyContent';
import { OtherContent } from './OtherContent';

export interface AnalysisResult {
  dominantLevel: string;
  levelDistribution: {
    'Level 1': number;
    'Level 2': number;
    'Level 3': number;
    'N/A': number;
  };
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

interface ResultDisplayProps {
  analysis?: AnalysisResult;
  submissionId?: string;
  onClose?: () => void;
  productCategory?: string;
  formatRecommendations?: FormatRecommendations | null;
  actionRecommendations?: ActionRecommendations | null;
  growthReport?: GrowthReport | null;
  beautyAnalysis?: BeautyAnalysis | null;
  solutionFor?: 'f&b' | 'beauty';
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  analysis: analysisProp, 
  submissionId, 
  onClose, 
  productCategory: productCategoryProp, 
  formatRecommendations: formatRecommendationsProp, 
  actionRecommendations: actionRecommendationsProp,
  growthReport: growthReportProp,
  beautyAnalysis: beautyAnalysisProp,
  solutionFor: solutionForProp
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(analysisProp || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState<string | null>(productCategoryProp || null);
  const [formatRecommendations, setFormatRecommendations] = useState<FormatRecommendations | null>(formatRecommendationsProp || null);
  const [actionRecommendations, setActionRecommendations] = useState<ActionRecommendations | null>(actionRecommendationsProp || null);
  const [growthReport, setGrowthReport] = useState<GrowthReport | null>(growthReportProp || null);
  const [beautyAnalysis, setBeautyAnalysis] = useState<BeautyAnalysis | null>(beautyAnalysisProp || null);
  const [solutionFor, setSolutionFor] = useState<'f&b' | 'beauty' | undefined>(solutionForProp);
  
  // Initialize from props if available and submissionId is not provided
  useEffect(() => {
    if (!submissionId) {
      // If no submissionId, use props directly
      if (beautyAnalysisProp) {
        setBeautyAnalysis(beautyAnalysisProp);
      }
      if (solutionForProp) {
        setSolutionFor(solutionForProp);
      }
      if (productCategoryProp) {
        setProductCategory(productCategoryProp);
      }
    }
  }, [submissionId, beautyAnalysisProp, solutionForProp, productCategoryProp]);

  useEffect(() => {
    // Always load submission data if submissionId is provided
    // This ensures we get beautyAnalysis, productCategory, solutionFor, etc.
    if (submissionId) {
      loadSubmission(submissionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const loadSubmission = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/submissions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load submission');
      }
      const result = await response.json();
      if (result.success && result.data) {
        // Set analysis if available (use prop if not in data, or use data)
        if (result.data.analysis) {
          setAnalysis(result.data.analysis);
        } else if (analysisProp) {
          setAnalysis(analysisProp);
        }
        
        // Check if this is an ICP lead who SHOULD have a growth report
        const isICP = result.data.analysis?.dominantICP !== 'NOT_ICP' && result.data.analysis?.status === 'READY';
        
        // Set productCategory if available
        if (result.data.basicDetails && result.data.basicDetails.productCategory) {
          setProductCategory(result.data.basicDetails.productCategory);
        } else if (productCategoryProp) {
          setProductCategory(productCategoryProp);
        }
        
        // Set formatRecommendations if available
        if (result.data.formatRecommendations) {
          setFormatRecommendations(result.data.formatRecommendations);
        } else if (formatRecommendationsProp) {
          setFormatRecommendations(formatRecommendationsProp);
        }
        
        // Set actionRecommendations if available
        if (result.data.actionRecommendations) {
          setActionRecommendations(result.data.actionRecommendations);
        } else if (actionRecommendationsProp) {
          setActionRecommendations(actionRecommendationsProp);
        }

        // Handle Growth Report (for F&B)
        if (result.data.growthReport) {
          setGrowthReport(result.data.growthReport);
        } else {
          const category = result.data.basicDetails?.productCategory;
          const isPackagedFB = category !== 'Beauty' && category !== 'Other';
          const submissionSolutionFor = result.data.solutionFor || 'f&b';
          
          if ((isICP || isPackagedFB) && submissionSolutionFor === 'f&b') {
            // ICP lead or Packaged F&B but missing report - trigger analysis now
            console.log('Lead missing growth report, triggering analysis...');
            const analysisResponse = await fetch('/api/analyze-growth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ submissionId: id })
            });
            
            if (analysisResponse.ok) {
              const analysisResult = await analysisResponse.json();
              if (analysisResult.success && analysisResult.data) {
                setGrowthReport(analysisResult.data);
              } else {
                throw new Error('Failed to generate growth report');
              }
            } else {
              throw new Error('Failed to generate growth report');
            }
          }
        }

        // Handle Beauty Analysis (for Beauty submissions)
        const category = result.data.basicDetails?.productCategory;
        const submissionSolutionFor = result.data.solutionFor;
        
        // Set solutionFor if available
        if (submissionSolutionFor === 'beauty' || submissionSolutionFor === 'f&b') {
          setSolutionFor(submissionSolutionFor);
        } else if (solutionForProp) {
          setSolutionFor(solutionForProp);
        }
        
        // Load beautyAnalysis - prioritize submission data, then props, then generate
        if (result.data.beautyAnalysis) {
          console.log('Loading beautyAnalysis from submission data', result.data.beautyAnalysis);
          setBeautyAnalysis(result.data.beautyAnalysis);
        } else if (beautyAnalysisProp) {
          console.log('Using beautyAnalysis from props', beautyAnalysisProp);
          setBeautyAnalysis(beautyAnalysisProp);
        } else if (submissionSolutionFor === 'beauty' || category === 'Beauty') {
          // Beauty submission but missing analysis - trigger analysis now
          console.log('Beauty submission missing analysis, triggering analysis...', { submissionSolutionFor, category, id });
          try {
            const beautyResponse = await fetch('/api/analyze-beauty', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ submissionId: id })
            });
            
            if (beautyResponse.ok) {
              const beautyResult = await beautyResponse.json();
              if (beautyResult.success && beautyResult.data) {
                console.log('Beauty analysis generated successfully', beautyResult.data);
                setBeautyAnalysis(beautyResult.data);
              } else {
                console.error('Failed to generate beauty analysis - no data:', beautyResult);
              }
            } else {
              const errorText = await beautyResponse.text();
              console.error('Failed to generate beauty analysis - HTTP error:', beautyResponse.status, errorText);
            }
          } catch (error) {
            console.error('Error calling analyze-beauty API:', error);
          }
        } else {
          console.log('Not a beauty submission, skipping beauty analysis', { submissionSolutionFor, category });
        }
      } else {
        throw new Error('Invalid submission data');
      }
    } catch (err) {
      console.error('Error loading submission:', err);
      setError(err instanceof Error ? err.message : 'Failed to load submission');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-white text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  // Check if we should show NOT_ICP content below the level/ladder
  // For Beauty submissions, don't check NOT_ICP status (they use beautyAnalysis instead)
  const isBeautySubmission = productCategory === 'Beauty' || solutionFor === 'beauty';
  const showNotICPContent = !isBeautySubmission && (analysis.dominantICP === 'NOT_ICP' || analysis.dominantLevel === 'N/A' || analysis.status === 'NOT_READY');
  
  const getLevelStyles = (level: string) => {
    const styles: { [key: string]: string } = {
      'Level 1': 'bg-teal-500/20 border-teal-500 text-teal-300',
      'Level 2': 'bg-blue-500/20 border-blue-500 text-blue-300',
      'Level 3': 'bg-purple-500/20 border-purple-500 text-purple-300',
      'N/A': 'bg-gray-500/20 border-gray-500 text-gray-300',
    };
    return styles[level] || styles['N/A'];
  };

  const getLevelDescription = (level: string): string => {
    const descriptions: { [key: string]: string } = {
      'Level 1': 'You are shouting into the void. You need to know if anyone cares about your product, and you need to find out fast. Your goal is to stop the scroll—you want proof that strangers are paying attention.',
      'Level 2': 'You have some traffic, but it\'s chaotic. You\'re concerned about brand risk, but you need to scale. You need to stop relying on luck and start relying on a process. Your goal is qualified interest—you want clicks from the right people.',
      'Level 3': 'You have a proven offer that works, but it needs more fuel. You need to increase volume without destroying your Customer Acquisition Cost. Your goal is profitability at scale—you judge success on verified purchase data.',
      'N/A': 'Based on your answers, this solution may not be the right fit at this time.',
    };
    return descriptions[level] || '';
  };

  const getLevelGoal = (level: string): string => {
    const goals: { [key: string]: string } = {
      'Level 1': 'Get people to stop scrolling and watch.',
      'Level 2': 'Get people to click a link or ask a question.',
      'Level 3': 'Profitable sales that happen automatically.',
      'N/A': '',
    };
    return goals[level] || '';
  };

  const getLevelSuccess = (level: string): string => {
    const successes: { [key: string]: string } = {
      'Level 1': 'You know exactly what visual trick makes people pause.',
      'Level 2': 'You know exactly what promise makes people want to buy.',
      'Level 3': 'You put $1 in and get $3 out reliably.',
      'N/A': '',
    };
    return successes[level] || '';
  };

  const getLadderTerm = (level: string): string => {
    const terms: { [key: string]: string } = {
      'Level 1': 'The "Look at Me" Step (Attention)',
      'Level 2': 'The "I Want That" Step (Intent)',
      'Level 3': 'The "Shut Up and Take My Money" Step (Purchase)',
      'N/A': 'Content Filler',
    };
    return terms[level] || level;
  };

  const getLadderStyles = (level: string, isActive: boolean) => {
    if (!isActive) return {
      circle: 'border-white/10 text-slate-600 bg-black',
      card: 'bg-white/5 border-white/5',
      text: 'text-slate-500',
      desc: 'text-slate-600',
      badge: ''
    };

    switch (level) {
      case 'Level 1':
        return {
          circle: 'border-teal-500 text-teal-400 bg-black shadow-[0_0_20px_-5px_rgba(20,184,166,0.4)]',
          card: 'bg-teal-500/10 border-teal-500/50 shadow-lg shadow-teal-900/20',
          text: 'text-teal-400',
          desc: 'text-slate-200',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        };
      case 'Level 2':
        return {
          circle: 'border-blue-500 text-blue-400 bg-black shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]',
          card: 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-900/20',
          text: 'text-blue-400',
          desc: 'text-slate-200',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        };
      case 'Level 3':
        return {
          circle: 'border-purple-500 text-purple-400 bg-black shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]',
          card: 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-900/20',
          text: 'text-purple-400',
          desc: 'text-slate-200',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        };
      default:
        return {
          circle: 'border-gray-500 text-gray-400',
          card: 'border-gray-500/50',
          text: 'text-gray-400',
          desc: 'text-slate-200',
          badge: 'bg-gray-500/20 text-gray-300'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-card rounded-2xl p-8 mb-6">
        {/* Only show level/ladder section for non-Beauty submissions */}
        {!isBeautySubmission && (
          <>
            <div className="text-center mb-8">
              
              <div className="max-w-3xl mx-auto mb-12">
                <div
                  className={`rounded-2xl border-2 overflow-hidden ${getLevelStyles(analysis.dominantLevel)}`}
                >
                  <div className="p-6 md:p-8 bg-opacity-20 backdrop-blur-sm">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {growthReport?.problem_section?.title || analysis.dominantLevel}
                    </h2>
                    <div className="h-1 w-20 bg-white/30 rounded-full mb-4"></div>
                    <div className="text-slate-200 text-lg leading-relaxed">
                      {growthReport?.problem_section?.urgency_statement || getLevelDescription(analysis.dominantLevel)}
                    </div>
                  </div>
                  
                  {/* Integrated Capability Ladder */}
                  <div className="bg-black/40 p-6 md:p-8 border-t border-white/10">
                <div className="text-left mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Where You Are: The Growth Ladder
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {growthReport?.growth_ladder_section.intro || "To fix this, we need to look at the Growth Ladder. This ladder shows the steps every brand must climb to succeed. You cannot jump to the top without climbing the bottom steps first."}
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[2rem] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-teal-500/20" />

                  {growthReport ? (
                    // Use ladder from AI report
                    [...growthReport.growth_ladder_section.steps].reverse().map((step, idx) => {
                      const levelNum = 3 - idx;
                      const levelKey = `Level ${levelNum}`;
                      const isCurrentLevel = step.is_current_level;
                      const styles = getLadderStyles(levelKey, isCurrentLevel);
                      
                      return (
                        <div key={idx} className={`relative flex items-center gap-6 mb-6 last:mb-0 group ${isCurrentLevel ? '' : 'opacity-60 hover:opacity-100 transition-opacity duration-300'}`}>
                          {/* Circle */}
                          <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold bg-black transition-all duration-300 ${styles.circle}`}>
                            {levelNum}
                          </div>

                          {/* Card */}
                          <div className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${styles.card}`}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex flex-col">
                                <h4 className={`text-lg font-bold ${styles.text}`}>
                                  {step.step_name} {isCurrentLevel && ' — You are here'}
                                </h4>
                              </div>
                              {isCurrentLevel && (
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border text-center ${styles.badge}`}>
                                  You are here
                                </span>
                              )}
                            </div>
                            <p className={`text-sm leading-relaxed text-left ${styles.desc} mt-2`}>
                              <strong>Goal:</strong> {step.goal}<br />
                              <strong>Success:</strong> {step.success}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Use local hardcoded ladder (fallback)
                    (['Level 3', 'Level 2', 'Level 1'] as const).map((level) => {
                      const isCurrentLevel = analysis.dominantLevel === level;
                      const styles = getLadderStyles(level, isCurrentLevel);
                      const term = getLadderTerm(level);
                      const stepNum = level.replace('Level ', '');
                      
                      return (
                        <div key={level} className={`relative flex items-center gap-6 mb-6 last:mb-0 group ${isCurrentLevel ? '' : 'opacity-60 hover:opacity-100 transition-opacity duration-300'}`}>
                          {/* Circle */}
                          <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold bg-black transition-all duration-300 ${styles.circle}`}>
                            {stepNum}
                          </div>

                          {/* Card */}
                          <div className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${styles.card}`}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex flex-col">
                                <h4 className={`text-lg font-bold ${styles.text}`}>
                                  Step {stepNum}: {term} {isCurrentLevel && ' — You are here'}
                                </h4>
                              </div>
                              {isCurrentLevel && (
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border text-center ${styles.badge}`}>
                                  You are here
                                </span>
                              )}
                            </div>
                            <p className={`text-sm leading-relaxed text-left ${styles.desc} mt-2`}>
                              <strong>Goal:</strong> {getLevelGoal(level)}<br />
                              <strong>Success:</strong> {getLevelSuccess(level)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                {growthReport && (
                  <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="text-white text-sm leading-relaxed">
                      <strong>Current Status:</strong> {growthReport.growth_ladder_section.current_status_explanation}
                    </p>
                  </div>
                )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Show NOT_ICP content if applicable */}
        {showNotICPContent && (
          <div className="mt-8 pt-8 border-t border-white/10">
            {/* 1. Note about readiness */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12 text-center">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">
                Our Services Are Not Currently a Fit
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Based on your current stage and needs, our AI Agent systems and services are not fully optimized to support your specific use case at this moment. However, we believe in providing value regardless.
              </p>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Your Referenced Action Plan for AI Era Marketing
              </h3>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Here is a framework to adapt AI in marketing at any maturity level, designed to help you build the systems needed for success.
              </p>
            </div>
            {/* 2. Why Adaptation Matters Now - Data-Driven Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Adaptation Matters Now: The Data Behind the Shift</h3>
              
              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-black/40 rounded-xl p-6 border border-indigo-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-2">72x</div>
                  <div className="text-sm text-slate-400 mb-1">Growth in 2 years</div>
                  <div className="text-xs text-slate-500">TikTok Shop: $15.1M → $1.1B monthly GMV</div>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">32%</div>
                  <div className="text-sm text-slate-400 mb-1">Sales via Search/Shop Tab</div>
                  <div className="text-xs text-slate-500">Users arrive with purchase intent</div>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">58%</div>
                  <div className="text-sm text-slate-400 mb-1">Use platform for product info</div>
                  <div className="text-xs text-slate-500">Research before purchase</div>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">25%</div>
                  <div className="text-sm text-slate-400 mb-1">Beauty category conversion</div>
                  <div className="text-xs text-slate-500">1 in 4 viewers become buyers</div>
                </div>
              </div>

              {/* The Critical Shift: Views vs Intent */}
              <div className="bg-black/30 rounded-2xl p-8 mb-8 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6 text-center">The Critical Shift: From Views to Customer Intent</h4>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Old Model: Views */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h5 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">✕</span>
                      <span>The Old Model (2022): Chasing Views</span>
                    </h5>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span><strong className="text-white">Metric Focus:</strong> Views, impressions, viral hits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span><strong className="text-white">Strategy:</strong> &quot;Going viral&quot; with entertainment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span><strong className="text-white">Problem:</strong> High views, low conversion (wasted spend)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span><strong className="text-white">Result:</strong> Unclear ROI, guessing what works</span>
                      </li>
                    </ul>
                  </div>

                  {/* New Model: Intent */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h5 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">✓</span>
                      <span>The New Reality (2026): Understanding Intent</span>
                    </h5>
                    <ul className="space-y-3 text-slate-200">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span><strong className="text-white">Metric Focus:</strong> Search behavior, qualified clicks, purchase data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span><strong className="text-white">Strategy:</strong> Search-optimized, intent-driven content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span><strong className="text-white">Advantage:</strong> 32% arrive with purchase intent (Shop Tab/search)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span><strong className="text-white">Result:</strong> Clear ROI, data-driven decisions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Visual Comparison Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-400">2022: View-Driven Marketing</span>
                    <span className="text-sm font-semibold text-slate-400">2026: Intent-Driven Marketing</span>
                  </div>
                  <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
                    <div className="flex-1 bg-gradient-to-r from-red-500/30 to-red-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">High Views, Low Intent</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-green-500/30 to-green-500/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">High Intent, High Conversion</span>
                    </div>
                  </div>
                </div>

                {/* Key Insight */}
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                  <p className="text-slate-200 leading-relaxed text-center">
                    <strong className="text-indigo-400">The Urgency:</strong> 44.7% of users actively search for products—the behavior that used to happen on Google/Amazon now happens on social platforms. If you&apos;re still measuring success by views, you&apos;re missing the 58% who use platforms to research and the 32% who arrive ready to buy.
                  </p>
                </div>
              </div>

              {/* Why AI Adaptation is Critical */}
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-xl p-6 border border-indigo-500/20">
                <h4 className="text-lg font-bold text-white mb-4">Why AI Adaptation Is No Longer Optional</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-indigo-400 mb-2">Speed Matters</div>
                    <div className="text-slate-300">72x growth in 2 years means competitors are moving fast. AI tools enable rapid content creation and optimization cycles.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-400 mb-2">Intent Requires Intelligence</div>
                    <div className="text-slate-300">Understanding customer intent needs data analysis. AI processes signals faster than humans can manually track.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-400 mb-2">Scale Requires Systems</div>
                    <div className="text-slate-300">25% conversion rates only matter if you can reach enough qualified buyers. AI helps scale what works while filtering out what doesn&apos;t.</div>
                  </div>
                </div>
              </div>
            </div>

            
            <NotICPContent />
          </div>
        )}

        {/* Story Intro Header */}
        {!showNotICPContent && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Your Customized Growth Roadmap
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Based on your current status, here is the exact plan to move from guessing to growing.
            </p>
          </div>
        )}

        {/* Show Beauty content if applicable */}
        {/* Always show BeautyContent for Beauty product category */}
        {(() => {
          const shouldShowBeauty = productCategory === 'Beauty' || solutionFor === 'beauty';
          if (shouldShowBeauty) {
            console.log('Rendering BeautyContent', { 
              productCategory, 
              solutionFor, 
              hasBeautyAnalysis: !!beautyAnalysis,
              beautyAnalysisKeys: beautyAnalysis ? Object.keys(beautyAnalysis) : []
            });
          }
          return shouldShowBeauty;
        })() && (
          <BeautyContent 
            formatRecommendations={formatRecommendations} 
            actionRecommendations={actionRecommendations}
            growthReport={growthReport}
            beautyAnalysis={beautyAnalysis}
          />
        )}

        {/* Show Other content if applicable (non-Beauty) */}
        {!showNotICPContent && productCategory !== 'Beauty' && (
          <OtherContent 
            formatRecommendations={formatRecommendations} 
            actionRecommendations={actionRecommendations}
            growthReport={growthReport}
          />
        )}

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

