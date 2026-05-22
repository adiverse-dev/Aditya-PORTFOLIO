import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface MarqueeProps {
  items: string[]
  speed?: number
}

export default function Marquee({ items, speed = 32 }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const row = [...items, ...items]

  return (
    <div className="marquee-band relative overflow-hidden py-[var(--phi-3)]">
      <div
        className={`flex w-max gap-[var(--phi-5)] ${reduced ? '' : 'animate-marquee'}`}
        style={reduced ? undefined : { animationDuration: `${speed}s` }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-[var(--phi-4)] text-[11px] font-bold uppercase tracking-[0.22em] text-white/70"
          >
            {item}
            <span className="marquee-dot h-1.5 w-1.5 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}
