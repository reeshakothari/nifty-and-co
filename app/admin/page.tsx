'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { supabase, type Lead } from '@/lib/supabase';

const STATUS_COLORS: Record<string, string> = {
  new: '#d4b06a', contacted: '#6495ed', converted: '#5fb88a', lost: '#e26d6d',
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('nifty_and_co_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => { setLeads((data as Lead[]) ?? []); setLoading(false); });
  }, []);

  const total     = leads.length;
  const newLeads  = leads.filter(l => l.status === 'new').length;
  const converted = leads.filter(l => l.status === 'converted').length;
  const today     = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="admin-root">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-page-title">Dashboard</div>
          <div className="admin-topbar-meta">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>

        <div className="admin-body">
          {/* Stat cards */}
          <div className="stat-cards">
            <div className="stat-card gold">
              <div className="stat-card-label">Total Leads</div>
              <div className="stat-card-value">{loading ? '—' : total}</div>
              <div className="stat-card-sub">All time</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">New</div>
              <div className="stat-card-value">{loading ? '—' : newLeads}</div>
              <div className="stat-card-sub">Awaiting contact</div>
            </div>
            <div className="stat-card green">
              <div className="stat-card-label">Converted</div>
              <div className="stat-card-value">{loading ? '—' : converted}</div>
              <div className="stat-card-sub">Became clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Today</div>
              <div className="stat-card-value">{loading ? '—' : today}</div>
              <div className="stat-card-sub">New submissions</div>
            </div>
          </div>

          {/* Recent leads */}
          <div className="admin-panel">
            <div className="admin-panel-head">
              <div className="admin-panel-title">Recent Leads</div>
              <a href="/admin/leads" style={{ fontSize: 12, color: '#d4b06a', textDecoration: 'none' }}>View all →</a>
            </div>
            {loading ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'rgba(236,235,229,0.3)', fontSize: 13 }}>Loading…</div>
            ) : leads.length === 0 ? (
              <div className="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <p>No leads yet. They'll appear here when someone submits the form.</p>
              </div>
            ) : (
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Goal</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 8).map(l => (
                    <tr key={l.id}>
                      <td>
                        <div className="lead-name">{l.name}</div>
                        <div className="lead-email">{l.email}</div>
                      </td>
                      <td>{l.goal ? <span className="lead-goal">{l.goal}</span> : '—'}</td>
                      <td><span className="chip">{l.amount ?? '—'}</span></td>
                      <td>
                        <span className="status-badge" style={{ background: `${STATUS_COLORS[l.status]}22`, color: STATUS_COLORS[l.status] }}>
                          <span className="status-dot" />
                          {l.status}
                        </span>
                      </td>
                      <td style={{ color: 'rgba(236,235,229,0.4)', fontSize: 12 }}>{fmt(l.created_at)}</td>
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
