import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { premiumEase } from '../lib/motion'

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: premiumEase },
  },
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function Reveal({ children, className = '', delay = 0, direction = 'up' }: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const offset = direction === 'left' ? { x: -28, y: 0 } : direction === 'right' ? { x: 28, y: 0 } : { x: 0, y: 26 }

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, filter: 'blur(8px)', ...offset }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18, margin: '-8% 0px -12% 0px' }}
      transition={{ duration: 0.72, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16, margin: '-6% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={defaultVariants}>
      {children}
    </motion.div>
  )
}
