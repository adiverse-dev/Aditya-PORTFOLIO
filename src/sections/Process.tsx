import { motion } from 'framer-motion'
import { FiBox, FiCode, FiCpu, FiUploadCloud } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'

const steps = [
  {
    icon: FiBox,
    step: '01',
    title: 'Discover & Design',
    desc: 'Map user flows, data models, and where AI adds real value — not hype.',
  },
  {
    icon: FiCode,
    step: '02',
    title: 'Build Full-Stack',
    desc: 'Ship typed React/Node surfaces with clean APIs, auth, and observability baked in.',
  },
  {
    icon: FiCpu,
    step: '03',
    title: 'Integrate AI',
    desc: 'Wire LLMs, embeddings, and automation with guardrails, logging, and fallbacks.',
  },
  {
    icon: FiUploadCloud,
    step: '04',
    title: 'Deploy & Iterate',
    desc: 'CI/CD, monitoring, SEO, and metric loops so the product improves after launch.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-wrap relative bg-surface">
      <div className="section-shell">
        <SectionHeader
          index="03"
          label="How I work"
          title="From idea to intelligent product"
          subtitle="A repeatable flow for full-stack builds with an AI layer when it earns its place."
        />

        <div className="grid gap-[var(--phi-3)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                className="panel-card panel-card--lift relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-display text-4xl font-semibold text-[var(--border-strong)]">{s.step}</span>
                <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
