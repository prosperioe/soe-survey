type Participant = {
  name: string
  department: string
  nickname: string
  skillLevel: string
  startedAt?: number
}

const P_KEY = "soapbox_participant"
const A_KEY = "soapbox_answers"

export function setParticipant(p: Participant) {
  try {
    localStorage.setItem(P_KEY, JSON.stringify(p))
  } catch {}
}

export function getParticipant(): Participant | null {
  try {
    const raw = localStorage.getItem(P_KEY)
    return raw ? (JSON.parse(raw) as Participant) : null
  } catch {
    return null
  }
}

export function saveAnswer(qid: string, value: string | string[]) {
  try {
    const raw = localStorage.getItem(A_KEY)
    const prev = raw ? (JSON.parse(raw) as Record<string, string | string[]>) : {}
    prev[qid] = value
    localStorage.setItem(A_KEY, JSON.stringify(prev))
  } catch {}
}

export function getAnswers(): Record<string, string | string[]> {
  try {
    const raw = localStorage.getItem(A_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string | string[]>) : {}
  } catch {
    return {}
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(P_KEY)
    localStorage.removeItem(A_KEY)
  } catch {}
}
