'use client';
import React from 'react';
import { ArrowRight, Lock, Layers, Brain } from 'lucide-react';
import { SectionTag, Heading, Paragraph, Card, Button } from './UI';

export const ComparisonTable: React.FC = () => {
  const rows = [
    { feature: "Strategy", old: "Hoping for a hit", new: "Reducing variance with testing" },
    { feature: "Learning", old: "Scattered in people's heads", new: "Compounding: Validated Creative Plays" },
    { feature: "Speed", old: "Slow briefing cycles", new: "AI‑accelerated execution in days" },
    { feature: "Measurement", old: "Vanity metrics dominate", new: "Scorecards, gates, and rules" },
    { feature: "Outcome", old: "Awareness without clarity", new: "Decision clarity + repeatable winners" },
  ];

  return (
    <section className="pb-24 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <SectionTag>Us vs. Them</SectionTag>
          <Heading>Amateurs Guess. Professionals Engineer.</Heading>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 md:p-6 text-sm font-bold text-slate-400 uppercase">Feature</th>
                <th className="p-4 md:p-6 text-sm font-bold text-slate-400 uppercase">Traditional Agency</th>
                <th className="p-4 md:p-6 text-sm font-bold text-indigo-400 uppercase bg-indigo-500/10">Creative Intelligence Agents</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-6 font-medium text-white">{row.feature}</td>
                  <td className="p-4 md:p-6 text-slate-400">{row.old}</td>
                  <td className="p-4 md:p-6 text-white font-semibold bg-indigo-500/[0.03] border-l border-indigo-500/10">{row.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export const Deliverables: React.FC = () => {
  return (
    <section className="pb-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionTag>The War Chest</SectionTag>
          <Heading>Don&apos;t Rent Content. Own the Asset.</Heading>
          <Paragraph className="max-w-2xl mx-auto">
            You aren&apos;t paying for a one‑off service. You&apos;re acquiring a compounding intelligence asset.
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                    title: "The Brain",
                    sub: "Decision Intelligence",
                    icon: Brain,
                    items: ["Customer Decision Intelligence Map", "Objection Library + Responses", "Validated Creative Plays Library"]
                },
                {
                    title: "The Fuel",
                    sub: "AI-Accelerated Output",
                    icon: Layers,
                    items: ["Monthly conversion-first assets", "Whitelisted access setups", "Unlimited usage rights"]
                },
                {
                    title: "The Compass",
                    sub: "Scale Decisions",
                    icon: Lock,
                    items: ["Creative Scorecards", "Weekly Decision Memos", "Profit-focused Signal Reports"]
                }
            ].map((col, i) => (
                <Card key={i} className="group hover:bg-white/[0.04]">
                    <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                        <div className="p-3 bg-white/10 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <col.icon size={24} />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{col.sub}</div>
                            <h3 className="text-xl font-bold text-white">{col.title}</h3>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {col.items.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-300 justify-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export const Timeline: React.FC = () => {
    return (
        <section className="pb-12 bg-slate-900/30">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <SectionTag>Risk Removal</SectionTag>
                    <Heading>The First 30 Days</Heading>
                </div>
                
                <div className="relative">
                     {/* Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-500/50 md:left-1/2 md:-translate-x-1/2"></div>

                    {[
                        { week: "Week 1", title: "Map & Install", desc: "Map the decision + install scorecard rules." },
                        { week: "Week 2-3", title: "Ship & Isolate", desc: "Ship fast variants, isolate what works, create Validated Plays." },
                        { week: "Week 4", title: "Build Scale Plan", desc: "What gets budget, what gets killed, what repeats." }
                    ].map((step, i) => (
                        <div key={i} className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                             <div className="flex-1 md:text-right">
                                {/* Spacer for alternate side */}
                             </div>
                             <div className="absolute left-4 w-4 h-4 bg-indigo-500 rounded-full border-4 border-black -translate-x-1/2 mt-1.5 md:left-1/2"></div>
                             <div className="flex-1 pl-12 md:pl-0">
                                 <div className={`md:px-8 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className="text-indigo-400 font-bold mb-1">{step.week}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                    <p className="text-slate-400">{step.desc}</p>
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const CredibilityBlock: React.FC = () => (
    <div className="pb-12 border-t border-white/5 bg-red-900/5">
        <div className="container mx-auto px-4 text-center">
            <h4 className="text-red-400 font-bold uppercase tracking-widest mb-4 text-sm">What We Refuse</h4>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400">
                <span>No Content Calendars</span>
                <span>•</span>
                <span>No ROAS without Measurement</span>
                <span>•</span>
                <span>No Deceptive Synths</span>
                <span>•</span>
                <span>No Vanity Views</span>
            </div>
        </div>
    </div>
);

