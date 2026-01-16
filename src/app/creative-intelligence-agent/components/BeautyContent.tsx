'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Users, Activity, TrendingUp, DollarSign, Play, ShieldAlert, HelpCircle, ShieldCheck, Star, Search, MessageSquare, LineChart, Layout, Rocket } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// --- UI Components ---
const VideoOverlay: React.FC<{ isOpen: boolean; onClose: () => void; videoId: string }> = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8" onClick={onClose}>
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
        >
          <X size={24} />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Digicon Pro Demo Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', fullWidth = false, onClick }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "primary-button",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    outline: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50"
  };

  if (variant === 'primary') {
    return (
      <button onClick={onClick} className={`primary-button ${fullWidth ? 'w-full' : ''} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

const SectionTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
    {children}
  </span>
);

const Heading: React.FC<{ children: React.ReactNode; level?: 1 | 2 | 3; className?: string }> = ({ children, level = 2, className = '' }) => {
  if (level === 1) return <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${className}`}>{children}</h1>;
  if (level === 3) return <h3 className={`text-xl font-bold mb-3 ${className}`}>{children}</h3>;
  return <h2 className={`text-3xl md:text-4xl font-bold mb-6 tracking-tight ${className}`}>{children}</h2>;
};

const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-slate-400 leading-relaxed text-lg ${className}`}>{children}</p>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-card p-6 md:p-8 rounded-2xl ${className}`}>
    {children}
  </div>
);

const data = [
  { value: 20 }, { value: 35 }, { value: 30 }, { value: 55 }, { value: 45 }, { value: 70 }, { value: 85 }
];

const BeautyFooter: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <footer className="pb-12 border-t border-white/10 bg-black text-center text-slate-500 text-sm">
        <div className="container mx-auto px-4 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
            <Link 
              href="/creative-intelligence-agent/beauty-terms" 
              className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-all duration-200 font-medium text-base group"
            >
              <ShieldCheck size={18} className="text-indigo-500 group-hover:scale-110 transition-transform" />
              Terms of Use
            </Link>
            <span className="hidden md:inline text-slate-800">|</span>
            <a 
              href="mailto:support@digicon.pro" 
              className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-all duration-200 font-medium text-base group"
            >
              <MessageSquare size={18} className="text-indigo-500 group-hover:scale-110 transition-transform" />
              Support: support@digicon.pro
            </a>
          </div>
          <p className="opacity-60">&copy; {new Date().getFullYear()} {getTranslation(translations, 'footer.rights', 'Digicon Pro. All rights reserved.')}</p>
        </div>
    </footer>
  );
};

