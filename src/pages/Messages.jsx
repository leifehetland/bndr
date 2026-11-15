import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import useBndrStore from '../store/bndr-store'
import { getProfile } from '../data/profiles'
import { formatListTime } from '../utils/format-time'

export default function Messages() {
  const matches = useBndrStore((s) => s.matches)
  const threads = useBndrStore((s) => s.threads)
  const unread = useBndrStore((s) => s.unread)

  const conversations = matches
    .map((id) => ({ profile: getProfile(id), last: threads[id]?.at(-1) }))
    .filter((c) => c.profile && c.last)
    .sort((a, b) => new Date(b.last.timestamp) - new Date(a.last.timestamp))

  return (
    <div className="page-enter min-h-dvh pb-24">
      <header className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-3">
        <Logo size="sm" />
      </header>

      <section className="px-5">
        <h2 className="text-accent text-sm font-semibold mb-3">New Matches</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5">
          {matches.map(getProfile).filter(Boolean).map((p) => {
            const id = p.id
            return (
              <Link key={id} to={`/messages/${id}`} className="flex flex-col items-center gap-1.5 shrink-0">
                <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-accent" />
                <span className="text-xs font-medium">{p.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-accent text-sm font-semibold mb-1 px-5">Messages</h2>
        <ul>
          {conversations.map(({ profile, last }) => {
            const isUnread = unread.includes(profile.id)
            return (
              <li key={profile.id}>
                <Link to={`/messages/${profile.id}`} className="flex items-center gap-3 px-5 py-3 active:bg-surface">
                  <img src={profile.photo} alt={profile.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0 border-b border-line pb-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold">{profile.name}</span>
                      <span className="text-xs text-muted">{formatListTime(last.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm truncate flex-1 ${isUnread ? 'text-text font-medium' : 'text-muted'}`}>
                        {last.from === 'jr' ? 'You: ' : ''}{last.text}
                      </p>
                      {isUnread && <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <BottomNav />
    </div>
  )
}
