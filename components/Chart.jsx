'use client';
import { useState, useEffect } from 'react';

export function CandlestickChart() {
  const [candles, setCandles] = useState(() => {
    const arr = [];
    let price = 18200;
    for (let i = 0; i < 28; i++) {
      const drift = Math.sin(i * 0.4) * 30 + (i / 28) * 220;
      const open = price;
      const range = 40 + Math.random() * 80;
      const dir = Math.random() > 0.45 ? 1 : -1;
      const close = open + dir * (Math.random() * range * 0.7) + drift * 0.05;
      const high = Math.max(open, close) + Math.random() * range * 0.4;
      const low = Math.min(open, close) - Math.random() * range * 0.4;
      arr.push({ o: open, c: close, h: high, l: low });
      price = close;
    }
    return arr;
  });
  const [tick, setTick] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [delta, setDelta] = useState({ abs: 0, pct: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setCandles((prev) => {
        const arr = prev.slice();
        const last = { ...arr[arr.length - 1] };
        const move = (Math.random() - 0.45) * 18;
        last.c = last.c + move;
        last.h = Math.max(last.h, last.c);
        last.l = Math.min(last.l, last.c);
        arr[arr.length - 1] = last;
        return arr;
      });
      setTick((t) => t + 1);
    }, 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCandles((prev) => {
        const arr = prev.slice(1);
        const last = arr[arr.length - 1];
        const open = last.c;
        const range = 40 + Math.random() * 80;
        const dir = Math.random() > 0.45 ? 1 : -1;
        const close = open + dir * (Math.random() * range * 0.7);
        const high = Math.max(open, close) + Math.random() * range * 0.4;
        const low = Math.min(open, close) - Math.random() * range * 0.4;
        arr.push({ o: open, c: close, h: high, l: low });
        return arr;
      });
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const W = 560, H = 260, padX = 16, padY = 20;
  const allPrices = candles.flatMap(c => [c.h, c.l]);
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const range = max - min || 1;
  const cw = (W - padX * 2) / candles.length;
  const candleWidth = cw * 0.55;
  const yPos = (p) => padY + (1 - (p - min) / range) * (H - padY * 2);

  const linePath = candles.map((c, i) => {
    const x = padX + cw * i + cw / 2;
    return `${i === 0 ? 'M' : 'L'} ${x} ${yPos(c.c)}`;
  }).join(' ');
  const areaPath = `${linePath} L ${padX + cw * (candles.length - 1) + cw / 2} ${H} L ${padX + cw / 2} ${H} Z`;

  const last = candles[candles.length - 1];
  const first = candles[0];
  useEffect(() => {
    setCurrentPrice(last.c);
    const abs = last.c - first.o;
    setDelta({ abs, pct: (abs / first.o) * 100 });
  }, [tick, candles]);

  const lastX = padX + cw * (candles.length - 1) + cw / 2;
  const lastY = yPos(last.c);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-symbol">NSE · NIFTY 50</div>
          <div className="chart-name">Nifty 50 Index</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="chart-price">{currentPrice.toFixed(2)}</div>
          <div className={`chart-delta ${delta.abs < 0 ? 'red' : ''}`}>
            {delta.abs >= 0 ? '▲' : '▼'} {Math.abs(delta.abs).toFixed(2)} ({delta.pct.toFixed(2)}%)
          </div>
        </div>
      </div>

      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4b06a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d4b06a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1="0" x2={W} y1={padY + p * (H - padY * 2)} y2={padY + p * (H - padY * 2)} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
        ))}
        <path d={areaPath} fill="url(#areaGrad)" opacity="0.7" />
        {candles.map((c, i) => {
          const x = padX + cw * i + cw / 2;
          const up = c.c >= c.o;
          const color = up ? '#5fb88a' : '#e26d6d';
          const bodyY = yPos(Math.max(c.o, c.c));
          const bodyH = Math.max(2, Math.abs(yPos(c.o) - yPos(c.c)));
          return (
            <g key={i} style={{ transition: 'all 0.6s ease' }}>
              <line x1={x} x2={x} y1={yPos(c.h)} y2={yPos(c.l)} stroke={color} strokeWidth="1" opacity="0.7" />
              <rect x={x - candleWidth / 2} y={bodyY} width={candleWidth} height={bodyH} fill={color} fillOpacity={0.85} stroke={color} strokeWidth="0.5" />
            </g>
          );
        })}
        <path d={linePath} fill="none" stroke="#d4b06a" strokeWidth="1.2" opacity="0.55" />
        <line x1="0" x2={W} y1={lastY} y2={lastY} stroke="#d4b06a" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.5" />
        <circle cx={lastX} cy={lastY} r="4" fill="#d4b06a">
          <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={lastX} cy={lastY} r="3" fill="#e8c684" />
      </svg>

      <div className="chart-footer">
        <span><span className="live-dot"></span>LIVE · INDIA</span>
        <span>1D · 5M · 15M · 1H · 1D · 1W</span>
        <span>VOL 482M</span>
      </div>

      <div className="mini-stat mini-1">
        <div className="label">Today&apos;s Range</div>
        <div className="val">18,420 — 18,612</div>
      </div>
      <div className="mini-stat mini-2">
        <div className="label">Open Interest</div>
        <div className="val gold">+12.4%</div>
      </div>
    </div>
  );
}

export function StockTicker() {
  const symbols = [
    { sym: 'RELIANCE', price: 2842.50, change: 1.24 },
    { sym: 'TCS', price: 4128.20, change: -0.42 },
    { sym: 'HDFCBANK', price: 1672.40, change: 0.88 },
    { sym: 'INFY', price: 1542.15, change: 2.13 },
    { sym: 'ICICIBANK', price: 1228.30, change: 1.55 },
    { sym: 'SBIN', price: 812.65, change: -0.31 },
    { sym: 'BHARTIARTL', price: 1684.90, change: 0.74 },
    { sym: 'KOTAKBANK', price: 1786.20, change: -0.18 },
    { sym: 'HINDUNILVR', price: 2462.80, change: 0.92 },
    { sym: 'LT', price: 3624.50, change: 1.81 },
    { sym: 'ITC', price: 462.30, change: 0.36 },
    { sym: 'AXISBANK', price: 1148.65, change: -0.74 },
    { sym: 'WIPRO', price: 528.40, change: 1.12 },
    { sym: 'MARUTI', price: 12842.00, change: 2.04 },
  ];
  const items = [...symbols, ...symbols];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((s, i) => (
          <div key={i} className="ticker-item">
            <span className="sym">{s.sym}</span>
            <span>{s.price.toFixed(2)}</span>
            <span className={s.change >= 0 ? 'up' : 'dn'}>
              {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
