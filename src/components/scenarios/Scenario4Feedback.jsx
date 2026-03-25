// Scenario 4 – Dynamic feedback / live regions
import { useState } from 'react'

/* ── Bad: state updates silent to assistive tech ── */
export function BadFeedback() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p className="col-desc">
        The counter updates visually but the change is never announced to
        screen readers — there is no live region.
      </p>
      <div className="demo-box">
        <div className="counter-area">
          <button
            className="demo-btn btn-accessible"
            style={{ background: '#e2e8f0' }}
            onClick={() => setCount((c) => Math.max(0, c - 1))}
          >
            −
          </button>
          {/* No aria-live — screen readers won't notice the change */}
          <span className="counter-display">{count}</span>
          <button
            className="demo-btn btn-accessible"
            style={{ background: '#e2e8f0' }}
            onClick={() => setCount((c) => c + 1)}
          >
            +
          </button>
        </div>
        {/* Status updated in DOM but not in a live region */}
        <p className="status-msg" style={{ color: '#c53030' }}>
          {count === 0 ? 'No items selected' : `${count} item${count > 1 ? 's' : ''} selected`}
        </p>
      </div>
      <pre className="code-hint">{`<!-- Value changes but no aria-live -->
<span class="counter">{count}</span>
<p class="status">{status}</p>`}</pre>
    </div>
  )
}

/* ── Good: aria-live region announces updates ── */
export function GoodFeedback() {
  const [count, setCount] = useState(0)
  const [lastAction, setLastAction] = useState('')

  function decrement() {
    setCount((c) => {
      const next = Math.max(0, c - 1)
      setLastAction(next === 0 ? 'Counter reset to zero' : `Decreased to ${next}`)
      return next
    })
  }
  function increment() {
    setCount((c) => {
      const next = c + 1
      setLastAction(`Increased to ${next}`)
      return next
    })
  }

  return (
    <div>
      <p className="col-desc">
        An <code>aria-live="polite"</code> region announces every change so
        screen reader users always know the current value and what changed.
      </p>
      <div className="demo-box">
        <div className="counter-area">
          <button
            className="demo-btn btn-accessible"
            style={{ background: '#e2e8f0' }}
            aria-label="Decrease count"
            onClick={decrement}
          >
            −
          </button>
          <span
            className="counter-display"
            aria-label={`Current count: ${count}`}
          >
            {count}
          </span>
          <button
            className="demo-btn btn-accessible"
            style={{ background: '#e2e8f0' }}
            aria-label="Increase count"
            onClick={increment}
          >
            +
          </button>
        </div>

        {/* aria-live region — announced on every update */}
        <p
          className="status-msg"
          aria-live="polite"
          aria-atomic="true"
          style={{ color: '#276749' }}
        >
          {lastAction || (count === 0 ? 'No items selected' : `${count} item${count > 1 ? 's' : ''} selected`)}
        </p>
      </div>
      <pre className="code-hint">{`<p aria-live="polite" aria-atomic="true">
  {statusMessage}
</p>`}</pre>
    </div>
  )
}
