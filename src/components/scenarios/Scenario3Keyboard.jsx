// Scenario 3 – Keyboard navigation

/* ── Bad: broken tab order, no visible focus, tabindex misuse ── */
export function BadKeyboard() {
  return (
    <div>
      <p className="col-desc">
        Random <code>tabIndex</code> values break the natural reading order.
        Focus outlines are hidden, making it impossible to tell where you are.
      </p>
      <div className="demo-box">
        <ul className="nav-list">
          {/* tabIndex values are scrambled – order becomes 3 → 1 → 4 → 2 */}
          <li>
            <button tabIndex={3} className="nav-item-btn no-focus-style">
              Home <span style={{ color: '#a0aec0', fontSize: '.75rem' }}>(tab 3)</span>
            </button>
          </li>
          <li>
            <button tabIndex={1} className="nav-item-btn no-focus-style">
              About <span style={{ color: '#a0aec0', fontSize: '.75rem' }}>(tab 1)</span>
            </button>
          </li>
          <li>
            <button tabIndex={4} className="nav-item-btn no-focus-style">
              Services <span style={{ color: '#a0aec0', fontSize: '.75rem' }}>(tab 4)</span>
            </button>
          </li>
          <li>
            <button tabIndex={2} className="nav-item-btn no-focus-style">
              Contact <span style={{ color: '#a0aec0', fontSize: '.75rem' }}>(tab 2)</span>
            </button>
          </li>
        </ul>
        <p style={{ marginTop: '.75rem', fontSize: '.8rem', color: '#c53030' }}>
          ↑ Focus outline removed with <code>outline: none</code>
        </p>
      </div>
      <pre className="code-hint">{`/* CSS */
button:focus { outline: none; }

/* HTML – broken order */
<button tabIndex="3">Home</button>
<button tabIndex="1">About</button>
<button tabIndex="4">Services</button>
<button tabIndex="2">Contact</button>`}</pre>
    </div>
  )
}

/* ── Good: natural order, visible focus, no positive tabIndex ── */
export function GoodKeyboard() {
  return (
    <div>
      <p className="col-desc">
        No positive <code>tabIndex</code> — DOM order drives tab flow.
        Focused elements have a clear, high-contrast outline.
      </p>
      <div className="demo-box">
        <ul className="nav-list">
          <li><button className="nav-item-btn btn-accessible">Home</button></li>
          <li><button className="nav-item-btn btn-accessible">About</button></li>
          <li><button className="nav-item-btn btn-accessible">Services</button></li>
          <li><button className="nav-item-btn btn-accessible">Contact</button></li>
        </ul>
        <p style={{ marginTop: '.75rem', fontSize: '.8rem', color: '#276749' }}>
          ↑ Tab through the list — you can clearly see where focus is
        </p>
      </div>
      <pre className="code-hint">{`/* CSS */
button:focus-visible {
  outline: 3px solid #3182ce;
  outline-offset: 3px;
}

/* HTML – natural DOM order, no tabIndex */
<button>Home</button>
<button>About</button>
<button>Services</button>
<button>Contact</button>`}</pre>
    </div>
  )
}
