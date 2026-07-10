const BASE = '/api'

export async function lookupPatient(patientId, dateOfBirth) {
  const res = await fetch(`${BASE}/patient/lookup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patientId, dateOfBirth })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Lookup failed')
  return data
}

export async function sendChatMessage(message, history) {
  const res = await fetch(`${BASE}/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Chat request failed')
  return data.reply
}
