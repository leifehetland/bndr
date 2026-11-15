/** "7:42 PM" for today, "Yesterday", weekday within a week, else "Nov 3". */
export function formatListTime(timestamp) {
  const d = new Date(timestamp)
  const now = new Date()
  const days = Math.floor((startOfDay(now) - startOfDay(d)) / 86400000)
  if (days === 0) return formatClock(d)
  if (days === 1) return 'Yesterday'
  if (days < 7) return d.toLocaleDateString([], { weekday: 'short' })
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export function formatClock(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

/** Label for a day divider inside a chat. */
export function formatDayLabel(timestamp) {
  const label = formatListTime(timestamp)
  return /\d:\d\d/.test(label) ? 'Today' : label
}

function startOfDay(d) {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}
