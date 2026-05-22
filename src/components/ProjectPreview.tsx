import DashboardMockup from './DashboardMockup'

type PreviewType = 'trackify' | 'resume-ai' | 'sniper'

export default function ProjectPreview({ type }: { type: PreviewType }) {
  if (type === 'trackify') {
    return (
      <div className="project-preview project-preview--trackify">
        <DashboardMockup />
      </div>
    )
  }

  if (type === 'resume-ai') {
    return (
      <div className="project-preview project-preview--ai">
        <div className="ai-preview">
          <div className="ai-preview__sidebar">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Upload</p>
            <div className="ai-preview__file" />
            <div className="ai-preview__file ai-preview__file--dim" />
          </div>
          <div className="ai-preview__main">
            <div className="ai-preview__score">
              <span className="font-display text-4xl font-semibold text-gold">87</span>
              <span className="text-xs text-muted">Match score</span>
            </div>
            <div className="ai-preview__skills">
              {['React', 'TypeScript', 'Node', 'LLM'].map((s) => (
                <span key={s} className="tech-pill text-[9px]">
                  {s}
                </span>
              ))}
            </div>
            <div className="ai-preview__insight">
              <span className="text-[10px] font-bold uppercase text-warm">AI insight</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Strong full-stack signal — highlight API + dashboard work in summary.
              </p>
            </div>
          </div>
        </div>
        <div className="ai-preview__demo-badge">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          Live AI demo available
        </div>
      </div>
    )
  }

  return (
    <div className="project-preview project-preview--sniper">
      <div className="sniper-preview">
        <div className="sniper-preview__nav">
          <span className="font-display text-sm font-semibold text-ink">Sniper Defence Academy</span>
        </div>
        <div className="sniper-preview__hero">
          <p className="font-display text-lg font-semibold leading-tight text-ink">
            Train with <span className="text-accent">purpose.</span>
          </p>
          <p className="mt-2 text-xs text-muted">Defence & competitive exam prep</p>
          <span className="sniper-preview__cta">Explore courses</span>
        </div>
        <div className="sniper-preview__stats">
          {['Courses', 'Results', 'Contact'].map((t) => (
            <span key={t} className="text-[9px] font-bold uppercase text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
