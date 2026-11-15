import { useRef, useState } from 'react'

const THRESHOLD = 110

/**
 * Draggable profile card. Reports a committed swipe via onRelease(dir).
 * When exitDir is set (by drag or by the buttons) the card flies off-screen.
 */
export default function SwipeCard({ profile, isTop, exitDir, onRelease, depth }) {
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const start = useRef(null)

  const onPointerDown = (e) => {
    if (!isTop || exitDir) return
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY }
    setDrag({ x: 0, y: 0, active: true })
  }
  const onPointerMove = (e) => {
    if (!drag.active || !start.current) return
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true })
  }
  const onPointerUp = () => {
    if (!drag.active) return
    start.current = null
    if (Math.abs(drag.x) > THRESHOLD) {
      setDrag((d) => ({ ...d, active: false }))
      onRelease(drag.x > 0 ? 'right' : 'left')
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }

  let x = drag.x
  let y = drag.y
  if (exitDir) {
    x = exitDir === 'right' ? 600 : -600
    y = drag.y + 40
  }
  const rotate = x / 18
  const likeOpacity = Math.min(Math.max(x / THRESHOLD, 0), 1)
  const nopeOpacity = Math.min(Math.max(-x / THRESHOLD, 0), 1)

  const transform = isTop
    ? `translate(${x}px, ${y}px) rotate(${rotate}deg)`
    : `scale(${1 - depth * 0.04}) translateY(${depth * 14}px)`

  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden bg-surface shadow-2xl shadow-black/60 touch-none select-none"
      style={{
        transform,
        transition: drag.active ? 'none' : 'transform 0.35s cubic-bezier(.2,.8,.3,1)',
        zIndex: 10 - depth,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {isTop && (
        <>
          <div
            className="absolute top-8 left-6 -rotate-12 border-4 border-like text-like font-black text-4xl px-3 py-1 rounded-lg tracking-wider pointer-events-none"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </div>
          <div
            className="absolute top-8 right-6 rotate-12 border-4 border-nope text-nope font-black text-4xl px-3 py-1 rounded-lg tracking-wider pointer-events-none"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </div>
        </>
      )}

      <div className="absolute bottom-0 inset-x-0 p-5 pointer-events-none">
        <h2 className="text-3xl font-bold">
          {profile.name} <span className="font-normal">{profile.age}</span>
        </h2>
        <p className="text-sm text-white/85 mt-1">{profile.job}</p>
        <p className="text-xs text-white/60 mt-0.5">{profile.distance}</p>
        <p className="text-sm text-white/90 mt-3 leading-snug">{profile.bio}</p>
      </div>
    </div>
  )
}
