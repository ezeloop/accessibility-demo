import ScoreGauge from './ScoreGauge.jsx'
import WcagBadge  from './WcagBadge.jsx'

const PASSING = new Set(['pass', 'aa', 'aaa'])

export default function ScorePanel({ score, criteria, side, improvement }) {
  const isBad = side === 'bad'
  const passing = criteria.filter(c => PASSING.has(isBad ? c.bad : c.good)).length

  return (
    <div className={`score-panel score-panel-${side}`}>
      <div className="score-panel-top">
        <ScoreGauge score={score} size={74} />

        <div className="score-meta">
          <p className="score-section-label">Lighthouse · Accessibility</p>

          <div className="score-number-row">
            <span className="score-big-number" style={{ color: scoreColor(score) }}>
              {score}
            </span>
            <span className="score-out-of">/ 100</span>
          </div>

          <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '.35rem' }}>
            <span
              className={`score-status-pill ${isBad ? 'pill-bad' : 'pill-good'}`}
            >
              {isBad ? '✗ Failing' : '✓ Passing'}
            </span>
            {!isBad && improvement != null && (
              <span className="improvement-badge">▲ +{improvement} pts</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="score-divider" />

      {/* ── Criteria list ── */}
      <div className="score-criteria-header">
        <span>WCAG Criteria</span>
        <span className={`criteria-pass-count ${PASSING.has('pass') ? '' : ''}`}>
          {passing}/{criteria.length} passing
        </span>
      </div>

      <ul className="criteria-list" aria-label="WCAG criteria checklist">
        {criteria.map((c, i) => {
          const level = isBad ? c.bad : c.good
          return (
            <li key={i} className="criteria-item">
              <WcagBadge level={level} size="sm" />
              <span className="criteria-item-label">{c.label}</span>
              {c.wcag && (
                <span className="criteria-wcag-ref">{c.wcag}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function scoreColor(score) {
  if (score >= 90) return '#0cce6b'
  if (score >= 50) return '#ffa400'
  return '#ff4e42'
}
