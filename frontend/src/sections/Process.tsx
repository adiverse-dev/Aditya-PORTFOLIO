import { motion } from 'framer-motion'
import { FiBox, FiCode, FiCpu, FiUploadCloud } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'

const steps = [
  {
    icon: FiBox,
    step: '01',
    title: 'Map the Product System',
    desc: 'Define the user workflow, core data, success states, and where automation or AI should actually help.',
  },
  {
    icon: FiCode,
    step: '02',
    title: 'Build the MERN Foundation',
    desc: 'Shape the React UI, Node/Express API, MongoDB model, auth paths, and reusable product components.',
  },
  {
    icon: FiCpu,
    step: '03',
    title: 'Layer in Intelligence',
    desc: 'Add LLM parsing, scoring, recommendations, or workflow automation with validation and fallback behavior.',
  },
  {
    icon: FiUploadCloud,
    step: '04',
    title: 'Ship, Measure, Improve',
    desc: 'Prepare deployment, performance, SEO, and feedback loops so the product can evolve after launch.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-wrap relative bg-surface">
      <div className="section-shell">
        <SectionHeader
          index="03"
          label="Build flow"
          title="From idea to scalable intelligent product"
          subtitle="A practical workflow for turning a product concept into a usable system - with AI added as part of the architecture, not pasted on at the end."
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
