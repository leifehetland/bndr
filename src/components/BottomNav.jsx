import { NavLink } from 'react-router-dom'
import useBndrStore from '../store/bndr-store'

const tab = ({ isActive }) =>
  `flex-1 flex flex-col items-center gap-1 py-2 text-[11px] font-medium ${isActive ? 'text-accent' : 'text-muted'}`

export default function BottomNav() {
  const unreadCount = useBndrStore((s) => s.unread.length)
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-bg/95 backdrop-blur border-t border-line flex pb-[env(safe-area-inset-bottom)] z-20">
      <NavLink to="/swipe" className={tab}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
          <rect x="5" y="3" width="11" height="15" rx="2.5" opacity="0.45" transform="rotate(-10 10 10)" />
          <rect x="8" y="5" width="11" height="15" rx="2.5" />
        </svg>
        Discover
      </NavLink>
      <NavLink to="/messages" className={tab}>
        <span className="relative">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </span>
        Messages
      </NavLink>
    </nav>
  )
}
