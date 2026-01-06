'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Smooth scrolling for buttons/links
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // You can add actual navigation logic here
        console.log('Button clicked:', this.textContent);
      });
    });

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      const sectionEl = section as HTMLElement;
      sectionEl.style.opacity = '0';
      sectionEl.style.transform = 'translateY(30px)';
      sectionEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    // Cleanup
    return () => {
      observer.disconnect();
      buttons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="bg-black text-slate-200 font-sans min-h-screen main-page">
      {/* Header with Logo and Button */}
      <header className="w-full px-4 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="logo-container">
            <Image
              src="/Digicon_Logo.png"
              alt="Digicon Logo"
              width={200}
              height={80}
              priority
              
            />
          </div>
          <a href="/creative-intelligence-agent" className="primary-button-outline">
            Get Your Customer Intelligence Scorecard
          </a>
        </div>
      </header>

      {/* Section 1: Hero */}
      <section className="bg-black flex flex-col relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold mb-6 text-slate-300">
            <span className="text-white">Consumer Good</span>
            <span className="gradient-brand"> Brands</span>
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
          {/* <p className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700"> */}
            Get <span className="gradient-brand">1M-100M views</span> in 90 days on social media
          </h1>
          {/* <p className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700"> */}
            {/* or we work for <span className="text-accent">free</span>.
          </p> */}
          <p className="text-lg md:text-xl mb-12 text-slate-400 max-w-3xl mx-auto">
            Backed by our Viral Content Research Lab, the system behind over 
            <span className="font-bold text-accent"> 6 billion views</span> and 
            <span className="font-bold text-accent"> 24 million followers</span>.
          </p>
          <a href="mailto:jay@digicon.pro" className="primary-button">
            Dominate Social Media
          </a>
        </div>
      </section>

      {/* Section 2: Video */}
      <section className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {!showVideo ? (
              <div 
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg cursor-pointer overflow-hidden group"
                onClick={() => setShowVideo(true)}
              >
                <div className="relative w-full h-full z-0">
                  <Image
                    src="/showreel_thumbnail.png"
                    alt="Digicon Pro Showreel 2025 Video Thumbnail"
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 group-hover:bg-opacity-40 transition-all z-10 pointer-events-none">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pointer-events-auto">
                    <svg className="w-12 h-12 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                src="https://www.youtube.com/embed/-DpyotBDzo0?autoplay=1"
                title="Digicon Pro Showreel 2025 Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Value Proposition */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Use maximum content distribution to 
              <span className="gradient-brand"> dominate social media</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">1/25th</div>
                <div className="text-lg font-semibold text-slate-300">Cost of Ads</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">Limited</div>
                <div className="text-lg font-semibold text-slate-300">Spots</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">Fully</div>
                <div className="text-lg font-semibold text-slate-300">Compliant</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl mb-8 text-slate-300 max-w-4xl mx-auto">
              We&apos;ve generated over <span className="font-bold text-accent">6 billion organic views </span> 
               in less than 2 years with our proprietary Viral Content Research Lab.
            </p>
            <h3 className="text-2xl font-bold mb-8 text-white">Work with us to:</h3>
            <div className="max-w-[450px] mx-auto text-center">
              <ul className="styled-list">
                <li>
                  <span className="text-lg text-slate-300">Have the fastest way to grow on social media today</span>
                </li>
                <li>
                  <span className="text-lg text-slate-300">Scale brands to post 100+ times per month</span>
                </li>
                <li>
                  <span className="text-lg text-slate-300">Get in front of millions more of the right people</span>
          </li>
                <li>
                  <span className="text-lg text-slate-300">Ensure top-quality across all the content posted</span>
          </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="mailto:jay@digicon.pro" className="primary-button">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Content Showcase */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
            (Just some) content we&apos;ve <span className="gradient-brand">created</span>
          </h2>
          
          {/* Scrolling Content Gallery */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll space-x-6">
              {/* First set of images */}
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_1.png" 
                  alt="Created Content 1" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_2.png" 
                  alt="Created Content 2" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_3.png" 
                  alt="Created Content 3" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_4.png" 
                  alt="Created Content 4" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_5.png" 
                  alt="Created Content 5" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_6.png" 
                  alt="Created Content 6" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_7.png" 
                  alt="Created Content 7" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_8.png" 
                  alt="Created Content 8" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_9.png" 
                  alt="Created Content 9" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_10.png" 
                  alt="Created Content 10" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Duplicate first 5 images for seamless loop */}
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_1.png" 
                  alt="Created Content 1" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_2.png" 
                  alt="Created Content 2" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_3.png" 
                  alt="Created Content 3" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
                <Image 
                  src="/created_content_4.png" 
                  alt="Created Content 4" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-48 h-80 rounded-2xl shadow-lg hover-lift-pink overflow-hidden">
            <Image
                  src="/created_content_5.png" 
                  alt="Created Content 5" 
                  width={192} 
                  height={320} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Problem Statement */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Most consumer good brands are generating a 
            <span className="gradient-brand"> small fraction</span> of the potential growth 
            from their organic content.
          </h2>
          <p className="text-xl mb-8 text-slate-400">
            (Even if you already have an audience in the millions)
          </p>
          <p className="text-xl mb-8 text-slate-300">
            This results in dramatically less exposure and growth for your brand.
          </p>
          <p className="text-2xl font-semibold mb-12 text-accent">
            You deserve more for your efforts.
          </p>
          <a href="mailto:jay@digicon.pro" className="primary-button">
            Talk to us
          </a>
        </div>
      </section>

      {/* Section 6: Brands that have grown with us */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
          Brands that have  <span className="gradient-brand">grown</span> with us
          </h2>
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* First row */}
            <div className="bg-white p-6 rounded-2xl hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/samsung_brand.png" 
                alt="Samsung" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/cocacola_brand.png" 
                alt="Coca Cola" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/lg_brand.png" 
                alt="LG" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/sony_brand.png" 
                alt="Sony" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/huawei_brand.png" 
                alt="Huawei" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {/* Second row */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/nvidia_brand.png" 
                alt="Nvidia" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/grab_brand.png" 
                alt="Grab" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/shopee_brand.png" 
                alt="Shopee" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/orion_brand.png" 
                alt="Orion" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/brand/hanwha_brand.png" 
                alt="Hanwha" 
                width={120} 
                height={60} 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Recognition */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
            Recognized by <span className="gradient-brand">publications </span> 
            as the #1 leading firm in social media growth
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/publications/publication_1.png"
                alt="Publication 1" 
                width={200} 
                height={100} 
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/publications/publication_2.png"
                alt="Publication 2" 
                width={200} 
                height={100} 
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/publications/publication_3.png"
                alt="Publication 3" 
                width={200} 
                height={100} 
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/publications/publication_4.png"
                alt="Publication 4" 
                width={200} 
                height={100} 
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift flex items-center justify-center" style={{height: '120px', width: '100%'}}>
              <Image 
                src="/publications/publication_5.png"
                alt="Publication 5" 
                width={200} 
                height={100} 
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: How It Works */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              How does it <span className="gradient-brand">work?</span>
            </h2>
            <p className="text-xl mb-8 text-slate-300 max-w-4xl mx-auto">
              Data-driven success formula discovery through our 
              <span className="font-bold text-accent"> &quot;Viral Content Research Lab&quot;</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
            <div className="glass-card p-8 rounded-2xl hover-lift-pink text-center">
              <div className="w-16 h-16 bg-brand-accent text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{backgroundColor: "#14b8a6"}}>
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Idea Generation</h3>
              <p className="text-slate-400">
                We analyze the latest TikTok trends, Gen Z interests, and competitor content daily to create a constant source of fresh ideas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-8 rounded-2xl hover-lift-pink text-center">
              <div className="w-16 h-16 bg-brand-accent text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{backgroundColor: "#14b8a6"}}>
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Rapid Testing</h3>
              <p className="text-slate-400">
                Generated ideas are uploaded to private test channels to gauge immediate consumer reactions and feedback.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-8 rounded-2xl hover-lift-pink text-center">
              <div className="w-16 h-16 bg-brand-accent text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{backgroundColor: "#14b8a6"}}>
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Data Validation</h3>
              <p className="text-slate-400">
                We objectively determine &apos;success&apos; and &apos;failure&apos; using clear metrics: views, comments, and share rates.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card p-8 rounded-2xl hover-lift-pink text-center">
              <div className="w-16 h-16 bg-brand-accent text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{backgroundColor: "#14b8a6"}}>
                4
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Success Formula Scaling</h3>
              <p className="text-slate-400">
                We intensively utilize the format and key elements of verified &apos;hit videos&apos; to maximize viral impact.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="glass-card p-8 rounded-2xl hover-lift-pink mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Proven Approach</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#ccfbf1"}}>
                  <span className="text-accent text-xl">🎯</span>
                </div>
                <p className="text-slate-300">
                  <span className="font-semibold">Minimize uncertainty</span> and execute only the highest probability marketing strategies
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#ccfbf1"}}>
                  <span className="text-accent text-xl">⚡</span>
                </div>
                <p className="text-slate-300">
                  <span className="font-semibold">Collect feedback</span> from small target groups and analyze rapidly
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#ccfbf1"}}>
                  <span className="text-accent text-xl">🚀</span>
                </div>
                <p className="text-slate-300">
                  <span className="font-semibold">Repeatedly apply</span> verified success formulas to maximize marketing efficiency
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl mb-8 text-slate-300">
              Yes, this is <span className="font-bold text-accent">fully compliant </span> 
              across each social media platform.
            </p>
            <a href="mailto:jay@digicon.pro" className="primary-button">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Section 9: Results */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white text-center">
            Results we&apos;ve <span className="gradient-brand">generated</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 glass-card rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">6B+</div>
              <p className="text-lg">Views generated on social platforms</p>
            </div>
            <div className="text-center p-8 glass-card  rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">24M+</div>
              <p className="text-lg">Followers gained for our clients</p>
            </div>
            <div className="text-center p-8 glass-card rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">137M+</div>
              <p className="text-lg">Followers reached through top brands</p>
            </div>
            <div className="text-center p-8 glass-card rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">20,300+</div>
              <p className="text-lg">Pieces of content published per month</p>
            </div>
            <div className="text-center p-8 glass-card rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">85+</div>
              <p className="text-lg">Expert team members</p>
            </div>
            <div className="text-center p-8 glass-card rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-accent mb-2">450+</div>
              <p className="text-lg">Years of combined experience</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl mb-8 text-slate-300">
              Want to learn if we are a fit to scale your brand?
            </p>
            <a href="mailto:jay@digicon.pro" className="primary-button">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Section 10: Platforms */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
            Become <span className="gradient-brand">omnipresent</span> on our expert platforms
          </h2>
          
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
                <Image 
                  src="/IG_logo.png" 
                  alt="Instagram Logo" 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
                <Image 
                  src="/YT_logo.png" 
                  alt="YouTube Logo" 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
          <Image
                  src="/TT_logo.png" 
                  alt="TikTok Logo" 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
          <Image
                  src="/X_logo.png" 
                  alt="X (Twitter) Logo" 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover-lift-pink flex items-center justify-center" style={{height: '120px', width: '100%'}}>
          <Image
                  src="/FB_logo.png" 
                  alt="Facebook Logo" 
                  width={120} 
                  height={120} 
                  className="object-contain"
                />
            </div>
          </div>

          <p className="text-xl mb-8 text-slate-300">Want to learn more?</p>
          <a href="mailto:jay@digicon.pro" className="primary-button">
            Talk to us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-white/10 text-slate-500">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">Ready to dominate social media?</p>
          <p className="text-slate-500">© {new Date().getFullYear()} Digicon Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
