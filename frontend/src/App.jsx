import { useState } from 'react'
import PatientLookup from './components/PatientLookup'
import ChatAssistant from './components/ChatAssistant'

const s = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: {
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    height: 56,
    gap: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,.06)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: {
    width: 32, height: 32, background: '#1a56db', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: 14,
  },
  logoText: { fontWeight: 700, fontSize: 15, color: '#0f172a' },
  logoSub: { fontSize: 11, color: '#94a3b8', fontWeight: 400 },
  tabs: { display: 'flex', gap: 2, marginLeft: 32 },
  tab: {
    padding: '6px 14px',
    border: '1px solid transparent',
    borderRadius: 6,
    background: 'none',
    fontSize: 13,
    fontWeight: 500,
    color: '#475569',
    cursor: 'pointer',
    transition: 'all .15s',
  },
  tabActive: {
    background: '#eff6ff',
    color: '#1a56db',
    border: '1px solid #bfdbfe',
  },
  pill: {
    marginLeft: 'auto',
    padding: '4px 10px',
    background: '#dcfce7',
    color: '#16a34a',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
  main: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: 20,
    padding: 20,
    maxWidth: 1400,
    width: '100%',
    margin: '0 auto',
    alignItems: 'start',
  },
  leftPanel: { minHeight: 0 },
  rightPanel: { height: 'calc(100vh - 96px)', position: 'sticky', top: 76 },
}

const TABS = [
  { id: 'lookup', label: '🔍  Patient Lookup' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('lookup')

  return (
    <div style={s.page}>
      <header style={s.topbar}>
        <div style={s.logo}>
          <div style={s.logoIcon}>HC</div>
          <div>
            <div style={s.logoText}>HealthCare Central</div>
            <div style={s.logoSub}>Dashboard POC</div>
          </div>
        </div>

        <div style={s.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              style={{ ...s.tab, ...(activeTab === t.id ? s.tabActive : {}) }}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={s.pill}>● Live</div>
      </header>

      <main style={s.main}>
        <div style={s.leftPanel}>
          {activeTab === 'lookup' && <PatientLookup />}
        </div>
        <div style={s.rightPanel}>
          <ChatAssistant />
        </div>
      </main>
    </div>
  )
}
