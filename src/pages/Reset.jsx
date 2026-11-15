import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useBndrStore from '../store/bndr-store'

/** Visit /reset between takes: restores the seeded starting state. */
export default function Reset() {
  const reset = useBndrStore((s) => s.reset)
  useEffect(() => { reset() }, [reset])
  return <Navigate to="/" replace />
}
