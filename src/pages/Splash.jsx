import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Splash() {
  return (
    <div className="page-enter relative flex flex-col min-h-dvh px-8 pt-[env(safe-area-inset-top)] overflow-hidden">
      <div className="glow-drift absolute -top-32 -left-24 w-96 h-96 rounded-full bg-brand-blue/60 blur-3xl" />
      <div className="glow-drift absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-purple/50 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-3">
        <Logo size="lg" />
        <p className="text-muted text-sm tracking-wide">Time for a Bndr</p>
      </div>

      <div className="relative pb-14 flex flex-col gap-3">
        <Link
          to="/swipe"
          className="block w-full text-center bg-gradient-to-r from-accent to-accent-2 text-white font-semibold py-3.5 rounded-full"
        >
          Start swiping
        </Link>
        <p className="text-center text-[11px] text-muted/70 leading-relaxed px-4">
          By continuing you agree to our Terms and acknowledge that love is a numbers game.
        </p>
      </div>
    </div>
  )
}
