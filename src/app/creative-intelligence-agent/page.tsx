'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { HeroSection, SocialProof } from './components/HeroSection';
import { FitFilter, ProblemSection, SolutionProtocol, OperatingModel } from './components/FeatureSection';
import { ComparisonTable, Deliverables, Timeline, CredibilityBlock } from './components/ComparisonAndDeliverables';
import { Button, Heading, Paragraph } from './components/UI';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => (
    <footer className="pb-12 border-t border-white/10 bg-black text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Digicon Pro. All rights reserved.</p>
    </footer>
);

const FinalCTA: React.FC = () => (
    <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20 blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
             <Heading level={2} className="text-5xl mb-8 text-white">Stop Restarting. <br/><span className="gradient-brand">Start Compounding.</span></Heading>
             <Paragraph className="mb-10 text-xl">
                If you want &quot;content,&quot; hire an agency. <br/>
                If you want <strong>Creative Intelligence AI Agents</strong> that turn buyer truth into Validated Creative Plays—we should talk.
             </Paragraph>
             <Button variant="primary" className="text-lg px-12 py-4">
                Apply for Access <ArrowRight className="ml-2" />
             </Button>
             <p className="mt-6 text-sm text-slate-500">
                We&apos;ll tell you quickly if this is a fit. If not, you leave with clarity.
             </p>
        </div>
    </section>
);

export default function CreativeIntelligenceAgentPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Header with Logo and Button */}
      <header className="w-full px-4 py-8 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="logo-container">
            <Image
              src="/Digicon_Logo_white.png"
              alt="Digicon Logo"
              width={200}
              height={80}
              priority
            />
          </div>
          {/* Desktop Button - Hidden on mobile */}
          <Link href="/" className="primary-button-outline hidden md:flex">
          Visibility Scaling AI Agents
          </Link>
          {/* Mobile Burger Menu - Only visible on mobile */}
          <button
            className="flex md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 px-4 py-4 z-50">
            <Link
              href="/"
              className="primary-button-outline w-full block text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Visibility Scaling AI Agents
            </Link>
          </div>
        )}
      </header>
      
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
                <Heading level={3} className="text-white">What You Get in Week 1</Heading>
                <Paragraph className="mb-6 text-sm">
                    Customer Decision Intelligence Map • Creative Scorecard • Ship/No-Ship Thresholds
                </Paragraph>
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Request a redacted sample pack</a>
            </div>
        </div>

        <ComparisonTable />
        <Deliverables />
        <Timeline />
        <CredibilityBlock />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

