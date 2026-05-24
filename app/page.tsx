'use client';
import { useState, useEffect, useRef } from 'react';
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

const marqueeRow1 = [
  { text: 'Equity Research' }, { text: 'Portfolio Management' }, { text: 'SIP Advisory' },
  { text: 'Mutual Funds' }, { text: 'Retirement Planning' }, { text: 'NSE · BSE Listed' },
  { text: 'SEBI Registered' }, { text: 'Tax-Optimised Returns' },
];
const marqueeRow2 = [
  { text: 'Nifty 50 Strategies', style: 'gold' }, { text: 'Mid-Cap Opportunities' },
  { text: 'Sectoral Rotation', style: 'gold' }, { text: 'Risk Management' },
  { text: 'IPO Analysis', style: 'gold' }, { text: 'Derivative Hedging' },
  { text: 'ESG Portfolios', style: 'gold' }, { text: 'Wealth Preservation' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Parallax on hero
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      const bg = hero.querySelector<HTMLElement>('.hero-bg');
      const txt = hero.querySelector<HTMLElement>('.hero-content');
      if (bg) bg.style.transform = `translateY(${y * 0.28}px)`;
      if (txt) txt.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <FloatingShapes />

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-brand">
          <span className="brand-mark">N</span>
          <span>Nifty <span className="gold">&amp;</span> Co.</span>
        </a>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <div className="nav-cta">
          <a href="tel:+919876543210" className="btn btn-ghost btn-sm">
            Book a Call <IconCalendar size={14} />
          </a>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <StockTicker />
      </div>

      {/* HERO */}
      <section className="hero" ref={heroRef} id="home">
        <div className="hero-bg">
          <div className="hero-grain"></div>
          <div className="hero-orbs">
            <div className="orb o1"></div>
            <div className="orb o2"></div>
            <div className="orb o3"></div>
          </div>
          <div className="hero-grid-lines" aria-hidden="true"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-left">
            <div className="hero-eyebrow reveal">
              <span className="live-dot"></span>
              <span>Markets Open · NSE · BSE</span>
              <span className="sep">·</span>
              <span className="gold">SEBI Reg. No. INZ000123456</span>
            </div>

            <h1 className="hero-heading">
              <LineReveal
                lines={[
                  { text: "India's next" },
                  { text: 'wealth chapter', cls: 'accent shimmer' },
                  { text: 'starts here.' },
                ]}
                delay={200}
                step={90}
              />
            </h1>

            <p className="hero-sub reveal">
              Professional equity research, SIP advisory and portfolio management—anchored in
              rigorous analysis, delivered with the warmth of a relationship-led practice.
            </p>

            <div className="hero-actions reveal">
              <Magnetic>
                <a href="#contact" className="btn btn-primary">
                  Start Investing <IconArrow size={16} />
                </a>
              </Magnetic>
              <a href="#services" className="btn btn-outline">
                Our Services
              </a>
            </div>

            <div className="hero-stats reveal">
              <div className="h-stat">
                <div className="h-num">₹240<span className="h-unit">Cr+</span></div>
                <div className="h-label">AUM Managed</div>
              </div>
              <div className="h-stat-div"></div>
              <div className="h-stat">
                <div className="h-num">3,200<span className="h-unit">+</span></div>
                <div className="h-label">Active Clients</div>
              </div>
              <div className="h-stat-div"></div>
              <div className="h-stat">
                <div className="h-num">18.4<span className="h-unit">%</span></div>
                <div className="h-label">Avg. Annual Return</div>
              </div>
            </div>
          </div>

          <div className="hero-right reveal">
            <div className="chart-container">
              <CandlestickChart />
            </div>
            <SpinSeal />
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <svg viewBox="0 0 24 38" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="1" width="22" height="36" rx="11" />
            <circle cx="12" cy="10" r="2.5" fill="currentColor">
              <animate attributeName="cy" values="10;22;10" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span>Scroll</span>
        </div>

        <div className="hero-ribbon">
          {['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'MIDCAP 150', 'SMALLCAP 250'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeStrip items={marqueeRow1} />
      <MarqueeStrip items={marqueeRow2} reverse />

      {/* PULSE */}
      <section className="section pulse-section" id="markets">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Live Market Pulse</div>
            <h2>Real-time data, <span className="accent">real decisions.</span></h2>
          </div>
          <PulseWidget />
        </div>
      </section>

      {/* SECTIONS */}
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <InsightsSection />
      <CTASection />
      <FAQSection />

      {/* FOOTER */}
      <SiteFooter />

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919876543210"
        className="whatsapp-fab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <IconWhatsapp size={26} />
      </a>
    </>
  );
}
