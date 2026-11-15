import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedThreads, newMatchOpeners, smallTalkReplies } from '../data/conversations'
import { getProfile } from '../data/profiles'

const toMessages = (id, list) =>
  list.map((m, i) => ({
    id: `${id}_${i}`,
    from: m.from,
    text: m.text,
    timestamp: new Date(Date.now() - m.minutesAgo * 60000).toISOString(),
  }))

const buildInitialState = () => ({
  liked: [],
  passed: [],
  matches: Object.keys(seedThreads),
  unread: ['p9'], // Max's "So excited to see you!" is unread at the start
  threads: Object.fromEntries(
    Object.entries(seedThreads).map(([id, list]) => [id, toMessages(id, list)])
  ),
  replyCursor: 0,
})

// Drops saved ids for profiles that no longer exist in src/data/profiles.js,
// so removing a profile never breaks a phone that already matched them.
const pruneState = (state) => {
  const known = (id) => !!getProfile(id)
  return {
    ...state,
    liked: (state.liked || []).filter(known),
    passed: (state.passed || []).filter(known),
    matches: (state.matches || []).filter(known),
    unread: (state.unread || []).filter(known),
    threads: Object.fromEntries(Object.entries(state.threads || {}).filter(([id]) => known(id))),
  }
}

const message = (from, text) => ({
  id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  from,
  text,
  timestamp: new Date().toISOString(),
})

/** localStorage key: bndr_state */
const useBndrStore = create(
  persist(
    (set, get) => ({
      ...buildInitialState(),

      /**
       * Returns true when the match screen should show (right swipe on a
       * profile that likes JR back). It shows every time so the moment can be
       * reshot; an existing match and its thread are never duplicated or wiped.
       */
      swipe: (profileId, dir) => {
        const s = get()
        const profile = getProfile(profileId)
        if (s.liked.includes(profileId) || s.passed.includes(profileId)) return false
        const showMatch = dir === 'right' && !!profile?.matchesBack
        const isMatch = showMatch && !s.matches.includes(profileId)
        set({
          liked: dir === 'right' ? [...s.liked, profileId] : s.liked,
          passed: dir === 'left' ? [...s.passed, profileId] : s.passed,
          matches: isMatch ? [profileId, ...s.matches] : s.matches,
          unread: isMatch ? [profileId, ...s.unread] : s.unread,
          threads: isMatch
            ? {
                ...s.threads,
                [profileId]: [
                  message('them', newMatchOpeners[s.matches.length % newMatchOpeners.length]),
                ],
              }
            : s.threads,
        })
        return showMatch
      },

      /** Brings back passed/liked profiles. Matches stay matched. */
      restartDeck: () => set({ liked: [], passed: [] }),

      markRead: (id) => set({ unread: get().unread.filter((u) => u !== id) }),

      sendMessage: (id, text) => {
        const trimmed = text.trim()
        if (!trimmed) return
        const s = get()
        set({ threads: { ...s.threads, [id]: [...(s.threads[id] || []), message('jr', trimmed)] } })
      },

      receiveReply: (id) => {
        const s = get()
        const text = smallTalkReplies[s.replyCursor % smallTalkReplies.length]
        set({
          replyCursor: s.replyCursor + 1,
          unread: s.unread.includes(id) ? s.unread : [id, ...s.unread],
          threads: { ...s.threads, [id]: [...(s.threads[id] || []), message('them', text)] },
        })
      },

      reset: () => set(buildInitialState()),
    }),
    {
      name: 'bndr_state',
      version: 3,
      migrate: () => buildInitialState(),
      // Runs on every load, after migrate
      merge: (persisted, current) => ({ ...current, ...pruneState(persisted || {}) }),
    }
  )
)

export default useBndrStore
