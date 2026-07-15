import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({
  index,
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <Reveal>
      <header className={`section-header mb-[var(--phi-5)] ${centered ? 'mx-auto max-w-3xl text-center' : ''}`}>
      <span className="section-index">{index}</span>
      <SectionLabel className={`mt-[var(--phi-2)] ${centered ? 'justify-center' : ''}`}>{label}</SectionLabel>
      <h2 className={`section-heading mt-[var(--phi-3)] ${centered ? '!max-w-none' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`body-copy mt-[var(--phi-2)] ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
      <div className={`phi-divider mt-[var(--phi-4)] ${centered ? 'mx-auto' : ''}`} />
      </header>
    </Reveal>
  )
}
