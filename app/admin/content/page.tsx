'use client';
export const dynamic = 'force-dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar';
import { supabase, type ContentRow } from '@/lib/supabase';

type SectionMap = Record<string, Record<string, string>>;

function E({
  value,
  onChange,
  tag = 'span',
  className = '',
  style = {},
}: {
  value: string;
  onChange: (v: string) => void;
  tag?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const editingRef = useRef(false);

  useEffect(() => {
    if (ref.current && !editingRef.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  const Tag = tag as 'span';
  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      className={`editable${className ? ` ${className}` : ''}`}
      style={{ outline: 'none', ...style }}
      onFocus={() => { editingRef.current = true; }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        editingRef.current = false;
        onChange(e.currentTarget.textContent ?? '');
      }}
      onInput={(e: React.FormEvent<HTMLElement>) => {
        onChange((e.currentTarget as HTMLElement).textContent ?? '');
      }}
    />
  );
}

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

  const get = (section: string, key: string): string =>
    dirty[section]?.[key] !== undefined ? dirty[section][key] : (data[section]?.[key] ?? '');

  const dirtyCount = Object.values(dirty).reduce((n, s) => n + Object.keys(s).length, 0);

  const saveAll = async () => {
    if (dirtyCount === 0) return;
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

  return (
    <div className="admin-root">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <div className="admin-page-title">Content Editor</div>
            <div className="admin-topbar-meta" style={{ marginTop: 2 }}>Click any text to edit · changes go live on next page load</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {dirtyCount > 0 && (
              <span style={{ fontSize: 10, color: '#d4b06a', fontFamily: 'Geist Mono,monospace', letterSpacing: '0.12em' }}>
                {dirtyCount} UNSAVED {dirtyCount === 1 ? 'FIELD' : 'FIELDS'}
              </span>
            )}
            <button
              className={`save-btn${saved ? ' saved' : ''}`}
              onClick={saveAll}
              disabled={saving || dirtyCount === 0}
            >
              {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save all changes'}
            </button>
          </div>
        </div>

        <div className="admin-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(236,235,229,0.3)', fontSize: 13 }}>Loading content…</div>
          ) : (
            <div className="wysiwyg-preview">

              {/* ─── HERO ─────────────────────────────────── */}
              <div className="preview-section preview-hero">
                <div className="preview-section-tag">Hero Section</div>
                <E
                  value={get('hero', 'eyebrow')}
                  onChange={v => set('hero', 'eyebrow', v)}
                  tag="div"
                  className="preview-eyebrow"
                />
                <div className="preview-h1">
                  <E value={get('hero', 'heading_1')} onChange={v => set('hero', 'heading_1', v)} tag="div" />
                  <E value={get('hero', 'heading_2')} onChange={v => set('hero', 'heading_2', v)} tag="div" />
                  <E value={get('hero', 'heading_3')} onChange={v => set('hero', 'heading_3', v)} tag="div" className="preview-gold" />
                </div>
                <E
                  value={get('hero', 'subtext')}
                  onChange={v => set('hero', 'subtext', v)}
                  tag="p"
                  className="preview-lead"
                />
                <div className="preview-trust-row">
                  {([1, 2, 3, 4] as const).map(n => (
                    <div key={n} className="preview-trust-item">
                      <E value={get('hero', `stat_${n}_num`)} onChange={v => set('hero', `stat_${n}_num`, v)} className="preview-stat-num" />
                      <E value={get('hero', `stat_${n}_lbl`)} onChange={v => set('hero', `stat_${n}_lbl`, v)} className="preview-stat-lbl" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── ABOUT ────────────────────────────────── */}
              <div className="preview-section preview-about">
                <div className="preview-section-tag">About Section</div>
                <div className="preview-section-eyebrow">About · Chhajed Venture Capital</div>
                <E value={get('about', 'heading')} onChange={v => set('about', 'heading', v)} tag="h2" className="preview-h2" />
                <E value={get('about', 'subtext')} onChange={v => set('about', 'subtext', v)} tag="p" className="preview-body-p" />
              </div>

              {/* ─── CTA ──────────────────────────────────── */}
              <div className="preview-section preview-cta">
                <div className="preview-section-tag">CTA Section</div>
                <div className="preview-section-eyebrow">Get started</div>
                <E value={get('cta', 'heading')} onChange={v => set('cta', 'heading', v)} tag="h2" className="preview-h2" />
                <E value={get('cta', 'subtext')} onChange={v => set('cta', 'subtext', v)} tag="p" className="preview-body-p" />
              </div>

              {/* ─── FOOTER ───────────────────────────────── */}
              <div className="preview-section preview-footer">
                <div className="preview-section-tag">Footer Contact</div>
                <div className="preview-contact-rows">
                  <div className="preview-contact-row">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.32a2 2 0 0 1 1.91-2.18H6.5a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <E value={get('footer', 'phone')} onChange={v => set('footer', 'phone', v)} className="preview-contact-text" />
                  </div>
                  <div className="preview-contact-row">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <E value={get('footer', 'email')} onChange={v => set('footer', 'email', v)} className="preview-contact-text" />
                  </div>
                  <div className="preview-contact-row">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4b06a" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <E value={get('footer', 'address')} onChange={v => set('footer', 'address', v)} className="preview-contact-text" />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
