import { Link } from 'react-router-dom'
import { currentUser } from '../data/profiles'
import Logo from './Logo'

export default function MatchModal({ profile, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-sm px-8">
      <div className="pop w-full max-w-[340px] text-center">
        <div className="mb-4"><Logo size="md" wordmark={false} /></div>
        <p className="text-5xl font-black italic bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
          It's a Bind!
        </p>
        <p className="text-muted text-sm mt-2">You and {profile.name} liked each other.</p>

        <div className="flex justify-center items-center my-8">
          <div className="w-28 h-28 rounded-full border-4 border-accent bg-surface flex items-center justify-center text-3xl font-bold -mr-4 z-10">
            {currentUser.name}
          </div>
          <img src={profile.photo} alt={profile.name} className="w-28 h-28 rounded-full border-4 border-accent-2 object-cover" />
        </div>

        <Link
          to={`/messages/${profile.id}`}
          className="block w-full bg-gradient-to-r from-accent to-accent-2 text-white font-semibold py-3.5 rounded-full"
        >
          Send a message
        </Link>
        <button onClick={onClose} className="mt-3 w-full text-muted font-medium py-3">
          Keep swiping
        </button>
      </div>
    </div>
  )
}
