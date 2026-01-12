'use client';

import React, { useState } from 'react';
import questionsData from '../questions.json';
import { ResultDisplay, AnalysisResult } from './ResultDisplay';

interface Answer {
  questionId: string;
  value: string;
  additionalText?: string;
}

interface BasicDetails {
  [key: string]: string;
}

interface FieldErrors {
  [key: string]: string;
}

interface QuestionOption {
  value: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  type: string;
  options: QuestionOption[];
  subtext?: string;
  inputPlaceholder?: string;
}

interface DetailedAnswer {
  questionId: string;
  questionText: string;
  answerValue: string;
  answerLabel: string;
  additionalText?: string;
}

interface ResultData {
  timestamp: string;
  basicDetails: BasicDetails;
  answers: DetailedAnswer[];
  analysis: AnalysisResult;
}

export const GetLeadInfo: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2' | 'basicDetails'>('part1');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [basicDetails, setBasicDetails] = useState<BasicDetails>({});
  const [additionalText, setAdditionalText] = useState('');
  const [showBasicDetails, setShowBasicDetails] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showResult, setShowResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Get all questions in order
  const allQuestions = [
    ...questionsData.part1.questions,
    ...questionsData.part2.questions,
  ];

  const getCurrentQuestion = (): Question | null => {
    if (showBasicDetails || currentQuestionIndex >= allQuestions.length) {
      return null;
    }
    return allQuestions[currentQuestionIndex] as Question;
  };

  const getCurrentPartInfo = () => {
    if (currentQuestionIndex < questionsData.part1.questions.length) {
      return questionsData.part1;
    } else {
      return questionsData.part2;
    }
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      ...(additionalText && { additionalText }),
    };

    // Check if answer already exists for this question (when going back and changing)
    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex >= 0) {
      // Replace existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(updatedAnswers);
    } else {
      // Add new answer
      setAnswers([...answers, newAnswer]);
    }
    
    setAdditionalText('');

    // Move to next question
    if (currentQuestionIndex < allQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Update current part based on question index
      if (nextIndex === questionsData.part1.questions.length) {
        setCurrentPart('part2');
      }
    } else {
      // Move to basic details
      setShowBasicDetails(true);
      setCurrentPart('basicDetails');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Get the current question ID before changing index (to remove its answer)
      const currentQuestionId = allQuestions[currentQuestionIndex]?.id;
      
      const prevIndex = currentQuestionIndex - 1;
      
      // Update current part based on previous question index
      if (prevIndex < questionsData.part1.questions.length) {
        setCurrentPart('part1');
      } else {
        setCurrentPart('part2');
      }
      
      // Remove the answer for the current question (before going back)
      if (currentQuestionId) {
        setAnswers(prevAnswers => prevAnswers.filter(a => a.questionId !== currentQuestionId));
      }
      
      // Set the index to previous question
      setCurrentQuestionIndex(prevIndex);
      
      // If there's a previous answer, set it as the current answer for preview
      const prevQuestion = allQuestions[prevIndex];
      if (prevQuestion) {
        const prevAnswer = answers.find(a => a.questionId === prevQuestion.id);
        if (prevAnswer) {
          setAdditionalText(prevAnswer.additionalText || '');
        } else {
          setAdditionalText('');
        }
      } else {
        setAdditionalText('');
      }
    }
  };

  const validateURL = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      // Try to create a URL object - if it fails, it's invalid
      // Add https:// if no protocol is provided
      const urlToTest = url.includes('://') ? url : `https://${url}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (fieldId: string, value: string, fieldType: string): string => {
    const field = questionsData.basicDetails.fields.find((f) => f.id === fieldId);
    if (!field) return '';

    // Check required fields
    if (field.required && !value.trim()) {
      return 'This field is required';
    }

    // Validate URL fields
    if (fieldType === 'url' && value.trim()) {
      if (!validateURL(value)) {
        return 'Please enter a valid URL (e.g., https://example.com or example.com)';
      }
    }

    // Validate email fields
    if (fieldType === 'email' && value.trim()) {
      if (!validateEmail(value)) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  };

  const handleBasicDetailsChange = (fieldId: string, value: string, fieldType: string) => {
    setBasicDetails({
      ...basicDetails,
      [fieldId]: value,
    });

    // Clear error when user starts typing
    if (fieldErrors[fieldId]) {
      const error = validateField(fieldId, value, fieldType);
      setFieldErrors({
        ...fieldErrors,
        [fieldId]: error,
      });
    }
  };

  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    questionsData.basicDetails.fields.forEach((field) => {
      const value = basicDetails[field.id] || '';
      const error = validateField(field.id, value, field.type);
      if (error) {
        errors[field.id] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const analyzeAnswers = () => {
    // Count answers by type
    const nA = answers.filter((a) => a.value === 'A').length;
    const nB = answers.filter((a) => a.value === 'B').length;
    const nC = answers.filter((a) => a.value === 'C').length;
    const nD = answers.filter((a) => a.value === 'D').length;
    const totalQuestions = 14;

    // Calculate percentages
    const icp1Percent = (nA / totalQuestions) * 100;
    const icp2Percent = (nB / totalQuestions) * 100;
    const icp3Percent = (nC / totalQuestions) * 100;
    const notIcpPercent = (nD / totalQuestions) * 100;

    // Determine dominant ICP
    const icpDistribution = {
      ICP1: icp1Percent,
      ICP2: icp2Percent,
      ICP3: icp3Percent,
      NOT_ICP: notIcpPercent,
    };
    const dominantICP = Object.entries(icpDistribution).reduce((a, b) =>
      icpDistribution[a[0] as keyof typeof icpDistribution] >
      icpDistribution[b[0] as keyof typeof icpDistribution]
        ? a
        : b
    )[0];

    // Level distribution (same as ICP distribution)
    const levelDistribution = {
      'Level 1': icp1Percent,
      'Level 2': icp2Percent,
      'Level 3': icp3Percent,
      'N/A': notIcpPercent,
    };
    const dominantLevel = Object.entries(levelDistribution).reduce((a, b) =>
      levelDistribution[a[0] as keyof typeof levelDistribution] >
      levelDistribution[b[0] as keyof typeof levelDistribution]
        ? a
        : b
    )[0];

    // Check eligibility flags
    const e1 = answers.find((a) => a.questionId === 'Q1')?.value === 'D';
    const e2 = answers.find((a) => a.questionId === 'Q2')?.value === 'D';
    const e3 = answers.find((a) => a.questionId === 'Q3')?.value === 'D';
    const e4 = answers.find((a) => a.questionId === 'Q6')?.value === 'D';
    const status = e1 || e2 || e3 || e4 ? 'NOT_READY' : 'READY';
    const flags = [];
    if (e1) flags.push('E1');
    if (e2) flags.push('E2');
    if (e3) flags.push('E3');
    if (e4) flags.push('E4');

    // Build detailed answers with labels
    const allQuestions = [
      ...questionsData.part1.questions,
      ...questionsData.part2.questions,
    ];
    const detailedAnswers = answers.map((answer) => {
      const question = allQuestions.find((q) => q.id === answer.questionId);
      const option = question?.options.find((opt) => opt.value === answer.value);
      return {
        questionId: answer.questionId,
        questionText: question?.text || '',
        answerValue: answer.value,
        answerLabel: option?.text || '',
        additionalText: answer.additionalText || undefined,
      };
    });

    return {
      analysis: {
        dominantLevel,
        levelDistribution,
        dominantICP,
        icpDistribution,
        status,
        flags: flags.length > 0 ? flags : undefined,
        breakdown: {
          nA,
          nB,
          nC,
          nD,
          totalQuestions,
        },
      },
      detailedAnswers,
    };
  };

  const saveToServer = async (data: ResultData): Promise<string | null> => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save submission');
      }

      const result = await response.json();
      return result.id || null;
    } catch (error) {
      console.error('Error saving to server:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!validateAllFields()) {
      return;
    }

    setIsSaving(true);

    // Analyze answers
    const analysisResultData = analyzeAnswers();

    // Prepare full result data
    const timestamp = new Date().toISOString();
    
    // Add level descriptions to analysis
    const levelDescriptions: { [key: string]: string } = {
      'Level 1': 'L1: attention wins (distribution + quality + trust proxies)',
      'Level 2': 'L2: intent wins (instrumented click quality / ATC / leads)',
      'Level 3': 'L3: purchase wins (unit economics movement under agreed measurement design)',
      'N/A': 'Not qualified',
    };

    const levelDesc = levelDescriptions[analysisResultData.analysis.dominantLevel] || analysisResultData.analysis.dominantLevel;

    // Enhance analysis with level description
    const enhancedAnalysis = {
      ...analysisResultData.analysis,
      levelDescription: levelDesc,
    };

    const resultData: ResultData = {
      timestamp,
      basicDetails,
      answers: analysisResultData.detailedAnswers,
      analysis: enhancedAnalysis,
    };

    // Save to server and get unique ID
    const id = await saveToServer(resultData);
    
    setIsSaving(false);

    if (id) {
      setSubmissionId(id);
    }

    // Set the result and show the result display
    setAnalysisResult(enhancedAnalysis);
    setShowResult(true);
    setShowBasicDetails(false);

    console.log('Full Result:', resultData);
    console.log('Submission ID:', id);
  };

  const getProgress = () => {
    if (showBasicDetails) {
      return 100;
    }
    const totalQuestions = allQuestions.length;
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  };

  const currentQuestion = getCurrentQuestion();
  const partInfo = getCurrentPartInfo();
  const progress = getProgress();
  const isPart1 = currentQuestionIndex < questionsData.part1.questions.length;
  
  // Get current answer for the current question (if exists, for preview)
  const currentAnswer = currentQuestion ? answers.find(a => a.questionId === currentQuestion.id) : null;

  if (showResult && analysisResult) {
    return (
      <ResultDisplay
        analysis={analysisResult}
        submissionId={submissionId || undefined}
        onClose={() => {
          setShowResult(false);
          // Optionally reset the form or navigate away
        }}
      />
    );
  }

  if (showBasicDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {questionsData.basicDetails.title}
          </h2>
          <p className="text-slate-400 mb-8">{questionsData.basicDetails.description}</p>

          <div className="space-y-6">
            {questionsData.basicDetails.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-white font-medium mb-2">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={basicDetails[field.id] || ''}
                    onChange={(e) => handleBasicDetailsChange(field.id, e.target.value, field.type)}
                    onBlur={(e) => {
                      const error = validateField(field.id, e.target.value, field.type);
                      setFieldErrors({
                        ...fieldErrors,
                        [field.id]: error,
                      });
                    }}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      fieldErrors[field.id]
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    rows={4}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type === 'url' ? 'text' : field.type}
                    value={basicDetails[field.id] || ''}
                    onChange={(e) => handleBasicDetailsChange(field.id, e.target.value, field.type)}
                    onBlur={(e) => {
                      const error = validateField(field.id, e.target.value, field.type);
                      setFieldErrors({
                        ...fieldErrors,
                        [field.id]: error,
                      });
                    }}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      fieldErrors[field.id]
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    placeholder={
                      field.type === 'url'
                        ? 'e.g., https://example.com or example.com'
                        : field.type === 'email'
                        ? 'e.g., name@company.com'
                        : `Enter ${field.label.toLowerCase()}`
                    }
                    required={field.required}
                  />
                )}
                {fieldErrors[field.id] && (
                  <p className="mt-1 text-sm text-red-400">{fieldErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                setShowBasicDetails(false);
                setCurrentQuestionIndex(allQuestions.length - 1);
                setCurrentPart('part2');
              }}
              className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !partInfo) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>
            {isPart1 ? 'Part 1: Quick Fit' : 'Part 2: Self-Diagnosis'}
          </span>
          <span>
            Question {currentQuestionIndex + 1} of {allQuestions.length}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Part description */}
      {currentQuestionIndex === 0 && isPart1 && partInfo && (
        <div className="mb-6 text-center">
          <p className="text-slate-400">{partInfo.description}</p>
          {questionsData.part1.instructions && (
            <p className="text-slate-500 text-sm mt-2">{questionsData.part1.instructions}</p>
          )}
        </div>
      )}

      {currentQuestionIndex === questionsData.part1.questions.length && !isPart1 && partInfo && (
        <div className="mb-6 text-center">
          <p className="text-slate-400">{partInfo.description}</p>
        </div>
      )}

      {/* Question card */}
      <div className="glass-card rounded-2xl p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {currentQuestion.text}
        </h2>
        {currentQuestion.subtext && (
          <p className="text-slate-400 mb-6">{currentQuestion.subtext}</p>
        )}

        {/* Options */}
        <div className="space-y-4 mb-6">
          {currentQuestion.options.map((option) => {
            const isSelected = currentAnswer?.value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-6 bg-black/30 border-2 rounded-xl transition-all duration-200 group ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-white/10 hover:border-indigo-500 hover:bg-black/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-indigo-200'
                      : 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400 group-hover:bg-indigo-600/40 group-hover:border-indigo-400'
                  }`}>
                    {option.value}
                  </div>
                  <p className="text-white flex-1">{option.text}</p>
                  {isSelected && (
                    <div className="flex-shrink-0 text-indigo-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Additional input for questions with text input */}
        {currentQuestion.type === 'multiple-choice-with-input' && (
          <div className="mt-6">
            <input
              type="text"
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              placeholder={currentQuestion.inputPlaceholder || 'Additional information (optional)'}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Back button */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            Back
          </button>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="text-center text-slate-500 text-sm">
        {currentAnswer ? 'You can change your answer by selecting a different option' : 'Select an option to continue'}
      </div>
    </div>
  );
};

