// Scenario 1 – Button without accessible label

export function BadButton() {
  return (
    <div>
      <p className="col-desc">
        Icon-only button with no label. Screen readers announce "button" with no context.
      </p>
      <div className="demo-box">
        {/* No aria-label, no visible text – screen reader says just "button" */}
        <button className="demo-btn btn-icon-only" onClick={() => alert('clicked')}>
          🔔
        </button>
        &nbsp;
        <button className="demo-btn btn-icon-only" onClick={() => alert('clicked')}>
          ✕
        </button>
        &nbsp;
        <button className="demo-btn btn-icon-only" onClick={() => alert('clicked')}>
          ⚙
        </button>
      </div>
      <pre className="code-hint">{`<button>🔔</button>
<button>✕</button>
<button>⚙</button>`}</pre>
    </div>
  )
}

export function GoodButton() {
  return (
    <div>
      <p className="col-desc">
        Each button carries an <code>aria-label</code> that gives screen readers a meaningful name.
      </p>
      <div className="demo-box">
        <button
          className="demo-btn btn-icon-only btn-accessible"
          aria-label="Notifications"
          onClick={() => alert('Notifications opened')}
        >
          🔔
        </button>
        &nbsp;
        <button
          className="demo-btn btn-icon-only btn-accessible"
          aria-label="Close dialog"
          onClick={() => alert('Dialog closed')}
        >
          ✕
        </button>
        &nbsp;
        <button
          className="demo-btn btn-icon-only btn-accessible"
          aria-label="Open settings"
          onClick={() => alert('Settings opened')}
        >
          ⚙
        </button>
      </div>
      <pre className="code-hint">{`<button aria-label="Notifications">🔔</button>
<button aria-label="Close dialog">✕</button>
<button aria-label="Open settings">⚙</button>`}</pre>
    </div>
  )
}
