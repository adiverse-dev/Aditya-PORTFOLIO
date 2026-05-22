interface GeometricDecorProps {
  variant?: 'hero' | 'about' | 'subtle'
  className?: string
}

export default function GeometricDecor({ variant = 'subtle', className = '' }: GeometricDecorProps) {
  if (variant === 'hero') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <div className="absolute bottom-0 left-[38%] h-32 w-48 -skew-x-12 bg-[#122846]" />
        <div className="absolute bottom-8 left-[48%] h-24 w-36 -skew-x-6 bg-[#ff3b4a]" />
        <div className="absolute bottom-16 right-[28%] h-20 w-28 skew-x-12 bg-[#122846]/90" />
        <div className="absolute bottom-4 right-[18%] h-16 w-24 skew-x-6 bg-[#ff3b4a]/85" />
      </div>
    )
  }

  if (variant === 'about') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <div className="absolute -right-8 top-1/4 h-40 w-56 rotate-12 bg-[#122846]" />
        <div className="absolute right-12 top-[42%] h-28 w-40 -rotate-6 bg-[#ff3b4a]" />
        <div className="absolute right-24 bottom-[18%] h-20 w-32 rotate-45 bg-[#122846]/80" />
      </div>
    )
  }

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute right-8 top-8 h-px w-24 bg-[#ff3b4a]/40" />
      <div className="absolute left-8 bottom-8 h-px w-16 bg-[#122846]/20" />
    </div>
  )
}
