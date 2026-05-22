import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface ProfileMonogramProps {
  className?: string
}

export default function ProfileMonogram({ className = '' }: ProfileMonogramProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <svg viewBox="0 0 320 320" className="h-full w-full max-w-[280px]" fill="none">
        <circle cx="160" cy="160" r="130" stroke="#e3dfd6" strokeWidth="1" />
        <motion.circle
          cx="160"
          cy="160"
          r="130"
          stroke="#c4a062"
          strokeWidth="1.5"
          strokeDasharray="20 14"
          strokeLinecap="round"
          opacity="0.55"
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 56, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '160px 160px' }}
        />
        <rect x="72" y="72" width="176" height="176" rx="18" fill="#ffffff" stroke="#e3dfd6" strokeWidth="1" />
        <text
          x="160"
          y="182"
          textAnchor="middle"
          fill="#1a2234"
          fontSize="76"
          fontWeight="600"
          fontFamily="Fraunces, Georgia, serif"
        >
          A
        </text>
        <rect x="148" y="192" width="24" height="5" rx="2" fill="#c4a062" />
        <text x="98" y="118" fill="#a67c52" fontSize="20" fontFamily="monospace" opacity="0.75">
          {'</'}
        </text>
        <text x="210" y="248" fill="#3d5a73" fontSize="20" fontFamily="monospace" opacity="0.35">
          {'>'}
        </text>
        <circle cx="88" cy="248" r="4" fill="#c4a062" opacity="0.7" />
        <circle cx="232" cy="88" r="3" fill="#3d5a73" opacity="0.25" />
        <line x1="160" y1="40" x2="160" y2="72" stroke="#ebe8e1" strokeWidth="1" />
        <line x1="160" y1="248" x2="160" y2="280" stroke="#ebe8e1" strokeWidth="1" />
        <line x1="40" y1="160" x2="72" y2="160" stroke="#ebe8e1" strokeWidth="1" />
        <line x1="248" y1="160" x2="280" y2="160" stroke="#ebe8e1" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}
