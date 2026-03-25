const PASSING = new Set(['pass', 'aa', 'aaa'])

export default function SummaryBanner({ scenarios }) {
  // Aggregate scores
  const avgBad  = Math.round(scenarios.reduce((s, sc) => s + sc.scores.bad,  0) / scenarios.length)
  const avgGood = Math.round(scenarios.reduce((s, sc) => s + sc.scores.good, 0) / scenarios.length)
  const delta   = avgGood - avgBad

  // Aggregate criteria
  const allCriteria    = scenarios.flatMap(sc => sc.scores.criteria)
  const badPassing     = allCriteria.filter(c => PASSING.has(c.bad)).length
  const goodPassing    = allCriteria.filter(c => PASSING.has(c.good)).length
  const totalCriteria  = allCriteria.length

  return (
    <section
      className="summary-banner"
      aria-label="Estimated accessibility improvement summary"
    >
      {/* ── Header ── */}
      <div className="summary-eyebrow">
        <span className="summary-tag">Lighthouse Accessibility Score</span>
        <span className="summary-subtitle">Estimated impact across all {scenarios.length} scenarios</span>
      </div>

      {/* ── Stat grid ── */}
      <div className="summary-stat-grid">

        {/* Before */}
        <div className="summary-stat summary-stat-before">
          <p className="summary-stat-label">Before</p>
          <p className="summary-stat-value" style={{ color: '#fc8181' }}>{avgBad}</p>
          <p className="summary-stat-sub">avg score</p>
          <div className="summary-bar-track">
            <div className="summary-bar-fill summary-bar-bad" style={{ width: `${avgBad}%` }} />
          </div>
        </div>

        {/* Arrow + Delta */}
        <div className="summary-stat summary-stat-delta">
          <div className="summary-delta-arrow" aria-hidden="true">→</div>
          <p className="summary-delta-value">+{delta}</p>
          <p className="summary-stat-label">estimated<br />improvement</p>
        </div>

        {/* After */}
        <div className="summary-stat summary-stat-after">
          <p className="summary-stat-label">After</p>
          <p className="summary-stat-value" style={{ color: '#68d391' }}>{avgGood}</p>
          <p className="summary-stat-sub">avg score</p>
          <div className="summary-bar-track">
            <div className="summary-bar-fill summary-bar-good" style={{ width: `${avgGood}%` }} />
          </div>
        </div>

        {/* Divider */}
        <div className="summary-vr" aria-hidden="true" />

        {/* Criteria */}
        <div className="summary-stat summary-stat-criteria">
          <p className="summary-stat-label">WCAG Criteria</p>
          <p className="summary-stat-value" style={{ color: '#68d391' }}>
            {goodPassing}
            <span style={{ fontSize: '1.2rem', color: '#a0aec0' }}>/{totalCriteria}</span>
          </p>
          <p className="summary-stat-sub">passing after fix</p>
          <div className="summary-criteria-change">
            <span className="summary-criteria-pill pill-was">{badPassing}/{totalCriteria} before</span>
            <span aria-hidden="true">→</span>
            <span className="summary-criteria-pill pill-now">{goodPassing}/{totalCriteria} after</span>
          </div>
        </div>

      </div>

      {/* ── WCAG standard note ── */}
      <p className="summary-note">
        Scores simulate Lighthouse 11 accessibility audits.
        Criteria mapped to WCAG 2.1 AA/AAA success criteria.
      </p>
    </section>
  )
}
