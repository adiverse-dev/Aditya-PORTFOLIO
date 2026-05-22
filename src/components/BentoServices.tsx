import { motion } from 'framer-motion'
import { FiActivity, FiCode, FiGlobe, FiZap } from 'react-icons/fi'
import TiltCard from './TiltCard'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
}

const cards = [
  {
    icon: FiCode,
    title: 'Full Stack',
    desc: 'React, Node, APIs',
    color: 'var(--accent)',
    className: 'col-span-2 row-span-2 min-h-[220px]',
    large: true,
    tag: '61.8%',
  },
  {
    icon: FiGlobe,
    title: 'Network Ops',
    desc: 'Monitoring',
    color: 'var(--accent-deep)',
    className: 'col-span-1',
    large: false,
    tag: '38.2%',
  },
  {
    icon: FiActivity,
    title: 'SEO',
    desc: 'Analytics',
    color: 'var(--warm)',
    className: 'col-span-1',
    large: false,
    tag: '38.2%',
  },
  {
    icon: FiZap,
    title: 'AI Systems',
    desc: 'LLM workflows',
    color: 'var(--gold)',
    className: 'col-span-2',
    large: false,
    tag: '61.8%',
  },
]

export default function BentoServices() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 md:gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <motion.div key={card.title} variants={item} className={card.className}>
            <TiltCard className={`bento-card h-full ${card.large ? 'bento-card-featured' : ''}`} intensity={card.large ? 6 : 10}>
              <span className="absolute right-3 top-3 text-[9px] font-bold uppercase tracking-widest text-muted/80">
                {card.tag}
              </span>
              <div className="inline-flex rounded-sm p-2.5 text-white" style={{ background: card.color }}>
                <Icon size={card.large ? 20 : 15} />
              </div>
              <p className={`mt-4 font-display font-semibold text-ink ${card.large ? 'text-base' : 'text-xs uppercase tracking-wider'}`}>
                {card.title}
              </p>
              {card.large && <p className="mt-2 text-sm text-muted">{card.desc}</p>}
            </TiltCard>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