export const BeautyContent: React.FC = () => {
  const { translations } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <main className="bg-black text-slate-200">
        <VideoOverlay isOpen={showVideo} onClose={() => setShowVideo(false)} videoId="pxkOrancVsQ" />
        
        {/* Hero Section */}
        <section className="relative pt-10 md:pb-5 overflow-hidden">
          {/* Background Gradient Blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
          
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <SectionTag>{getTranslation(translations, 'tagline', 'AI-powered Market Intelligence for Beauty Brands entering Vietnam')}</SectionTag>
            <Heading level={1} className="text-white">
              {getTranslation(translations, 'hero.title', 'Stop Guessing What Vietnamese Consumers Want. Learn Fast, Decide Smart, Scale Right.')}
            </Heading>
            <Paragraph className="max-w-3xl mx-auto mb-10 text-xl">
              {getTranslation(translations, 'hero.subtitle', "Whether you're considering Vietnam, already testing the market or ready to scale, we build and operate a proprietary testing and distribution system powered by AI mass video production to provide you market proof, intent signals and ultimately compound learning so you have the ability to move forward with confidence, not guesswork and a burned budget.")}
            </Paragraph>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/book-a-call?solution_for=beauty" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full text-lg px-8">
                  {getTranslation(translations, 'hero.cta1', 'Apply for Access')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <div onClick={() => setShowVideo(true)} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 group">
                  {getTranslation(translations, 'hero.cta2', 'See how it works')} <Play className="ml-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
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

        {/* Fit Filter Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionTag>{getTranslation(translations, 'fit.tag', 'Fit Filter')}</SectionTag>
            <Heading>{getTranslation(translations, 'fit.title', "Who This Is For (and Who It's Not)")}</Heading>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="border-t-4 border-t-indigo-500 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-full text-indigo-500">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.for.title', 'This Is For You If:')}</h3>
              </div>
              <ul className="space-y-6 mb-6 flex-1">
                {[
                  getTranslation(translations, 'fit.for.stage1', "You're considering Vietnam but have zero presence, zero proof that anyone there would actually buy your product, and you can't justify the investment without seeing real market signals first."),
                  getTranslation(translations, 'fit.for.stage2', "You've posted content in Vietnam and had some viral moments, but everything feels like random luck and you can't replicate what works or tell whether you're building anything sustainable."),
                  getTranslation(translations, 'fit.for.stage3', "You know Vietnamese consumers want your product, but you're stuck because distributors and KOCs won't commit without proof, and you can't scale without them moving first."),
                  getTranslation(translations, 'fit.for.stage4', "You have distributors or retail presence in Vietnam, but sales are disappointing, and you have no idea if the problem is your messaging, trust, awareness, or something else entirely."),
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <Check size={18} className="text-indigo-500 mt-1 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-t-4 border-t-rose-500 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 rounded-full text-rose-500">
                  <X size={24} />
                </div>
                <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.not.title', 'Not For You If:')}</h3>
              </div>
              <ul className="space-y-4">
                {[
                  getTranslation(translations, 'fit.not.item1', 'You want cheap content volume with no testing, learning, or iteration'),
                  getTranslation(translations, 'fit.not.item2', "You're happy with one-time campaigns and don't need a sustainable system"),
                  getTranslation(translations, 'fit.not.item3', 'You expect guaranteed revenue from day one without building a learning system first'),
                  getTranslation(translations, 'fit.not.item4', "You're domestic-only and offline-first with no interest in Vietnam expansion"),
                  getTranslation(translations, 'fit.not.item5', 'You want to hide that AI is used (we believe in transparent "Tech-Enabled Beauty" positioning)')
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <X size={18} className="text-rose-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
              {getTranslation(translations, 'fit.stage.question', 'WHICH STAGE ARE YOU IN?')}
            </h3>
            <Link href="/book-a-call?solution_for=beauty">
              <Button variant="primary" className="text-lg px-8 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                {getTranslation(translations, 'fit.stage.cta', "Apply for Access — We'll Help You Identify Your Stage")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* The Frame (Problem Section) */}
        <section className="py-24 bg-slate-950 border-y border-white/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-400 rounded-full mb-6">
               <ShieldAlert size={20} className="mr-2" /> {getTranslation(translations, 'problem.tag', 'The Problem')}
            </div>
            <Heading className="text-white mb-8">
              {getTranslation(translations, 'frame.title', "The $2.7B Vietnam Market You Can See But Can't Enter—Yet")}
            </Heading>
            <Paragraph className="mb-8 max-w-2xl mx-auto">
              {getTranslation(translations, 'frame.subtitle', "You know the opportunity in Vietnam's $2.74B beauty market is real. But between you and that market are walls you can't break through with traditional approaches.")}
            </Paragraph>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
              {[
                { title: getTranslation(translations, 'frame.item1.title', 'The Blind Bet Problem'), desc: getTranslation(translations, 'frame.item1.desc', "Brands entering Vietnam are flying blind: testing random content, copying what worked for others, renting attention to agencies. $50K later, they still don't know what actually drove results or whether they should even be in the market.") },
                { title: getTranslation(translations, 'frame.item2.title', 'The Trust Fog'), desc: getTranslation(translations, 'frame.item2.desc', 'Vietnamese consumers assume "unproven = potential scam" due to counterfeit creams and deepfakes. But you don\'t know which trust signals matter for your specific product category.') },
                { title: getTranslation(translations, 'frame.item3.title', 'The Signal Confusion'), desc: getTranslation(translations, 'frame.item3.desc', 'Views don\'t equal interest. Interest doesn\'t equal buying. Most brands can\'t tell the difference, so they optimize for the wrong metrics at the wrong stage.') },
                { title: getTranslation(translations, 'frame.item4.title', 'Influencer Inflation Trap'), desc: getTranslation(translations, 'frame.item4.desc', 'Quality partners won\'t risk their reputation without evidence, and mega-influencers now can cost $20k+ (a lot more than before) with untrackable ROI. Booking fees eat budgets before you learn anything.') },
                { title: getTranslation(translations, 'frame.item5.title', 'The Expensive Unknowns'), desc: getTranslation(translations, 'frame.item5.desc', "It's not just the wasted months, aimless partnerships, and the first $20K-50K that hurt. It's the next $100K you spend and the opportunity cost of getting it wrong while competitors get it right.") },
                { title: getTranslation(translations, 'frame.item6.title', 'The 2026 Compliance Reality'), desc: getTranslation(translations, 'frame.item6.desc', "Vietnam's new Advertising Law (Jan 2026) makes KOCs and brands personally liable for product claims. Partners who were already cautious are now extremely selective.") }
              ].map((item, i) => (
                <Card key={i} className="bg-white/[0.03] border-white/5 hover:border-red-500/30 transition-colors p-6 rounded-2xl">
                  <div className="text-red-400 font-bold mb-3 text-lg flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-red-500/50 rounded-full" />
                    {item.title}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* The Mechanism */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <Heading level={2} className="text-white mb-6">
              {getTranslation(translations, 'mechanism.title', 'How to Break the Entry Paradox in 4 Weeks?')}
            </Heading>
            <Paragraph className="mb-12 max-w-3xl mx-auto">
              {getTranslation(translations, 'mechanism.subtitle', "You're stuck in a loop: can't prove demand without presence, can't build presence without proof. Instead of guessing or hoping, we build and operate a mass video production and distribution system powered by creative intelligence that mines the exact consumer signals you need, identifies repeat patterns, and turns results into decision-grade learning you own.")}
            </Paragraph>
            
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm mb-12 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">{getTranslation(translations, 'mechanism.table.header1', 'If Your Problem Is…')}</th>
                      <th className="p-6 text-xs font-black text-indigo-400 uppercase bg-indigo-500/10 tracking-widest border-x border-white/10">{getTranslation(translations, 'mechanism.table.header2', 'You Actually Need…')}</th>
                      <th className="p-6 text-xs font-black text-emerald-400 uppercase bg-emerald-500/10 tracking-widest">{getTranslation(translations, 'mechanism.table.header3', 'How We Help You Get It')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        problem: getTranslation(translations, 'mechanism.row1.problem', '"Should we even enter Vietnam?"'), 
                        need: getTranslation(translations, 'mechanism.row1.need', 'Market proof that Vietnamese consumers care about your product at 10% of the cost, BEFORE you invest in full operations'), 
                        help: getTranslation(translations, 'mechanism.row1.help', 'We create high-quality AI product visualizations to test market reactions and mine real signals, then give you a Go/No-Go decision backed by evidence, not guesses') 
                      },
                      { 
                        problem: getTranslation(translations, 'mechanism.row2.problem', '"We\'re present but results feel random"'), 
                        need: getTranslation(translations, 'mechanism.row2.need', 'A repeatable system with validated content patterns that work reliably, not viral luck'), 
                        help: getTranslation(translations, 'mechanism.row2.help', 'We run systematic tests, track what generates buying questions vs. vanity metrics, and give you 2-3 proven plays you can repeat with confidence') 
                      },
                      { 
                        problem: getTranslation(translations, 'mechanism.row3.problem', '"Partners won\'t talk to us without proof"'), 
                        need: getTranslation(translations, 'mechanism.row3.need', 'Documented evidence of demand that changes the negotiation conversation from begging to offering'), 
                        help: getTranslation(translations, 'mechanism.row3.help', 'We mine verified buying signals from real engagement, package them into partner-ready proof, and give you leverage to negotiate better terms') 
                      },
                      { 
                        problem: getTranslation(translations, 'mechanism.row4.problem', '"We have distribution but sales are weak"'), 
                        need: getTranslation(translations, 'mechanism.row4.need', 'Diagnosis of exactly where your funnel breaks so you stop wasting money on the wrong fixes'), 
                        help: getTranslation(translations, 'mechanism.row4.help', 'We analyze where buyers actually drop off, test fixes on the real bottleneck, and show you what measurably improves conversion') 
                      }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="p-6 font-medium text-white italic text-sm">{row.problem}</td>
                        <td className="p-6 text-slate-300 bg-indigo-500/[0.03] border-x border-white/5 leading-relaxed text-sm">{row.need}</td>
                        <td className="p-6 text-slate-200 bg-emerald-500/[0.03] leading-relaxed text-sm">{row.help}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Packages Section */}
        <section className="py-24 relative overflow-hidden bg-indigo-900/10 border-y border-indigo-500/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px] -z-10" />
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <SectionTag>{getTranslation(translations, 'packages.tag', 'The 4 Packages')}</SectionTag>
              <Heading>{getTranslation(translations, 'packages.title', 'How It Works')}</Heading>
              <Paragraph className="max-w-3xl mx-auto">
                {getTranslation(translations, 'packages.subtitle', "We don't sell you the same thing regardless of where you are. We help you solve the actual bottleneck you're facing right now.")}
              </Paragraph>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  stage: getTranslation(translations, 'packages.stage1.title', 'STAGE 1: MARKET ENTRY DECISION SPRINT'),
                  from: getTranslation(translations, 'packages.stage1.from', "Staring at Vietnam's $2.7B beauty market with no idea if anyone there would actually buy your product and not wanting to make a six figure cost mistake."),
                  to: getTranslation(translations, 'packages.stage1.to', "Having a clear, evidence-backed answer of whether to go with documented evidence of consumer interest patterns, market signals and a foundation for next-stage decisions."),
                  deliverables: [
                    getTranslation(translations, 'packages.stage1.item1', 'AI Visual Pack (TikTok/social-ready, yours to keep)'),
                    getTranslation(translations, 'packages.stage1.item2', 'Test Record (your first real market data)'),
                    getTranslation(translations, 'packages.stage1.item3', 'Customer Intent Summary (clear profile of who\'s interested)'),
                    getTranslation(translations, 'packages.stage1.item4', 'Customer Doubts Summary (top concerns and trust barriers)'),
                    getTranslation(translations, 'packages.stage1.item5', 'Trust Details Summary (what proof Vietnamese consumers want)'),
                    getTranslation(translations, 'packages.stage1.item6', 'Go/No-Go Decision Note (clear recommendation with evidence)')
                  ],
                  investment: '$10,000 USD',
                  icon: Search,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10"
                },
                {
                  stage: getTranslation(translations, 'packages.stage2.title', 'STAGE 2: INTENT SIGNAL MINING ENGINE'),
                  from: getTranslation(translations, 'packages.stage2.from', "Having some Vietnam presence but unclear on what messaging or positioning works because only some content performs well, starting from zero every campaign."),
                  to: getTranslation(translations, 'packages.stage2.to', "Knowing super clear what makes Vietnamese consumers consider buying, owning repeatable validated plays that reliably generate buying questions and a system that works more than once."),
                  deliverables: [
                    getTranslation(translations, 'packages.stage2.item1', 'Customer Intent Summary (deeper evolving patterns over time)'),
                    getTranslation(translations, 'packages.stage2.item2', 'Vietnam Message Guide (your positioning playbook)'),
                    getTranslation(translations, 'packages.stage2.item3', 'Customer Doubts Guide (comprehensive objection library with proven responses)'),
                    getTranslation(translations, 'packages.stage2.item4', 'Trust Details Guide (ranked list of what proof works for each type of doubt)'),
                    getTranslation(translations, 'packages.stage2.item5', 'Validated Plays Library (creative patterns that reliably generate buying questions)'),
                    getTranslation(translations, 'packages.stage2.item6', 'Signal Dashboard (live tracking showing signal quality over time)')
                  ],
                  investment: '$15,000 USD',
                  icon: MessageSquare,
                  color: "text-purple-400",
                  bg: "bg-purple-500/10"
                },
                {
                  stage: getTranslation(translations, 'packages.stage3.title', 'STAGE 3: DISTRIBUTOR PROOF PACK + TEST SALE SETUP'),
                  from: getTranslation(translations, 'packages.stage3.from', "Knowing your product could sell in Vietnam but lack distributor leverage or sales validation because they demand proof first while your budget is burning and competitors are moving."),
                  to: getTranslation(translations, 'packages.stage3.to', "Having the leverage to change the conversation from begging partners to take a risk on you to offering them a proven opportunity they'd be stupid to pass up."),
                  deliverables: [
                    getTranslation(translations, 'packages.stage3.item1', 'Distributor Proof Pack (partner-ready evidence bundle)'),
                    getTranslation(translations, 'packages.stage3.item2', 'Partner Pitch Kit (proof-backed story and positioning materials for negotiation)'),
                    getTranslation(translations, 'packages.stage3.item3', 'Partner Shortlist + Risk Assessment (scored evaluation of potential distributors)'),
                    getTranslation(translations, 'packages.stage3.item4', 'Test Sale Framework (30-60 day pilot structure with pass/fail criteria)'),
                    getTranslation(translations, 'packages.stage3.item5', 'KOC Selling Test Summary (real buying behavior data)'),
                    getTranslation(translations, 'packages.stage3.item6', 'Scale Recommendations (clear next steps based on test results)')
                  ],
                  investment: '$30,000 USD',
                  icon: ShieldCheck,
                  color: "text-indigo-400",
                  bg: "bg-indigo-500/10"
                },
                {
                  stage: getTranslation(translations, 'packages.stage4.title', 'STAGE 4: CONVERSION FIX ENGINE'),
                  from: getTranslation(translations, 'packages.stage4.from', "Having distribution and presence but weaker sales than expected and not knowing why consumers don't trust you despite burning budget on fixes."),
                  to: getTranslation(translations, 'packages.stage4.to', "Knowing exactly the leak in your funnel with our clear diagnosis and achieving measured improvement sustainably with proven validated plays that you can scale."),
                  deliverables: [
                    getTranslation(translations, 'packages.stage4.item1', 'Problem Note (the #1 bottleneck with evidence)'),
                    getTranslation(translations, 'packages.stage4.item2', 'Sales Funnel Dashboard (baseline + changes over time)'),
                    getTranslation(translations, 'packages.stage4.item3', 'Test Record + Decision Notes (what we tried, what worked)'),
                    getTranslation(translations, 'packages.stage4.item4', 'Updated Validated Plays (refined for conversion)'),
                    getTranslation(translations, 'packages.stage4.item5', 'Scale Rules (when to scale what, with clear criteria)')
                  ],
                  investment: 'Enterprise Pricing',
                  isEnterprise: true,
                  icon: LineChart,
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10"
                }
              ].map((pkg, i) => (
                <Card key={i} className="hover:border-indigo-500/30 transition-all duration-500 flex flex-col group/pkg relative overflow-hidden h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${pkg.bg} opacity-20 blur-3xl -z-10 group-hover/pkg:scale-150 transition-transform duration-1000`} />
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 ${pkg.bg} ${pkg.color} rounded-2xl flex items-center justify-center border ${pkg.color.replace('text', 'border')}/20 shadow-inner group-hover/pkg:scale-110 transition-transform`}>
                      <pkg.icon size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Investment</div>
                      <div className={`text-xl font-black ${pkg.color}`}>{pkg.investment}</div>
                    </div>
                  </div>

                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{pkg.stage}</div>
                  
                  <div className="mb-8 space-y-4">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 opacity-60">From:</div>
                      <p className="text-sm text-slate-400 italic leading-relaxed">{pkg.from}</p>
                    </div>
                    <div className="relative p-4 bg-white/[0.03] rounded-xl border border-white/5">
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1.5 opacity-80">To:</div>
                      <p className="text-sm text-white font-medium leading-relaxed">{pkg.to}</p>
                    </div>
                  </div>

                  <div className="mt-auto space-y-6">
                    {!pkg.isEnterprise && (
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Layout size={12} /> Key Deliverables
                        </div>
                        <ul className="space-y-3">
                          {pkg.deliverables.slice(0, 6).map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-snug">
                              <div className={`w-1.5 h-1.5 rounded-full ${pkg.color.replace('text', 'bg')} mt-1.5 shrink-0 opacity-50`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.isEnterprise && (
                      <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/30 text-sm text-slate-300 italic leading-relaxed shadow-inner">
                        *This package is still under enterprise development and customized to each client&apos;s specific data access and sales infrastructure. Deliverables and timeline are scoped after an initial diagnostic consultation.
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link href="/book-a-call?solution_for=beauty">
                <Button variant="primary" className="text-xl px-12 py-5 shadow-2xl">
                  {getTranslation(translations, 'packages.cta', 'Apply for further information')} <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Digicon Section */}
        <section className="py-24 container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <SectionTag>{getTranslation(translations, 'why.tag', 'Why Digicon?')}</SectionTag>
            <Heading>{getTranslation(translations, 'why.title', 'Why Digicon?')}</Heading>
            <Paragraph className="max-w-2xl mx-auto mb-10">
              {getTranslation(translations, 'why.subtitle', 'Most agencies sell you content. We sell you learning. We build and operate a mass video production and distribution system powered by creative intelligence to:')}
            </Paragraph>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {[
                getTranslation(translations, 'why.item1', 'Test which messages resonate vs which fall flat'),
                getTranslation(translations, 'why.item2', 'Mine real questions, doubts, and comparisons from your target audience'),
                getTranslation(translations, 'why.item3', 'Separate curiosity from consideration from buying intent'),
                getTranslation(translations, 'why.item4', 'Build proof that changes conversations with partners')
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                  <Check size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">{getTranslation(translations, 'vs.header1', 'THE OLD WAY')}</th>
                    <th className="p-6 text-xs font-black text-indigo-400 uppercase bg-indigo-500/10 tracking-widest">{getTranslation(translations, 'vs.header2', 'SIGNAL-FIRST APPROACH')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { old: getTranslation(translations, 'vs.row1.old', 'Enter Vietnam without a clear decision-making system'), nw: getTranslation(translations, 'vs.row1.new', 'Test core message and give Go/No-Go decision with market evidence') },
                    { old: getTranslation(translations, 'vs.row2.old', 'Hire an agency to create presence and burn $50k+ upfront'), nw: getTranslation(translations, 'vs.row2.new', 'Deploy 30-50 high-quality video variants/ month at 10% of the cost') },
                    { old: getTranslation(translations, 'vs.row3.old', 'Copy what worked for other brands, try new tactics constantly'), nw: getTranslation(translations, 'vs.row3.new', 'Test systematically (change one thing at a time) and track repeatable patterns') },
                    { old: getTranslation(translations, 'vs.row4.old', 'Create generic content, post everywhere, pray it converts'), nw: getTranslation(translations, 'vs.row4.new', 'Build visual authority first with AI and let KOC, distributors close the deal') },
                    { old: getTranslation(translations, 'vs.row5.old', 'Check analytics monthly but only gain vanity metrics'), nw: getTranslation(translations, 'vs.row5.new', 'Mine verified buying signals from real engagement') },
                    { old: getTranslation(translations, 'vs.row6.old', 'Throw money at ads and quick fixes'), nw: getTranslation(translations, 'vs.row6.new', 'Diagnose the actual bottleneck, test fixes on real problems and scale only what\'s proven') },
                    { old: getTranslation(translations, 'vs.row7.old', 'Hire more KOCs and partner more until something clicks'), nw: getTranslation(translations, 'vs.row7.new', 'Approach proven KOCs and distributors with documented proof of demand, putting you in an advanced negotiation position') },
                    { old: getTranslation(translations, 'vs.row8.old', 'Repeat with no learning and leverage'), nw: getTranslation(translations, 'vs.row8.new', 'Stack validated learnings, sustainable wins, only invest further when proof says go') }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-sm">
                      <td className="p-6 text-slate-500 italic opacity-70">{i+1}. {row.old}</td>
                      <td className="p-6 text-white font-semibold bg-indigo-500/[0.03] border-l border-indigo-500/10">{i+1}. {row.nw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Honesty Box */}
        <section className="pb-24 relative container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionTag>{getTranslation(translations, 'honesty.tag', 'Honesty Box')}</SectionTag>
            <Heading>{getTranslation(translations, 'honesty.title', "What's the catch? Can I actually trust them?")}</Heading>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="group border-t-4 border-t-indigo-500 bg-indigo-500/[0.02] hover:bg-indigo-500/[0.04] transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
                          <Check size={28} />
                      </div>
                      <h3 className="text-2xl font-black text-white">{getTranslation(translations, 'honesty.promise.title', 'What We Promise')}</h3>
                  </div>
                  <ul className="space-y-5">
                      {[
                        getTranslation(translations, 'honesty.promise.item1', 'High-quality AI product visualizations that establish brand credibility and build the right brand image from day one'),
                        getTranslation(translations, 'honesty.promise.item2', 'Documented consumer demand, validated content patterns, and a pitch backed by data that make your brand distributor-ready'),
                        getTranslation(translations, 'honesty.promise.item3', 'The fastest, lowest-cost way to test if Vietnamese consumers care about your product and evidence-based decisions on whether to enter the market and how'),
                        getTranslation(translations, 'honesty.promise.item4', 'Documented buying intent (what consumers actually ask, doubt, and compare) and validated creative plays that you can scale instead of starting from zero each campaign'),
                        getTranslation(translations, 'honesty.promise.item5', 'Diagnostic accuracy when sales are weak, particularly where your funnel breaks—is it awareness, trust, messaging, pricing, or checkout friction?'),
                        getTranslation(translations, 'honesty.promise.item6', 'Compliance coordination with legal partners when registration or licensing is needed and we refuse to publish something unsupported, fake, or illegal')
                      ].map((item, idx) => (
                          <li key={idx} className="flex gap-4 text-sm text-slate-300 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </Card>
              <Card className="group border-t-4 border-t-slate-700 bg-slate-900/40 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-white/10 rounded-2xl text-slate-500 group-hover:text-slate-300 transition-colors shadow-inner">
                          <X size={28} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-400 group-hover:text-white transition-colors">{getTranslation(translations, 'honesty.not.title', 'What We Don’t Promise')}</h3>
                  </div>
                  <ul className="space-y-5">
                      {[
                        getTranslation(translations, 'honesty.not.item1', 'Guaranteed sales, revenue, or ROAS (this is a learning sprint, not a sales program; we only sell decisions and proof)'),
                        getTranslation(translations, 'honesty.not.item2', 'Signed distributor contracts or guaranteed KOC partnerships (we give you proof that strengthens your position in those conversations, but partnership decisions remain yours)'),
                        getTranslation(translations, 'honesty.not.item3', 'Solely unlimited content volume or viral hits on demand (output is based on what\'s needed to generate meaningful signals, not arbitrary volume quotas)'),
                        getTranslation(translations, 'honesty.not.item4', 'Instant results (good learning takes 3-6 weeks minimum, not 5 days) and guaranteed "Yes" answer on market entry (sometimes the honest answer is "No" or "Not yet")'),
                        getTranslation(translations, 'honesty.not.item5', 'Direct legal/regulatory services (we coordinate with compliance partners; we\'re not a law firm)'),
                        getTranslation(translations, 'honesty.not.item6', 'Bottom-funnel purchase proof unless you allow the test sale setup so we can have a way to measure')
                      ].map((item, idx) => (
                          <li key={idx} className="flex gap-4 text-sm text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-500 mt-2 shrink-0 transition-colors" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </Card>
          </div>
        </section>

        {/* Final CTA with FAQ */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/20 blur-[120px] -z-10"></div>
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="mb-24">
              <Heading level={2} className="text-5xl md:text-6xl text-white mb-8 tracking-tighter">
                {getTranslation(translations, 'final.title', 'Stop Guessing. Start Learning. Scale What Works.')}
              </Heading>
              
              <Paragraph className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                {getTranslation(translations, 'final.description', "If you want to copy others blindly and purely make media content, hire an agency. If you want a brand acceleration system that helps you make better decisions about Vietnam at every stage of your journey, let's talk.")}
              </Paragraph>

              {/* FAQ Section */}
              <div className="text-left max-w-3xl mx-auto mb-20 relative">
                <div className="absolute -inset-4 bg-white/[0.02] rounded-[3rem] blur-xl -z-10" />
                <div className="flex items-center gap-4 mb-10 justify-center">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <HelpCircle size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {getTranslation(translations, 'faq.title', 'FAQ: WHICH PACKAGE DO I NEED?')}
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      q: getTranslation(translations, 'faq.item1.q', 'How do I know which package is right for me?'),
                      a: getTranslation(translations, 'faq.item1.a', 'We can help you figure out your current stage and which package suits you the most for FREE. Click "Apply for Access" below, answer a few questions about your Vietnam presence and goals, and you\'ll receive a personalized recommendation plus the option to book a strategy call with our team.')
                    },
                    {
                      q: getTranslation(translations, 'faq.item2.q', 'Can I skip Stage 1 and go straight to Stage 3?'),
                      a: getTranslation(translations, 'faq.item2.a', 'Only if you already have a clear understanding of your Vietnamese customer (equivalent to Stage 2 complete). We\'ll assess this in qualification.')
                    },
                    {
                      q: getTranslation(translations, 'faq.item3.q', 'What if I don\'t have all the answers about my Vietnam strategy yet?'),
                      a: getTranslation(translations, 'faq.item3.a', 'That\'s exactly why our qualification system exists. The questions will help clarify what you know, what you don\'t know, and what your biggest bottleneck is. Even if you\'re uncertain, the process itself provides clarity.')
                    },
                    {
                      q: getTranslation(translations, 'faq.item4.q', 'How long does the qualification process take?'),
                      a: getTranslation(translations, 'faq.item4.a', 'The qualification form takes 3-5 minutes. You\'ll receive your stage recommendation immediately, and can book a call at your convenience.')
                    },
                    {
                      q: getTranslation(translations, 'faq.item5.q', 'Do I have to commit to a package after the qualification call?'),
                      a: getTranslation(translations, 'faq.item5.a', 'No. The qualification and strategy call are designed to give you clarity on whether this is the right fit. Many clients realize they need to complete internal preparation before starting, and that\'s valuable intelligence.')
                    },
                    {
                      q: getTranslation(translations, 'faq.item6.q', 'What if the honest answer from Stage 1 is "Don\'t enter Vietnam"?'),
                      a: getTranslation(translations, 'faq.item6.a', 'Then we\'ve saved you $50K-100K+ in wasted investment. That\'s valuable intelligence, and you\'ll have documented insights on why the timing isn\'t right and what would need to change.')
                    }
                  ].map((faq, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 p-8 group hover:bg-white/[0.08] transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Star size={20} className="fill-current" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{faq.q}</h4>
                          <p className="text-slate-400 leading-relaxed text-sm">{faq.a}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="relative group inline-block">
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all duration-500" />
                <Link href="/book-a-call?solution_for=beauty">
                  <Button variant="primary" className="text-2xl px-16 py-6 shadow-2xl relative">
                    {getTranslation(translations, 'final.cta', 'Apply for Access')} <Rocket className="ml-3 w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <p className="mt-10 text-slate-500 italic text-sm font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
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
