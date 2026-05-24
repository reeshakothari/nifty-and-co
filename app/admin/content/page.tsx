'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { supabase, type ContentRow } from '@/lib/supabase';

type SectionMap = Record<string, Record<string, string>>;

const SECTION_META: Record<string, { label: string; fields: { key: string; label: string; multiline?: boolean }[] }> = {
  hero: {
    label: 'Hero Section',
    fields: [
      { key: 'eyebrow',   label: 'Eyebrow text' },
      { key: 'heading_1', label: 'Heading line 1' },
      { key: 'heading_2', label: 'Heading line 2' },
      { key: 'heading_3', label: 'Heading line 3 (shimmer)' },
      { key: 'subtext',   label: 'Subtitle paragraph', multiline: true },
      { key: 'stat_1_num', label: 'Stat 1 — Number' },
      { key: 'stat_1_lbl', label: 'Stat 1 — Label' },
      { key: 'stat_2_num', label: 'Stat 2 — Number' },
      { key: 'stat_2_lbl', label: 'Stat 2 — Label' },
      { key: 'stat_3_num', label: 'Stat 3 — Number' },
      { key: 'stat_3_lbl', label: 'Stat 3 — Label' },
      { key: 'stat_4_num', label: 'Stat 4 — Number' },
      { key: 'stat_4_lbl', label: 'Stat 4 — Label' },
    ],
  },
  about: {
    label: 'About Section',
    fields: [
      { key: 'heading', label: 'Section heading' },
      { key: 'subtext', label: 'Intro paragraph', multiline: true },
    ],
  },
  cta: {
    label: 'CTA Section',
    fields: [
      { key: 'heading', label: 'CTA heading' },
      { key: 'subtext', label: 'CTA subtext', multiline: true },
    ],
  },
  footer: {
    label: 'Footer',
    fields: [
      { key: 'phone',   label: 'Phone number' },
      { key: 'email',   label: 'Email address' },
      { key: 'address', label: 'Office address' },
    ],
  },
};

function SectionEditor({
  sectionKey, meta, values, onSave,
}: {
  sectionKey: string;
  meta: typeof SECTION_META[string];
  values: Record<string, string>;
  onSave: (section: string, updates: Record<string, string>) => Promise<void>;
}) {
  const [open, setOpen]       = useState(sectionKey === 'hero');
  const [local, setLocal]     = useState<Record<string, string>>(values);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => { setLocal(values); }, [values]);

  const isDirty = Object.keys(local).some(k => local[k] !== values[k]);

  const pairs: Array<{ key: string; label: string; multiline?: boolean }[]> = [];
  const fields = meta.fields;
  for (let i = 0; i < fields.length; i += 2) {
    if (fields[i].multiline || (fields[i + 1] && fields[i + 1].multiline)) {
      pairs.push([fields[i]]);
      if (fields[i + 1]) pairs.push([fields[i + 1]]);
    } else {
      pairs.push(fields[i + 1] ? [fields[i], fields[i + 1]] : [fields[i]]);
    }
  }

  const handleSave = async () => {
    setSaving(true);
    await onSave(sectionKey, local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="content-section-card">
      <div className="content-section-head" onClick={() => setOpen(v => !v)}>
        <div className="content-section-title">
          <span>{open ? '▾' : '▸'}</span>
          {meta.label}
          <span className="section-tag">{sectionKey}</span>
        </div>
        {isDirty && <span style={{ fontSize: 10, color: '#d4b06a', fontFamily: 'Geist Mono,monospace', letterSpacing: '0.1em' }}>UNSAVED</span>}
      </div>

      {open && (
        <div className="content-section-body">
          {pairs.map((row, ri) => (
            <div key={ri} className={row.length === 2 ? 'content-fields-row' : ''}>
              {row.map(f => (
                <div key={f.key} className="content-field">
                  <label>{f.label}</label>
                  {f.multiline ? (
                    <textarea
                      value={local[f.key] ?? ''}
                      onChange={e => setLocal(prev => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      type="text"
                      value={local[f.key] ?? ''}
                      onChange={e => setLocal(prev => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          <div>
            <button
              className={`save-btn${saved ? ' saved' : ''}`}
              onClick={handleSave}
              disabled={saving || (!isDirty && !saved)}
            >
              {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminContent() {
  const [data, setData]     = useState<SectionMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('nifty_and_co_content')
      .select('*')
      .then(({ data: rows }) => {
        const map: SectionMap = {};
        (rows as ContentRow[])?.forEach(r => {
          if (!map[r.section]) map[r.section] = {};
          map[r.section][r.key] = r.value;
        });
        setData(map);
        setLoading(false);
      });
  }, []);

  const handleSave = async (section: string, updates: Record<string, string>) => {
    const upserts = Object.entries(updates).map(([key, value]) => ({
      section, key, value, updated_at: new Date().toISOString(),
    }));
    await supabase.from('nifty_and_co_content').upsert(upserts, { onConflict: 'section,key' });
    setData(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));
  };

  return (
    <div className="admin-root">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-page-title">Content Editor</div>
          <div className="admin-topbar-meta">Changes save to Supabase and go live on next page load</div>
        </div>

        <div className="admin-body">
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(236,235,229,0.3)', fontSize: 13 }}>Loading content…</div>
          ) : (
            <div className="content-sections">
              {Object.entries(SECTION_META).map(([key, meta]) => (
                <SectionEditor
                  key={key}
                  sectionKey={key}
                  meta={meta}
                  values={data[key] ?? {}}
                  onSave={handleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
