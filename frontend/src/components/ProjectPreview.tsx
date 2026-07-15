type PreviewType = 'healio' | 'propai' | 'sniper'

export default function ProjectPreview({ type }: { type: PreviewType }) {
  if (type === 'healio') {
    return (
      <div className="project-preview project-preview--healio">
        <div className="ai-preview">
          <div className="ai-preview__sidebar">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Patient intake</p>
            <div className="ai-preview__file" />
            <div className="ai-preview__file ai-preview__file--dim" />
            <div className="ai-preview__demo-badge">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              AI triage
            </div>
          </div>
          <div className="ai-preview__main">
            <div className="ai-preview__score">
              <span className="font-display text-3xl font-semibold text-gold">3</span>
              <span className="text-xs text-muted">role dashboards</span>
            </div>
            <div className="ai-preview__skills">
              {['Admin', 'Doctor', 'Patient', 'AI'].map((s) => (
                <span key={s} className="tech-pill text-[9px]">
                  {s}
                </span>
              ))}
            </div>
            <div className="ai-preview__insight">
              <span className="text-[10px] font-bold uppercase text-warm">Care routing</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Symptom text becomes structured issue signals and doctor recommendation logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'propai') {
    return (
      <div className="project-preview project-preview--propai">
        <div className="ai-preview">
          <div className="ai-preview__sidebar">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Property ops</p>
            <div className="ai-preview__file" />
            <div className="ai-preview__file ai-preview__file--dim" />
            <div className="ai-preview__file ai-preview__file--dim" />
          </div>
          <div className="ai-preview__main">
            <div className="ai-preview__score">
              <span className="font-display text-4xl font-semibold text-gold">12+</span>
              <span className="text-xs text-muted">rental workflows</span>
            </div>
            <div className="ai-preview__skills">
              {['Owner', 'Tenant', 'Admin', 'Rent'].map((s) => (
                <span key={s} className="tech-pill text-[9px]">
                  {s}
                </span>
              ))}
            </div>
            <div className="ai-preview__insight">
              <span className="text-[10px] font-bold uppercase text-warm">AI operations</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Smart recommendations guide listings, occupancy, rent, tickets, and tenant workflows.
              </p>
            </div>
          </div>
        </div>
        <div className="ai-preview__demo-badge">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          Multi-role SaaS demo
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
