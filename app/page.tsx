'use client';
import { useState, useEffect } from 'react';
import {
  ScrollProgress, FloatingShapes, CursorFollower,
  LineReveal, Magnetic, MarqueeStrip, SpinSeal, PulseWidget,
} from '@/components/Motion';
import { CandlestickChart, StockTicker } from '@/components/Chart';
import {
  AboutSection, ServicesSection, WhyUsSection, ProcessSection,
  TestimonialsSection, InsightsSection, CTASection, FAQSection, SiteFooter,
} from '@/components/Sections';
import { IconArrow, IconCalendar, IconWhatsapp } from '@/components/Icons';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('in');
    const inView = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    const flushVisible = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (inView(el)) reveal(el);
      });
    };
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(flushVisible));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(reveal);
    }, 1500);
    return () => { cancelAnimationFrame(raf1); clearTimeout(safety); obs.disconnect(); };
  }, []);

  // Subtle parallax — chart card lifts as you scroll
  useEffect(() => {
    const card = document.querySelector<HTMLElement>('.hero .chart-card');
    if (!card) return;
    const onScroll = () => {
      const y = Math.min(120, window.scrollY * 0.15);
      card.style.transform = `translateY(${-y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <FloatingShapes />
      <CursorFollower />

      <div className="ambient"></div>

      {/* NAV */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#" className="brand">
            <div className="brand-mark"><span>N</span></div>
            <div>
              <div className="brand-name">Nifty &amp; Co.</div>
              <div className="brand-sub">Chhajed Venture Capital</div>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#about" className="link-anim">About</a>
            <a href="#services" className="link-anim">Services</a>
            <a href="#process" className="link-anim">How we work</a>
            <a href="#insights" className="link-anim">Insights</a>
            <a href="#faq" className="link-anim">FAQ</a>
          </nav>
          <div className="nav-cta">
            <a href="#advisor" className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }}>Sign in</a>
            <Magnetic strength={0.25}>
              <a href="#start" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
                Open account <span className="arrow"><IconArrow size={14} /></span>
              </a>
            </Magnetic>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div style={{ position: 'relative' }}>
                <div className="eyebrow reveal">SEBI Registered · Since 2021</div>
                <h1 style={{ marginTop: 16 }}>
                  <LineReveal lines={[
                    { text: 'Your trusted' },
                    { text: 'partner in' },
                    { text: 'wealth creation.', cls: 'shimmer' },
                  ]} />
                </h1>
                <p className="lead reveal d2" style={{ marginTop: 24 }}>
                  Five years of expertise in equity trading, SIPs, mutual funds and portfolio management — for investors who&apos;d rather compound quietly than chase the next tip.
                </p>
                <div className="hero-cta reveal d3">
                  <Magnetic>
                    <a href="#start" className="btn btn-primary">
                      Start investing <span className="arrow"><IconArrow /></span>
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a href="#book" className="btn btn-ghost">
                      <IconCalendar size={16} /> Book consultation
                    </a>
                  </Magnetic>
                </div>
                <div className="trust-row reveal d4">
                  <div className="trust-item">
                    <div className="num">5+</div>
                    <div className="lbl">Years of expertise</div>
                  </div>
                  <div className="trust-item">
                    <div className="num">1,000+</div>
                    <div className="lbl">Investors served</div>
                  </div>
                  <div className="trust-item">
                    <div className="num">₹240Cr</div>
                    <div className="lbl">Assets advised</div>
                  </div>
                  <div className="trust-item">
                    <div className="num">98%</div>
                    <div className="lbl">Client retention</div>
                  </div>
                </div>

                <div style={{ marginTop: 32 }} className="reveal d4 hide-md">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <SpinSeal />
                    <div style={{ maxWidth: 200 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>Trust mark</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.3, color: 'var(--ink)' }}>SEBI-registered, audited, and entirely commission-free.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal d2" style={{ position: 'relative' }}>
                <div className="hero-ribbon">● LIVE · NSE</div>
                <CandlestickChart />
              </div>
            </div>
          </div>

          <div className="scroll-hint">
            <svg className="growth-arrow" viewBox="0 0 72 44" aria-hidden="true">
              <line x1="4" x2="68" y1="38" y2="38" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 3" />
              <path className="trail" d="M 4 36 L 18 28 L 28 32 L 42 18 L 56 12 L 64 6" />
              <path className="head" d="M 56 6 L 66 4 L 64 14 Z" />
              <circle className="dot" cx="4" cy="36" r="2.5" />
            </svg>
            <span className="label-row">Scroll · Growth ahead</span>
          </div>
        </section>

        <StockTicker />

        {/* LIVE MARKET PULSE */}
        <section className="section" style={{ paddingTop: 80, paddingBottom: 40 }}>
          <div className="container">
            <div className="section-head reveal" style={{ marginBottom: 32 }}>
              <div className="eyebrow">Markets · Live</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                The pulse of India, in <span className="shimmer">real time.</span>
              </h2>
            </div>
            <div className="reveal d1"><PulseWidget /></div>
          </div>
        </section>

        {/* MARQUEE 1 */}
        <MarqueeStrip items={[
          { text: 'PATIENT CAPITAL' },
          { text: 'COMPOUND', style: 'italic' },
          { text: 'RESEARCH-LED' },
          { text: 'INDIA', style: 'outline' },
          { text: 'SINCE 2021' },
          { text: 'CONVICTION', style: 'italic' },
          { text: 'TRANSPARENT' },
          { text: 'EQUITY', style: 'outline' },
        ]} />

        <AboutSection />
        <ServicesSection />

        {/* MARQUEE 2 */}
        <MarqueeStrip reverse items={[
          { text: 'SIP' },
          { text: 'EQUITY', style: 'italic' },
          { text: 'MUTUAL FUNDS' },
          { text: 'PMS', style: 'outline' },
          { text: 'RETIREMENT' },
          { text: 'ADVISORY', style: 'italic' },
          { text: 'NRI' },
          { text: 'WEALTH', style: 'outline' },
        ]} />

        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <InsightsSection />
        <CTASection />
        <FAQSection />
      </main>

      <SiteFooter />

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919822014728" target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label="WhatsApp">
        <span className="ring"></span>
        <IconWhatsapp />
      </a>
    </>
  );
}
