'use client';
import React from 'react';
import { Check, X, ShieldAlert, Brain, Zap, Scale, Target, Copy, ArrowRight } from 'lucide-react';
import { SectionTag, Heading, Paragraph, Card } from './UI';

import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

export const FitFilter: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <SectionTag>{getTranslation(translations, 'fit.tag', 'Fit Filter')}</SectionTag>
        <Heading>{getTranslation(translations, 'fit.title', "Who This Is For (and Who It's Not)")}</Heading>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="border-t-4 border-t-indigo-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-full text-indigo-500">
              <Check size={24} />
            </div>
            <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.for.title', 'For Leaders Who Want:')}</h3>
          </div>
          <ul className="space-y-4">
            {[
              getTranslation(translations, 'fit.for.item1', "Brands investing consistently in paid + creators who want repeatable wins"),
              getTranslation(translations, 'fit.for.item2', "Teams that care about speed, but refuse to sacrifice trust"),
              getTranslation(translations, 'fit.for.item3', "Leaders who want learning that compounds")
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <Check size={18} className="text-indigo-500 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-t-4 border-t-rose-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-500/10 rounded-full text-rose-500">
              <X size={24} />
            </div>
            <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.not.title', 'Not For:')}</h3>
          </div>
          <ul className="space-y-4">
            {[
              getTranslation(translations, 'fit.not.item1', '"Content calendars" with no testing discipline'),
              getTranslation(translations, 'fit.not.item2', 'Anyone looking for "AI volume" without measurement rules'),
              getTranslation(translations, 'fit.not.item3', 'Trust‑sensitive categories that want deceptive synthetic endorsements')
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <X size={18} className="text-rose-500 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export const ProblemSection: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="pb-24 bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-400 rounded-full mb-6">
           <ShieldAlert size={20} className="mr-2" /> {getTranslation(translations, 'problem.tag', 'The Problem')}
        </div>
        <Heading className="text-white mb-8">
          {getTranslation(translations, 'problem.title', 'The "Creativity Gap" Is Quietly Taxing Every Campaign You Run.')}
        </Heading>
        <Paragraph className="mb-8">
          {getTranslation(translations, 'problem.description', 'Visibility used to come from people. Now it comes from the feed. When brands outsource creative direction without capturing learnings, they keep paying for the same lessons again and again.')}
        </Paragraph>
        
        <div className="grid md:grid-cols-3 gap-6 text-left mt-12">
          {[
            { title: getTranslation(translations, 'problem.item1.title', "Too Many Messages"), desc: getTranslation(translations, 'problem.item1.desc', "Diluted core value proposition.") },
            { title: getTranslation(translations, 'problem.item2.title', "Too Little Truth"), desc: getTranslation(translations, 'problem.item2.desc', "Content that feels like 'ads' gets skipped.") },
            { title: getTranslation(translations, 'problem.item3.title', "High Variance"), desc: getTranslation(translations, 'problem.item3.desc', "No system to turn outcomes into decisions.") }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="text-red-400 font-bold mb-2 text-lg">{item.title}</div>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-white font-medium text-lg border-l-4 border-indigo-500 pl-4 inline-block text-left">
          {getTranslation(translations, 'problem.footer', "We're not anti‑creator. We're anti‑improv. We separate what must scale from what must be earned.")}
        </p>
      </div>
    </section>
  );
};

export const SolutionProtocol: React.FC = () => {
  const { translations } = useLanguage();
  const phases = [
    {
      id: getTranslation(translations, 'solution.phase1.id', "Phase 1"),
      icon: Brain,
      title: getTranslation(translations, 'solution.phase1.title', "Customer Decision Intelligence Map"),
      goal: getTranslation(translations, 'solution.phase1.goal', "Know what makes your customer act before you scale."),
      items: [
        getTranslation(translations, 'solution.phase1.output1', "Market Message Map"),
        getTranslation(translations, 'solution.phase1.output2', "Objection Library"),
        getTranslation(translations, 'solution.phase1.output3', "First Hypothesis Set")
      ],
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      id: getTranslation(translations, 'solution.phase2.id', "Phase 2"),
      icon: Zap,
      title: getTranslation(translations, 'solution.phase2.title', "AI‑Accelerated Throughput Engine"),
      goal: getTranslation(translations, 'solution.phase2.goal', "Produce enough high-quality variants to learn fast."),
      items: [
        getTranslation(translations, 'solution.phase2.output1', "Monthly Creative Cadence"),
        getTranslation(translations, 'solution.phase2.output2', "Whitelisting Setups"),
        getTranslation(translations, 'solution.phase2.output3', "Brand-Safe QA")
      ],
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      id: getTranslation(translations, 'solution.phase3.id', "Phase 3"),
      icon: Scale,
      title: getTranslation(translations, 'solution.phase3.title', "Scale Decision Layer"),
      goal: getTranslation(translations, 'solution.phase3.goal', "Protect your budget and scale only what earns it."),
      items: [
        getTranslation(translations, 'solution.phase3.output1', "Creative Scorecard"),
        getTranslation(translations, 'solution.phase3.output2', "Promote/Kill Rules"),
        getTranslation(translations, 'solution.phase3.output3', "Validated Creative Plays")
      ],
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <section className="pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <SectionTag>{getTranslation(translations, 'solution.tag', 'The Protocol')}</SectionTag>
          <Heading>{getTranslation(translations, 'solution.title', 'How Our AI Agents Turn Data Into Validated Creative Plays')}</Heading>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {phases.map((phase, i) => (
            <div key={i} className="relative group">
              <Card className="h-full hover:border-indigo-500/30 transition-colors">
                <div className={`w-12 h-12 ${phase.bg} ${phase.color} rounded-lg flex items-center justify-center mb-6`}>
                  <phase.icon size={24} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{phase.id}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                <p className="text-slate-400 mb-6 min-h-[48px]">{phase.goal}</p>
                
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-white/50 uppercase">{getTranslation(translations, 'solution.outputs.label', 'Outputs')}</div>
                  {phase.items.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-300 p-2 bg-white/5 rounded">
                      <div className={`w-1.5 h-1.5 rounded-full ${phase.color.replace('text', 'bg')} mr-3`} />
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
              {/* Connector line for desktop */}
              {i < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20 text-slate-700">
                  <ArrowRight className="w-8 h-8 opacity-20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const OperatingModel: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="py-20 bg-slate-900/50 border-y border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <SectionTag>{getTranslation(translations, 'model.tag', 'Operating Model')}</SectionTag>
              <Heading>{getTranslation(translations, 'model.title', 'How Agents Compound Learning')}</Heading>
              <Paragraph className="mb-6">
                {getTranslation(translations, 'model.description', 'We run a simple weekly cadence that turns spend into reusable decisions without slowing your team down.')}
              </Paragraph>
              <ul className="space-y-4">
                {[
                  { step: 1, title: getTranslation(translations, 'model.step1.title', "Read the signal"), text: getTranslation(translations, 'model.step1.text', "What people watched, clicked, saved.") },
                  { step: 2, title: getTranslation(translations, 'model.step2.title', "Pick the test"), text: getTranslation(translations, 'model.step2.text', "One hypothesis; one variable.") },
                  { step: 3, title: getTranslation(translations, 'model.step3.title', "Ship variants fast"), text: getTranslation(translations, 'model.step3.text', "AI accelerates; humans steer taste.") },
                  { step: 4, title: getTranslation(translations, 'model.step4.title', "Promote or kill"), text: getTranslation(translations, 'model.step4.text', "Winners become Validated Plays.") },
                  { step: 5, title: getTranslation(translations, 'model.step5.title', "Write it down"), text: getTranslation(translations, 'model.step5.text', "Decision memos update your map.") }
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm border border-indigo-500/30 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <strong className="text-white block">{item.title}</strong>
                      <span className="text-slate-400 text-sm">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
               {/* Abstract visual for the cycle */}
               <div className="relative w-full aspect-square max-w-xs md:max-w-sm mx-auto my-8 md:my-0">
                 <div className="absolute inset-0 border-2 md:border-2 border-dashed border-white/80 md:border-white rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute inset-3 md:inset-4 border border-white/80 md:border-white rounded-full" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4 md:p-6 glass-card rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center">
                       <Copy className="mb-2 text-indigo-400" size={24} />
                       <div className="font-bold text-white text-sm md:text-base">
                        {getTranslation(translations, 'model.center.title', 'Compound Learning')}
                       </div>
                    </div>
                 </div>
                 {/* Orbiting elements */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 md:p-2 rounded-lg border border-slate-700 text-xs md:text-xs shadow-xl whitespace-nowrap">
                  {getTranslation(translations, 'model.visual.signal', 'Signal')}
                 </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-2 md:p-2 rounded-lg border border-slate-700 text-xs md:text-xs shadow-xl whitespace-nowrap">
                  {getTranslation(translations, 'model.visual.memo', 'Memo')}
                 </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

