const words = ['Full Stack', 'SEO Analyst', 'NOC Specialist', 'Creative Coder', 'Problem Solver']

export default function TemporalEcho() {
  return (
    <div className="inline-flex flex-col items-center overflow-hidden" style={{ height: '1.2em' }}>
      {words.map((word) => (
        <span
          key={word}
          className="word-slide font-display text-gradient-gold block"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            lineHeight: '1.2',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
