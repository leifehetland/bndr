import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Swipe from './pages/Swipe'
import Messages from './pages/Messages'
import Chat from './pages/Chat'
import Reset from './pages/Reset'

export default function App() {
  return (
    <div className="max-w-[480px] mx-auto min-h-dvh bg-bg">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:matchId" element={<Chat />} />
        {/* Visit /reset between takes to restore the starting state */}
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
