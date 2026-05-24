'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar';
import { supabase, type Lead } from '@/lib/supabase';

const STATUSES = ['new', 'contacted', 'converted', 'lost'] as const;
const STATUS_COLORS: Record<string, string> = {
  new: '#d4b06a', contacted: '#6495ed', converted: '#5fb88a', lost: '#e26d6d',
};

function StatusCell({ lead, onUpdate }: { lead: Lead; onUpdate: (id: string, s: Lead['status']) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className={`status-badge ${lead.status}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="status-dot" />{lead.status}
      </button>
      {open && (
        <div className="status-menu">
          {STATUSES.map(s => (
            <button key={s} onClick={() => { onUpdate(lead.id, s); setOpen(false); }}>
              <span style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[s],display:'inline-block',flexShrink:0 }} />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    supabase
      .from('nifty_and_co_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setLeads((data as Lead[]) ?? []); setLoading(false); });
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await supabase.from('nifty_and_co_leads').update({ status }).eq('id', id);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    await supabase.from('nifty_and_co_leads').delete().eq('id', id);
  };

  const filtered = leads.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.goal ?? '').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = { all: leads.length, new: 0, contacted: 0, converted: 0, lost: 0 };
  leads.forEach(l => { counts[l.status]++; });

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="admin-root">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-page-title">Leads</div>
          <div style={{ display:'flex',gap:12,alignItems:'center' }}>
            <input
              type="search"
              placeholder="Search name, email, goal…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'#ecebe5',fontSize:13,padding:'8px 14px',outline:'none',width:220,fontFamily:'inherit' }}
            />
            <button onClick={load} style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'rgba(236,235,229,0.6)',fontSize:12,padding:'8px 14px',cursor:'pointer',fontFamily:'inherit' }}>
              ↺ Refresh
            </button>
          </div>
        </div>

        <div className="admin-body">
          <div className="admin-panel">
            <div className="filter-bar">
              {(['all', ...STATUSES] as string[]).map(s => (
                <button
                  key={s}
                  className={`filter-btn${filter === s ? ' active' : ''}`}
                  onClick={() => setFilter(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s as keyof typeof counts] ?? 0})
                </button>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(236,235,229,0.3)', fontSize: 13 }}>Loading leads…</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <p>{search || filter !== 'all' ? 'No leads match this filter.' : 'No leads yet.'}</p>
              </div>
            ) : (
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name &amp; Contact</th>
                    <th>Goal</th>
                    <th>Amount</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(l => (
                    <tr key={l.id}>
                      <td>
                        <div className="lead-name">{l.name}</div>
                        <div className="lead-email">{l.email}</div>
                        {l.phone && <div className="lead-email">{l.phone}</div>}
                      </td>
                      <td>{l.goal ? <span className="lead-goal">{l.goal}</span> : <span style={{color:'rgba(236,235,229,0.25)'}}>—</span>}</td>
                      <td><span className="chip">{l.amount ?? '—'}</span></td>
                      <td style={{ maxWidth: 200 }}>
                        {l.message
                          ? <span style={{ fontSize:12,color:'rgba(236,235,229,0.55)',lineHeight:1.45,display:'block' }} title={l.message}>{l.message.length > 60 ? l.message.slice(0,60)+'…' : l.message}</span>
                          : <span style={{color:'rgba(236,235,229,0.2)',fontSize:12}}>—</span>}
                      </td>
                      <td><StatusCell lead={l} onUpdate={updateStatus} /></td>
                      <td style={{ color:'rgba(236,235,229,0.35)',fontSize:11,whiteSpace:'nowrap' }}>{fmt(l.created_at)}</td>
                      <td>
                        <button
                          onClick={() => deleteLead(l.id)}
                          style={{ background:'none',border:'none',color:'rgba(226,109,109,0.4)',cursor:'pointer',fontSize:14,padding:'4px 8px',borderRadius:6,transition:'color 0.2s' }}
                          onMouseEnter={e=>(e.currentTarget.style.color='#e26d6d')}
                          onMouseLeave={e=>(e.currentTarget.style.color='rgba(226,109,109,0.4)')}
                          title="Delete lead"
                        >✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
