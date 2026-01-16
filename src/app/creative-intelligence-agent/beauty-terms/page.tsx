'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function BeautyTermsPage() {
  return (
    <main className="min-h-screen bg-black text-slate-300 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/creative-intelligence-agent" 
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Creative Intelligence Agent
        </Link>

        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Terms of Use</h1>
              <p className="text-slate-500">Last updated: Jan 15, 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400">
            <section>
              <p className="text-lg leading-relaxed">
                THIS TERMS OF USE AGREEMENT (the “Agreement”) is a legally binding agreement between DIGICON (the “Company”) and the client (“Client”). It covers the Client’s purchase and use of DIGICON’s services for beauty brands entering Vietnam (the “Services”). If the Client does not agree with these terms, the Client must not use the Services. If the Client stops using the Services, any payment owed for Services already started still remains due.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-slate-200">“Client”</strong> means the person or company buying the Services.</li>
                <li><strong className="text-slate-200">“Company”</strong> means DIGICON (and its employees, contractors, and approved partners).</li>
                <li><strong className="text-slate-200">“Services”</strong> means the work DIGICON provides under a package (SKU-S1, SKU-S2, SKU-S3, SKU-S4) and/or a written Statement of Work.</li>
                <li><strong className="text-slate-200">“Created Assets”</strong> means the files we create for the Client during the Services (examples: AI Visual Pack, video drafts, scripts, dashboards, reports, and documents).</li>
                <li><strong className="text-slate-200">“Dashboard”</strong> means the simple page that shows the signals we track (from sources described in Section 9).</li>
                <li><strong className="text-slate-200">“Small test sale”</strong> means a short selling test (30–60 days) with clear pass/fail rules, before scaling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Services and Package Scope</h2>
              <p>
                DIGICON provides four service packages. The exact scope and timeline are described in a written proposal or Statement of Work. If there is any conflict, the signed proposal or Statement of Work controls.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-1">
                <li>SKU-S1 — Signal Mining Sprint (Go/No-Go)</li>
                <li>SKU-S2 — Intent Signal Mining Engine</li>
                <li>SKU-S3 — Distributor Proof Pack + Test Sale Setup</li>
                <li>SKU-S4 — Sales Fix Engine (Gated) — Enterprise (no fixed price yet; still under development)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. No Guaranteed Outcomes (Very Important)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>DIGICON does not promise sales or scaling.</li>
                <li>DIGICON does not guarantee a signed distributor contract.</li>
                <li>DIGICON provides evidence based on signals and data we can access. Results depend on many factors outside DIGICON’s control (product, price, operations, inventory, platform changes, and more).</li>
              </ul>
              
              <div className="mt-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-indigo-400 font-bold mb-4 uppercase tracking-wider text-sm">Stage truth (what we can and cannot prove):</h3>
                <ul className="space-y-4 text-sm">
                  <li><strong className="text-slate-200">SKU-S1:</strong> We can prove people notice and react (views, saves, shares, questions, doubts). We cannot prove buying because there is no purchase data.</li>
                  <li><strong className="text-slate-200">SKU-S2:</strong> We can prove what message and trust details work again and again (repeat patterns in questions and doubts).</li>
                  <li><strong className="text-slate-200">SKU-S3:</strong> We can prove real buying only if we run the small test sale (30–60 days). If we do not run the test sale, we do not claim purchase proof.</li>
                  <li><strong className="text-slate-200">SKU-S4:</strong> We can prove where sales are leaking and what change improves results using sales/behavior data we can access. If the data is not available, we can only prove what the available signals show.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property Rights</h2>
              <p>All Created Assets produced for the Client are subject to the terms below:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>After full payment, the Client owns the Created Assets (the files we deliver).</li>
                <li>The Client understands that the tools, AI methods, software, and processes used to create the Created Assets remain the Company’s property.</li>
                <li>The Company may keep copies of Created Assets for backup and service improvement. The Client is responsible for keeping their own copies.</li>
              </ul>
              <p className="mt-4 italic">
                Showcasing work: the Company may share Created Assets for marketing (website, social media, case studies) unless the parties agree to an NDA in writing. If an NDA is signed, the Company will not publicly share the Client’s work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Use and Limitations of Created Assets</h2>
              <p>The Client may use the Created Assets for business purposes. The Client agrees not to use the Created Assets in a way that:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>breaks the law or platform rules (example: TikTok rules),</li>
                <li>is misleading, fraudulent, or defamatory,</li>
                <li>makes illegal or unsupported product claims,</li>
                <li>hides required disclosures or misrepresents AI-generated content.</li>
              </ul>
              <p className="mt-4">
                The Client is responsible for how the Created Assets are used and published. If the Client changes the Created Assets, the Company is not responsible for the quality, effectiveness, or legality of the modified version.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Third-Party Content</h2>
              <p>
                Some work may include third-party content (example: music, templates, footage, fonts). If a license is required, the Client is responsible for obtaining it. The Company is not responsible for any issue caused by missing third-party licenses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Client Responsibilities</h2>
              <p>The Client agrees to cooperate in a timely manner so the Services can be delivered. This includes:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>providing accurate product and brand information,</li>
                <li>providing access needed for the work (example: TikTok account access or analytics access when required),</li>
                <li>reviewing and approving deliverables in a reasonable time,</li>
                <li>following claim-safety and disclosure rules.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Client Inactivity</h2>
              <p>
                If the Client does not respond or does not complete required actions for a total of 30 days or more (continuous or separate days), the Company may mark the project as inactive and archive or close it. In such cases, there is no refund unless the law requires it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Compliance and Claims Safety (Partner-Coordinated)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Company will apply claim-safety rules (safe / restricted / not allowed).</li>
                <li>The Company is not a law firm and does not provide legal licensing/registration services.</li>
                <li>If legal licensing/registration is needed, the Company may coordinate qualified partners.</li>
                <li>If the Client requests unsafe or prohibited claims, the Company may refuse or require the claim to be changed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">10. Data, Signals, and Dashboard Sources</h2>
              <p>The Dashboard and analysis may use data from:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>TikTok analytics (views, watch time, saves, shares).</li>
                <li>TikTok comments and DMs (questions, doubts, buying questions).</li>
                <li>Link clicks (only if a link exists).</li>
                <li>If a small test sale is run (SKU-S3): KOC/seller results.</li>
                <li>If sales data exists (SKU-S4): online/offline sales and drop-off points.</li>
              </ul>
              <p className="mt-4">
                The Client agrees to provide access to the available data sources needed for the Services. If data access is limited, the Company will reduce what it can prove and what it can promise.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">11. Fees, Payment, and Refunds</h2>
              <p>Fees are shown in the Client’s proposal or invoice. Standard package prices are:</p>
              <ul className="list-disc pl-6 mt-4 space-y-1 text-slate-200">
                <li>SKU-S1: USD 10,000</li>
                <li>SKU-S2: USD 15,000</li>
                <li>SKU-S3: USD 30,000</li>
                <li>SKU-S4: Enterprise pricing (no fixed price yet; still under development)</li>
              </ul>
              <p className="mt-4">
                Payment is due in advance unless the parties agree otherwise in writing. Once work has started, fees are non-refundable unless the law requires it. If the Client becomes inactive (Section 8), the project may be closed without refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">12. Changes to Services</h2>
              <p>
                Platforms can change (example: TikTok rules, features, or analytics). The Company may adjust the method of delivery to match platform changes, while keeping the agreed scope and goals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">13. Disclaimer</h2>
              <p>
                The Services are provided “as is” and “as available.” The Company makes no warranty that the Services will produce specific business results. The Client uses the Services at their own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">14. Limitations of Liability and Indemnity</h2>
              <p>
                To the maximum extent allowed by law, the Company is not liable for indirect or special damages (including lost profits, lost revenue, or lost data). The Client agrees to defend and hold the Company harmless from third-party claims caused by the Client’s misuse of the Services or Created Assets.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">15. Electronic Communications</h2>
              <p>
                The Client agrees that communications by email or digital tools are valid. The Client agrees to electronic signatures and electronic delivery of notices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">16. Governing Law</h2>
              <p>
                This Agreement is governed by the laws of the jurisdiction stated in the signed proposal or Statement of Work. If not stated, the governing law is Singapore.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">17. Miscellaneous</h2>
              <p>
                These Terms, together with the signed proposal or Statement of Work, form the entire agreement between the parties for the Services. If any part of this Agreement is found unenforceable, the rest remains in effect.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">18. Contact Information</h2>
              <p>
                For questions about these Terms & Conditions, contact DIGICON at: 
                <a href="mailto:support@digicon.pro" className="text-indigo-400 hover:underline ml-1">support@digicon.pro</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

