'use client';
import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Play,
  Check,
  X,
  ShieldAlert,
  Brain,
  Zap,
  Scale,
  Copy,
  Lock,
  Layers,
  Clock
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

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
}> = ({ children, variant = 'primary', className = '', fullWidth = false }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "primary-button",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    outline: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50"
  };

  if (variant === 'primary') {
    return (
      <button className={`primary-button ${fullWidth ? 'w-full' : ''} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
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

const chartData = [
  { value: 20 }, { value: 35 }, { value: 30 }, { value: 55 }, { value: 45 }, { value: 70 }, { value: 85 }
];

// --- Sub-components ---

const HeroSection: React.FC = () => {
  const { translations } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative pt-10 md:pb-5 overflow-hidden">
      <VideoOverlay isOpen={showVideo} onClose={() => setShowVideo(false)} videoId="-DpyotBDzo0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <SectionTag>{getTranslation(translations, 'hero.tag', 'AI-powered Branding & Social Commerce for FMCG Brands entering New Market')}</SectionTag>
        <Heading level={1} className="text-white">
          {getTranslation(translations, 'hero.title', 'Stop Paying Influencers to Improvise. Build Agents You Own.')}
        </Heading>
        <Paragraph className="max-w-2xl mx-auto mb-10 text-xl">
          {getTranslation(translations, 'hero.subtitle', 'We deploy an AI-driven creative operating system that mines first-party data from controlled creative experiments, and converts winning patterns into reusable playbooks you can scale.')}
        </Paragraph>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
            {getTranslation(translations, 'hero.cta1', 'Apply for Access')} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <div onClick={() => setShowVideo(true)} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 group">
              {getTranslation(translations, 'hero.cta2', 'See a Demo')} <Play className="ml-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof: React.FC = () => {
  const { translations } = useLanguage();
  const stats = [
    { label: getTranslation(translations, 'social.revenue.impact', 'Revenue Impact'), value: "70M", icon: DollarSign, sub: getTranslation(translations, 'social.revenue.sub', 'Attributed via optimization') },
    { label: getTranslation(translations, 'social.organic.views', 'Organic Views'), value: "6B+", icon: Users, sub: getTranslation(translations, 'social.organic.sub', 'Across social media') },
    { label: getTranslation(translations, 'social.adspend.managed', 'Ad Spend Managed'), value: "10M+", icon: TrendingUp, sub: getTranslation(translations, 'social.adspend.sub', 'Optimized by our team') },
    { label: getTranslation(translations, 'social.campaigns.title', 'Campaigns'), value: "375", icon: Activity, sub: getTranslation(translations, 'social.campaigns.sub', 'Successful launches') },
  ];

  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
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
                  <AreaChart data={chartData}>
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
  );
};

const FitFilter: React.FC = () => {
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
            <h3 className="text-xl font-bold">{getTranslation(translations, 'fit.for.title', 'This Is For You If:')}</h3>
          </div>
          <ul className="space-y-4">
            {[
              getTranslation(translations, 'fit.for.item1', "You’ve spent tens of thousands on influencers and social media, but cannot point to single repeatable pattern that drive results"),
              getTranslation(translations, 'fit.for.item2', "You sense that Vietnamese consumers are changing fast but you do not know how to respond"),
              getTranslation(translations, 'fit.for.item3', "You’ve had viral moments that felt like luck but you can’t replicate them sustainably"),
              getTranslation(translations, 'fit.for.item4', "You’re entering or expanding in Vietnam/SEA with a real product, real e-commerce site, and need to learn what works fast")
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
              getTranslation(translations, 'fit.not.item1', 'You want a few videos with no testing, no irritation, no learning loop'),
              getTranslation(translations, 'fit.not.item2', 'You’re happy with one-time campaigns and do not need a sustainable playbook'),
              getTranslation(translations, 'fit.not.item3', 'You expect guaranteed revenue from day one without needing a scaling system'),
              getTranslation(translations, 'fit.not.item4', 'You’re domestic-only and offline-first with no interest in international expansion'),
              getTranslation(translations, 'fit.not.item5', 'You want to hide the fact that AI was used (we believe transparency is the key to trust)')
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

const MarketShiftSection: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="py-24 bg-indigo-950/10 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <SectionTag>{getTranslation(translations, 'shift.tag', 'Market Context')}</SectionTag>
          <Heading level={2} className="text-white">
            {getTranslation(translations, 'shift.title', 'Our Creative Marketing World has Changed Drastically')}
          </Heading>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { text: getTranslation(translations, 'shift.item1', 'Distribution is now mediated by AI platforms'), icon: Zap },
            { text: getTranslation(translations, 'shift.item2', 'Visibility used to come from people, now it comes from the algorithm'), icon: Users },
            { text: getTranslation(translations, 'shift.item3', 'Advantage shifts from "more content" to structured data + algorithmic optimization'), icon: Brain },
            { text: getTranslation(translations, 'shift.item4', 'The buyer journey compresses toward instant, zero-click decisions'), icon: TrendingUp },
            { text: getTranslation(translations, 'shift.item5', 'Trust still matters, but velocity determines who earns it first'), icon: Clock },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <item.icon size={20} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 text-center">
          <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {getTranslation(translations, 'shift.conclusion', 'The real problem behind failing campaigns is not “low views", but variance and lack of accumulated learning that create cost.')}
          </p>
        </div>
      </div>
    </section>
  );
};

const ProblemSection: React.FC = () => {
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
          {getTranslation(translations, 'problem.description', 'Visibility used to come from people. Now it comes from the algorithm. When brands outsource creative direction without capturing learnings, they keep paying for the same lessons again and again.')}
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
      </div>
    </section>
  );
};

const SolutionProtocol: React.FC = () => {
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
          <p className="text-slate-500 text-sm mt-4 italic max-w-2xl mx-auto">
            {getTranslation(translations, 'solution.subtitle', '*Creative Validated Plays: reusable combinations of hook, proof and format, with verified conditions and contexts')}
          </p>
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
              {i < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20 text-slate-700">
                  <ArrowRight className="w-8 h-8 opacity-20" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="border-l-4 border-indigo-500 pl-4 inline-block text-left max-w-2xl">
            <p className="text-white font-medium text-lg">
              {getTranslation(translations, 'solution.footer', "We're not anti‑creator. We're anti‑improve. We separate what must scale from what must be earned.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const OperatingModel: React.FC = () => {
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

const ComparisonTable: React.FC = () => {
  const { translations } = useLanguage();
  const rows = [
    { feature: getTranslation(translations, 'vs.row1.feature', "Strategy"), old: getTranslation(translations, 'vs.row1.old', "Hoping for a hit"), new: getTranslation(translations, 'vs.row1.new', "Reducing variance with testing") },
    { feature: getTranslation(translations, 'vs.row2.feature', "Learning"), old: getTranslation(translations, 'vs.row2.old', "Scattered in people's heads"), new: getTranslation(translations, 'vs.row2.new', "Compounding: Validated Creative Plays") },
    { feature: getTranslation(translations, 'vs.row3.feature', "Speed"), old: getTranslation(translations, 'vs.row3.old', "Slow briefing cycles"), new: getTranslation(translations, 'vs.row3.new', "AI‑accelerated execution in days") },
    { feature: getTranslation(translations, 'vs.row4.feature', "Measurement"), old: getTranslation(translations, 'vs.row4.old', "Vanity metrics dominate"), new: getTranslation(translations, 'vs.row4.new', "Scorecards, gates, and rules") },
    { feature: getTranslation(translations, 'vs.row5.feature', "Outcome"), old: getTranslation(translations, 'vs.row5.old', "Awareness without clarity"), new: getTranslation(translations, 'vs.row5.new', "Decision clarity + repeatable winners") },
  ];

  return (
    <section className="pb-24 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <SectionTag>{getTranslation(translations, 'vs.tag', 'Us vs. Them')}</SectionTag>
          <Heading>{getTranslation(translations, 'vs.title', 'Amateurs Guess. Professionals Engineer.')}</Heading>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 md:p-6 text-sm font-bold text-slate-400 uppercase">{getTranslation(translations, 'vs.header.feature', 'Feature')}</th>
                <th className="p-4 md:p-6 text-sm font-bold text-slate-400 uppercase">{getTranslation(translations, 'vs.header.old', 'Traditional Agency')}</th>
                <th className="p-4 md:p-6 text-sm font-bold text-indigo-400 uppercase bg-indigo-500/10">{getTranslation(translations, 'vs.header.new', 'Creative Intelligence Agents')}</th>
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

const Deliverables: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="pb-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionTag>{getTranslation(translations, 'asset.tag', 'The War Chest')}</SectionTag>
          <Heading>{getTranslation(translations, 'asset.title', "Don't Rent Content. Own the Asset.")}</Heading>
          <Paragraph className="max-w-2xl mx-auto">
            {getTranslation(translations, 'asset.description', "You aren't paying for a one‑off service. You're acquiring a compounding intelligence asset.")}
          </Paragraph>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: getTranslation(translations, 'asset.col1.title', "The Brain"), sub: getTranslation(translations, 'asset.col1.sub', "Decision Intelligence"), icon: Brain, items: [getTranslation(translations, 'asset.col1.item1', "Customer Decision Intelligence Map"), getTranslation(translations, 'asset.col1.item2', "Objection Library + Responses"), getTranslation(translations, 'asset.col1.item3', "Validated Creative Plays Library")] },
                { title: getTranslation(translations, 'asset.col2.title', "The Fuel"), sub: getTranslation(translations, 'asset.col2.sub', "AI-Accelerated Output"), icon: Layers, items: [getTranslation(translations, 'asset.col2.item1', "Monthly conversion-first assets"), getTranslation(translations, 'asset.col2.item2', "Whitelisted access setups"), getTranslation(translations, 'asset.col2.item3', "Unlimited usage rights")] },
                { title: getTranslation(translations, 'asset.col3.title', "The Compass"), sub: getTranslation(translations, 'asset.col3.sub', "Scale Decisions"), icon: Lock, items: [getTranslation(translations, 'asset.col3.item1', "Creative Scorecards"), getTranslation(translations, 'asset.col3.item2', "Weekly Decision Memos"), getTranslation(translations, 'asset.col3.item3', "Profit-focused Signal Reports")] }
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

const Timeline: React.FC = () => {
    const { translations } = useLanguage();
    return (
        <section className="pb-12 bg-slate-900/30">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <SectionTag>{getTranslation(translations, 'timeline.tag', 'Risk Removal')}</SectionTag>
                    <Heading>{getTranslation(translations, 'timeline.title', 'The First 30 Days')}</Heading>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-500/50 md:left-1/2 md:-translate-x-1/2"></div>
                    {[
                        { week: getTranslation(translations, 'timeline.week1.id', "Week 1"), title: getTranslation(translations, 'timeline.week1.title', "Map & Install"), desc: getTranslation(translations, 'timeline.week1.desc', "Map the decision + install scorecard rules.") },
                        { week: getTranslation(translations, 'timeline.week2.id', "Week 2-3"), title: getTranslation(translations, 'timeline.week2.title', "Ship & Isolate"), desc: getTranslation(translations, 'timeline.week2.desc', "Ship fast variants, isolate what works, create Validated Plays.") },
                        { week: getTranslation(translations, 'timeline.week4.id', "Week 4"), title: getTranslation(translations, 'timeline.week4.title', "Build Scale Plan"), desc: getTranslation(translations, 'timeline.week4.desc', "What gets budget, what gets killed, what repeats.") }
                    ].map((step, i) => (
                        <div key={i} className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                             <div className="flex-1 md:text-right"></div>
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

const CredibilityBlock: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <div className="pb-12 border-t border-white/5 bg-red-900/5">
        <div className="container mx-auto px-4 text-center">
            <h4 className="text-red-400 font-bold uppercase tracking-widest mb-4 text-sm">{getTranslation(translations, 'refuse.tag', 'What We Refuse')}</h4>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400">
                <span>{getTranslation(translations, 'refuse.item1', 'No Content Calendars')}</span>
                <span>•</span>
                <span>{getTranslation(translations, 'refuse.item2', 'No ROAS without Measurement')}</span>
                <span>•</span>
                <span>{getTranslation(translations, 'refuse.item3', 'No Deceptive Synths')}</span>
                <span>•</span>
                <span>{getTranslation(translations, 'refuse.item4', 'No Vanity Views')}</span>
            </div>
        </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <footer className="pb-12 border-t border-white/10 bg-black text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {getTranslation(translations, 'footer.rights', 'Digicon Pro. All rights reserved.')}</p>
    </footer>
  );
};

const FinalCTA: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20 blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
             <Heading level={2} className="text-5xl mb-8 text-white">
                {getTranslation(translations, 'final.title', 'Stop Restarting. Start Compounding.')}
             </Heading>
             <Paragraph className="mb-10 text-xl">
                {getTranslation(translations, 'final.description_prefix', 'If you want "content," hire an agency. If you want ')}
                <strong>{getTranslation(translations, 'final.description_highlight', 'Creative Intelligence AI Agents')}</strong>
                {getTranslation(translations, 'final.description_suffix', ' that turn buyer truth into Validated Creative Plays—we should talk.')}
             </Paragraph>
             <Button variant="primary" className="text-lg px-12 py-4">
                {getTranslation(translations, 'final.cta', 'Apply for Access')} <ArrowRight className="ml-2" />
             </Button>
             <p className="mt-6 text-sm text-slate-500">
                {getTranslation(translations, 'final.footer', "We'll tell you quickly if this is a fit. If not, you leave with clarity.")}
             </p>
        </div>
    </section>
  );
};

export const OtherContent: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <main>
        <HeroSection />
        <SocialProof />
        <FitFilter />
        <MarketShiftSection />
        <ProblemSection />
        <SolutionProtocol />
        <OperatingModel />
        
        <div className="container mx-auto px-4 py-12 text-center">
            <div className="glass-card max-w-2xl mx-auto p-8">
                <Heading level={3} className="text-white">
                  {getTranslation(translations, 'week1.title', 'What You Get in Week 1')}
                </Heading>
                <Paragraph className="mb-6 text-sm">
                  {getTranslation(translations, 'week1.description', 'Customer Decision Intelligence Map • Creative Scorecard • Ship/No-Ship Thresholds')}
                </Paragraph>
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
                  {getTranslation(translations, 'week1.cta', 'Request a redacted sample pack')}
                </a>
            </div>
        </div>

        <ComparisonTable />
        <Deliverables />
        <Timeline />
        <CredibilityBlock />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
};


