import { motion } from 'framer-motion'
import { FiCpu, FiDatabase, FiLayers, FiZap } from 'react-icons/fi'
import TiltCard from './TiltCard'

const items = [
  {
    icon: FiLayers,
    title: 'Full-Stack Products',
    desc: 'End-to-end web apps — React/Next frontends, Node APIs, auth, databases, and production deploys.',
    tags: ['React', 'TypeScript', 'Node', 'Prisma'],
    featured: true,
  },
  {
    icon: FiCpu,
    title: 'AI & LLM Systems',
    desc: 'Prompt pipelines, RAG flows, resume intelligence, and automation that connects models to real UX.',
    tags: ['OpenAI', 'RAG', 'Agents'],
    featured: false,
  },
  {
    icon: FiDatabase,
    title: 'Data & Dashboards',
    desc: 'Analytics dashboards, KPI tracking, and decision-ready visualizations for ops and growth teams.',
    tags: ['Recharts', 'SQL', 'ETL'],
    featured: false,
  },
  {
    icon: FiZap,
    title: 'Growth Engineering',
    desc: 'SEO architecture, monitoring, and performance tuning so products scale traffic and stay reliable.',
    tags: ['SEO', 'DevOps', 'Azure'],
    featured: false,
  },
]

export default function CapabilitiesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={item.featured ? 'sm:col-span-2' : ''}
          >
            <TiltCard className={`bento-card h-full ${item.featured ? 'bento-card-featured' : ''}`} intensity={8}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent text-white">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )
      })}
    </div>
  )
}
