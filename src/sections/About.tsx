import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import PhiFrame from '../components/PhiFrame'
import SectionHeader from '../components/SectionHeader'

const highlights = [
  'React, TypeScript, Node.js, and Prisma for production-grade web apps',
  'LLM integrations: parsing, scoring, prompts, and user-facing AI features',
  'SEO, analytics, and monitoring from my DevOps & growth engineering background',
]

export default function About() {
  return (
    <section id="about" className="section-wrap section-wrap--band relative">
      <div className="section-shell relative z-10">
        <SectionHeader
          index="01"
          label="About"
          title="Engineer who ships — stack to production"
          subtitle="CS graduate with hands-on experience across full-stack product work, AI tooling, and growth systems."
        />

        <div className="golden-grid golden-grid--reverse items-start">
          <PhiFrame variant="accent">
            <p className="font-display text-2xl font-medium leading-snug text-ink">
              I don&apos;t just wire APIs — I design how data, AI, and UI fit together so the product feels
              cohesive end-to-end.
            </p>
            <ul className="mt-[var(--phi-4)] space-y-3 border-t border-default pt-[var(--phi-4)]">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {h}
                </li>
              ))}
            </ul>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-[var(--phi-4)] inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-warm"
            >
              How I work <FiArrowRight size={14} />
            </a>
          </PhiFrame>

          <div className="grid gap-[var(--phi-3)] sm:grid-cols-2">
            {[
              { n: '15+', l: 'Projects', sub: 'Web & AI tools' },
              { n: '3+', l: 'Years', sub: 'Professional build' },
              { n: '4', l: 'Stacks', sub: 'Full-stack · AI · SEO · Ops' },
              { n: '100%', l: 'Ownership', sub: 'Design → deploy' },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                className="panel-card text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="font-display text-4xl font-semibold text-gold">{stat.n}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-ink">{stat.l}</p>
                <p className="mt-1 text-[11px] text-muted">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
