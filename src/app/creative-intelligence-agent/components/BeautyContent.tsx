'use client';
import React from 'react';
import { Check, X, ArrowRight, ShieldCheck, Users, Activity, TrendingUp, DollarSign, Play, ShieldAlert, Brain, Zap, Scale } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { Button, Heading, Paragraph, SectionTag, Card } from './UI';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 20 }, { value: 35 }, { value: 30 }, { value: 55 }, { value: 45 }, { value: 70 }, { value: 85 }
];

const BeautyFooter: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <footer className="pb-12 border-t border-white/10 bg-black text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {getTranslation(translations, 'footer.rights', 'Digicon Pro. All rights reserved.')}</p>
    </footer>
  );
};

export const BeautyContent: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <main className="bg-black text-slate-200">
        {/* Hero Section */}
        <section className="relative pt-10 md:pb-5 overflow-hidden">
          {/* Background Gradient Blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
          
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <SectionTag>{getTranslation(translations, 'tagline', 'AI-powered Branding & Social Commerce for Beauty Brand entering New Market')}</SectionTag>
            <Heading level={1} className="text-white">
              {getTranslation(translations, 'hero.title', 'Stop Paying Booking Fees To Skeptical Influencers. Build Trust Signals First.')}
            </Heading>
            <Paragraph className="max-w-3xl mx-auto mb-10 text-xl">
              {getTranslation(translations, 'hero.subtitle', 'We deploy our intelligence engines technology to create up to 50 high-quality videos per month that make you LOOK like a brand worth betting on, then mine proof of customer demand from real engagement, so you can approach KOCs with leverage and good commission deals instead of hope.')}
            </Paragraph>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
                {getTranslation(translations, 'hero.cta1', 'Apply for Access')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 group">
                {getTranslation(translations, 'hero.cta2', 'See a Demo')} <Play className="ml-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Metrics Section (Adapted from SocialProof) */}
        <section className="border-y border-white/5 bg-white/[0.02] py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: getTranslation(translations, 'social.revenue.impact', 'Revenue Impact'), value: "70M", icon: DollarSign, sub: getTranslation(translations, 'social.revenue.sub', 'Attributed via optimization') },
                { label: getTranslation(translations, 'social.organic.views', 'Organic Views'), value: "6B+", icon: Users, sub: getTranslation(translations, 'social.organic.sub', 'Across social media') },
                { label: getTranslation(translations, 'social.adspend.managed', 'Ad Spend Managed'), value: "10M+", icon: TrendingUp, sub: getTranslation(translations, 'social.adspend.sub', 'Optimized by our team') },
                { label: getTranslation(translations, 'social.campaigns.title', 'Campaigns'), value: "375", icon: Activity, sub: getTranslation(translations, 'social.campaigns.sub', 'Successful launches') },
              ].map((stat, idx) => (
                <Card key={idx} className="relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-20 transition-opacity">
                     <stat.icon size={64} />
                  </div>
                  <div className="relative z-10 text-center md:text-left">
                    <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-indigo-400 mb-2 uppercase tracking-wide">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.sub}</div>
                  </div>
                  
                  {/* Decorative Chart in background of card */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 min-h-[64px]">
                    <ResponsiveContainer width="100%" height="100%" minHeight={64} minWidth={0}>
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
          </div>
        </section>

        {/* Fit Filter Section (Adapted from FitFilter) */}
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
                <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.for.title', 'This Is For You If:')}</h3>
              </div>
              <ul className="space-y-4">
                {[
                  getTranslation(translations, 'fit.for.item1', 'Quality KOCs ignore your DMs or quote booking fees that would eat your entirely monthly budget'),
                  getTranslation(translations, 'fit.for.item2', 'You’ve spent tens of thousands on influencers, but cannot point to single repeatable pattern that drive results'),
                  getTranslation(translations, 'fit.for.item3', 'You sense that Vietnamese consumers are changing fast but you do not know how to respond to them'),
                  getTranslation(translations, 'fit.for.item4', 'You’ve had viral moments that felt like luck but you can’t replicate them'),
                  getTranslation(translations, 'fit.for.item5', 'You’re entering US and Vietnam/SEA with a real product, real e-commerce site, and need to learn what works fast')
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
                <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.not.title', 'Not For You If:')}</h3>
              </div>
              <ul className="space-y-4">
                {[
                  getTranslation(translations, 'fit.not.item1', 'You want a few videos with no testing, no irritation, no learning loop'),
                  getTranslation(translations, 'fit.not.item2', 'You’re happy with one-time campaigns and do not need a sustainable playbook'),
                  getTranslation(translations, 'fit.not.item3', 'You expect guaranteed revenue from day one without needing a scaling system'),
                  getTranslation(translations, 'fit.not.item4', 'You’re domestic-only and offline-first with no interest in international expansion'),
                  getTranslation(translations, 'fit.not.item5', 'You want to hide the fact that AI was used (we believe in transparent "Tech-Beauty" positioning)')
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

        {/* The Frame (Adapted from ProblemSection) */}
        <section className="py-24 bg-slate-950">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-400 rounded-full mb-6">
               <ShieldAlert size={20} className="mr-2" /> {getTranslation(translations, 'problem.tag', 'The Problem')}
            </div>
            <Heading className="text-white mb-8">
              {getTranslation(translations, 'frame.title', 'The $2.7B Vietnam Market You Can See But Can’t Enter')}
            </Heading>
            <Paragraph className="mb-8">
              {getTranslation(translations, 'frame.subtitle', 'You know the opportunity in Vietnam’s $2.74B and growing beauty market is real, but between you and that market is a wall called trust.')}
            </Paragraph>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
              {[
                { title: getTranslation(translations, 'frame.item1.title', 'Influencer Inflation Trap'), desc: getTranslation(translations, 'frame.item1.desc', 'Mega-influencers now can cost $20k+ (20-40x increase since 2022) with untrackable ROI. Your budget buys less reach each quarter.') },
                { title: getTranslation(translations, 'frame.item2.title', 'The Trust Collapse'), desc: getTranslation(translations, 'frame.item2.desc', 'Vietnamese consumers now assume “unproven = potential scam” due to the rise of counterfeit creams and deepfakes. Views no longer equal consideration.') },
                { title: getTranslation(translations, 'frame.item3.title', 'KOCs Rejection Loop'), desc: getTranslation(translations, 'frame.item3.desc', 'Quality KOCs who actually drive sales will not risk their reputation on unknown brands. They either ghost you, demand prohibitive booking fees or give you their B-tier effort.') },
                { title: getTranslation(translations, 'frame.item4.title', 'The 2026 Cliff'), desc: getTranslation(translations, 'frame.item4.desc', 'Vietnam’s new Advertising Law (Jan 2026) makes KOCs personally liable for product claims. KOCs who were already cautious will become extremely selective.') },
                { title: getTranslation(translations, 'frame.item5.title', 'Zero Leverage'), desc: getTranslation(translations, 'frame.item5.desc', 'You’re renting attention instead of building. Each campaign starts from zero. No compounding learning, no leverage for the next negotiation.') }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-colors">
                  <div className="text-red-400 font-bold mb-2 text-lg">{item.title}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Mechanism (Adapted from ComparisonTable) */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Heading level={2} className="text-white mb-6">
              {getTranslation(translations, 'mechanism.title', 'How to Break the Rejection Cycle')}
            </Heading>
            <Paragraph className="mb-12">
              {getTranslation(translations, 'mechanism.subtitle', 'KOCs won’t work with you because you look unproven, and you can’t prove demand because KOCs won’t work with you.')}
            </Paragraph>
            
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm mb-12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 md:p-6 text-sm font-bold text-slate-400 uppercase">{getTranslation(translations, 'mechanism.table.header1', 'What you need')}</th>
                    <th className="p-4 md:p-6 text-sm font-bold text-indigo-400 uppercase bg-indigo-500/10">{getTranslation(translations, 'mechanism.table.header2', 'How we deliver it')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c1: getTranslation(translations, 'mechanism.row1.col1', 'A “big brand energy” at 10% of the cost'), c2: getTranslation(translations, 'mechanism.row1.col2', 'High-quality AI product visualization makes you LOOK like a brand that has already invested millions') },
                    { c1: getTranslation(translations, 'mechanism.row2.col1', 'Direct buying signals'), c2: getTranslation(translations, 'mechanism.row2.col2', '30-50 videos per month that harvest intent comments which show PROOF of demand that you take to KOCs') },
                    { c1: getTranslation(translations, 'mechanism.row3.col1', 'The leverage to negotiate'), c2: getTranslation(translations, 'mechanism.row3.col2', 'The proof “500 people are already asking to buy” you receive from us changes the conversation from begging to offering') },
                    { c1: getTranslation(translations, 'mechanism.row4.col1', '2026 compliance handled'), c2: getTranslation(translations, 'mechanism.row4.col2', 'Compliance documentation that satisfies KOC legal requirements') }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 md:p-6 font-medium text-white">{row.c1}</td>
                      <td className="p-4 md:p-6 text-slate-300 bg-indigo-500/[0.03] border-l border-indigo-500/10 leading-relaxed">{row.c2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-2xl font-bold text-indigo-400 italic">
              {getTranslation(translations, 'mechanism.footer', 'AI opens the door. KOCs close the sale.')}
            </p>
          </div>
        </section>

        {/* The Protocol (Adapted from SolutionProtocol) */}
        <section className="py-24 relative overflow-hidden bg-indigo-900/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10" />
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <SectionTag>{getTranslation(translations, 'solution.tag', 'The Protocol')}</SectionTag>
              <Heading>{getTranslation(translations, 'protocol.title', '3 Months From Being Unknown to Trustworthy')}</Heading>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  id: getTranslation(translations, 'protocol.phase1.title', 'PHASE 1: THE TRUST BASE (Month 1)'),
                  icon: ShieldCheck,
                  subtitle: getTranslation(translations, 'protocol.phase1.subtitle', 'Look like a brand worth partnering with'),
                  desc: getTranslation(translations, 'protocol.phase1.desc', 'We produce 10 high-end AI product-focused visualization videos that signal investment, quality control, and premium positioning. We also set up verified official accounts (Zalo OA, TikTok) for credibility.'),
                  outcome: getTranslation(translations, 'protocol.phase1.outcome', 'Outcome: You pass the “first impression” test that currently fails.'),
                  color: "text-blue-400",
                  bg: "bg-blue-500/10"
                },
                {
                  id: getTranslation(translations, 'protocol.phase2.title', 'PHASE 2: SIGNAL MINING (Months 1-2)'),
                  icon: Zap,
                  subtitle: getTranslation(translations, 'protocol.phase2.subtitle', 'Harvest proof of demand.'),
                  desc: getTranslation(translations, 'protocol.phase2.desc', 'We deploy 30-50 AI-generated shorts per month using trending audio and localized hooks – not to have vanity views, but to mine and categorize buying-signal data from comments.'),
                  outcome: getTranslation(translations, 'protocol.phase2.outcome', 'Outcome: You have documented evidence that real people want to buy.'),
                  color: "text-purple-400",
                  bg: "bg-purple-500/10"
                },
                {
                  id: getTranslation(translations, 'protocol.phase3.title', 'PHASE 3: THE DATA-DRIVEN PITCH (Month 3)'),
                  icon: Brain,
                  subtitle: getTranslation(translations, 'protocol.phase3.subtitle', 'Change the negotiation.'),
                  desc: getTranslation(translations, 'protocol.phase3.desc', 'Now you approach KOCs with a different script: "We have 500 people asking where to buy. You take the commission." You\'re offering them a deal instead of begging them to take the risk.'),
                  outcome: getTranslation(translations, 'protocol.phase3.outcome', 'Outcome: Commission-only partnerships. No booking fees. Aligned incentives.'),
                  color: "text-indigo-400",
                  bg: "bg-indigo-500/10"
                },
                {
                  id: getTranslation(translations, 'protocol.phase4.title', 'PHASE 4: VERIFICATION & CONVERSION (Month 3)'),
                  icon: Scale,
                  subtitle: getTranslation(translations, 'protocol.phase4.subtitle', 'Make it real.'),
                  desc: getTranslation(translations, 'protocol.phase4.desc', 'AI opened the door, KOCs closed the sale. They post "real skin" reviews that validate what the earlier high-quality videos promised, and content links directly to TikTok Shop or Zalo Mini App.'),
                  outcome: getTranslation(translations, 'protocol.phase4.outcome', 'Outcome: Sustainable system where AI generates leads and KOCs convert them.'),
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10"
                }
              ].map((phase, i) => (
                <div key={i} className="relative group flex">
                  <Card className="h-full hover:border-indigo-500/30 transition-colors flex flex-col w-full">
                    <div className={`w-12 h-12 ${phase.bg} ${phase.color} rounded-lg flex items-center justify-center mb-6`}>
                      <phase.icon size={24} />
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{phase.id}</div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-tight">{phase.subtitle}</h3>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">{phase.desc}</p>
                    
                    <div className={`mt-auto inline-block px-3 py-1.5 ${phase.bg} border ${phase.color.replace('text', 'border')}/30 rounded text-xs ${phase.color} font-bold`}>
                      {phase.outcome}
                    </div>
                  </Card>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20 text-slate-700">
                      <ArrowRight className="w-6 h-6 opacity-20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Us vs Them Section (Consistent with ComparisonTable in OtherContent) */}
        <section className="py-24 container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <SectionTag>{getTranslation(translations, 'vs.tag', 'Us vs. Them')}</SectionTag>
            <Heading>{getTranslation(translations, 'vs.title', 'Why Digicon approach?')}</Heading>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 md:p-6 text-sm font-bold text-slate-500 uppercase">{getTranslation(translations, 'vs.header1', 'THE OLD WAY')}</th>
                  <th className="p-4 md:p-6 text-sm font-bold text-indigo-400 uppercase bg-indigo-500/10">{getTranslation(translations, 'vs.header2', 'SIGNAL-FIRST APPROACH')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { old: getTranslation(translations, 'vs.row1.old', 'Contact KOCs, get ghosted or rejected'), nw: getTranslation(translations, 'vs.row1.new', 'Build visual authority first with AI') },
                  { old: getTranslation(translations, 'vs.row2.old', 'Pay $20k+ booking fees upfront (fixed cost)'), nw: getTranslation(translations, 'vs.row2.new', 'Deploy 30-50 high-quality video variants/ month at 10% of the cost') },
                  { old: getTranslation(translations, 'vs.row3.old', 'Post content, pray it converts'), nw: getTranslation(translations, 'vs.row3.new', 'Mine verified buying signals from real engagement') },
                  { old: getTranslation(translations, 'vs.row4.old', 'Gain only vanity metrics and pure guesswork'), nw: getTranslation(translations, 'vs.row4.new', 'Approach KOC with proof of demand') },
                  { old: getTranslation(translations, 'vs.row5.old', 'Hire more KOCs until something clicks'), nw: getTranslation(translations, 'vs.row5.new', 'Negotiate commission-only deals (aligned incentives)') },
                  { old: getTranslation(translations, 'vs.row6.old', 'Repeat with no learning and leverage'), nw: getTranslation(translations, 'vs.row6.new', 'Stack validated learnings, KOCs verify, both win') }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-sm">
                    <td className="p-4 md:p-6 text-slate-500 italic">{i+1}. {row.old}</td>
                    <td className="p-4 md:p-6 text-white font-semibold bg-indigo-500/[0.03] border-l border-indigo-500/10">{i+1}. {row.nw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deliverables Block (Adapted from Deliverables) */}
        <section className="pb-24 relative container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionTag>{getTranslation(translations, 'asset.tag', 'The War Chest')}</SectionTag>
            <Heading>{getTranslation(translations, 'honesty.promise.title', 'What We Promise')}</Heading>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="group border-t-4 border-t-indigo-500">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                          <Check size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{getTranslation(translations, 'honesty.promise.title', 'What We Promise')}</h3>
                  </div>
                  <ul className="space-y-4">
                      {[
                        getTranslation(translations, 'honesty.promise.item1', 'Proven AI product visualization format that generates views and passes the legitimacy test'),
                        getTranslation(translations, 'honesty.promise.item2', 'Captured buying signals from real audience engagement'),
                        getTranslation(translations, 'honesty.promise.item3', 'Negotiation leverage to shift from booking fees to commission deals'),
                        getTranslation(translations, 'honesty.promise.item4', '2026-compliant documentation KOCs legally require')
                      ].map((item, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </Card>
              <Card className="group border-t-4 border-t-slate-700 opacity-80">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/10 rounded-lg text-slate-500">
                          <X size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-400">{getTranslation(translations, 'honesty.not.title', 'What We Don’t Promise')}</h3>
                  </div>
                  <ul className="space-y-4">
                      {[
                        getTranslation(translations, 'honesty.not.item1', 'Guaranteed revenue numbers (as we deliver visibility and leverage)'),
                        getTranslation(translations, 'honesty.not.item2', 'KOCs will definitely say yes (we give you the best possible position, you still pitch)'),
                        getTranslation(translations, 'honesty.not.item3', 'Overnight results (this is a system, not a hack)')
                      ].map((item, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </Card>
          </div>
        </section>

        {/* Final CTA (Adapted from FinalCTA in OtherContent) */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/20 blur-3xl -z-10"></div>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-20">
              <Heading level={2} className="text-5xl md:text-6xl text-white mb-8">
                {getTranslation(translations, 'final.title', 'Stop Chasing KOCs. Start Attracting Them.')}
              </Heading>
              
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm max-w-4xl mx-auto mb-16">
                <div className="p-6 bg-white/5 border-b border-white/10 font-bold text-lg text-white">
                  {getTranslation(translations, 'final.from_to.title', 'In 3 months, your brands go')}
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest">
                      <th className="p-4 md:p-6 text-slate-500">{getTranslation(translations, 'final.from_to.header1', 'From')}</th>
                      <th className="p-4 md:p-6 text-indigo-400 bg-indigo-500/10 border-l border-indigo-500/10">{getTranslation(translations, 'final.from_to.header2', 'To')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: getTranslation(translations, 'final.from_to.row1.from', '“We are guessing what works”'), t: getTranslation(translations, 'final.from_to.row1.to', '“We have intent data showing real buying signals, plus validated creative patterns that can be replicated”') },
                      { f: getTranslation(translations, 'final.from_to.row2.from', '“Our customer data is stale”'), t: getTranslation(translations, 'final.from_to.row2.to', '“We know what they’re asking, objecting, wanting right now”') },
                      { f: getTranslation(translations, 'final.from_to.row3.from', '“KOCs ghost us”'), t: getTranslation(translations, 'final.from_to.row3.to', '“KOCs see us as a good deal”') },
                      { f: getTranslation(translations, 'final.from_to.row4.from', 'Gambling on attention each campaign'), t: getTranslation(translations, 'final.from_to.row4.to', 'Building a repeatable, proven growth system') },
                      { f: getTranslation(translations, 'final.from_to.row5.from', 'Paying $20,000 booking fees'), t: getTranslation(translations, 'final.from_to.row5.to', 'Offering commission-only partnerships') }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 text-sm">
                        <td className="p-4 md:p-6 text-slate-500 italic">{row.f}</td>
                        <td className="p-4 md:p-6 text-slate-200 font-medium bg-indigo-500/[0.03] border-l border-indigo-500/10">{row.t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Paragraph className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto">
                {getTranslation(translations, 'final.description', "If you want influencer posts, hire an agency. If you want an AI-enabled brand acceleration system that makes quality KOCs want to work with you on commission, let's talk.")}
              </Paragraph>
              <Button variant="primary" className="text-xl px-12 py-5 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                {getTranslation(translations, 'final.cta', 'Apply for Access')} <ArrowRight className="ml-2" />
              </Button>
              <p className="mt-8 text-sm text-slate-500 italic">
                {getTranslation(translations, 'final.footer', "We'll tell you quickly if this is a fit. Either way, you leave with clarity.")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <BeautyFooter />
    </>
  );
};

