export default function HeroIllustration() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[420px]" aria-hidden>
      <svg viewBox="0 0 400 320" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eef2f6" />
            <stop offset="100%" stopColor="#f9f9f9" />
          </linearGradient>
        </defs>

        <rect width="400" height="320" fill="url(#skyGrad)" rx="8" />

        {/* Sun */}
        <circle cx="200" cy="95" r="52" fill="#ff3b4a" opacity="0.95" />

        {/* City skyline */}
        <path
          d="M0 220 L30 180 L55 200 L80 150 L105 190 L130 140 L155 175 L180 120 L205 165 L230 110 L255 155 L280 130 L305 170 L330 145 L355 185 L380 160 L400 200 L400 320 L0 320 Z"
          fill="#dce4ed"
        />
        <path
          d="M0 240 L45 200 L90 230 L140 175 L190 215 L240 165 L290 205 L340 180 L400 220 L400 320 L0 320 Z"
          fill="#c5d0dc"
          opacity="0.7"
        />

        {/* Window lights */}
        {[60, 95, 130, 200, 235, 270, 310].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={175 + (i % 3) * 18}
            width="8"
            height="10"
            rx="1"
            fill="#b8c5d4"
            opacity="0.6"
          />
        ))}

        {/* Grid dots */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 8 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={40 + col * 45}
              cy={40 + row * 28}
              r="1.5"
              fill="#122846"
              opacity="0.08"
            />
          )),
        )}
      </svg>

      <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1">
        <div className="h-1 w-16 bg-[#ff3b4a]/30" />
        <div className="h-1 w-8 bg-[#122846]/20" />
      </div>
    </div>
  )
}
