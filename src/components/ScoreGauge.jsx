const RADIUS = 32
const CIRC   = 2 * Math.PI * RADIUS

function gaugeColor(score) {
  if (score >= 90) return '#0cce6b'
  if (score >= 50) return '#ffa400'
  return '#ff4e42'
}

export default function ScoreGauge({ score, size = 80 }) {
  const color  = gaugeColor(score)
  const offset = CIRC - (score / 100) * CIRC
  const cx = size / 2
  const cy = size / 2
  const scale = size / 80

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-label={`Lighthouse accessibility score: ${score} out of 100`}
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="40" cy="40" r={RADIUS}
        fill="none"
        stroke="#2d3748"
        strokeWidth="7"
      />
      <circle
        cx="40" cy="40" r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeDasharray={CIRC}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
        style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)' }}
      />
      <text
        x="40" y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fontWeight="800"
        fill={color}
        fontFamily="inherit"
      >
        {score}
      </text>
      <text
        x="40" y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fill="#718096"
        fontFamily="inherit"
      >
        /100
      </text>
    </svg>
  )
}
