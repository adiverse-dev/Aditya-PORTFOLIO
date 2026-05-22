import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'

const groups = [
  {
    title: 'Full-Stack Engineering',
    skills: [
      { name: 'React / Next.js / TypeScript', level: 92 },
      { name: 'Node.js APIs & Prisma', level: 88 },
      { name: 'UI systems & Tailwind', level: 84 },
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      { name: 'LLM integration & prompt design', level: 82 },
      { name: 'RAG / parsing / scoring flows', level: 78 },
      { name: 'Workflow automation', level: 75 },
    ],
  },
  {
    title: 'Platform & Growth',
    skills: [
      { name: 'SEO & analytics ops', level: 85 },
      { name: 'Network monitoring', level: 80 },
      { name: 'Azure / CI/CD', level: 76 },
    ],
  },
]

const barViewport = { once: true, amount: 0.5 as const }

export default function Skills() {
  return (
    <section id="skills" className="section-wrap relative">
      <div className="section-shell">
        <SectionHeader
          index="02"
          label="Expertise"
          title="Skills across stack, AI, and ops"
          subtitle="Grouped by how I actually work — not a generic progress bar list."
        />

        <div className="grid gap-[var(--phi-4)] lg:grid-cols-3">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="panel-card panel-card--lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
              <div className="mt-[var(--phi-3)] flex flex-col gap-[var(--phi-3)]">
                {group.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium text-ink-soft">{skill.name}</span>
                      <span className="font-semibold text-gold">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={barViewport}
                        transition={{
                          type: 'spring',
                          stiffness: 85,
                          damping: 10,
                          delay: gi * 0.05 + i * 0.06,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
