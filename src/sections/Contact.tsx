import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import MagneticButton from '../components/MagneticButton'
import PhiFrame from '../components/PhiFrame'
import SectionHeader from '../components/SectionHeader'

export default function Contact() {
  return (
    <section id="contact" className="section-wrap section-wrap--dark relative overflow-hidden">
      <div className="section-shell relative z-10">
        <SectionHeader
          index="09"
          label="Contact"
          title="Let's build your next full-stack or AI product"
          subtitle="Open for full-time roles, contract builds, and collaborations — reply within 24–48 hours."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <PhiFrame variant="accent" className="text-center !border-white/15 !bg-white/5">
            <p className="text-lg text-white/85">
              Need a developer who can ship the UI, the API, <em className="text-gold not-italic">and</em> the AI layer?
            </p>
            <p className="mt-2 text-sm text-white/60">adityasingh92731@gmail.com</p>

            <MagneticButton
              className="primary-btn !mt-[var(--phi-4)] !border-0 !bg-gold !text-ink"
              onClick={() => {
                window.location.href = 'mailto:adityasingh92731@gmail.com'
              }}
            >
              Start a conversation <FiArrowRight size={16} />
            </MagneticButton>

            <div className="mt-[var(--phi-4)] flex justify-center gap-3">
              {[
                { icon: FiMail, href: 'mailto:adityasingh92731@gmail.com', label: 'Email' },
                { icon: FiGithub, href: 'https://github.com/adiverse-dev', label: 'GitHub' },
                { icon: FiLinkedin, href: 'https://www.linkedin.com/in/aditya-singh-14137224b/', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/10 text-white hover:border-gold hover:bg-white/15"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </PhiFrame>
        </motion.div>
      </div>
    </section>
  )
}
