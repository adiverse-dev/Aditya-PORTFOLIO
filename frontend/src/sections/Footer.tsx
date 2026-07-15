import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-[var(--gold)] bg-[var(--ink)] py-[var(--phi-5)] text-white/70">
      <div className="section-shell">
        <div className="flex flex-col items-center gap-[var(--phi-3)] text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-2xl font-semibold text-white">Aditya Singh</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-gold">MERN Full-Stack + AI Developer</p>
          </div>
          <p className="font-display text-sm italic text-white/55">Modern SaaS products, AI workflows, scalable systems</p>
          <div className="flex items-center gap-3">
            <a href="mailto:adityasingh92731@gmail.com" className="footer-link" aria-label="Email Aditya">
              <FiMail size={16} />
            </a>
            <a href="https://github.com/adiverse-dev" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Aditya on GitHub">
              <FiGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-singh-14137224b/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Aditya on LinkedIn">
              <FiLinkedin size={16} />
            </a>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest">(c) {year}</p>
        </div>
      </div>
    </footer>
  )
}
