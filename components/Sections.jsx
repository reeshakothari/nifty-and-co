'use client';
import { useState, useEffect, useRef } from 'react';
import { Tilt, Magnetic } from './Motion';
import {
  IconEquity, IconSIP, IconMutual, IconPortfolio, IconRetirement, IconAdvisory,
  IconCheck, IconCross, IconArrow, IconShield, IconUser, IconSparkle, IconBalance,
  IconPhone, IconMail, IconPin, IconLinkedin, IconTwitter, IconInsta, IconYoutube, IconClock,
} from './Icons';
import { useContent } from '@/lib/content-context';

export function AboutSection() {
  const eyebrow  = useContent('about', 'eyebrow',       'About · Chhajed Venture Capital');
  const heading  = useContent('about', 'heading',        'Five years of conviction in the');
  const ha       = useContent('about', 'heading_accent', 'Indian markets.');
  const subtext  = useContent('about', 'subtext',        'We are a full-time stockbroking and portfolio management practice for investors who want the discipline of professional research with the warmth of a relationship-led service.');
  const cardLbl  = useContent('about', 'card_label',     'Our Approach');
  const cardH    = useContent('about', 'card_heading',   'Patient capital, not speculation.');
  const cardBody = useContent('about', 'card_body',      'We invest the way we\'d want our own savings invested — research-led, risk-aware, and built around your goals rather than the market\'s mood swings. Every portfolio is sized, hedged, and reviewed by a real human who knows your name.');
  const p1n      = useContent('about', 'point_1_num',    '01');
  const p1t      = useContent('about', 'point_1_title',  'Indian-market specialists');
  const p1b      = useContent('about', 'point_1_body',   'Deep coverage across NSE, BSE, mutual funds and AIFs.');
  const p2n      = useContent('about', 'point_2_num',    '02');
  const p2t      = useContent('about', 'point_2_title',  'Personalised guidance');
  const p2b      = useContent('about', 'point_2_body',   'One advisor, one relationship — for the full investing journey.');
  const p3n      = useContent('about', 'point_3_num',    '03');
  const p3t      = useContent('about', 'point_3_title',  'Transparent everything');
  const p3b      = useContent('about', 'point_3_body',   'Plain-language reports, no kickbacks, no hidden product pushes.');

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
          <p>{subtext}</p>
        </div>
        <div className="about-grid">
          <div className="about-card reveal">
            <span className="quote-mark">&ldquo;</span>
            <div className="label">{cardLbl}</div>
            <h3>{cardH}</h3>
            <p>{cardBody}</p>
            <div className="about-points">
              <div className="about-point">
                <span className="num">{p1n}</span>
                <span className="body">{p1t}<span>{p1b}</span></span>
              </div>
              <div className="about-point">
                <span className="num">{p2n}</span>
                <span className="body">{p2t}<span>{p2b}</span></span>
              </div>
              <div className="about-point">
                <span className="num">{p3n}</span>
                <span className="body">{p3t}<span>{p3b}</span></span>
              </div>
            </div>
          </div>
          <div className="stats-grid reveal d1">
            <div className="stat-cell">
              <div className="stat-num">{useContent('about', 'stat_1_num', '5+')}</div>
              <div className="stat-label">{useContent('about', 'stat_1_lbl', 'Years in Markets')}</div>
              <div className="stat-desc">{useContent('about', 'stat_1_desc', 'Through bull runs, corrections, and a pandemic.')}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{useContent('about', 'stat_2_num', '1,000+')}</div>
              <div className="stat-label">{useContent('about', 'stat_2_lbl', 'Investors Served')}</div>
              <div className="stat-desc">{useContent('about', 'stat_2_desc', 'From first SIP to multi-crore portfolios.')}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{useContent('about', 'stat_3_num', '₹240Cr')}</div>
              <div className="stat-label">{useContent('about', 'stat_3_lbl', 'Assets Advised')}</div>
              <div className="stat-desc">{useContent('about', 'stat_3_desc', 'Across equity, mutual funds and structured products.')}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{useContent('about', 'stat_4_num', '98%')}</div>
              <div className="stat-label">{useContent('about', 'stat_4_lbl', 'Retention')}</div>
              <div className="stat-desc">{useContent('about', 'stat_4_desc', 'Clients who renew with us, year after year.')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const eyebrow = useContent('services', 'eyebrow',        'Services');
  const heading = useContent('services', 'heading',        'A complete toolkit for');
  const ha      = useContent('services', 'heading_accent', 'building wealth.');
  const subtext = useContent('services', 'subtext',        'From your first SIP to the day you hand over a portfolio to the next generation — every product you need, under one roof, with one advisor.');
  const t1 = useContent('services', '1_title', 'Equity Trading');      const b1 = useContent('services', '1_body', 'Direct access to NSE and BSE with research-backed ideas, intraday support and curated long-only baskets for serious investors.');
  const t2 = useContent('services', '2_title', 'SIP Investments');     const b2 = useContent('services', '2_body', 'Goal-linked SIPs starting from ₹500 a month. We pick the fund, automate the contribution, and rebalance as life changes.');
  const t3 = useContent('services', '3_title', 'Mutual Funds');        const b3 = useContent('services', '3_body', 'Direct-plan mutual funds across equity, debt and hybrid categories — chosen for performance, not commissions.');
  const t4 = useContent('services', '4_title', 'Portfolio Management');const b4 = useContent('services', '4_body', 'Discretionary and advisory PMS for portfolios above ₹50 lakh. Concentrated, conviction-driven, fully transparent.');
  const t5 = useContent('services', '5_title', 'Retirement Planning'); const b5 = useContent('services', '5_body', 'A drawdown plan that survives a 30-year horizon — inflation-adjusted, tax-efficient, with annuities where they fit.');
  const t6 = useContent('services', '6_title', 'Wealth Advisory');     const b6 = useContent('services', '6_body', 'For HNIs and family offices: tax structuring, estate planning, alternative investments and family-wealth governance.');

  const services = [
    { n: '01', icon: IconEquity,     title: t1, body: b1 },
    { n: '02', icon: IconSIP,        title: t2, body: b2 },
    { n: '03', icon: IconMutual,     title: t3, body: b3 },
    { n: '04', icon: IconPortfolio,  title: t4, body: b4 },
    { n: '05', icon: IconRetirement, title: t5, body: b5 },
    { n: '06', icon: IconAdvisory,   title: t6, body: b6 },
  ];

  return (
    <section className="section" id="services" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
          <p>{subtext}</p>
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
  const eyebrow = useContent('whyus', 'eyebrow',        'Why Nifty & Co.');
  const heading = useContent('whyus', 'heading',        'The difference is in the');
  const ha      = useContent('whyus', 'heading_accent', 'details.');
  const subtext = useContent('whyus', 'subtext',        'We compete on care, not on cashbacks. Here\'s how a relationship with us compares to the rest of the market.');

  const r1l = useContent('whyus', 'row_1_label', 'Investment approach'); const r1u = useContent('whyus', 'row_1_us', 'Research-led, conviction sizing'); const r1t = useContent('whyus', 'row_1_them', 'Volume-driven recommendations');
  const r2l = useContent('whyus', 'row_2_label', 'Advisor relationship'); const r2u = useContent('whyus', 'row_2_us', 'Single dedicated advisor');      const r2t = useContent('whyus', 'row_2_them', 'Rotating call-centre support');
  const r3l = useContent('whyus', 'row_3_label', 'Commission model');     const r3u = useContent('whyus', 'row_3_us', 'Direct plans · transparent fees'); const r3t = useContent('whyus', 'row_3_them', 'Regular plans · hidden trail');
  const r4l = useContent('whyus', 'row_4_label', 'Risk management');      const r4u = useContent('whyus', 'row_4_us', 'Drawdown-tested portfolios');       const r4t = useContent('whyus', 'row_4_them', 'One-size-fits-all model risk');
  const r5l = useContent('whyus', 'row_5_label', 'Reporting cadence');    const r5u = useContent('whyus', 'row_5_us', 'Monthly + on-demand calls');        const r5t = useContent('whyus', 'row_5_them', 'Quarterly statement only');

  const pt1t = useContent('whyus', 'point_1_title', 'A real advisor, on speed-dial');
  const pt1b = useContent('whyus', 'point_1_body',  'Not a chatbot, not a roster of strangers. The person you sign up with stays with you for the long haul.');
  const pt2t = useContent('whyus', 'point_2_title', 'Risk before return');
  const pt2b = useContent('whyus', 'point_2_body',  'Every portfolio is stress-tested against historical drawdowns before a rupee goes in.');
  const pt3t = useContent('whyus', 'point_3_title', 'Transparent fees, always');
  const pt3b = useContent('whyus', 'point_3_body',  'A single advisory fee. No commissions, no fund kickbacks, no spread games. You see exactly what you pay.');
  const pt4t = useContent('whyus', 'point_4_title', 'Tailored, not templated');
  const pt4b = useContent('whyus', 'point_4_body',  'Two investors with the same age can have wildly different goals. Your portfolio reflects yours.');

  const rows   = [
    { label: r1l, us: r1u, them: r1t },
    { label: r2l, us: r2u, them: r2t },
    { label: r3l, us: r3u, them: r3t },
    { label: r4l, us: r4u, them: r4t },
    { label: r5l, us: r5u, them: r5t },
  ];
  const points = [
    { icon: IconUser,    title: pt1t, body: pt1b },
    { icon: IconShield,  title: pt2t, body: pt2b },
    { icon: IconBalance, title: pt3t, body: pt3b },
    { icon: IconSparkle, title: pt4t, body: pt4b },
  ];

  return (
    <section className="section" id="why" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
          <p>{subtext}</p>
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
  const ref         = useRef(null);
  const progressRef = useRef(null);

  const eyebrow = useContent('process', 'eyebrow', 'How we work');
  const heading = useContent('process', 'heading', 'Four steps from first call to compounding wealth.');
  const subtext = useContent('process', 'subtext', 'No paperwork mountains, no aggressive cross-sells. A clean process designed for clarity at every stage.');
  const s1n = useContent('process', 'step_1_num', '1'); const s1t = useContent('process', 'step_1_title', 'Consultation');        const s1b = useContent('process', 'step_1_body', 'A 45-minute call to understand your goals, risk appetite and existing investments.');
  const s2n = useContent('process', 'step_2_num', '2'); const s2t = useContent('process', 'step_2_title', 'Goal Planning');       const s2b = useContent('process', 'step_2_body', 'We map every financial milestone — buying, schooling, retirement — to a number and a timeline.');
  const s3n = useContent('process', 'step_3_num', '3'); const s3t = useContent('process', 'step_3_title', 'Investment Strategy'); const s3b = useContent('process', 'step_3_body', 'A bespoke allocation across equity, debt and alternatives, sized for your drawdown tolerance.');
  const s4n = useContent('process', 'step_4_num', '4'); const s4t = useContent('process', 'step_4_title', 'Portfolio Growth');    const s4b = useContent('process', 'step_4_body', 'Continuous monitoring, monthly reviews and proactive rebalancing as markets and life evolve.');

  const steps = [
    { n: s1n, title: s1t, body: s1b },
    { n: s2n, title: s2t, body: s2b },
    { n: s3n, title: s3t, body: s3b },
    { n: s4n, title: s4t, body: s4b },
  ];

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

  return (
    <section className="section" id="process" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading}</h2>
          <p>{subtext}</p>
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
  const eyebrow = useContent('testimonials', 'eyebrow',        'In their words');
  const heading = useContent('testimonials', 'heading',        'Investors who stayed for');
  const ha      = useContent('testimonials', 'heading_accent', 'the long arc.');
  const b1 = useContent('testimonials', '1_badge', '+38% PORTFOLIO · 3Y'); const q1 = useContent('testimonials', '1_quote', 'I came in with a chaotic mix of LIC policies, stale ULIPs and tips from a WhatsApp group. Three years later I have one clean portfolio and zero anxiety.'); const n1 = useContent('testimonials', '1_name', 'Aakash Mehta'); const rl1 = useContent('testimonials', '1_role', 'Product Manager, Bangalore'); const i1 = useContent('testimonials', '1_initial', 'A');
  const b2 = useContent('testimonials', '2_badge', 'SIP SINCE 2022');     const q2 = useContent('testimonials', '2_quote', 'They started me with a ₹2,500 SIP when I was a year out of college. The advisor still picks up my call on a Sunday. That, in finance, is rare.');         const n2 = useContent('testimonials', '2_name', 'Priya Iyer');     const rl2 = useContent('testimonials', '2_role', 'Architect, Pune');              const i2 = useContent('testimonials', '2_initial', 'P');
  const b3 = useContent('testimonials', '3_badge', 'PMS · ₹1.2 CR');      const q3 = useContent('testimonials', '3_quote', 'After two private banks I had given up on personal service. The team here treats my portfolio like it\'s their own. I sleep better.');              const n3 = useContent('testimonials', '3_name', 'Rakesh Bhandari'); const rl3 = useContent('testimonials', '3_role', 'Business Owner, Mumbai');      const i3 = useContent('testimonials', '3_initial', 'R');

  const testis = [
    { badge: b1, quote: q1, name: n1, role: rl1, initial: i1 },
    { badge: b2, quote: q2, name: n2, role: rl2, initial: i2 },
    { badge: b3, quote: q3, name: n3, role: rl3, initial: i3 },
  ];

  return (
    <section className="section" id="testimonials" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
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
  const eyebrow = useContent('insights', 'eyebrow',        'Market insights');
  const heading = useContent('insights', 'heading',        'Notes from the desk,');
  const ha      = useContent('insights', 'heading_accent', 'every week.');
  const subtext = useContent('insights', 'subtext',        'Research, education and the occasional opinion piece — written by the same team that runs your portfolio.');
  const c1 = useContent('insights', '1_cat',   'Market trends');   const h1 = useContent('insights', '1_title', 'Reading the 2026 Indian equity setup');       const p1 = useContent('insights', '1_body', 'Why earnings breadth, not the index level, is the signal we are watching as Nifty consolidates near all-time highs.'); const r1 = useContent('insights', '1_read', '7 min read'); const d1 = useContent('insights', '1_date', 'May 18, 2026');
  const c2 = useContent('insights', '2_cat',   'SIP education');   const h2 = useContent('insights', '2_title', 'The case for boring SIPs');                   const p2 = useContent('insights', '2_body', 'Five years of returns data on plain-vanilla index SIPs versus tactical fund-switching.');                               const r2 = useContent('insights', '2_read', '5 min read'); const d2 = useContent('insights', '2_date', 'May 11, 2026');
  const c3 = useContent('insights', '3_cat',   'Wealth strategy'); const h3 = useContent('insights', '3_title', 'When to rebalance, when not to');              const p3 = useContent('insights', '3_body', 'A simple framework for HNIs to decide when drift is actually a problem.');                                             const r3 = useContent('insights', '3_read', '6 min read'); const d3 = useContent('insights', '3_date', 'May 04, 2026');

  const posts = [
    { cat: c1, title: h1, body: p1, read: r1, date: d1, featured: true, bg: 'chart' },
    { cat: c2, title: h2, body: p2, read: r2, date: d2, bg: 'bars' },
    { cat: c3, title: h3, body: p3, read: r3, date: d3, bg: 'wave' },
  ];

  return (
    <section className="section" id="insights" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
          <p>{subtext}</p>
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
  const eyebrow = useContent('cta', 'eyebrow',        'Get started');
  const heading = useContent('cta', 'heading',        'Start your wealth journey,');
  const ha      = useContent('cta', 'heading_accent', 'today.');
  const subtext = useContent('cta', 'subtext',        'Open an account in under 10 minutes, or book a no-obligation consultation with one of our senior advisors.');

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
          <p>{subtext}</p>
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

  const eyebrow = useContent('faq', 'eyebrow',        'Questions, answered');
  const heading = useContent('faq', 'heading',        'Things investors often');
  const ha      = useContent('faq', 'heading_accent', 'ask us first.');

  const q1 = useContent('faq', '1_q', 'Is Nifty & Co. SEBI registered?');
  const a1 = useContent('faq', '1_a', 'Yes. Chhajed Venture Capital operates as a SEBI-registered intermediary. Registration details are listed in the footer and on the Disclosures page.');
  const q2 = useContent('faq', '2_q', 'What is the minimum investment to start?');
  const a2 = useContent('faq', '2_a', 'You can begin a SIP from ₹500/month. Discretionary Portfolio Management Services begin at ₹50 lakh, in line with SEBI regulations.');
  const q3 = useContent('faq', '3_q', 'How are fees structured?');
  const a3 = useContent('faq', '3_a', 'For advisory clients we charge a flat annual fee based on assets under advice. For PMS, fees are a combination of fixed and performance-linked, fully disclosed upfront.');
  const q4 = useContent('faq', '4_q', 'Do you offer direct mutual funds?');
  const a4 = useContent('faq', '4_a', 'Yes, only direct plans. We do not earn commissions on mutual fund sales — our fee model is fully transparent.');
  const q5 = useContent('faq', '5_q', 'How is my portfolio reported?');
  const a5 = useContent('faq', '5_a', 'You receive a monthly performance report, on-demand portfolio dashboards, and a dedicated advisor available for review calls anytime.');
  const q6 = useContent('faq', '6_q', 'Can NRIs invest with you?');
  const a6 = useContent('faq', '6_a', 'Yes. We support NRE/NRO investing across mutual funds and PMS, with tax-aware structuring for your country of residence.');

  const items = [
    { q: q1, a: a1 }, { q: q2, a: a2 }, { q: q3, a: a3 },
    { q: q4, a: a4 }, { q: q5, a: a5 }, { q: q6, a: a6 },
  ];

  return (
    <section className="section" id="faq" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: 'center', margin: '0 auto 64px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{eyebrow}</div>
          <h2>{heading} <span className="accent">{ha}</span></h2>
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
  const brandTagline     = useContent('footer', 'brand_tagline',     'A full-time stockbroking and portfolio management practice, building patient wealth for Indian investors since 2021.');
  const phone            = useContent('footer', 'phone',             '+91 98220 14728');
  const email            = useContent('footer', 'email',             'care@niftyandco.in');
  const address          = useContent('footer', 'address',           '312, Trade Tower, Camp, Pune 411001');
  const newsletterLabel  = useContent('footer', 'newsletter_label',  'Stay in the loop');
  const newsletterBody   = useContent('footer', 'newsletter_body',   'One short market note in your inbox, every Monday morning.');
  const disclaimer       = useContent('footer', 'disclaimer',        'Regulatory disclosure. Chhajed Venture Capital is a SEBI-registered intermediary (Reg. No. INZ000XXXXXX). Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Past performance is not indicative of future returns. Portfolio Management Services involve a high degree of risk and are intended for investors with adequate risk-bearing capacity. Brokerage will not exceed SEBI prescribed limits. Investments in securities markets are subject to market risks — read all the related documents carefully before investing. Information on this site is for general guidance only and does not constitute investment advice. We do not guarantee any returns.');
  const copyright        = useContent('footer', 'copyright',         '© 2026 Chhajed Venture Capital. All rights reserved. · BSE · NSE · CDSL');
  const brandName        = useContent('nav',    'brand_name',        'Nifty & Co.');
  const brandSub         = useContent('nav',    'brand_sub',         'Chhajed Venture Capital');

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand">
              <div className="brand-mark"><span>N</span></div>
              <div>
                <div className="brand-name">{brandName}</div>
                <div className="brand-sub">{brandSub}</div>
              </div>
            </a>
            <p>{brandTagline}</p>
            <div className="contact-row" style={{ marginTop: 24 }}>
              <span className="ic"><IconPhone /></span><span>{phone}</span>
            </div>
            <div className="contact-row">
              <span className="ic"><IconMail /></span><span>{email}</span>
            </div>
            <div className="contact-row">
              <span className="ic"><IconPin /></span><span>{address}</span>
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
            <h5>{newsletterLabel}</h5>
            <p style={{ color: 'var(--ink-muted)', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>{newsletterBody}</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks — we will be in touch.'); }} style={{ display: 'flex', borderRadius: 100, border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
              <input type="email" placeholder="your@email.in" required style={{ background: 'transparent', border: 'none', color: 'var(--ink)', padding: '12px 16px', flex: 1, fontFamily: 'inherit', outline: 'none', fontSize: 13 }} />
              <button type="submit" style={{ background: 'var(--gold)', color: '#1a1407', border: 'none', padding: '0 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="disclaimer"><strong>Regulatory disclosure.</strong> {disclaimer}</div>
        <div className="footer-bottom">
          <div>{copyright}</div>
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
