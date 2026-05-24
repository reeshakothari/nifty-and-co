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
import { IconArrow, IconCalendar, IconWhatsapp, IconCheck } from '@/components/Icons';
import { supabase } from '@/lib/supabase';
import { ContentProvider, useContent } from '@/lib/content-context';

function HomeInner() {
  const [scrolled, setScrolled]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving]       = useState(false);

  // nav
  const brandName = useContent('nav', 'brand_name', 'Nifty & Co.');
  const brandSub  = useContent('nav', 'brand_sub',  'Chhajed Venture Capital');

  // hero
  const eyebrow   = useContent('hero', 'eyebrow',   'SEBI Registered · Since 2021');
  const h1        = useContent('hero', 'heading_1',  'Your trusted');
  const h2        = useContent('hero', 'heading_2',  'partner in');
  const h3        = useContent('hero', 'heading_3',  'wealth creation.');
  const heroSub   = useContent('hero', 'subtext',    'Five years of expertise in equity trading, SIPs, mutual funds and portfolio management — for investors who\'d rather compound quietly than chase the next tip.');
  const s1n = useContent('hero', 'stat_1_num', '5+');
  const s1l = useContent('hero', 'stat_1_lbl', 'Years of expertise');
  const s2n = useContent('hero', 'stat_2_num', '1,000+');
  const s2l = useContent('hero', 'stat_2_lbl', 'Investors served');
  const s3n = useContent('hero', 'stat_3_num', '₹240Cr');
  const s3l = useContent('hero', 'stat_3_lbl', 'Assets advised');
  const s4n = useContent('hero', 'stat_4_num', '98%');
  const s4l = useContent('hero', 'stat_4_lbl', 'Client retention');
  const trustMark = useContent('hero', 'trust_mark', 'SEBI-registered, audited, and entirely commission-free.');

  // modal
  const modalEyebrow  = useContent('modal', 'eyebrow',        'Free consultation · No commitment');
  const modalH        = useContent('modal', 'heading',         'Let\'s talk');
  const modalHa       = useContent('modal', 'heading_accent',  'wealth.');
  const modalSubtext  = useContent('modal', 'subtext',         'Tell us a little about yourself and we\'ll match you with the right advisor.');

  // footer whatsapp
  const waNumber = useContent('footer', 'whatsapp', '919822014728');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
              <div className="brand-name">{brandName}</div>
              <div className="brand-sub">{brandSub}</div>
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
            <Magnetic strength={0.25}>
              <button
                onClick={() => { setModalOpen(true); setSubmitted(false); }}
                className="btn btn-primary"
                style={{ padding: '10px 22px', fontSize: 13 }}
              >
                Let&apos;s talk <span className="arrow"><IconArrow size={14} /></span>
              </button>
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
                <div className="eyebrow reveal">{eyebrow}</div>
                <h1 style={{ marginTop: 16 }}>
                  <LineReveal lines={[
                    { text: h1 },
                    { text: h2 },
                    { text: h3, cls: 'shimmer' },
                  ]} />
                </h1>
                <p className="lead reveal d2" style={{ marginTop: 24 }}>{heroSub}</p>
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
                  <div className="trust-item"><div className="num">{s1n}</div><div className="lbl">{s1l}</div></div>
                  <div className="trust-item"><div className="num">{s2n}</div><div className="lbl">{s2l}</div></div>
                  <div className="trust-item"><div className="num">{s3n}</div><div className="lbl">{s3l}</div></div>
                  <div className="trust-item"><div className="num">{s4n}</div><div className="lbl">{s4l}</div></div>
                </div>
                <div style={{ marginTop: 32 }} className="reveal d4 hide-md">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <SpinSeal />
                    <div style={{ maxWidth: 200 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>Trust mark</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.3, color: 'var(--ink)' }}>{trustMark}</div>
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
      <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label="WhatsApp">
        <span className="ring"></span>
        <IconWhatsapp />
      </a>

      {/* LET'S TALK MODAL */}
      <div
        className={`modal-overlay${modalOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
      >
        <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Let's talk">
          <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>

          {submitted ? (
            <div className="modal-success">
              <div className="success-icon"><IconCheck size={24} /></div>
              <h3>We&apos;ll be in touch.</h3>
              <p>Thanks for reaching out. Our advisor will call you within one business day.</p>
              <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => setModalOpen(false)}>Close</button>
            </div>
          ) : (
            <>
              <div className="modal-eyebrow">{modalEyebrow}</div>
              <h2 className="modal-title">
                {modalH} <span className="shimmer">{modalHa}</span>
              </h2>
              <p className="modal-sub">{modalSubtext}</p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSaving(true);
                  const fd = new FormData(e.currentTarget);
                  await supabase.from('nifty_and_co_leads').insert({
                    name:    fd.get('name')    as string,
                    phone:   fd.get('phone')   as string,
                    email:   fd.get('email')   as string,
                    goal:    fd.get('goal')    as string,
                    amount:  fd.get('amount')  as string,
                    message: fd.get('message') as string,
                  });
                  setSaving(false);
                  setSubmitted(true);
                }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lt-name">Full name</label>
                    <input id="lt-name" name="name" type="text" placeholder="Rahul Sharma" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lt-phone">Phone</label>
                    <input id="lt-phone" name="phone" type="tel" placeholder="+91 98000 00000" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="lt-email">Email</label>
                  <input id="lt-email" name="email" type="email" placeholder="rahul@example.com" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lt-goal">Investment goal</label>
                    <select id="lt-goal" name="goal" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Wealth creation</option>
                      <option>Retirement planning</option>
                      <option>SIP / Mutual funds</option>
                      <option>Equity trading</option>
                      <option>Portfolio review</option>
                      <option>Tax planning</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lt-amount">Investment amount</label>
                    <select id="lt-amount" name="amount" defaultValue="">
                      <option value="" disabled>Select range</option>
                      <option>Under ₹5 lakh</option>
                      <option>₹5 – 25 lakh</option>
                      <option>₹25 – 1 crore</option>
                      <option>Above ₹1 crore</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="lt-message">Anything else? (optional)</label>
                  <textarea id="lt-message" name="message" placeholder="Tell us about your current portfolio or any specific questions…" />
                </div>
                <button type="submit" disabled={saving} className="btn btn-primary modal-submit">
                  {saving ? 'Sending…' : <><span>Send request</span> <span className="arrow"><IconArrow size={15} /></span></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <ContentProvider>
      <HomeInner />
    </ContentProvider>
  );
}
