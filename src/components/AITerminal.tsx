import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const lines = [
  { prompt: '$', text: 'aditya --role fullstack-ai' },
  { prompt: '>', text: 'Building React + Node products with LLM pipelines...' },
  { prompt: '>', text: 'Stack: TypeScript · OpenAI · Prisma · Azure' },
  { prompt: '>', text: 'Shipped: dashboards, SEO systems, resume intelligence' },
  { prompt: '✓', text: 'Ready for your next product.', highlight: true },
]

export default function AITerminal() {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reduced ? lines.length : 0)

  useEffect(() => {
    if (reduced) return
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setVisible(i)
      if (i >= lines.length) window.clearInterval(id)
    }, 520)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="ai-terminal">
      <div className="ai-terminal__chrome">
        <span className="ai-terminal__dot ai-terminal__dot--gold" />
        <span className="ai-terminal__dot" />
        <span className="ai-terminal__dot" />
        <span className="ai-terminal__title">aditya@fullstack-ai ~ portfolio</span>
      </div>
      <div className="ai-terminal__body">
        {lines.slice(0, visible).map((line) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="ai-terminal__line"
          >
            <span className="ai-terminal__prompt">{line.prompt}</span>
            <span className={line.highlight ? 'text-gold' : 'text-white/85'}>{line.text}</span>
          </motion.div>
        ))}
        <span className="ai-terminal__cursor" />
      </div>
    </div>
  )
}
