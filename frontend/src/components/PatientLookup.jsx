import { useState } from 'react'
import { lookupPatient } from '../services/api'

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 24, height: '100%' },
  card: { background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: 24 },
  title: { fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 16 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, fontWeight: 500, color: 'var(--text-2)' },
  input: {
    padding: '9px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border-strong)',
    fontSize: 14, outline: 'none', color: 'var(--text)', background: 'var(--surface)',
    transition: 'border-color .15s'
  },
  btn: {
    padding: '9px 20px', background: 'var(--primary)', color: '#fff', border: 'none',
    borderRadius: 'var(--radius)', fontWeight: 500, fontSize: 14, whiteSpace: 'nowrap',
    transition: 'background .15s'
  },
  hint: { fontSize: 12, color: 'var(--text-3)', marginTop: 8 },
  error: { padding: '10px 14px', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius)', fontSize: 13 },

  // Patient card
  pcard: { background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' },
  pheader: { padding: '16px 24px', background: 'var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pname: { color: '#fff', fontWeight: 600, fontSize: 17 },
  pbadge: { background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 },
  pmeta: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderBottom: '1px solid var(--border)' },
  pmetaItem: { padding: '12px 20px', borderRight: '1px solid var(--border)' },
  pmetaLabel: { fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 },
  pmetaVal: { fontSize: 13, fontWeight: 500, color: 'var(--text)' },

  // Tabs
  tabs: { display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 20px', background: 'var(--surface-2)' },
  tab: { padding: '10px 16px', border: 'none', background: 'none', fontSize: 13, fontWeight: 500, color: 'var(--text-2)', borderBottom: '2px solid transparent', cursor: 'pointer' },
  tabActive: { color: 'var(--primary)', borderBottom: '2px solid var(--primary)' },
  tabContent: { padding: 20 },

  // Table
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 12px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border)' },
  td: { padding: '12px 12px', borderBottom: '1px solid var(--border)', verticalAlign: 'top', color: 'var(--text)' },
  tdr: { padding: '12px 12px', borderBottom: '1px solid var(--border)', verticalAlign: 'top', color: 'var(--text)', textAlign: 'right' },

  statusPaid: { display: 'inline-block', padding: '2px 8px', borderRadius: 12, background: 'var(--success-bg)', color: 'var(--success)', fontSize: 11, fontWeight: 600 },
  statusPending: { display: 'inline-block', padding: '2px 8px', borderRadius: 12, background: 'var(--warning-bg)', color: 'var(--warning)', fontSize: 11, fontWeight: 600 },
  statusFailed: { display: 'inline-block', padding: '2px 8px', borderRadius: 12, background: 'var(--danger-bg)', color: 'var(--danger)', fontSize: 11, fontWeight: 600 },

  noteBox: { background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: 'var(--text-2)', marginTop: 4 },
}

function StatusBadge({ status }) {
  const style = status === 'Paid' ? s.statusPaid : status === 'Pending' ? s.statusPending : s.statusFailed
  return <span style={style}>{status}</span>
}

