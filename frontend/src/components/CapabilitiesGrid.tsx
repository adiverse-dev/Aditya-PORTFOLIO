import { motion } from 'framer-motion'
import { FiCpu, FiDatabase, FiLayers, FiZap } from 'react-icons/fi'
import TiltCard from './TiltCard'

const items = [
  {
    icon: FiLayers,
    title: 'MERN SaaS Products',
    desc: 'User-facing platforms with React interfaces, Node/Express APIs, MongoDB data models, auth, dashboards, and deployment-ready architecture.',
    tags: ['React', 'Node', 'Express', 'MongoDB'],
    featured: true,
  },
  {
    icon: FiCpu,
    title: 'AI Workflow Layers',
    desc: 'LLM-powered parsing, scoring, recommendations, search, and automation flows designed as product features instead of isolated demos.',
    tags: ['OpenAI', 'Prompts', 'RAG'],
    featured: false,
  },
  {
    icon: FiDatabase,
    title: 'Dashboards & Systems',
    desc: 'Operational views, KPI tracking, and structured data experiences that help teams understand what is happening inside a product.',
    tags: ['Analytics', 'APIs', 'Data UX'],
    featured: false,
  },
  {
    icon: FiZap,
    title: 'Scalable Frontend UX',
    desc: 'Cinematic but practical interfaces with reusable components, responsive layouts, performance awareness, and clear user flows.',
    tags: ['Tailwind', 'Motion', 'Systems'],
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
