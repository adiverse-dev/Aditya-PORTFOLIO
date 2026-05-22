type AccentVariant = 'about' | 'skills' | 'contact'

export default function SectionAccent({ variant }: { variant: AccentVariant }) {
  if (variant === 'about') {
    return (
      <div className="pointer-events-none absolute -right-4 top-8 hidden h-32 w-32 opacity-50 lg:block" aria-hidden>
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <path d="M0 100 L80 20 L100 40" stroke="#c4a062" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M20 110 L90 40" stroke="#3d5a73" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>
      </div>
    )
  }

  if (variant === 'skills') {
    return (
      <div className="pointer-events-none absolute bottom-6 left-6 h-20 w-20 opacity-45" aria-hidden>
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <rect x="8" y="8" width="64" height="64" rx="8" stroke="#e3dfd6" strokeWidth="1" fill="none" />
          <path
            d="M24 40 L36 52 L56 28"
            stroke="#c4a062"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute right-8 top-1/2 h-24 w-24 -translate-y-1/2 opacity-35" aria-hidden>
      <svg viewBox="0 0 96 96" className="h-full w-full">
        <circle cx="48" cy="48" r="40" stroke="#c4a062" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="48" cy="48" r="5" fill="#a67c52" opacity="0.6" />
      </svg>
    </div>
  )
}