function MedicalTable({ records }) {
  return (
    <table style={s.table}>
      <thead>
        <tr>
          <th style={s.th}>Date</th>
          <th style={s.th}>Diagnosis</th>
          <th style={s.th}>Doctor</th>
          <th style={s.th}>Department</th>
          <th style={s.th}>Prescriptions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, i) => (
          <tr key={i}>
            <td style={{ ...s.td, whiteSpace: 'nowrap', color: 'var(--text-2)' }}>{r.visitDate}</td>
            <td style={s.td}>
              <div style={{ fontWeight: 500 }}>{r.diagnosis}</div>
              {r.notes && <div style={s.noteBox}>{r.notes}</div>}
            </td>
            <td style={{ ...s.td, whiteSpace: 'nowrap' }}>{r.treatingDoctor}</td>
            <td style={{ ...s.td, whiteSpace: 'nowrap' }}>{r.department}</td>
            <td style={{ ...s.td, fontSize: 12, color: 'var(--text-2)' }}>{r.prescriptions || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PaymentTable({ records }) {
  const total = records.filter(r => r.status === 'Paid').reduce((s, r) => s + r.amount, 0)
  return (
    <>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Date</th>
            <th style={s.th}>Invoice</th>
            <th style={s.th}>Description</th>
            <th style={s.th}>Method</th>
            <th style={s.th}>Status</th>
            <th style={{ ...s.th, textAlign: 'right' }}>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td style={{ ...s.td, whiteSpace: 'nowrap', color: 'var(--text-2)' }}>{r.paymentDate}</td>
              <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 12 }}>{r.invoiceNumber}</td>
              <td style={s.td}>{r.description}</td>
              <td style={{ ...s.td, color: 'var(--text-2)' }}>{r.paymentMethod}</td>
              <td style={s.td}><StatusBadge status={r.status} /></td>
              <td style={{ ...s.tdr, fontWeight: 500 }}>{r.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: '12px 12px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Total paid: <strong style={{ color: 'var(--success)' }}>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
        </span>
      </div>
    </>
  )
}

export default function PatientLookup() {
  const [patientId, setPatientId] = useState('')
  const [dob, setDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [patient, setPatient] = useState(null)
  const [activeTab, setActiveTab] = useState('medical')

  async function handleLookup() {
    if (!patientId.trim() || !dob) { setError('Please enter both Patient ID and Date of Birth.'); return }
    setLoading(true); setError(''); setPatient(null)
    try {
      const data = await lookupPatient(patientId.trim(), dob)
      setPatient(data)
      setActiveTab('medical')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) { if (e.key === 'Enter') handleLookup() }

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.title}>Patient Lookup</div>
        <div style={s.row}>
          <div style={s.field}>
            <label style={s.label}>Patient ID</label>
            <input style={s.input} placeholder="e.g. PAT-001" value={patientId}
              onChange={e => setPatientId(e.target.value)} onKeyDown={handleKey} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Date of Birth</label>
            <input style={s.input} type="date" value={dob}
              onChange={e => setDob(e.target.value)} onKeyDown={handleKey} />
          </div>
          <button style={s.btn} onClick={handleLookup} disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
        <div style={s.hint}>Demo: PAT-001 / 1985-03-14 &nbsp;·&nbsp; PAT-002 / 1992-07-28 &nbsp;·&nbsp; PAT-003 / 1978-11-05</div>
        {error && <div style={{ ...s.error, marginTop: 12 }}>{error}</div>}
      </div>

      {patient && (
        <div style={s.pcard}>
          <div style={s.pheader}>
            <div>
              <div style={s.pname}>{patient.fullName}</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>
                {patient.patientId} &nbsp;·&nbsp; {patient.gender} &nbsp;·&nbsp; DOB: {patient.dateOfBirth}
              </div>
            </div>
            <span style={s.pbadge}>{patient.insuranceProvider}</span>
          </div>
          <div style={s.pmeta}>
            <div style={s.pmetaItem}>
              <div style={s.pmetaLabel}>Phone</div>
              <div style={s.pmetaVal}>{patient.phone}</div>
            </div>
            <div style={s.pmetaItem}>
              <div style={s.pmetaLabel}>Email</div>
              <div style={s.pmetaVal}>{patient.email}</div>
            </div>
            <div style={s.pmetaItem}>
              <div style={s.pmetaLabel}>Policy Number</div>
              <div style={{ ...s.pmetaVal, fontFamily: 'monospace', fontSize: 12 }}>{patient.insurancePolicyNumber}</div>
            </div>
            <div style={{ ...s.pmetaItem, borderRight: 'none' }}>
              <div style={s.pmetaLabel}>Total Visits</div>
              <div style={s.pmetaVal}>{patient.medicalHistories.length}</div>
            </div>
          </div>

          <div style={s.tabs}>
            <button style={{ ...s.tab, ...(activeTab === 'medical' ? s.tabActive : {}) }}
              onClick={() => setActiveTab('medical')}>
              Medical History ({patient.medicalHistories.length})
            </button>
            <button style={{ ...s.tab, ...(activeTab === 'payments' ? s.tabActive : {}) }}
              onClick={() => setActiveTab('payments')}>
              Payment History ({patient.payments.length})
            </button>
          </div>
          <div style={s.tabContent}>
            {activeTab === 'medical'
              ? <MedicalTable records={patient.medicalHistories} />
              : <PaymentTable records={patient.payments} />}
          </div>
        </div>
      )}
    </div>
  )
}
