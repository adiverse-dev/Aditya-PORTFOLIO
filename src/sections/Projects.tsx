import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import ProjectPreview from '../components/ProjectPreview'
import SectionHeader from '../components/SectionHeader'
import { projects } from '../data/projects'

export default function Projects() {
  const featured = projects.find((p) => p.featured)!
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-wrap relative bg-surface">
      <div className="section-shell">
        <SectionHeader
          index="05"
          label="Projects"
          title="Case studies — stack, AI & outcomes"
          subtitle="Each build includes what I shipped, how AI fits (if applicable), and links to explore."
        />

        <motion.article
          className="project-case panel-card overflow-hidden p-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="golden-grid !items-stretch">
            <div className="border-b border-default bg-surface-muted p-[var(--phi-4)] lg:border-b-0 lg:border-r">
              <ProjectPreview type={featured.preview} />
            </div>
            <div className="p-[var(--phi-4)] lg:p-[var(--phi-5)]">
              <div className="flex flex-wrap gap-2">
                <span className="tech-pill tech-pill--gold">Featured</span>
                {featured.ai && <span className="tech-pill tech-pill--gold">AI-powered</span>}
              </div>
              <h3 className="mt-[var(--phi-2)] font-display text-3xl font-semibold text-ink">{featured.title}</h3>
              <p className="font-semibold text-warm">{featured.kind}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{featured.caseStudy}</p>
              {featured.caseStudyAi && (
                <p className="mt-3 rounded-sm border-l-4 border-gold bg-surface-muted py-2 pl-4 text-sm text-ink-soft">
                  <strong className="text-warm">AI:</strong> {featured.caseStudyAi}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-4">
                {featured.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-xl font-semibold text-gold">{m.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.stack.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {featured.live !== '#' && (
                  <a href={featured.live} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live <FiExternalLink size={14} />
                  </a>
                )}
                <a href={featured.github} target="_blank" rel="noopener noreferrer" className="project-link project-link--ghost">
                  <FiGithub size={14} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="mt-[var(--phi-5)] grid gap-[var(--phi-4)] lg:grid-cols-2">
          {others.map((p, i) => (
            <motion.article
              key={p.id}
              className="project-case panel-card overflow-hidden p-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="border-b border-default bg-surface-muted p-[var(--phi-3)]">
                <ProjectPreview type={p.preview} />
              </div>
              <div className="p-[var(--phi-4)]">
                {p.ai && <span className="tech-pill tech-pill--gold mb-2">AI-powered</span>}
                <h3 className="font-display text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="text-sm font-semibold text-warm">{p.kind}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.caseStudy}</p>
                {p.caseStudyAi && (
                  <p className="mt-2 text-sm text-ink-soft">
                    <strong className="text-warm">AI:</strong> {p.caseStudyAi}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-3">
                  {p.metrics.map((m) => (
                    <span key={m.label} className="text-xs text-muted">
                      <strong className="text-gold">{m.value}</strong> {m.label}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="tech-pill text-[9px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {p.live !== '#' && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live <FiExternalLink size={14} />
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link project-link--ghost">
                    <FiGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
