export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md" style={{ perspective: '1200px' }}>
      <div
        className="rounded-xl border border-default bg-surface p-4 shadow-[var(--shadow-soft)] transition-transform duration-500"
        style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}
      >
        <div className="mb-3 flex items-center justify-between border-b border-default pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Trackify</span>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {['25.6k', '38.9k', '32.6%'].map((val, i) => (
            <div key={i} className="rounded-lg bg-surface-muted p-2">
              <p className="text-[9px] font-semibold uppercase text-muted">Metric</p>
              <p className="font-display text-sm font-semibold text-ink">{val}</p>
            </div>
          ))}
        </div>

        <div className="h-28 rounded-lg bg-surface-muted p-3">
          <svg viewBox="0 0 280 80" className="h-full w-full">
            <polyline
              points="0,60 40,45 80,50 120,30 160,35 200,20 240,25 280,15"
              fill="none"
              stroke="#c4a062"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polyline
              points="0,65 40,55 80,58 120,48 160,50 200,40 240,42 280,38"
              fill="none"
              stroke="#3d5a73"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
            {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
              <circle key={i} cx={x} cy={[60, 45, 50, 30, 35, 20, 25, 15][i]} r="3" fill="#a67c52" />
            ))}
          </svg>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="h-2 flex-1 rounded-full bg-gold/25" />
          <div className="h-2 flex-1 rounded-full bg-accent/20" />
          <div className="h-2 w-1/3 rounded-full bg-[var(--border)]" />
        </div>
      </div>
    </div>
  )
}
