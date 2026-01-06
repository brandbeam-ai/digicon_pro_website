'use client';
import React from 'react';
import { ArrowRight, TrendingUp, Users, DollarSign, Activity, Play } from 'lucide-react';
import { Button, SectionTag, Heading, Paragraph, Card } from './UI';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const data = [
  { value: 20 }, { value: 35 }, { value: 30 }, { value: 55 }, { value: 45 }, { value: 70 }, { value: 85 }
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-10 md:pb-32 overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 text-center max-w-5xl">
        <SectionTag>Creative Intelligence Agents</SectionTag>
        <Heading level={1} className="text-white">
          Stop Paying Influencers to Improvise. <br className="hidden md:block" />
          <span className="gradient-brand">Build Agents You Own.</span>
        </Heading>
        
        <Paragraph className="max-w-2xl mx-auto mb-10 text-xl">
          We deploy <strong>Creative Intelligence AI Agents</strong> that mine your first‑party data, 
          ship controlled creative variants fast, and convert winners into 
          <strong> Validated Creative Plays</strong> you can scale.
        </Paragraph>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
            Apply for Access <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="w-full sm:w-auto text-lg px-8 group">
            See how it works <Play className="ml-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          </Button>
        </div>
        
        <p className="text-sm text-slate-500 italic">
          Access = the agent stack + the compounding artifacts. You keep the learnings.
        </p>
      </div>
    </section>
  );
};

export const SocialProof: React.FC = () => {
  const stats = [
    { label: "Revenue Impact", value: "70M", icon: DollarSign, sub: "Attributed via optimization" },
    { label: "Organic Views", value: "4B+", icon: Users, sub: "Across social media" },
    { label: "Ad Spend Managed", value: "10M+", icon: TrendingUp, sub: "Optimized by our team" },
    { label: "Campaigns", value: "375", icon: Activity, sub: "Successful launches" },
  ];

  const brands = ["SAMSUNG", "CocaCola", "NVIDIA", "LG", "Grab", "Orion", "Binggrae"];

  return (
    <section className="py-0 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <stat.icon size={64} />
              </div>
              <div className="relative z-10 text-center md:text-left">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-indigo-400 mb-2 uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
              
              {/* Decorative Chart in background of card */}
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id={`grad${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill={`url(#grad${idx})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ))}
        </div>

        {/* Brand Logos */}
        <div className="text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-8">Selected teams we&apos;ve supported</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold font-sans text-white/80 hover:text-white cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

