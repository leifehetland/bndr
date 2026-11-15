import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Splash() {
  return (
    <div className="page-enter relative flex flex-col min-h-dvh px-8 overflow-hidden">
      <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-accent/25 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent-2/20 blur-3xl" />

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
