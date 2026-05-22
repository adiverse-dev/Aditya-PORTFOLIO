import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const experiences = [
  {
    period: '2024 - Present',
    role: 'Full Stack Developer',
    focus: 'MERN - AI - Product',
    points: [
      'Building React and Node products with practical API and data architecture',
      'Integrating AI features for parsing, recommendations, feedback, and automation',
      'Owning the path from interface polish to deployment and iteration',
    ],
  },
  {
    period: '2022 - 2024',
    role: 'SEO & DevOps Engineer',
    focus: 'Growth - Infra',
    points: [
      'Improved technical SEO, performance, and discoverability for live products',
      'Worked with reporting, infrastructure, monitoring, and anomaly detection',
      'Built a strong foundation in reliability, measurement, and systems thinking',
    ],
  },
  {
    period: '2021 - 2022',
    role: 'Network Monitoring Engineer',
    focus: 'Operations',
    points: [
      'Monitored system health and incident response workflows',
      'Learned to think in uptime, alerts, operational risk, and failure states',
      'Carried that operational mindset into product engineering work',
    ],
  },
]

export default function Experience() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 70%', 'end 40%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={sectionRef} className="section-wrap section-wrap--band">
      <div className="section-shell">
        <SectionHeader
          index="05"
          label="Experience"
          title="A path shaped by product, growth, and systems"
          subtitle="My background moves from operations and growth into full-stack product engineering - useful context for building software that performs after launch."
        />

        <div className="relative mt-[var(--phi-4)] hidden md:block">
          <div className="absolute left-0 right-0 top-5 h-[2px] bg-[var(--border-strong)]" />
          <motion.div
            className="absolute left-0 top-5 h-[2px] w-full origin-left bg-[var(--gold)]"
            style={{ scaleX: reduced ? 1 : lineScale }}
          />
          <div className="grid grid-cols-3 gap-[var(--phi-4)]">
            {experiences.map((item, i) => (
              <motion.article
                key={item.period}
                className="panel-card panel-card--lift relative mt-6 pt-[var(--phi-3)]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <span className="timeline-dot absolute -top-[7px] left-[var(--phi-3)]" />
                <p className="text-xs font-bold uppercase tracking-widest text-warm">{item.period}</p>
                <span className="tech-pill mt-2">{item.focus}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{item.role}</h3>
                <ul className="mt-4 space-y-2 border-t border-default pt-4">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-muted">
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="experience-scroll -mx-6 mt-[var(--phi-4)] flex gap-[var(--phi-3)] overflow-x-auto px-6 pb-4 md:hidden">
          {experiences.map((item, i) => (
            <motion.article
              key={item.period}
              className="panel-card panel-card--lift w-[min(88vw,300px)] shrink-0 snap-center"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="timeline-dot mb-4 block" />
              <p className="text-xs font-bold uppercase tracking-widest text-warm">{item.period}</p>
              <span className="tech-pill mt-2">{item.focus}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.role}</h3>
              <ul className="mt-3 space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="text-sm text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
