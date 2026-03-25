import ScorePanel from './ScorePanel.jsx'

export default function ScenarioCard({ number, title, description, scores, BadComponent, GoodComponent }) {
  const id         = `scenario-${number}`
  const improvement = scores ? scores.good - scores.bad : null

  return (
    <section className="scenario-block" aria-labelledby={id}>
      <div className="scenario-header">
        <h2 id={id}>
          <span aria-hidden="true">Scenario {number} — </span>
          {title}
        </h2>
        {description && <p>{description}</p>}
      </div>

      <div className="scenario-columns">
        <div className="col-bad">
          <span className="col-label" aria-label="Non-accessible version">
            <span aria-hidden="true">✗</span> Non-Accessible
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
          <ScorePanel
            score={scores.bad}
            criteria={scores.criteria}
            side="bad"
          />
          <ScorePanel
            score={scores.good}
            criteria={scores.criteria}
            side="good"
            improvement={improvement}
          />
        </div>
      )}
    </section>
  )
}
