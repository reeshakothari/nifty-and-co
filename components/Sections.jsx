'use client';
import { useState, useEffect, useRef } from 'react';
import { Tilt, Magnetic } from './Motion';
import {
  IconEquity, IconSIP, IconMutual, IconPortfolio, IconRetirement, IconAdvisory,
  IconCheck, IconCross, IconArrow, IconShield, IconUser, IconSparkle, IconBalance,
  IconPhone, IconMail, IconPin, IconLinkedin, IconTwitter, IconInsta, IconYoutube, IconClock,
} from './Icons';

function Counter({ end, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(end * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [end, duration]);
  const display = end >= 100 ? Math.round(val) : val.toFixed(1);
  return <span ref={ref}>{display}<span className="stat-suffix">{suffix}</span></span>;
}

export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">About · Chhajed Venture Capital</div>
          <h2>Five years of conviction in the <span className="accent">Indian markets.</span></h2>
          <p>We are a full-time stockbroking and portfolio management practice for investors who want the discipline of professional research with the warmth of a relationship-led service.</p>
        </div>
        <div className="about-grid">
          <div className="about-card reveal">
            <span className="quote-mark">&ldquo;</span>
            <div className="label">Our Approach</div>
            <h3>Patient capital, not speculation.</h3>
            <p>We invest the way we&apos;d want our own savings invested — research-led, risk-aware, and built around your goals rather than the market&apos;s mood swings. Every portfolio is sized, hedged, and reviewed by a real human who knows your name.</p>
            <div className="about-points">
              <div className="about-point">
                <span className="num">01</span>
                <span className="body">Indian-market specialists<span>Deep coverage across NSE, BSE, mutual funds and AIFs.</span></span>
              </div>
              <div className="about-point">
                <span className="num">02</span>
                <span className="body">Personalised guidance<span>One advisor, one relationship — for the full investing journey.</span></span>
              </div>
              <div className="about-point">
                <span className="num">03</span>
                <span className="body">Transparent everything<span>Plain-language reports, no kickbacks, no hidden product pushes.</span></span>
              </div>
            </div>
          </div>
          <div className="stats-grid reveal d1">
            <div className="stat-cell">
              <div className="stat-num"><Counter end={5} suffix="+" /></div>
              <div className="stat-label">Years in Markets</div>
              <div className="stat-desc">Through bull runs, corrections, and a pandemic.</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><Counter end={1000} suffix="+" /></div>
              <div className="stat-label">Investors Served</div>
              <div className="stat-desc">From first SIP to multi-crore portfolios.</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">₹<Counter end={240} suffix="Cr" /></div>
              <div className="stat-label">Assets Advised</div>
              <div className="stat-desc">Across equity, mutual funds and structured products.</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><Counter end={98} suffix="%" /></div>
              <div className="stat-label">Retention</div>
              <div className="stat-desc">Clients who renew with us, year after year.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const services = [
    { n: '01', icon: IconEquity, title: 'Equity Trading', body: 'Direct access to NSE and BSE with research-backed ideas, intraday support and curated long-only baskets for serious investors.' },
    { n: '02', icon: IconSIP, title: 'SIP Investments', body: 'Goal-linked SIPs starting from ₹500 a month. We pick the fund, automate the contribution, and rebalance as life changes.' },
    { n: '03', icon: IconMutual, title: 'Mutual Funds', body: 'Direct-plan mutual funds across equity, debt and hybrid categories — chosen for performance, not commissions.' },
    { n: '04', icon: IconPortfolio, title: 'Portfolio Management', body: 'Discretionary and advisory PMS for portfolios above ₹50 lakh. Concentrated, conviction-driven, fully transparent.' },
    { n: '05', icon: IconRetirement, title: 'Retirement Planning', body: 'A drawdown plan that survives a 30-year horizon — inflation-adjusted, tax-efficient, with annuities where they fit.' },
    { n: '06', icon: IconAdvisory, title: 'Wealth Advisory', body: 'For HNIs and family offices: tax structuring, estate planning, alternative investments and family-wealth governance.' },
  ];
  return (
    <section className="section" id="services" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Services</div>
          <h2>A complete toolkit for <span className="accent">building wealth.</span></h2>
          <p>From your first SIP to the day you hand over a portfolio to the next generation — every product you need, under one roof, with one advisor.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <Tilt key={i} max={5} className={`service-card reveal d${(i % 3) + 1}`}>
              <span className="big-num">{s.n}</span>
              <span className="service-num">{s.n}</span>
              <div className="service-icon"><s.icon size={24} /></div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <a href="#" className="service-learn">Learn more <span className="arrow"><IconArrow size={14} /></span></a>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const rows = [
    { label: 'Investment approach', us: 'Research-led, conviction sizing', them: 'Volume-driven recommendations' },
    { label: 'Advisor relationship', us: 'Single dedicated advisor', them: 'Rotating call-centre support' },
    { label: 'Commission model', us: 'Direct plans · transparent fees', them: 'Regular plans · hidden trail' },
    { label: 'Risk management', us: 'Drawdown-tested portfolios', them: 'One-size-fits-all model risk' },
    { label: 'Reporting cadence', us: 'Monthly + on-demand calls', them: 'Quarterly statement only' },
  ];
  const points = [
    { icon: IconUser, title: 'A real advisor, on speed-dial', body: 'Not a chatbot, not a roster of strangers. The person you sign up with stays with you for the long haul.' },
    { icon: IconShield, title: 'Risk before return', body: 'Every portfolio is stress-tested against historical drawdowns before a rupee goes in.' },
    { icon: IconBalance, title: 'Transparent fees, always', body: 'A single advisory fee. No commissions, no fund kickbacks, no spread games. You see exactly what you pay.' },
    { icon: IconSparkle, title: 'Tailored, not templated', body: 'Two investors with the same age can have wildly different goals. Your portfolio reflects yours.' },
  ];
  return (
    <section className="section" id="why" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Why Nifty &amp; Co.</div>
          <h2>The difference is in the <span className="accent">details.</span></h2>
          <p>We compete on care, not on cashbacks. Here&apos;s how a relationship with us compares to the rest of the market.</p>
        </div>
        <div className="why-grid">
          <div className="compare reveal">
            <div className="compare-row head">
              <div className="compare-cell">Dimension</div>
              <div className="compare-cell us">Nifty &amp; Co.</div>
              <div className="compare-cell them">Industry default</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="compare-row">
                <div className="compare-cell lbl">{r.label}</div>
                <div className="compare-cell us"><span className="check"><IconCheck /></span>{r.us}</div>
                <div className="compare-cell them"><span className="cross"><IconCross /></span>{r.them}</div>
              </div>
            ))}
          </div>
          <div className="why-points reveal d1">
            {points.map((p, i) => (
              <div key={i} className="why-point">
                <div className="why-point-icon"><p.icon size={20} /></div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const progressRef = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          [0, 1, 2, 3].forEach((idx) => {
            setTimeout(() => setActive(idx), 300 + idx * 600);
          });
          if (progressRef.current) {
            setTimeout(() => { progressRef.current.style.width = '100%'; }, 400);
          }
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  const steps = [
    { n: '1', title: 'Consultation', body: 'A 45-minute call to understand your goals, risk appetite and existing investments.' },
    { n: '2', title: 'Goal Planning', body: 'We map every financial milestone — buying, schooling, retirement — to a number and a timeline.' },
    { n: '3', title: 'Investment Strategy', body: 'A bespoke allocation across equity, debt and alternatives, sized for your drawdown tolerance.' },
    { n: '4', title: 'Portfolio Growth', body: 'Continuous monitoring, monthly reviews and proactive rebalancing as markets and life evolve.' },
  ];
  return (
    <section className="section" id="process" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">How we work</div>
          <h2>Four steps from <span className="accent">first call</span> to compounding wealth.</h2>
          <p>No paperwork mountains, no aggressive cross-sells. A clean process designed for clarity at every stage.</p>
        </div>
        <div className="process-grid" ref={ref}>
          <div className="process-line"><div className="progress" ref={progressRef}></div></div>
          {steps.map((s, i) => (
            <div key={i} className={`process-step ${active >= i ? 'active' : ''}`}>
              <div className="dot"><span className="num">{s.n}</span></div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testis = [
    { badge: '+38% PORTFOLIO · 3Y', quote: 'I came in with a chaotic mix of LIC policies, stale ULIPs and tips from a WhatsApp group. Three years later I have one clean portfolio and zero anxiety.', name: 'Aakash Mehta', role: 'Product Manager, Bangalore', initial: 'A' },
    { badge: 'SIP SINCE 2022', quote: 'They started me with a ₹2,500 SIP when I was a year out of college. The advisor still picks up my call on a Sunday. That, in finance, is rare.', name: 'Priya Iyer', role: 'Architect, Pune', initial: 'P' },
    { badge: 'PMS · ₹1.2 CR', quote: "After two private banks I had given up on personal service. The team here treats my portfolio like it's their own. I sleep better.", name: 'Rakesh Bhandari', role: 'Business Owner, Mumbai', initial: 'R' },
  ];
  return (
    <section className="section" id="testimonials" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">In their words</div>
          <h2>Investors who stayed for <span className="accent">the long arc.</span></h2>
        </div>
        <div className="testi-grid">
          {testis.map((t, i) => (
            <div key={i} className={`testi-card reveal d${i + 1}`}>
              <span className="badge"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>{t.badge}</span>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-meta">
                <div className="testi-avatar">{t.initial}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightVisual({ kind }) {
  if (kind === 'chart') {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="ivg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4b06a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4b06a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120, 160, 200, 240].map(yv => (
          <line key={yv} x1="0" x2="400" y1={yv} y2={yv} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
        ))}
        <path d="M0,200 C50,180 80,160 130,150 C180,140 220,180 260,150 C300,120 340,90 400,80 L400,280 L0,280 Z" fill="url(#ivg1)" />
        <path d="M0,200 C50,180 80,160 130,150 C180,140 220,180 260,150 C300,120 340,90 400,80" fill="none" stroke="#d4b06a" strokeWidth="1.5" />
        {[200, 150, 150, 80].map((yv, i) => (
          <circle key={i} cx={i * 130 + 30} cy={yv} r="3" fill="#d4b06a" />
        ))}
        <text x="20" y="40" fill="rgba(236,235,229,0.6)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">NIFTY 50 · 12M</text>
      </svg>
    );
  }
  if (kind === 'bars') {
    return (
      <svg viewBox="0 0 400 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const h = 40 + Math.sin(i * 0.8) * 50 + i * 12;
          return <rect key={i} x={30 + i * 46} y={260 - h} width="28" height={h} fill="#d4b06a" fillOpacity={0.2 + i * 0.08} rx="2" />;
        })}
        <line x1="20" x2="380" y1="260" y2="260" stroke="rgba(255,255,255,0.1)" />
        <text x="20" y="30" fill="rgba(236,235,229,0.6)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">SIP RETURNS · 8Y</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ivg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b06a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4b06a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i} d={`M0,${140 + i * 8} Q100,${100 + i * 8} 200,${140 + i * 8} T400,${140 + i * 8}`} fill="none" stroke="#d4b06a" strokeWidth="0.8" opacity={0.4 - i * 0.07} />
      ))}
      <path d="M0,140 Q100,100 200,140 T400,140 L400,280 L0,280 Z" fill="url(#ivg2)" />
      <text x="20" y="40" fill="rgba(236,235,229,0.6)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">REBALANCE · CADENCE</text>
    </svg>
  );
}

export function InsightsSection() {
  const posts = [
    { cat: 'Market trends', title: 'Reading the 2026 Indian equity setup', body: 'Why earnings breadth, not the index level, is the signal we are watching as Nifty consolidates near all-time highs.', read: '7 min read', date: 'May 18, 2026', featured: true, bg: 'chart' },
    { cat: 'SIP education', title: 'The case for boring SIPs', body: 'Five years of returns data on plain-vanilla index SIPs versus tactical fund-switching.', read: '5 min read', date: 'May 11, 2026', bg: 'bars' },
    { cat: 'Wealth strategy', title: 'When to rebalance, when not to', body: 'A simple framework for HNIs to decide when drift is actually a problem.', read: '6 min read', date: 'May 04, 2026', bg: 'wave' },
  ];
  return (
    <section className="section" id="insights" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Market insights</div>
          <h2>Notes from the desk, <span className="accent">every week.</span></h2>
          <p>Research, education and the occasional opinion piece — written by the same team that runs your portfolio.</p>
        </div>
        <div className="insights-grid">
          {posts.map((p, i) => (
            <div key={i} className={`insight-card ${p.featured ? 'feat' : ''} reveal d${i + 1}`}>
              <div className="insight-img"><InsightVisual kind={p.bg} /></div>
              <div className="insight-body">
                <div className="insight-cat">{p.cat}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
                <div className="insight-meta">
                  <IconClock size={12} />
                  <span>{p.read}</span>
                  <span style={{ marginLeft: 'auto' }}>{p.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card reveal">
          <div className="eyebrow">Get started</div>
          <h2>Start your wealth journey, <span className="accent">today.</span></h2>
          <p>Open an account in under 10 minutes, or book a no-obligation consultation with one of our senior advisors.</p>
          <div className="cta-buttons">
            <Magnetic><a href="#account" className="btn btn-primary">Open an account <span className="arrow"><IconArrow /></span></a></Magnetic>
            <Magnetic strength={0.2}><a href="#advisor" className="btn btn-ghost">Talk to an advisor</a></Magnetic>
          </div>
          <div className="cta-meta">
            <div className="cta-meta-item"><span className="ic"><IconClock /></span>10-min onboarding</div>
            <div className="cta-meta-item"><span className="ic"><IconShield size={16} /></span>SEBI registered</div>
            <div className="cta-meta-item"><span className="ic"><IconBalance size={16} /></span>Transparent fees</div>
            <div className="cta-meta-item"><span className="ic"><IconUser size={16} /></span>Dedicated advisor</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'Is Nifty & Co. SEBI registered?', a: 'Yes. Chhajed Venture Capital operates as a SEBI-registered intermediary. Registration details are listed in the footer and on the Disclosures page.' },
    { q: 'What is the minimum investment to start?', a: 'You can begin a SIP from ₹500/month. Discretionary Portfolio Management Services begin at ₹50 lakh, in line with SEBI regulations.' },
    { q: 'How are fees structured?', a: 'For advisory clients we charge a flat annual fee based on assets under advice. For PMS, fees are a combination of fixed and performance-linked, fully disclosed upfront.' },
    { q: 'Do you offer direct mutual funds?', a: 'Yes, only direct plans. We do not earn commissions on mutual fund sales — our fee model is fully transparent.' },
    { q: 'How is my portfolio reported?', a: 'You receive a monthly performance report, on-demand portfolio dashboards, and a dedicated advisor available for review calls anytime.' },
    { q: 'Can NRIs invest with you?', a: 'Yes. We support NRE/NRO investing across mutual funds and PMS, with tax-aware structuring for your country of residence.' },
  ];
  return (
    <section className="section" id="faq" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: 'center', margin: '0 auto 64px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Questions, answered</div>
          <h2>Things investors often <span className="accent">ask us first.</span></h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="plus">+</span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand">
              <div className="brand-mark"><span>N</span></div>
              <div>
                <div className="brand-name">Nifty &amp; Co.</div>
                <div className="brand-sub">Chhajed Venture Capital</div>
              </div>
            </a>
            <p>A full-time stockbroking and portfolio management practice, building patient wealth for Indian investors since 2021.</p>
            <div className="contact-row" style={{ marginTop: 24 }}>
              <span className="ic"><IconPhone /></span><span>+91 98220 14728</span>
            </div>
            <div className="contact-row">
              <span className="ic"><IconMail /></span><span>care@niftyandco.in</span>
            </div>
            <div className="contact-row">
              <span className="ic"><IconPin /></span><span>312, Trade Tower, Camp, Pune 411001</span>
            </div>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Equity Trading</a></li>
              <li><a href="#services">SIP Investments</a></li>
              <li><a href="#services">Mutual Funds</a></li>
              <li><a href="#services">Portfolio Management</a></li>
              <li><a href="#services">Retirement Planning</a></li>
              <li><a href="#services">Wealth Advisory</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#insights">Insights</a></li>
              <li><a href="#process">How we work</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Disclosures</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Stay in the loop</h5>
            <p style={{ color: 'var(--ink-muted)', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>One short market note in your inbox, every Monday morning.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks — we will be in touch.'); }} style={{ display: 'flex', borderRadius: 100, border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
              <input type="email" placeholder="your@email.in" required style={{ background: 'transparent', border: 'none', color: 'var(--ink)', padding: '12px 16px', flex: 1, fontFamily: 'inherit', outline: 'none', fontSize: 13 }} />
              <button type="submit" style={{ background: 'var(--gold)', color: '#1a1407', border: 'none', padding: '0 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="disclaimer">
          <strong>Regulatory disclosure.</strong> Chhajed Venture Capital is a SEBI-registered intermediary (Reg. No. INZ000XXXXXX). Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Past performance is not indicative of future returns. Portfolio Management Services involve a high degree of risk and are intended for investors with adequate risk-bearing capacity. Brokerage will not exceed SEBI prescribed limits. Investments in securities markets are subject to market risks — read all the related documents carefully before investing. Information on this site is for general guidance only and does not constitute investment advice. We do not guarantee any returns.
        </div>
        <div className="footer-bottom">
          <div>© 2026 Chhajed Venture Capital. All rights reserved. · BSE · NSE · CDSL</div>
          <div className="socials">
            <a href="#"><IconLinkedin /></a>
            <a href="#"><IconTwitter /></a>
            <a href="#"><IconInsta /></a>
            <a href="#"><IconYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
