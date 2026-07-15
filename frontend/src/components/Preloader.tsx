import { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const duration = 1000
    const steps = 36
    const interval = duration / steps
    let tick = 0

    const timer = window.setInterval(() => {
      tick += 1
      const eased = Math.floor(100 * (1 - Math.pow(1 - tick / steps, 2.2)))
      setProgress(Math.min(eased, 100))

      if (tick >= steps) {
        window.clearInterval(timer)
        window.setTimeout(() => {
          setHide(true)
          window.setTimeout(onComplete, 400)
        }, 100)
      }
    }, interval)

    return () => window.clearInterval(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-canvas transition-opacity duration-500 ${
        hide ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-accent font-display text-xl font-semibold text-white">
          A
        </div>
        <p className="section-label">MERN Stack + AI Portfolio</p>
        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-gold transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
