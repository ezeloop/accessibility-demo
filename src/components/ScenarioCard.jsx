import { useRef, useCallback } from 'react'
import ScorePanel from './ScorePanel.jsx'

export default function ScenarioCard({ number, title, description, scores, BadComponent, GoodComponent }) {
  const id          = `scenario-${number}`
  const descId      = `scenario-${number}-desc`
  const improvement = scores ? scores.good - scores.bad : null
  const badColRef   = useRef(null)

  const triggerShake = useCallback(() => {
    const box = badColRef.current?.querySelector('.demo-box')
    if (!box || box.classList.contains('is-shaking')) return
    box.classList.add('is-shaking')
    box.addEventListener('animationend', () => box.classList.remove('is-shaking'), { once: true })
  }, [])

  return (
    <section className="scenario-block" role="region" aria-labelledby={id}>
      <div className="scenario-header">
        <h2 id={id} aria-describedby={description ? descId : undefined} tabIndex={0}>
          <span aria-hidden="true">Scenario {number} — </span>
          {title}
        </h2>
        {description && <p id={descId}>{description}</p>}
      </div>

      <div className="scenario-columns">
        <div className="col-bad" ref={badColRef} onClickCapture={triggerShake} inert>
          <span className="col-label col-label-bad" aria-label="Non-accessible version">
            <span aria-hidden="true">⚠</span> Non-Accessible
          </span>
          <BadComponent />
        </div>

        <div className="col-good">
          <span className="col-label" aria-label="Accessible version">
            <span aria-hidden="true">✓</span> Accessible
          </span>
          <GoodComponent />
        </div>
      </div>

      {scores && (
        <div className="score-row" aria-label={`Accessibility metrics for scenario ${number}`}>
          <ScorePanel score={scores.bad}  criteria={scores.criteria} side="bad" />
          <ScorePanel score={scores.good} criteria={scores.criteria} side="good" improvement={improvement} />
        </div>
      )}
    </section>
  )
}
