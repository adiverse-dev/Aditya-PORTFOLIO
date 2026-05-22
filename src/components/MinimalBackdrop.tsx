export default function MinimalBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '61.8px 61.8px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 100% 0%, rgba(184,148,79,0.08), transparent),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(47,74,99,0.06), transparent)`,
        }}
      />
    </div>
  )
}
