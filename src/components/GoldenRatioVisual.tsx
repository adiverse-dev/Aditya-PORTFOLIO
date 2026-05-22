export default function GoldenRatioVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`phi-visual ${className}`} aria-hidden>
      <div className="phi-visual__bars">
        <div className="phi-visual__major">
          <span>61.8%</span>
        </div>
        <div className="phi-visual__minor">
          <span>38.2%</span>
        </div>
      </div>
      <p className="phi-visual__caption">
        <span className="font-display text-gold">φ</span> = 1.618
      </p>
    </div>
  )
}
