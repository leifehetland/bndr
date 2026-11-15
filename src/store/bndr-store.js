import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedThreads, newMatchOpeners, smallTalkReplies } from '../data/conversations'
import { matchedProfiles, getProfile } from '../data/profiles'

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
  matches: matchedProfiles.map((p) => p.id),
  unread: ['suitor1'],
  threads: Object.fromEntries(
    Object.entries(seedThreads).map(([id, list]) => [id, toMessages(id, list)])
  ),
  replyCursor: 0,
})

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

      /** Returns true when the swipe creates a match. */
      swipe: (profileId, dir) => {
        const s = get()
        const profile = getProfile(profileId)
        const isMatch = dir === 'right' && !!profile?.matchesBack
        if (s.liked.includes(profileId) || s.passed.includes(profileId)) return false
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
        return isMatch
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
    { name: 'bndr_state', version: 2, migrate: () => buildInitialState() }
  )
)

export default useBndrStore
