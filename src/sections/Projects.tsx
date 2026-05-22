import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiShield } from 'react-icons/fi'
import ProjectPreview from '../components/ProjectPreview'
import SectionHeader from '../components/SectionHeader'
import { type Project, projects } from '../data/projects'
import { softSpring } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Projects() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="projects" className="section-wrap relative bg-surface">
      <div className="section-shell">
        <SectionHeader
          index="04"
          label="Selected work"
          title="Product case-study previews"
          subtitle="Projects framed by the problem, the user workflow, the engineering approach, and the value created - not just a stack list."
        />

        <div className="project-case-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="project-case panel-card overflow-hidden p-0"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18, margin: '-4% 0px -10% 0px' }}
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ ...softSpring, delay: i * 0.07 }}
            >
              <div className="project-preview-panel border-b border-default bg-surface-muted p-[var(--phi-3)]">
                <ProjectPreview type={p.preview} />
              </div>
              <div className="project-copy">
                <div className="mb-2 flex flex-wrap gap-2">
                  {p.featured && <span className="tech-pill tech-pill--gold">Featured system</span>}
                  {p.ai && <span className="tech-pill tech-pill--gold">AI workflow</span>}
                  <span className="tech-pill tech-pill--outline">{p.status}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="text-sm font-semibold text-warm">{p.kind}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ink-soft">{p.summary}</p>
                <ul className="project-highlights">
                  {p.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="project-system-note">
                  <strong className="text-warm">Problem:</strong> {p.problem}
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  <strong className="text-warm">Outcome:</strong> {p.outcome}
                </p>
                <p className="project-system-note">
                  <strong className="text-warm">System:</strong> {p.approach}
                </p>
                {p.caseStudyAi && (
                  <p className="project-system-note">
                    <strong className="text-warm">AI layer:</strong> {p.caseStudyAi}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-3">
                  {p.metrics.map((m) => (
                    <span key={m.label} className="text-xs text-muted">
                      <strong className="text-gold">{m.value}</strong> {m.label}
                    </span>
                  ))}
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                  <FiShield className="text-gold" size={13} /> {p.deployment}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="tech-pill text-[9px]">
                      {t}
                    </span>
                  ))}
                </div>
                <ProjectCtas project={p} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCtas({ project }: { project: Project }) {
  const hasLive = project.live !== '#'

  return (
    <div className="project-links">
      {hasLive ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`Open live site for ${project.title}`}
        >
          Live site <FiExternalLink size={14} />
        </a>
      ) : (
        <span className="project-link project-link--disabled" aria-label={`Live site pending for ${project.title}`}>
          Live pending <FiExternalLink size={14} />
        </span>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link project-link--ghost"
        aria-label={`Open GitHub repository for ${project.title}`}
      >
        <FiGithub size={14} /> GitHub
      </a>
    </div>
  )
}
