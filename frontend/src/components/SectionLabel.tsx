import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <span className={`section-label ${className}`}>// {children}</span>
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.span
        className="section-label shrink-0 whitespace-nowrap"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-48px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        // {children}
      </motion.span>
      <motion.span
        className="block h-[2px] max-w-[min(140px,30vw)] flex-1 origin-left bg-[var(--gold)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-48px' }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
