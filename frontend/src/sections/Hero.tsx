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

const roles = ['MERN Products', 'AI Workflows', 'SaaS Systems']

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
            <span className="hero-location text-xs font-semibold uppercase tracking-widest text-muted">
              Noida / Delhi NCR - Remote-friendly
            </span>
          </div>

          <div className="golden-grid hero-grid">
            <div className="hero-copy">
              <h1 className="section-heading-lg">
                MERN <span className="text-gold">full-stack</span> + <span className="text-accent">AI</span>{' '}
                developer for modern SaaS products.
              </h1>

              <p className="body-copy mt-[var(--phi-3)]">
                I&apos;m <strong className="font-semibold text-ink">Aditya Singh</strong> - I design and build
                intelligent web experiences, automation workflows, and scalable digital systems with React,
                Node.js, MongoDB, Express, and AI integrations.
              </p>

              <div className="hero-role-list mt-[var(--phi-3)] flex flex-wrap gap-2">
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

            <div className="hero-visual">
              <ProfileAvatar size="lg" />
              {loaded && <AITerminal />}
            </div>
          </div>

          <div className="stat-row mt-[var(--phi-5)]">
            {[
              { n: '15+', l: 'Products & tools shipped' },
              { n: 'MERN', l: 'Core engineering stack' },
              { n: 'AI', l: 'Workflow-native builds' },
            ].map((s) => (
              <div key={s.l} className="stat-chip">
                <p className="font-display text-3xl font-semibold text-gold">{s.n}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-[var(--phi-6)]">
            <SectionLabel>What I build</SectionLabel>
            <p className="body-copy mt-[var(--phi-2)] !max-w-2xl">
              Product engineering across the MERN stack - with AI added where it improves workflows, decisions,
              search, automation, or the user experience itself.
            </p>
            <div className="mt-[var(--phi-4)]">{loaded && <CapabilitiesGrid />}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
