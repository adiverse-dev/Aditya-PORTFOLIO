import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { premiumEase } from '../lib/motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 210, damping: 24, mass: 0.62 })
  const springY = useSpring(y, { stiffness: 210, damping: 24, mass: 0.62 })

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      type={type}
      data-cursor="hover"
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileHover={reduced ? undefined : { scale: 1.012 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.32, ease: premiumEase }}
    >
      {children}
    </motion.button>
  )
}
