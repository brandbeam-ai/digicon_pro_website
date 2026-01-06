'use client';
import React from 'react';
import { Check, X, ShieldAlert, Brain, Zap, Scale, Target, Copy, ArrowRight } from 'lucide-react';
import { SectionTag, Heading, Paragraph, Card } from './UI';

export const FitFilter: React.FC = () => {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <SectionTag>Fit Filter</SectionTag>
        <Heading>Who This Is For (and Who It&apos;s Not)</Heading>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="border-t-4 border-t-indigo-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-full text-indigo-500">
              <Check size={24} />
            </div>
            <h3 className="text-xl font-bold">For Leaders Who Want:</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Brands investing consistently in paid + creators who want repeatable wins",
              "Teams that care about speed, but refuse to sacrifice trust",
              "Leaders who want learning that compounds"
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
            <h3 className="text-xl font-bold">Not For:</h3>
          </div>
          <ul className="space-y-4">
            {[
              "\"Content calendars\" with no testing discipline",
              "Anyone looking for \"AI volume\" without measurement rules",
              "Trust‑sensitive categories that want deceptive synthetic endorsements"
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
  return (
    <section className="pb-24 bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-400 rounded-full mb-6">
           <ShieldAlert size={20} className="mr-2" /> The Problem
        </div>
        <Heading className="text-white mb-8">
          The &quot;Creativity Gap&quot; Is Quietly Taxing <br /> Every Campaign You Run.
        </Heading>
        <Paragraph className="mb-8">
          Visibility used to come from people. Now it comes from the feed. 
          When brands outsource creative direction without capturing learnings, 
          they keep paying for the same lessons again and again.
        </Paragraph>
        
        <div className="grid md:grid-cols-3 gap-6 text-left mt-12">
          {[
            { title: "Too Many Messages", desc: "Diluted core value proposition." },
            { title: "Too Little Truth", desc: "Content that feels like 'ads' gets skipped." },
            { title: "High Variance", desc: "No system to turn outcomes into decisions." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="text-red-400 font-bold mb-2 text-lg">{item.title}</div>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-white font-medium text-lg border-l-4 border-indigo-500 pl-4 inline-block text-left">
          We&apos;re not anti‑creator. We&apos;re anti‑improv. <br/>
          We separate what must scale from what must be earned.
        </p>
      </div>
    </section>
  );
};

export const SolutionProtocol: React.FC = () => {
  const phases = [
    {
      id: "Phase 1",
      icon: Brain,
      title: "Customer Decision Intelligence Map",
      goal: "Know what makes your customer act before you scale.",
      items: ["Market Message Map", "Objection Library", "First Hypothesis Set"],
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      id: "Phase 2",
      icon: Zap,
      title: "AI‑Accelerated Throughput Engine",
      goal: "Produce enough high-quality variants to learn fast.",
      items: ["Monthly Creative Cadence", "Whitelisting Setups", "Brand-Safe QA"],
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      id: "Phase 3",
      icon: Scale,
      title: "Scale Decision Layer",
      goal: "Protect your budget and scale only what earns it.",
      items: ["Creative Scorecard", "Promote/Kill Rules", "Validated Creative Plays"],
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <section className="pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <SectionTag>The Protocol</SectionTag>
          <Heading>How Our AI Agents Turn Data Into <br/><span className="gradient-brand">Validated Creative Plays</span></Heading>
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
                  <div className="text-xs font-semibold text-white/50 uppercase">Outputs</div>
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
  return (
    <section className="py-20 bg-slate-900/50 border-y border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <SectionTag>Operating Model</SectionTag>
              <Heading>How Agents Compound Learning</Heading>
              <Paragraph className="mb-6">
                We run a simple weekly cadence that turns spend into reusable decisions without slowing your team down.
              </Paragraph>
              <ul className="space-y-4">
                {[
                  { step: 1, title: "Read the signal", text: "What people watched, clicked, saved." },
                  { step: 2, title: "Pick the test", text: "One hypothesis; one variable." },
                  { step: 3, title: "Ship variants fast", text: "AI accelerates; humans steer taste." },
                  { step: 4, title: "Promote or kill", text: "Winners become Validated Plays." },
                  { step: 5, title: "Write it down", text: "Decision memos update your map." }
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
                       <div className="font-bold text-white text-sm md:text-base">Compound<br/>Learning</div>
                    </div>
                 </div>
                 {/* Orbiting elements */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 md:p-2 rounded-lg border border-slate-700 text-xs md:text-xs shadow-xl whitespace-nowrap">Signal</div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-2 md:p-2 rounded-lg border border-slate-700 text-xs md:text-xs shadow-xl whitespace-nowrap">Memo</div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

