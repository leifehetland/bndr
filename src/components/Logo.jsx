/** Bndr logo: app icon (public/logo.png) with optional wordmark. */
export default function Logo({ size = 'md', wordmark = true }) {
  const icon = { sm: 'w-8 h-8 rounded-lg', md: 'w-14 h-14 rounded-xl', lg: 'w-32 h-32 rounded-[28px]' }
  const text = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-5xl' }
  const layout = size === 'lg' ? 'flex-col gap-4' : 'flex-row gap-2'
  return (
    <span className={`inline-flex items-center ${layout} select-none`}>
      <img src="/logo.png" alt="Bndr" draggable={false} className={`${icon[size]} shadow-lg shadow-black/40`} />
      {wordmark && (
        <span className={`${text[size]} font-black tracking-tight bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent`}>
          bndr
        </span>
      )}
    </span>
  )
}
