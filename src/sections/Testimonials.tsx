import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'
import { testimonials } from '../data/projects'
import SectionHeader from '../components/SectionHeader'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-wrap section-wrap--band">
      <div className="section-shell">
        <SectionHeader
          index="06"
          label="Proof"
          title="Results & feedback"
          subtitle="Metrics from shipped work and collaboration highlights."
        />

        <div className="mb-[var(--phi-5)] grid gap-[var(--phi-3)] sm:grid-cols-3">
          {[
            { value: '+42%', label: 'SEO visibility (Sniper)' },
            { value: '91%', label: 'AI parse success (Resume)' },
            { value: '2.1s', label: 'LCP after perf pass' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="stat-chip"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-display text-3xl font-semibold text-gold">{m.value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-[var(--phi-4)] md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.quote}
              className="panel-card relative"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <FiMessageCircle className="text-gold" size={22} />
              <p className="mt-4 font-display text-lg italic leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">— {t.role}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
