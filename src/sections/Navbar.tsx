import { useEffect, useMemo, useState } from 'react'
import { FiDownload, FiLinkedin, FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from '../components/ThemeToggle'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Proof', href: '#testimonials' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sections = useMemo(() => navLinks.map((item) => item.href.slice(1)), [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sections[i])
        if (!el) continue
        if (el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-default bg-surface/95 shadow-[var(--shadow-md)] backdrop-blur-lg'
          : 'border-b border-transparent bg-canvas/90 backdrop-blur-md'
      }`}
    >
      <div className="section-shell flex items-center justify-between py-[var(--phi-2)]">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent font-display text-lg font-semibold text-white shadow-[var(--shadow-sm)] transition-transform group-hover:scale-105">
            A
          </span>
          <div className="hidden sm:block">
            <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-ink">Aditya Singh</span>
            <span className="block whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
              MERN Stack + AI
            </span>
          </div>
        </a>

        <nav className="nav-pill">
          {navLinks.map((item) => {
            const active = activeSection === item.href.slice(1)
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={active ? 'nav-link nav-link-active' : 'nav-link'}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <a
            href="https://www.linkedin.com/in/aditya-singh-14137224b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-sm border border-default bg-surface text-muted transition-colors hover:border-gold hover:text-accent sm:flex"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn !hidden !py-2.5 sm:!inline-flex"
          >
            <FiDownload size={14} /> Resume
          </a>
          <button
            type="button"
            className="mobile-menu-button flex h-10 w-10 items-center justify-center rounded-sm border border-default bg-surface text-ink lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            style={{ position: 'fixed', right: '1rem', top: '1rem', zIndex: 60 }}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-default bg-surface lg:hidden">
          <nav id="mobile-navigation" className="section-shell flex flex-col gap-1 py-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`rounded-sm px-3 py-3 text-sm font-bold uppercase tracking-wider ${
                  activeSection === item.href.slice(1) ? 'bg-surface-muted text-warm' : 'text-muted'
                }`}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
