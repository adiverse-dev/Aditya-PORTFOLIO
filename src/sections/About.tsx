import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import PhiFrame from '../components/PhiFrame'
import SectionHeader from '../components/SectionHeader'

const principles = [
  'Start with the workflow: what the user needs to do, decide, automate, or understand.',
  'Design the system shape early: UI states, API boundaries, data models, and failure paths.',
  'Use AI where it improves a product outcome - faster review, smarter search, cleaner automation, or better decisions.',
]

export default function About() {
  return (
    <section id="about" className="section-wrap section-wrap--band relative">
      <div className="section-shell relative z-10">
        <SectionHeader
          index="01"
          label="Direction"
          title="A builder focused on SaaS systems, not just screens"
          subtitle="My work sits at the intersection of MERN engineering, AI workflows, and product thinking - the parts that make modern web products feel useful, scalable, and alive."
        />

        <div className="golden-grid golden-grid--reverse items-start">
          <PhiFrame variant="accent">
            <p className="font-display text-2xl font-medium leading-snug text-ink">
              I think through the full product path: what users see, what the system stores, what the API owns, and
              where AI can remove friction without making the experience fragile.
            </p>
            <ul className="mt-[var(--phi-4)] space-y-3 border-t border-default pt-[var(--phi-4)]">
              {principles.map((h) => (
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
              See the build flow <FiArrowRight size={14} />
            </a>
          </PhiFrame>

          <div className="grid gap-[var(--phi-3)] sm:grid-cols-2">
            {[
              { n: 'MERN', l: 'Core stack', sub: 'React, Node, Express, MongoDB' },
              { n: 'AI', l: 'Workflow layer', sub: 'LLMs, parsing, scoring, automation' },
              { n: 'SaaS', l: 'Product direction', sub: 'Dashboards, tools, systems' },
              { n: 'UX', l: 'Execution style', sub: 'Cinematic, responsive, practical' },
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
