import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import AITerminal from '../components/AITerminal'
import CapabilitiesGrid from '../components/CapabilitiesGrid'
import ProfileAvatar from '../components/ProfileAvatar'
import MagneticButton from '../components/MagneticButton'
import SectionLabel from '../components/SectionLabel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface HeroProps {
  loaded: boolean
}

const roles = ['Full-Stack Developer', 'AI Product Engineer', 'Automation Builder']

export default function Hero({ loaded }: HeroProps) {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.12], [0, reduced ? 0 : -24])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 md:pt-32">
      <div className="section-shell relative z-10 pb-[var(--phi-5)]">
        <motion.div style={{ y }} initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="availability-pill">Open to work</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Noida / Delhi NCR · Remote-friendly
            </span>
          </div>

          <div className="golden-grid items-start gap-[var(--phi-5)]">
            <div>
              <h1 className="section-heading-lg">
                I build <span className="text-gold">full-stack</span> products with{' '}
                <span className="text-accent">AI</span> inside.
              </h1>

              <p className="body-copy mt-[var(--phi-3)]">
                I&apos;m <strong className="font-semibold text-ink">Aditya Singh</strong> — I ship React/Node
                applications, LLM-powered workflows, and data dashboards that teams actually use in production.
              </p>

              <div className="mt-[var(--phi-3)] flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span key={role} className="tech-pill tech-pill--outline">
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-[var(--phi-4)] flex flex-wrap items-center gap-[var(--phi-2)]">
                <MagneticButton className="primary-btn" onClick={() => scrollTo('#projects')}>
                  See my work <FiArrowRight size={14} />
                </MagneticButton>
                <MagneticButton className="ghost-btn" onClick={() => scrollTo('#contact')}>
                  Hire me
                </MagneticButton>
              </div>

              <div className="mt-[var(--phi-3)] flex gap-3">
                <a
                  href="https://github.com/adiverse-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label="GitHub"
                >
                  <FiGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/aditya-singh-14137224b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={16} />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[var(--phi-4)]">
              <ProfileAvatar size="lg" />
              {loaded && <AITerminal />}
            </div>
          </div>

          <div className="stat-row mt-[var(--phi-5)]">
            {[
              { n: '15+', l: 'Apps & tools shipped' },
              { n: '3+', l: 'Years engineering' },
              { n: 'AI', l: 'Native in my stack' },
            ].map((s) => (
              <div key={s.l} className="stat-chip">
                <p className="font-display text-3xl font-semibold text-gold">{s.n}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-[var(--phi-6)]">
            <SectionLabel>What I deliver</SectionLabel>
            <p className="body-copy mt-[var(--phi-2)] !max-w-2xl">
              Product engineering across the stack — plus the AI layer when it saves time, improves decisions, or
              unlocks a feature users can&apos;t get elsewhere.
            </p>
            <div className="mt-[var(--phi-4)]">{loaded && <CapabilitiesGrid />}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
