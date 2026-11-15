import { useState } from 'react'
import { Link } from 'react-router-dom'
import SwipeCard from '../components/SwipeCard'
import MatchModal from '../components/MatchModal'
import BottomNav from '../components/BottomNav'
import Logo from '../components/Logo'
import useBndrStore from '../store/bndr-store'
import { deckProfiles, getProfile } from '../data/profiles'

export default function Swipe() {
  const liked = useBndrStore((s) => s.liked)
  const passed = useBndrStore((s) => s.passed)
  const matches = useBndrStore((s) => s.matches)
  const swipe = useBndrStore((s) => s.swipe)
  const restartDeck = useBndrStore((s) => s.restartDeck)
  const [exitDir, setExitDir] = useState(null)
  const [match, setMatch] = useState(null)

  const seen = new Set([...liked, ...passed, ...matches])
  const visible = deckProfiles.filter((p) => !seen.has(p.id)).slice(0, 3)
  const top = visible[0]

  const commit = (dir) => {
    if (!top || exitDir) return
    setExitDir(dir)
    setTimeout(() => {
      const matched = swipe(top.id, dir)
      setExitDir(null)
      if (matched) setMatch(getProfile(top.id))
    }, 300)
  }

  return (
    <div className="page-enter flex flex-col h-dvh pb-16">
      <header className="flex items-center justify-between px-5 pt-4 pb-2">
        <Link to="/"><Logo size="sm" /></Link>
        <span className="text-xs text-muted">Atlanta, GA</span>
      </header>

      <div className="relative flex-1 mx-3 my-2">
        {top ? (
          [...visible].reverse().map((p) => {
            const depth = visible.indexOf(p)
            return (
              <SwipeCard
                key={p.id}
                profile={p}
                depth={depth}
                isTop={depth === 0}
                exitDir={depth === 0 ? exitDir : null}
                onRelease={commit}
              />
            )
          })
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 gap-4">
            <p className="text-xl font-semibold">That's everyone nearby.</p>
            <p className="text-muted text-sm">Expand your radius, lower your standards, or try again later.</p>
            <button onClick={restartDeck} className="mt-2 px-6 py-2.5 rounded-full border border-line text-sm font-semibold">
              Start over
            </button>
          </div>
        )}
      </div>

      {top && (
        <div className="flex justify-center items-center gap-8 py-3">
          <button
            onClick={() => commit('left')}
            aria-label="Pass"
            className="w-16 h-16 rounded-full bg-surface border border-line flex items-center justify-center text-nope text-3xl active:scale-90 transition-transform"
          >
            ✕
          </button>
          <button
            onClick={() => commit('right')}
            aria-label="Like"
            className="w-16 h-16 rounded-full bg-surface border border-line flex items-center justify-center text-like active:scale-90 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden="true">
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4h2c.7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" />
            </svg>
          </button>
        </div>
      )}

      {match && <MatchModal profile={match} onClose={() => setMatch(null)} />}
      <BottomNav />
    </div>
  )
}
