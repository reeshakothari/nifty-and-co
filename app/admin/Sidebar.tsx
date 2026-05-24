'use client';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin',         label: 'Dashboard',  icon: '⬡' },
  { href: '/admin/leads',   label: 'Leads',      icon: '◈' },
  { href: '/admin/content', label: 'Content',    icon: '✦' },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <a href="/" className="admin-logo" target="_blank" rel="noopener noreferrer">
        <div className="admin-logo-mark">N</div>
        <div>
          <div className="admin-logo-text">Nifty &amp; Co.</div>
          <div className="admin-logo-sub">Admin</div>
        </div>
      </a>

      <nav className="admin-nav">
        <div className="nav-section">Navigation</div>
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className={path === n.href ? 'active' : ''}
          >
            <span style={{ fontSize: 14, opacity: 0.7 }}>{n.icon}</span>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <a href="/" target="_blank" rel="noopener noreferrer">
          <span>↗</span> View site
        </a>
        <button
          onClick={logout}
          style={{ display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(236,235,229,0.4)',background:'none',border:'none',cursor:'pointer',padding:'8px 12px',borderRadius:8,width:'100%',transition:'color 0.18s',fontFamily:'inherit' }}
          onMouseEnter={e=>(e.currentTarget.style.color='rgba(236,235,229,0.8)')}
          onMouseLeave={e=>(e.currentTarget.style.color='rgba(236,235,229,0.4)')}
        >
          <span>⎋</span> Sign out
        </button>
      </div>
    </aside>
  );
}
