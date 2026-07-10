import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../services/api'

const s = {
  wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' },
  header: { padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', gap: 10 },
  dot: { width: 8, height: 8, borderRadius: '50%', background: '#22c55e' },
  headerTitle: { fontWeight: 600, fontSize: 14, color: 'var(--text)' },
  headerSub: { fontSize: 12, color: 'var(--text-3)', marginLeft: 'auto' },
  messages: { flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 },
  welcome: { textAlign: 'center', padding: '40px 20px', color: 'var(--text-2)' },
  welcomeIcon: { fontSize: 32, marginBottom: 12 },
  welcomeTitle: { fontWeight: 600, fontSize: 15, color: 'var(--text)', marginBottom: 6 },
  welcomeText: { fontSize: 13, lineHeight: 1.6 },
  suggestions: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 16 },
  suggBtn: { padding: '6px 12px', background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid #bfdbfe', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer' },
  msgRow: { display: 'flex', gap: 10 },
  msgRowUser: { display: 'flex', gap: 10, justifyContent: 'flex-end' },
  avatar: { width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 600, flexShrink: 0 },
  avatarUser: { width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--text-2)', fontWeight: 600, flexShrink: 0 },
  bubble: { maxWidth: '75%', padding: '10px 14px', borderRadius: '12px 12px 12px 4px', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 13, lineHeight: 1.6, color: 'var(--text)' },
  bubbleUser: { maxWidth: '75%', padding: '10px 14px', borderRadius: '12px 12px 4px 12px', background: 'var(--primary)', color: '#fff', fontSize: 13, lineHeight: 1.6 },
  bubbleTyping: { maxWidth: '75%', padding: '10px 14px', borderRadius: '12px 12px 12px 4px', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' },
  inputArea: { padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, background: 'var(--surface)' },
  input: { flex: 1, padding: '9px 14px', borderRadius: 20, border: '1px solid var(--border-strong)', fontSize: 13, outline: 'none', color: 'var(--text)', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 },
  sendBtn: { padding: '9px 18px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 20, fontWeight: 500, fontSize: 13, transition: 'background .15s' },
}

const SUGGESTIONS = [
  'How do I search for a patient?',
  'How to check insurance eligibility?',
  'How to generate a billing report?',
  'Why is data not loading?',
  'How to add a new appointment?',
]

export default function ChatAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text) {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: msg }]
    setMessages(updated)
    setLoading(true)
    try {
      const history = updated.slice(0, -1).map(m => ({ role: m.role, content: m.content }))
      const reply = await sendChatMessage(msg, history)
      setMessages([...updated, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages([...updated, { role: 'assistant', content: `⚠️ Error: ${e.message}` }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function renderBubble(content) {
    // Basic markdown-like rendering for bold and line breaks
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.dot} />
        <span style={s.headerTitle}>Dashboard Support Assistant</span>
        <span style={s.headerSub}>Powered by Claude AI</span>
      </div>

      <div style={s.messages}>
        {messages.length === 0 && (
          <div style={s.welcome}>
            <div style={s.welcomeIcon}>🏥</div>
            <div style={s.welcomeTitle}>HealthCare Central Support</div>
            <div style={s.welcomeText}>
              Ask me anything about the dashboard — how to navigate it,<br />
              find patients, check eligibility, or generate reports.
            </div>
            <div style={s.suggestions}>
              {SUGGESTIONS.map(q => (
                <button key={q} style={s.suggBtn} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={m.role === 'user' ? s.msgRowUser : s.msgRow}>
            {m.role === 'assistant' && <div style={s.avatar}>AI</div>}
            <div style={m.role === 'user' ? s.bubbleUser : s.bubble}>
              {m.role === 'assistant' ? renderBubble(m.content) : m.content}
            </div>
            {m.role === 'user' && <div style={s.avatarUser}>You</div>}
          </div>
        ))}

        {loading && (
          <div style={s.msgRow}>
            <div style={s.avatar}>AI</div>
            <div style={s.bubbleTyping}>Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={s.inputArea}>
        <textarea
          style={s.input}
          rows={1}
          placeholder="Ask about the dashboard…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button style={s.sendBtn} onClick={() => send()} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  )
}
