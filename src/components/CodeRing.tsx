import { FiCode } from 'react-icons/fi'

export default function CodeRing() {
  const rings = [72, 58, 44]

  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center md:h-56 md:w-56">
      {rings.map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-dashed border-default"
          style={{
            width: size * 2,
            height: size * 2,
            opacity: 1 - i * 0.2,
          }}
        />
      ))}

      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const r = 88
        const x = 50 + Math.cos(angle) * (r / 1.8)
        const y = 50 + Math.sin(angle) * (r / 1.8)
        return (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--border)]"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          />
        )
      })}

      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-[var(--shadow-soft)] ring-4 ring-[var(--surface-muted)]">
        <FiCode size={28} className="text-gold" />
      </div>
    </div>
  )
}
