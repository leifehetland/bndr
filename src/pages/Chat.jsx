import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import useBndrStore from '../store/bndr-store'
import { getProfile } from '../data/profiles'
import { formatClock, formatDayLabel } from '../utils/format-time'

export default function Chat() {
  const { matchId } = useParams()
  const profile = getProfile(matchId)
  const messages = useBndrStore((s) => s.threads[matchId]) || []
  const sendMessage = useBndrStore((s) => s.sendMessage)
  const receiveReply = useBndrStore((s) => s.receiveReply)
  const markRead = useBndrStore((s) => s.markRead)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const bottom = useRef(null)

  useEffect(() => { markRead(matchId) }, [matchId, markRead, messages.length])
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length, typing])

  if (!profile) return <Navigate to="/messages" replace />

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    sendMessage(matchId, draft)
    setDraft('')
    setTimeout(() => setTyping(true), 700)
    setTimeout(() => { setTyping(false); receiveReply(matchId) }, 2200)
  }

  return (
    <div className="flex flex-col h-dvh">
      <header className="flex items-center gap-3 px-3 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] border-b border-line bg-bg/70 backdrop-blur-md">
        <Link to="/messages" aria-label="Back" className="text-accent text-3xl leading-none px-2">‹</Link>
        <img src={profile.photo} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold leading-tight">{profile.name}</p>
          <p className="text-xs text-muted">{profile.job}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5">
        <p className="text-center text-xs text-muted mb-3">You matched with {profile.name}</p>
        {messages.map((m, i) => {
          const day = formatDayLabel(m.timestamp)
          const showDay = i === 0 || day !== formatDayLabel(messages[i - 1].timestamp)
          const mine = m.from === 'jr'
          const nextSame = messages[i + 1]?.from === m.from
          return (
            <div key={m.id} className="flex flex-col">
              {showDay && (
                <p className="text-center text-[11px] text-muted my-3">
                  {day} {formatClock(m.timestamp)}
                </p>
              )}
              <div className={`flex ${mine ? 'justify-end' : 'justify-start'} ${nextSame ? '' : 'mb-1.5'}`}>
                <p
                  className={`max-w-[75%] px-4 py-2 rounded-3xl text-[15px] leading-snug ${
                    mine ? 'bg-gradient-to-r from-accent to-accent-2 text-white rounded-br-md' : 'bg-surface rounded-bl-md'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            </div>
          )
        })}
        {typing && (
          <div className="flex justify-start">
            <p className="bg-surface px-4 py-3 rounded-3xl rounded-bl-md flex gap-1">
              <span className="dot w-2 h-2 rounded-full bg-muted" />
              <span className="dot w-2 h-2 rounded-full bg-muted" />
              <span className="dot w-2 h-2 rounded-full bg-muted" />
            </p>
          </div>
        )}
        <div ref={bottom} />
      </div>

      <form onSubmit={send} className="flex items-center gap-2 px-3 py-3 border-t border-line bg-bg/70 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-surface rounded-full px-4 py-2.5 text-[15px] outline-none placeholder:text-muted"
        />
        <button type="submit" disabled={!draft.trim()} className="text-accent font-semibold px-2 disabled:opacity-40">
          Send
        </button>
      </form>
    </div>
  )
}
