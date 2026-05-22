import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { softSpring } from '../lib/motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className = '', intensity = 12 }: TiltCardProps) {
  const reduced = usePrefersReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity * 0.62, -intensity * 0.62]), {
    stiffness: 185,
    damping: 28,
    mass: 0.78,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity * 0.62, intensity * 0.62]), {
    stiffness: 185,
    damping: 28,
    mass: 0.78,
  })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
    e.currentTarget.style.setProperty('--pointer-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--pointer-y', `${e.clientY - rect.top}px`)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      data-cursor="hover"
      className={className}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: reduced ? 1 : 1.012, y: reduced ? 0 : -3 }}
      transition={softSpring}
    >
      {children}
    </motion.div>
  )
}
