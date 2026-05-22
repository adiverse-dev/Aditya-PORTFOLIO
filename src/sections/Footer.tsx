import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-[var(--gold)] bg-ink py-[var(--phi-5)] text-white/70">
      <div className="section-shell">
        <div className="flex flex-col items-center gap-[var(--phi-3)] text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-2xl font-semibold text-white">Aditya Singh</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-gold">Full-stack developer</p>
          </div>
          <p className="font-display text-sm italic text-white/55">Full-Stack · AI · Product Engineering</p>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            © {year}
            <FiHeart className="text-gold" size={12} />
          </p>
        </div>
      </div>
    </footer>
  )
}
