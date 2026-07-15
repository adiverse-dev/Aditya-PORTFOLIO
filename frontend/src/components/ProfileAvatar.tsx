import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SiNodedotjs, SiPostgresql, SiReact, SiTypescript } from 'react-icons/si'
import { FiCpu } from 'react-icons/fi'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { premiumEase } from '../lib/motion'

interface ProfileAvatarProps {
  className?: string
  size?: 'md' | 'lg'
}

const techCards = [
  { label: 'AI systems', icon: <FiCpu />, tone: 'navy', x: -28, y: -20, delay: 0.2 },
  { label: 'React', icon: <SiReact />, tone: 'cyan', x: 35, y: -8, delay: 0 },
  { label: 'TypeScript', icon: <SiTypescript />, tone: 'blue', x: -36, y: 7, delay: 1.1 },
  { label: 'Node.js', icon: <SiNodedotjs />, tone: 'green', x: 34, y: 31, delay: 0.8 },
  { label: 'Database', icon: <SiPostgresql />, tone: 'database', x: -26, y: 34, delay: 1.5 },
] as const

export default function ProfileAvatar({ className = '', size = 'lg' }: ProfileAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const dim = size === 'lg' ? 'profile-avatar-stage--lg' : 'profile-avatar-stage--md'

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 32, stiffness: 92, mass: 0.82 })
  const smoothMouseY = useSpring(mouseY, { damping: 32, stiffness: 92, mass: 0.82 })

  const rotateX = useTransform(smoothMouseY, [-1, 1], [2.7, -2.7])
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-3.8, 3.8])
  const translateX = useTransform(smoothMouseX, [-1, 1], [-5, 5])
  const translateY = useTransform(smoothMouseY, [-1, 1], [-4, 4])
  const orbShift = useTransform(smoothMouseX, [-1, 1], [5, -5])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reduced) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(Math.max(-1, Math.min(1, (event.clientX - centerX) / (rect.width / 2))))
    mouseY.set(Math.max(-1, Math.min(1, (event.clientY - centerY) / (rect.height / 2))))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`profile-avatar-stage ${dim} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500 }}
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, ease: premiumEase }}
    >
      <motion.div
        className="profile-avatar-light"
        animate={reduced ? undefined : { opacity: [0.72, 0.9, 0.72], scale: [0.985, 1.015, 0.985] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="profile-avatar-shadow"
        animate={reduced ? undefined : { opacity: [0.72, 0.92, 0.72], scaleX: [0.96, 1.04, 0.96] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="profile-avatar-orbit profile-avatar-orbit--inner"
        style={{ rotateY, x: orbShift }}
        animate={reduced ? undefined : { rotateZ: 360 }}
        transition={{ duration: 118, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="profile-avatar-orbit profile-avatar-orbit--outer"
        style={{ rotateX: 72, rotateY }}
        animate={reduced ? undefined : { rotateZ: -360 }}
        transition={{ duration: 146, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="profile-avatar-scene"
        animate={reduced ? undefined : { y: [-3, 4, -3], rotateZ: [-0.35, 0.28, -0.35] }}
        transition={{ duration: 10.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: 'preserve-3d' }}
      >
        <img
          className="profile-avatar-render"
          src="/generated/developer-avatar-2026.png"
          alt="Cinematic 3D avatar of Aditya Singh coding on a laptop"
          width="1536"
          height="1536"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      {techCards.map((card) => (
        <FloatingTech key={card.label} {...card} reduced={reduced}>
          {card.icon}
        </FloatingTech>
      ))}

      <motion.div
        className="profile-avatar-status"
        animate={reduced ? undefined : { y: [-2, 3, -2] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span className="profile-avatar-status__dot" />
        System online
      </motion.div>

      <div className="profile-avatar-particles" aria-hidden="true">
        {Array.from({ length: 11 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </motion.div>
  )
}

function FloatingTech({
  children,
  label,
  tone,
  x,
  y,
  delay,
  reduced,
}: {
  children: ReactNode
  label: string
  tone: 'cyan' | 'green' | 'blue' | 'navy' | 'database'
  x: number
  y: number
  delay: number
  reduced: boolean
}) {
  return (
    <motion.div
      className={`profile-avatar-tech profile-avatar-tech--${tone}`}
      aria-label={label}
      style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)`, x: '-50%', y: '-50%' }}
      animate={reduced ? undefined : { y: ['-50%', '-53%', '-50%'], scale: [1, 1.025, 1] }}
      transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}
