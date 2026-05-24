'use client';
import { useState, useEffect, useRef, useId } from 'react';

export function ScrollProgress() {
  const fillRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (fillRef.current) fillRef.current.style.width = pct + '%';
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="scroll-progress">
      <div ref={fillRef} className="fill"></div>
    </div>
  );
}

export function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    let dx = -100, dy = -100, rx = -100, ry = -100, tx = -100, ty = -100;
    let raf = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      dx += (tx - dx) * 0.5; dy += (ty - dy) * 0.5;
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const onEnter = () => ringRef.current && ringRef.current.classList.add('hover');
    const onLeave = () => ringRef.current && ringRef.current.classList.remove('hover');
    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .service-card, .insight-card, .testi-card, .faq-q, .stat-cell').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-100px, -100px)' }}></div>
      <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-100px, -100px)' }}></div>
    </>
  );
}

export function LineReveal({ lines, delay = 0, className = '', step = 120 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const items = node.querySelectorAll('.word-reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          items.forEach((w, i) => setTimeout(() => w.classList.add('in'), delay + i * step));
          obs.disconnect();
        }
      });
    }, { threshold: 0.05 });
    obs.observe(node);
    const safety = setTimeout(() => items.forEach((w) => w.classList.add('in')), 2000);
    return () => { obs.disconnect(); clearTimeout(safety); };
  }, [delay, step, lines.length]);
  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {lines.map((line, i) => (
        <span key={i}>
          <span className="word-reveal"><span className={line.cls || ''}>{line.text}</span></span>
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  );
}

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <span ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}

export function Tilt({ children, max = 8, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="shine"></div>
      {children}
    </div>
  );
}

export function MarqueeStrip({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'reverse' : ''}`}>
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className={`marquee-item ${it.style || ''}`}>
            {it.text}
            <span className="marquee-sep"></span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SpinSeal({ text = 'SEBI REGISTERED · TRUSTED ADVISORS · SINCE 2021 · ', glyph = '✶' }) {
  const id = useId();
  return (
    <div className="seal">
      <div className="seal-glow"></div>
      <svg className="seal-text" viewBox="0 0 140 140">
        <defs>
          <path id={id} d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="seal-core"><span>{glyph}</span></div>
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <div className="f-shape s1"></div>
      <div className="f-shape s2"></div>
      <div className="f-shape s3"></div>
      <div className="f-shape s4"></div>
    </div>
  );
}

function Sparkline({ data, up = true, animate = true }) {
  const W = 120, H = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = (max - min) || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  }).join(' ');
  const color = up ? '#5fb88a' : '#e26d6d';
  const ref = useRef(null);
  useEffect(() => {
    if (!animate || !ref.current) return;
    const p = ref.current;
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      p.style.transition = 'stroke-dashoffset 1.6s ease';
      p.style.strokeDashoffset = 0;
    });
  }, [animate]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="spark" style={{ width: '100%' }}>
      <polyline ref={ref} points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function gen(n, lo, hi) {
  const out = [];
  let v = lo + (hi - lo) * 0.4;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - 0.5) * (hi - lo) * 0.12;
    v = Math.max(lo, Math.min(hi, v));
    out.push(v);
  }
  return out;
}

export function PulseWidget() {
  const [data, setData] = useState(() => ({
    nifty: { name: 'NIFTY 50', price: 22456.30, change: 0.62, spark: gen(20, 22300, 22500) },
    sensex: { name: 'BSE SENSEX', price: 73824.50, change: 0.48, spark: gen(20, 73600, 73900) },
    bankNifty: { name: 'BANK NIFTY', price: 48128.20, change: -0.21, spark: gen(20, 48000, 48300) },
    gold: { name: 'GOLD ₹/10g', price: 72840, change: 1.15, spark: gen(20, 72000, 73000) },
  }));

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          const item = { ...next[k] };
          const drift = (Math.random() - 0.5) * item.price * 0.0008;
          item.price = Math.max(0, item.price + drift);
          item.change = item.change + (Math.random() - 0.5) * 0.05;
          item.spark = [...item.spark.slice(1), item.spark[item.spark.length - 1] + drift];
          next[k] = item;
        });
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pulse-widget">
      {Object.entries(data).map(([k, it]) => {
        const up = it.change >= 0;
        return (
          <div key={k} className="pulse-cell">
            <div className="name"><span className="live-dot"></span>{it.name}</div>
            <div className="price">{it.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
            <div className={`delta ${up ? '' : 'dn'}`}>{up ? '▲' : '▼'} {Math.abs(it.change).toFixed(2)}%</div>
            <Sparkline data={it.spark} up={up} animate={false} />
          </div>
        );
      })}
    </div>
  );
}

export function FlipNumber({ value, format = (v) => v.toFixed(0) }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1600;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{format(display)}</span>;
}
