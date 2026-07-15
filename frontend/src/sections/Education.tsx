import { motion } from 'framer-motion'
import { FiAward, FiBook } from 'react-icons/fi'
import PhiFrame from '../components/PhiFrame'
import SectionHeader from '../components/SectionHeader'

const education = [
  {
    degree: 'B.Tech Computer Science',
    field: 'Software Engineering & System Design',
    institution: 'Rajasthan Technical University',
    year: '2019 - 2023',
    grade: '7.8 CGPA',
    highlights: ['AI recruitment system', 'Web engineering', 'DSA & system design'],
    icon: FiBook,
  },
  {
    degree: 'Senior Secondary',
    field: 'PCM + Computer Science',
    institution: 'CBSE',
    year: '2018 - 2019',
    grade: '72%',
    highlights: ['Programming foundation', 'Math & physics base'],
    icon: FiAward,
  },
]

const certifications = [
  { name: 'Full Stack Web Development', issuer: 'Meta / Coursera', year: '2023' },
  { name: 'AI Prompt Engineering', issuer: 'DeepLearning.AI', year: '2024' },
  { name: 'SEO Fundamentals', issuer: 'Google', year: '2022' },
  { name: 'Network+ (Self-Study)', issuer: 'CompTIA track', year: '2021' },
]

export default function Education() {
  return (
    <section id="education" className="section-wrap section-wrap--band">
      <div className="section-shell">
        <SectionHeader
          index="07"
          label="Foundation"
          title="Computer science base with continuous product learning"
          subtitle="A technical foundation supported by ongoing learning across full-stack development, AI workflows, SEO, and infrastructure thinking."
        />

        <div className="golden-grid">
          <div className="flex flex-col gap-[var(--phi-4)]">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PhiFrame>
                  <div className="flex gap-[var(--phi-3)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-accent text-white">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-warm">
                        {item.year} - {item.grade}
                      </p>
                      <h3 className="font-display text-xl font-semibold text-ink">{item.degree}</h3>
                      <p className="text-sm font-semibold text-accent">{item.field}</p>
                      <p className="text-sm text-muted">{item.institution}</p>
                    </div>
                  </div>
                  <ul className="mt-[var(--phi-3)] flex flex-wrap gap-2 border-t border-default pt-[var(--phi-3)]">
                    {item.highlights.map((h) => (
                      <li key={h} className="tech-pill">
                        {h}
                      </li>
                    ))}
                  </ul>
                </PhiFrame>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="mb-[var(--phi-3)] text-xs font-bold uppercase tracking-widest text-ink">
              Learning tracks
            </h3>
            <div className="flex flex-col gap-[var(--phi-2)]">
              {certifications.map((cert) => (
                <div key={cert.name} className="panel-card flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{cert.name}</p>
                    <p className="text-xs text-muted">{cert.issuer}</p>
                  </div>
                  <span className="font-display text-sm font-semibold text-gold">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
