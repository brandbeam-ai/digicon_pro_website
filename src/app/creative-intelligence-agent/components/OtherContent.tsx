'use client';
import React from 'react';
import { HeroSection, SocialProof } from './HeroSection';
import { FitFilter, ProblemSection, SolutionProtocol, OperatingModel } from './FeatureSection';
import { ComparisonTable, Deliverables, Timeline, CredibilityBlock } from './ComparisonAndDeliverables';
import { Button, Heading, Paragraph } from './UI';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

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
        <ProblemSection />
        <SolutionProtocol />
        <OperatingModel />
        
        {/* Retention Block 2 Link Simulated */}
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

