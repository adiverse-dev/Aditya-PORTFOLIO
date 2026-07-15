import { motion } from 'framer-motion'
import { FiCpu, FiDatabase, FiLayers } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'

const groups = [
  {
    icon: FiLayers,
    title: 'Product Frontends',
    note: 'Interfaces that feel polished, responsive, and ready for repeated use.',
    skills: [
      { name: 'React / Next.js / TypeScript', level: 92 },
      { name: 'Tailwind UI systems', level: 86 },
      { name: 'State, forms, dashboards', level: 84 },
    ],
  },
  {
    icon: FiDatabase,
    title: 'MERN Backends',
    note: 'APIs, data models, auth flows, and integration layers behind the experience.',
    skills: [
      { name: 'Node.js / Express APIs', level: 88 },
      { name: 'MongoDB data modeling', level: 82 },
      { name: 'Auth, deployment, monitoring', level: 78 },
    ],
  },
  {
    icon: FiCpu,
    title: 'AI Product Workflows',
    note: 'AI features shaped around actual user value, not novelty.',
    skills: [
      { name: 'LLM integration & prompts', level: 82 },
      { name: 'Parsing / scoring / feedback', level: 80 },
      { name: 'Automation workflow design', level: 76 },
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
          label="Capabilities"
          title="What I can take from idea to product"
          subtitle="A focused stack for building modern SaaS products: React interfaces, Node APIs, MongoDB systems, and AI workflows that support the product."
        />

        <div className="skills-grid-layout">
          <div className="skills-grid-intro">
            <p className="font-display text-[clamp(1.35rem,2vw,1.85rem)] font-medium leading-snug text-ink">
              I connect the visible product with the system behind it: interface architecture, API contracts, data
              structure, deployment thinking, and AI behavior.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The goal is not to list tools. The goal is to build reliable workflows that users can trust and teams
              can extend.
            </p>
          </div>

          <div className="skills-card-grid">
            {groups.map((group, gi) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  className="panel-card panel-card--lift skill-card-compact"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.08 }}
                >
                  <div className="skill-card-compact__top">
                    <span className="skill-card-compact__icon">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">{group.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Core lane</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{group.note}</p>
                  <div className="mt-3 flex flex-col gap-3">
                    {group.skills.map((skill, i) => (
                      <div key={skill.name}>
                        <div className="mb-1.5 flex justify-between gap-4 text-xs">
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
