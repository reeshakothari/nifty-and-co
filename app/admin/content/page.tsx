'use client';
export const dynamic = 'force-dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar';
import { supabase, type ContentRow } from '@/lib/supabase';

type SectionMap = Record<string, Record<string, string>>;

function E({
  value, onChange, tag = 'span', className = '', style = {},
}: {
  value: string; onChange: (v: string) => void;
  tag?: string; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const editing = useRef(false);
  useEffect(() => {
    if (ref.current && !editing.current && ref.current.textContent !== value)
      ref.current.textContent = value;
  }, [value]);
  const Tag = tag as 'span';
  return (
    <Tag ref={ref as any} contentEditable suppressContentEditableWarning
      className={`editable${className ? ` ${className}` : ''}`}
      style={{ outline: 'none', ...style }}
      onFocus={() => { editing.current = true; }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => { editing.current = false; onChange(e.currentTarget.textContent ?? ''); }}
      onInput={(e: React.FormEvent<HTMLElement>) => { onChange((e.currentTarget as HTMLElement).textContent ?? ''); }}
    />
  );
}

const SECTION_ANCHORS = [
  { id: 'nav', label: 'Nav' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'whyus', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'insights', label: 'Insights' },
  { id: 'cta', label: 'CTA' },
  { id: 'faq', label: 'FAQ' },
  { id: 'footer', label: 'Footer' },
  { id: 'modal', label: 'Modal' },
];

export default function AdminContent() {
  const [data, setData]       = useState<SectionMap>({});
  const [dirty, setDirty]     = useState<SectionMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    supabase.from('nifty_and_co_content').select('*').then(({ data: rows }) => {
      const map: SectionMap = {};
      (rows as ContentRow[])?.forEach(r => {
        if (!map[r.section]) map[r.section] = {};
        map[r.section][r.key] = r.value;
      });
      setData(map);
      setLoading(false);
    });
  }, []);

  const set = useCallback((section: string, key: string, value: string) => {
    setDirty(prev => ({ ...prev, [section]: { ...(prev[section] ?? {}), [key]: value } }));
  }, []);

  const get = (section: string, key: string, fb = ''): string =>
    dirty[section]?.[key] !== undefined ? dirty[section][key] : (data[section]?.[key] ?? fb);

  const dirtyCount = Object.values(dirty).reduce((n, s) => n + Object.keys(s).length, 0);

  const saveAll = async () => {
    if (!dirtyCount) return;
    setSaving(true);
    const upserts = Object.entries(dirty).flatMap(([section, keys]) =>
      Object.entries(keys).map(([key, value]) => ({ section, key, value, updated_at: new Date().toISOString() }))
    );
    await supabase.from('nifty_and_co_content').upsert(upserts, { onConflict: 'section,key' });
    setData(prev => {
      const next = { ...prev };
      Object.entries(dirty).forEach(([s, kvs]) => { next[s] = { ...(next[s] ?? {}), ...kvs }; });
      return next;
    });
    setDirty({});
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(`ps-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="admin-root">
      <Sidebar />
      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <div className="admin-page-title">Content Editor</div>
            <div className="admin-topbar-meta" style={{ marginTop: 2 }}>Click any text to edit inline · saves to Supabase</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {dirtyCount > 0 && (
              <span style={{ fontSize: 10, color: '#d4b06a', fontFamily: 'Geist Mono,monospace', letterSpacing: '0.12em' }}>
                {dirtyCount} UNSAVED {dirtyCount === 1 ? 'FIELD' : 'FIELDS'}
              </span>
            )}
            <button className={`save-btn${saved ? ' saved' : ''}`} onClick={saveAll} disabled={saving || !dirtyCount}>
              {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save all changes'}
            </button>
          </div>
        </div>

        {/* Section jump nav */}
        <div className="preview-jumper">
          {SECTION_ANCHORS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="preview-jump-btn">{s.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(236,235,229,0.3)', fontSize: 13 }}>Loading content…</div>
        ) : (
          <div className="wysiwyg-preview">

            {/* ── NAV ─────────────────────────────────────── */}
            <div id="ps-nav" className="preview-section preview-nav-section">
              <div className="preview-section-tag">Nav</div>
              <div className="preview-nav-bar">
                <div className="preview-brand">
                  <div className="preview-brand-mark">N</div>
                  <div>
                    <E value={get('nav','brand_name','Nifty & Co.')} onChange={v=>set('nav','brand_name',v)} tag="div" className="preview-brand-name" />
                    <E value={get('nav','brand_sub','Chhajed Venture Capital')} onChange={v=>set('nav','brand_sub',v)} tag="div" className="preview-brand-sub" />
                  </div>
                </div>
                <div className="preview-nav-links">
                  <span>About</span><span>Services</span><span>How we work</span><span>Insights</span><span>FAQ</span>
                </div>
                <div className="preview-nav-cta">Let&apos;s talk →</div>
              </div>
            </div>

            {/* ── HERO ────────────────────────────────────── */}
            <div id="ps-hero" className="preview-section preview-hero">
              <div className="preview-section-tag">Hero</div>
              <E value={get('hero','eyebrow','SEBI Registered · Since 2021')} onChange={v=>set('hero','eyebrow',v)} tag="div" className="preview-eyebrow" />
              <div className="preview-h1">
                <E value={get('hero','heading_1','Your trusted')} onChange={v=>set('hero','heading_1',v)} tag="div" />
                <E value={get('hero','heading_2','partner in')} onChange={v=>set('hero','heading_2',v)} tag="div" />
                <E value={get('hero','heading_3','wealth creation.')} onChange={v=>set('hero','heading_3',v)} tag="div" className="preview-gold" />
              </div>
              <E value={get('hero','subtext','')} onChange={v=>set('hero','subtext',v)} tag="p" className="preview-lead" />
              <div className="preview-trust-row">
                {([1,2,3,4] as const).map(n => (
                  <div key={n} className="preview-trust-item">
                    <E value={get('hero',`stat_${n}_num`,'')} onChange={v=>set('hero',`stat_${n}_num`,v)} className="preview-stat-num" />
                    <E value={get('hero',`stat_${n}_lbl`,'')} onChange={v=>set('hero',`stat_${n}_lbl`,v)} className="preview-stat-lbl" />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <div className="preview-field-row">
                  <span className="preview-field-label">Trust mark</span>
                  <E value={get('hero','trust_mark','')} onChange={v=>set('hero','trust_mark',v)} style={{ fontSize: 14, color: 'rgba(236,235,229,0.7)' }} />
                </div>
              </div>
            </div>

            {/* ── ABOUT ───────────────────────────────────── */}
            <div id="ps-about" className="preview-section preview-about">
              <div className="preview-section-tag">About</div>
              <div className="preview-section-eyebrow">
                <E value={get('about','eyebrow','About · Chhajed Venture Capital')} onChange={v=>set('about','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('about','heading','')} onChange={v=>set('about','heading',v)} tag="span" />
                {' '}
                <E value={get('about','heading_accent','')} onChange={v=>set('about','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('about','subtext','')} onChange={v=>set('about','subtext',v)} tag="p" className="preview-body-p" />
              <div className="preview-card" style={{ marginTop: 28 }}>
                <div className="preview-card-label-row">
                  <E value={get('about','card_label','')} onChange={v=>set('about','card_label',v)} className="preview-chip" />
                </div>
                <E value={get('about','card_heading','')} onChange={v=>set('about','card_heading',v)} tag="h3" className="preview-h3" />
                <E value={get('about','card_body','')} onChange={v=>set('about','card_body',v)} tag="p" className="preview-body-p" />
                <div className="preview-points">
                  {[1,2,3].map(n => (
                    <div key={n} className="preview-point">
                      <E value={get('about',`point_${n}_num`,`0${n}`)} onChange={v=>set('about',`point_${n}_num`,v)} className="preview-point-num" />
                      <div>
                        <E value={get('about',`point_${n}_title`,'')} onChange={v=>set('about',`point_${n}_title`,v)} tag="div" className="preview-point-title" />
                        <E value={get('about',`point_${n}_body`,'')} onChange={v=>set('about',`point_${n}_body`,v)} tag="div" className="preview-point-body" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SERVICES ────────────────────────────────── */}
            <div id="ps-services" className="preview-section preview-dark">
              <div className="preview-section-tag">Services</div>
              <div className="preview-section-eyebrow">
                <E value={get('services','eyebrow','Services')} onChange={v=>set('services','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('services','heading','')} onChange={v=>set('services','heading',v)} tag="span" />
                {' '}
                <E value={get('services','heading_accent','')} onChange={v=>set('services','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('services','subtext','')} onChange={v=>set('services','subtext',v)} tag="p" className="preview-body-p" />
              <div className="preview-services-grid">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="preview-service-card">
                    <div className="preview-service-num">0{n}</div>
                    <E value={get('services',`${n}_title`,'')} onChange={v=>set('services',`${n}_title`,v)} tag="div" className="preview-service-title" />
                    <E value={get('services',`${n}_body`,'')} onChange={v=>set('services',`${n}_body`,v)} tag="div" className="preview-service-body" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── WHY US ──────────────────────────────────── */}
            <div id="ps-whyus" className="preview-section preview-about">
              <div className="preview-section-tag">Why Us</div>
              <div className="preview-section-eyebrow">
                <E value={get('whyus','eyebrow','Why Nifty & Co.')} onChange={v=>set('whyus','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('whyus','heading','')} onChange={v=>set('whyus','heading',v)} tag="span" />
                {' '}
                <E value={get('whyus','heading_accent','')} onChange={v=>set('whyus','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('whyus','subtext','')} onChange={v=>set('whyus','subtext',v)} tag="p" className="preview-body-p" />
              <div className="preview-table" style={{ marginTop: 24 }}>
                <div className="preview-table-head">
                  <div>Dimension</div><div style={{ color:'#d4b06a' }}>Nifty &amp; Co.</div><div style={{ color:'rgba(236,235,229,0.4)' }}>Industry default</div>
                </div>
                {[1,2,3,4,5].map(n => (
                  <div key={n} className="preview-table-row">
                    <E value={get('whyus',`row_${n}_label`,'')} onChange={v=>set('whyus',`row_${n}_label`,v)} className="preview-table-lbl" />
                    <E value={get('whyus',`row_${n}_us`,'')}    onChange={v=>set('whyus',`row_${n}_us`,v)}    className="preview-table-us" />
                    <E value={get('whyus',`row_${n}_them`,'')}  onChange={v=>set('whyus',`row_${n}_them`,v)}  className="preview-table-them" />
                  </div>
                ))}
              </div>
              <div className="preview-points" style={{ marginTop: 24 }}>
                {[1,2,3,4].map(n => (
                  <div key={n} className="preview-point">
                    <div className="preview-point-icon">◆</div>
                    <div>
                      <E value={get('whyus',`point_${n}_title`,'')} onChange={v=>set('whyus',`point_${n}_title`,v)} tag="div" className="preview-point-title" />
                      <E value={get('whyus',`point_${n}_body`,'')}  onChange={v=>set('whyus',`point_${n}_body`,v)}  tag="div" className="preview-point-body" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PROCESS ─────────────────────────────────── */}
            <div id="ps-process" className="preview-section preview-dark">
              <div className="preview-section-tag">Process</div>
              <div className="preview-section-eyebrow">
                <E value={get('process','eyebrow','How we work')} onChange={v=>set('process','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('process','heading','')} onChange={v=>set('process','heading',v)} tag="span" />
              </h2>
              <E value={get('process','subtext','')} onChange={v=>set('process','subtext',v)} tag="p" className="preview-body-p" />
              <div className="preview-steps">
                {[1,2,3,4].map(n => (
                  <div key={n} className="preview-step">
                    <div className="preview-step-num">
                      <E value={get('process',`step_${n}_num`,`${n}`)} onChange={v=>set('process',`step_${n}_num`,v)} />
                    </div>
                    <E value={get('process',`step_${n}_title`,'')} onChange={v=>set('process',`step_${n}_title`,v)} tag="div" className="preview-step-title" />
                    <E value={get('process',`step_${n}_body`,'')}  onChange={v=>set('process',`step_${n}_body`,v)}  tag="div" className="preview-step-body" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── TESTIMONIALS ────────────────────────────── */}
            <div id="ps-testimonials" className="preview-section preview-about">
              <div className="preview-section-tag">Testimonials</div>
              <div className="preview-section-eyebrow">
                <E value={get('testimonials','eyebrow','In their words')} onChange={v=>set('testimonials','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('testimonials','heading','')} onChange={v=>set('testimonials','heading',v)} tag="span" />
                {' '}
                <E value={get('testimonials','heading_accent','')} onChange={v=>set('testimonials','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <div className="preview-testi-grid">
                {[1,2,3].map(n => (
                  <div key={n} className="preview-testi-card">
                    <E value={get('testimonials',`${n}_badge`,'')} onChange={v=>set('testimonials',`${n}_badge`,v)} className="preview-badge" />
                    <E value={get('testimonials',`${n}_quote`,'')} onChange={v=>set('testimonials',`${n}_quote`,v)} tag="p" className="preview-quote" />
                    <div className="preview-testi-meta">
                      <div className="preview-avatar">
                        <E value={get('testimonials',`${n}_initial`,'')} onChange={v=>set('testimonials',`${n}_initial`,v)} />
                      </div>
                      <div>
                        <E value={get('testimonials',`${n}_name`,'')} onChange={v=>set('testimonials',`${n}_name`,v)} tag="div" className="preview-testi-name" />
                        <E value={get('testimonials',`${n}_role`,'')} onChange={v=>set('testimonials',`${n}_role`,v)} tag="div" className="preview-testi-role" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── INSIGHTS ────────────────────────────────── */}
            <div id="ps-insights" className="preview-section preview-dark">
              <div className="preview-section-tag">Insights</div>
              <div className="preview-section-eyebrow">
                <E value={get('insights','eyebrow','Market insights')} onChange={v=>set('insights','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('insights','heading','')} onChange={v=>set('insights','heading',v)} tag="span" />
                {' '}
                <E value={get('insights','heading_accent','')} onChange={v=>set('insights','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('insights','subtext','')} onChange={v=>set('insights','subtext',v)} tag="p" className="preview-body-p" />
              <div className="preview-insights-grid">
                {[1,2,3].map(n => (
                  <div key={n} className="preview-insight-card">
                    <E value={get('insights',`${n}_cat`,'')}   onChange={v=>set('insights',`${n}_cat`,v)}   className="preview-insight-cat" />
                    <E value={get('insights',`${n}_title`,'')} onChange={v=>set('insights',`${n}_title`,v)} tag="div" className="preview-insight-title" />
                    <E value={get('insights',`${n}_body`,'')}  onChange={v=>set('insights',`${n}_body`,v)}  tag="p" className="preview-insight-body" />
                    <div className="preview-insight-meta">
                      <E value={get('insights',`${n}_read`,'')} onChange={v=>set('insights',`${n}_read`,v)} />
                      <E value={get('insights',`${n}_date`,'')} onChange={v=>set('insights',`${n}_date`,v)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA ─────────────────────────────────────── */}
            <div id="ps-cta" className="preview-section preview-cta">
              <div className="preview-section-tag">CTA</div>
              <div className="preview-section-eyebrow">
                <E value={get('cta','eyebrow','Get started')} onChange={v=>set('cta','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('cta','heading','')} onChange={v=>set('cta','heading',v)} tag="span" />
                {' '}
                <E value={get('cta','heading_accent','')} onChange={v=>set('cta','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('cta','subtext','')} onChange={v=>set('cta','subtext',v)} tag="p" className="preview-body-p" />
            </div>

            {/* ── FAQ ─────────────────────────────────────── */}
            <div id="ps-faq" className="preview-section preview-about">
              <div className="preview-section-tag">FAQ</div>
              <div className="preview-section-eyebrow">
                <E value={get('faq','eyebrow','Questions, answered')} onChange={v=>set('faq','eyebrow',v)} />
              </div>
              <h2 className="preview-h2">
                <E value={get('faq','heading','')} onChange={v=>set('faq','heading',v)} tag="span" />
                {' '}
                <E value={get('faq','heading_accent','')} onChange={v=>set('faq','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <div className="preview-faq-list">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="preview-faq-item">
                    <E value={get('faq',`${n}_q`,'')} onChange={v=>set('faq',`${n}_q`,v)} tag="div" className="preview-faq-q" />
                    <E value={get('faq',`${n}_a`,'')} onChange={v=>set('faq',`${n}_a`,v)} tag="div" className="preview-faq-a" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── FOOTER ──────────────────────────────────── */}
            <div id="ps-footer" className="preview-section preview-footer">
              <div className="preview-section-tag">Footer</div>
              <E value={get('footer','brand_tagline','')} onChange={v=>set('footer','brand_tagline',v)} tag="p" className="preview-body-p" style={{ maxWidth: 400, marginBottom: 20 }} />
              <div className="preview-contact-rows">
                <div className="preview-contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.32a2 2 0 0 1 1.91-2.18H6.5a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <E value={get('footer','phone','')} onChange={v=>set('footer','phone',v)} className="preview-contact-text" />
                </div>
                <div className="preview-contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <E value={get('footer','email','')} onChange={v=>set('footer','email',v)} className="preview-contact-text" />
                </div>
                <div className="preview-contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <E value={get('footer','address','')} onChange={v=>set('footer','address',v)} className="preview-contact-text" />
                </div>
                <div className="preview-contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <span style={{ fontSize: 12, color: 'rgba(236,235,229,0.5)', marginRight: 8 }}>wa.me/</span>
                  <E value={get('footer','whatsapp','')} onChange={v=>set('footer','whatsapp',v)} className="preview-contact-text" />
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <div className="preview-field-row">
                  <span className="preview-field-label">Newsletter heading</span>
                  <E value={get('footer','newsletter_label','')} onChange={v=>set('footer','newsletter_label',v)} />
                </div>
                <div className="preview-field-row" style={{ marginTop: 10 }}>
                  <span className="preview-field-label">Newsletter body</span>
                  <E value={get('footer','newsletter_body','')} onChange={v=>set('footer','newsletter_body',v)} />
                </div>
                <div className="preview-field-row" style={{ marginTop: 10 }}>
                  <span className="preview-field-label">Copyright</span>
                  <E value={get('footer','copyright','')} onChange={v=>set('footer','copyright',v)} />
                </div>
                <div className="preview-field-row" style={{ marginTop: 10 }}>
                  <span className="preview-field-label">Disclaimer</span>
                  <E value={get('footer','disclaimer','')} onChange={v=>set('footer','disclaimer',v)} tag="div" style={{ fontSize: 11, color: 'rgba(236,235,229,0.4)', lineHeight: 1.6 }} />
                </div>
              </div>
            </div>

            {/* ── MODAL ───────────────────────────────────── */}
            <div id="ps-modal" className="preview-section preview-cta">
              <div className="preview-section-tag">Modal</div>
              <E value={get('modal','eyebrow','Free consultation · No commitment')} onChange={v=>set('modal','eyebrow',v)} tag="div" className="preview-eyebrow" />
              <h2 className="preview-h2" style={{ marginTop: 12 }}>
                <E value={get('modal','heading','')} onChange={v=>set('modal','heading',v)} tag="span" />
                {' '}
                <E value={get('modal','heading_accent','')} onChange={v=>set('modal','heading_accent',v)} tag="span" className="preview-gold" />
              </h2>
              <E value={get('modal','subtext','')} onChange={v=>set('modal','subtext',v)} tag="p" className="preview-body-p" />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
