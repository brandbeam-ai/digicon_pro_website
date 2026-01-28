'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  FileText, 
  User, 
  Building2, 
  Globe, 
  Mail, 
  Tag, 
  Brain, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- Interfaces ---
interface SubmissionAnswer {
  questionId: string;
  questionText: string;
  answerLabel: string;
  additionalText?: string;
}

interface SubmissionData {
  basicDetails?: {
    company?: string;
    website?: string;
    contactName?: string;
    contactRole?: string;
    email?: string;
    productCategory?: string;
    [key: string]: string | undefined;
  };
  answers?: SubmissionAnswer[];
  beautyAnalysis?: {
    executive_diagnosis?: {
      current_status?: string;
    };
    solution_comparison?: {
      option_b_digicon?: {
        recommended_package?: string;
        best_fit_sku?: string;
      };
    };
  };
  growthReport?: {
    diagnostic_summary?: {
      your_core_challenge?: string;
    };
    digicon_solution_section?: {
      sku_info?: {
        internal_code?: string;
      };
    };
  };
  createdAt: string;
  solutionFor?: string;
  analysis?: {
    dominantLevel?: string;
  };
}

// --- UI Components ---
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode }> = ({ children, className = '', title, icon }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        {icon && <div className="text-indigo-600">{icon}</div>}
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string | React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-2 text-slate-500 w-full sm:w-48 shrink-0 text-sm">
      {icon && <div className="text-slate-400">{icon}</div>}
      {label}
    </div>
    <div className="text-slate-800 font-medium break-words overflow-hidden">{value || 'N/A'}</div>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 mt-12 first:mt-0">
    {icon && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</div>}
    {children}
  </h2>
);

function LeadAnswerContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('submission_id') || searchParams.get('submission');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SubmissionData | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState(true);

  useEffect(() => {
    if (!submissionId) {
      setLoading(false);
      setError('No submission ID provided');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/submissions/${submissionId}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to load submission');
        }
      } catch {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading submission details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Submission Not Found</h1>
          <p className="text-slate-500 mb-6">{error || 'The requested submission could not be retrieved.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { basicDetails, answers, beautyAnalysis, growthReport, createdAt, solutionFor } = data;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <FileText size={18} />
            </div>
            <h1 className="font-bold text-slate-900 hidden sm:block">Lead Qualification Details</h1>
          </div>
          <div className="text-xs font-mono bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">
            ID: {submissionId}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Status & Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Basic Details */}
            <SectionTitle icon={<Building2 size={20} />}>Basic Information</SectionTitle>
            <Card>
              <div className="grid grid-cols-1 gap-1">
                <DetailRow label="Company / Brand" value={basicDetails?.company} icon={<Building2 size={16} />} />
                <DetailRow 
                  label="Website" 
                  value={basicDetails?.website ? (
                    <a href={basicDetails.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                      {basicDetails.website} <Globe size={14} />
                    </a>
                  ) : 'N/A'} 
                  icon={<Globe size={16} />} 
                />
                <DetailRow label="Contact Name" value={basicDetails?.contactName} icon={<User size={16} />} />
                <DetailRow label="Contact Role" value={basicDetails?.contactRole} icon={<FileText size={16} />} />
                <DetailRow label="Business Email" value={basicDetails?.email} icon={<Mail size={16} />} />
                <DetailRow label="Product Category" value={basicDetails?.productCategory} icon={<Tag size={16} />} />
                <DetailRow label="Submission Date" value={new Date(createdAt).toLocaleString()} icon={<Clock size={16} />} />
                <DetailRow label="Solution For" value={solutionFor?.toUpperCase() || 'F&B'} icon={<CheckCircle2 size={16} />} />
              </div>
            </Card>

            {/* 2. Questions & Answers */}
            <SectionTitle icon={<FileText size={20} />}>Questionnaire Answers</SectionTitle>
            <div className="space-y-4">
              {answers?.map((item: SubmissionAnswer, idx: number) => (
                <Card key={idx} className="p-0 border-l-4 border-l-indigo-500">
                  <div className="p-5">
                    <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Question {item.questionId}</div>
                    <p className="text-slate-800 font-bold mb-4 text-lg" dangerouslySetInnerHTML={{ __html: item.questionText }}></p>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Selected Answer
                      </div>
                      <p className="text-slate-900 font-medium">{item.answerLabel}</p>
                      {item.additionalText && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Additional Context</div>
                          <p className="text-slate-700 italic">{item.additionalText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Analysis Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SectionTitle icon={<Brain size={20} />}>AI Diagnosis</SectionTitle>
              
              {(beautyAnalysis || growthReport) ? (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <Card className="bg-indigo-600 text-white border-0 shadow-lg shadow-indigo-200/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Brain size={24} />
                      </div>
                      <div className="px-2 py-1 bg-white/20 rounded-md text-[10px] font-bold tracking-widest uppercase">
                        AI Generated
                      </div>
                    </div>
                    
                    {beautyAnalysis ? (
                      <>
                        <h4 className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Current Diagnosis</h4>
                        <p className="text-xl font-bold mb-4">{beautyAnalysis.executive_diagnosis?.current_status}</p>
                        <div className="pt-4 border-t border-white/10 space-y-3">
                          <div>
                            <div className="text-xs text-indigo-200 font-bold mb-1">RECOMMENDED PACKAGE</div>
                            <div className="font-bold text-lg">{beautyAnalysis.solution_comparison?.option_b_digicon?.recommended_package}</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Dominant Level</h4>
                        <p className="text-3xl font-bold mb-4">Step {data.analysis?.dominantLevel}</p>
                        <div className="pt-4 border-t border-white/10 space-y-3">
                          <div>
                            <div className="text-xs text-indigo-200 font-bold mb-1">CORE CHALLENGE</div>
                            <div className="font-medium text-sm leading-relaxed">{growthReport?.diagnostic_summary?.your_core_challenge}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>

                  {/* Quick Links / Metadata */}
                  <Card title="Submission Metadata">
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-slate-400 font-bold text-xs uppercase mb-1">Internal SKU</div>
                        <div className="text-slate-800 font-mono font-medium">
                          {beautyAnalysis?.solution_comparison?.option_b_digicon?.best_fit_sku || growthReport?.digicon_solution_section?.sku_info?.internal_code || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-bold text-xs uppercase mb-1">Airtable Status</div>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                          <CheckCircle2 size={14} /> Synced
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={24} />
                  </div>
                  <p className="text-slate-500 font-medium">Analysis result is still being generated or is unavailable.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full JSON Debug View (Optional, but useful for leads) */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <button 
            onClick={() => setExpandedAnalysis(!expandedAnalysis)}
            className="flex items-center justify-between w-full p-4 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Brain size={20} className="text-slate-500" />
              <span className="font-bold text-slate-700">Full Analysis Report</span>
            </div>
            {expandedAnalysis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedAnalysis && (
            <div className="mt-4 bg-slate-900 rounded-2xl p-6 overflow-auto max-h-[600px] text-xs font-mono text-indigo-300">
              <pre>{JSON.stringify(beautyAnalysis || growthReport || { message: "No report found" }, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadAnswerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadAnswerContent />
    </Suspense>
  );
}

