import type { ReactNode } from 'react'

interface PhiFrameProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'hero' | 'accent'
}

export default function PhiFrame({ children, className = '', variant = 'default' }: PhiFrameProps) {
  return (
    <div className={`phi-frame phi-frame--${variant} ${className}`}>
      <span className="phi-frame__corner phi-frame__corner--tl" aria-hidden />
      <span className="phi-frame__corner phi-frame__corner--br" aria-hidden />
      {children}
    </div>
  )
}
