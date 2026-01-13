'use client';

import React from 'react';
import { 
  RefreshCcw, 
  Search, 
  BarChart2, 
  AlertCircle
} from 'lucide-react';

export const NotICPContent: React.FC = () => {
  return (
    <>
      {/* Three Marketing Moves Section */}
      <div className="mb-16 mt-8 pt-8 border-t border-white/10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">3 Foundational Actions for the AI Era</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Move 1 */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <RefreshCcw size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-3">1. Close the Loop</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Execution is cheap. The advantage shifts to speed of learning.
            </p>
            <div className="bg-black/40 rounded-lg p-3 mb-4 border border-white/5">
              <p className="text-indigo-300 text-xs font-mono text-center">
                Sense → Decide → Update
              </p>
            </div>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-indigo-500">•</span>
                <span>Pick <strong>one outcome metric</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500">•</span>
                <span>Establish weekly rhythm</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500">•</span>
                <span>Keep a decision log</span>
              </li>
            </ul>
          </div>

          {/* Move 2 */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Search size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-3">2. AI Search Reality</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Ranking no longer guarantees traffic. The search page is the destination.
            </p>
            <ul className="space-y-2 text-slate-300 text-sm mt-auto">
              <li className="flex gap-2">
                <span className="text-purple-500">•</span>
                <span>Publish <strong>citable assets</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500">•</span>
                <span>Build non-Google channels</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500">•</span>
                <span>Track visibility, not just clicks</span>
              </li>
            </ul>
          </div>

          {/* Move 3 */}
          <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 rounded-2xl p-6 border border-white/10 hover:border-teal-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
              <BarChart2 size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-3">3. Causal Measurement</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              AI generates dashboards instantly. It can&apos;t tell you <em>why</em> growth happened.
            </p>
            <ul className="space-y-2 text-slate-300 text-sm mt-auto">
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                <span>Increase <strong>test velocity</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                <span>Clean up tracking</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                <span>Think incrementality</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Level-Specific Advice */}
      <div className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Adaptation Roadmap</h3>
        
        <div className="space-y-4">
          {/* Level 1 Accordion Style */}
          <div className="group border border-teal-500/20 rounded-2xl overflow-hidden hover:bg-teal-500/5 transition-colors">
            <div className="p-6 cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold border border-teal-500/20">1</div>
                <div>
                  <h4 className="text-xl font-bold text-white">The Signal Seeker</h4>
                  <p className="text-slate-400 text-sm">Focus: Finding Resonance</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 pl-14">
                <div>
                  <p className="font-semibold text-teal-400 text-sm mb-2 uppercase tracking-wider">Start Here</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Publish citable assets & unique data</li>
                    <li>• Test hooks with short-form video</li>
                    <li>• Build one owned channel (email/community)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-teal-400 text-sm mb-2 uppercase tracking-wider">The Loop</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Pick one KPI (views/retention)</li>
                    <li>• Run one small test/week</li>
                    <li>• Aim for consistent volume</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Level 2 Accordion Style */}
          <div className="group border border-blue-500/20 rounded-2xl overflow-hidden hover:bg-blue-500/5 transition-colors">
            <div className="p-6 cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">2</div>
                <div>
                  <h4 className="text-xl font-bold text-white">The System Builder</h4>
                  <p className="text-slate-400 text-sm">Focus: Scaling & Quality</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pl-14">
                <div>
                  <p className="font-semibold text-blue-400 text-sm mb-2 uppercase tracking-wider">Infrastructure</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• TikTok SEO optimization</li>
                    <li>• Clean product imagery</li>
                    <li>• Active review management</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-400 text-sm mb-2 uppercase tracking-wider">Content System</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Build Content Flywheel</li>
                    <li>• Mix in-house + Creator + AI</li>
                    <li>• Create virtuous cycles</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-400 text-sm mb-2 uppercase tracking-wider">Velocity</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Multiple weekly experiments</li>
                    <li>• Incrementality thinking</li>
                    <li>• Fix tracking gaps</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Level 3 Accordion Style */}
          <div className="group border border-purple-500/20 rounded-2xl overflow-hidden hover:bg-purple-500/5 transition-colors">
            <div className="p-6 cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold border border-purple-500/20">3</div>
                <div>
                  <h4 className="text-xl font-bold text-white">The Performance Scaler</h4>
                  <p className="text-slate-400 text-sm">Focus: Profitability at Scale</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pl-14">
                <div>
                  <p className="font-semibold text-purple-400 text-sm mb-2 uppercase tracking-wider">ACE Framework</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Optimize SKU mix & bundles</li>
                    <li>• Sophisticated content types</li>
                    <li>• Operational efficiency</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-purple-400 text-sm mb-2 uppercase tracking-wider">Advanced Dist.</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Paid + Organic integration</li>
                    <li>• Automated bidding (ROAS)</li>
                    <li>• Verified purchase data</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-purple-400 text-sm mb-2 uppercase tracking-wider">AI Scaling</p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Use AI for production speed</li>
                    <li>• Auto-translation & dubbing</li>
                    <li>• High experiment velocity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Starting Point - Timeline View */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Your 30-Day Starting Point</h3>
        <div className="relative border-l border-indigo-500/30 ml-4 md:ml-8 space-y-8 pl-8 md:pl-12 py-2">
          
          <div className="relative">
            <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-indigo-500 border-4 border-black shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <h5 className="text-lg font-bold text-white mb-1">Week 1: The Setup</h5>
            <p className="text-slate-400 text-sm">Define one KPI, set up decision log, run one small test.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-indigo-900 border-4 border-black"></div>
            <h5 className="text-lg font-bold text-white mb-1">Week 2: Activation</h5>
            <p className="text-slate-400 text-sm">Publish one citable asset and activate one non-Google channel.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-indigo-900 border-4 border-black"></div>
            <h5 className="text-lg font-bold text-white mb-1">Week 3: Velocity</h5>
            <p className="text-slate-400 text-sm">Run multiple small experiments; fix tracking gaps.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-indigo-900 border-4 border-black"></div>
            <h5 className="text-lg font-bold text-white mb-1">Week 4: Review</h5>
            <p className="text-slate-400 text-sm">Review learnings, cut losers, lock the next cycle.</p>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm italic mt-8">
          &quot;Speed, clarity, and learning quality matter more than scale at this stage.&quot;
        </p>
      </div>

      {/* Additional Note */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex gap-4 items-start">
        <AlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
        <p className="text-slate-400 text-sm">
          <strong className="text-yellow-400">Note:</strong> While our service may not be the right fit today, this framework guides you to adapt AI in marketing at any maturity level.
        </p>
      </div>
    </>
  );
};
