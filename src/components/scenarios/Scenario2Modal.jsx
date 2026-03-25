// Scenario 2 – Modal dialog
import { useState, useEffect, useRef } from 'react'

/* ── Bad modal: no focus trap, no ESC, no aria roles ── */
export function BadModal() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <p className="col-desc">
        No focus trap — keyboard users can tab behind the overlay. No ESC handling.
        No ARIA roles. Focus does not return when closed.
      </p>
      <div className="demo-box">
        <button className="demo-btn btn-primary" onClick={() => setOpen(true)}>
          Open Modal
        </button>

        {open && (
          /* plain div overlay — not a dialog, no aria-modal */
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm action</h3>
              <p>Are you sure you want to proceed with this action?</p>
              <div className="modal-actions">
                <button className="demo-btn" style={{ background: '#e2e8f0' }} onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button className="demo-btn btn-primary" onClick={() => setOpen(false)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <pre className="code-hint">{`<div class="overlay">   <!-- not role="dialog" -->
  <div class="box">     <!-- no aria-modal -->
    ...                 <!-- focus leaks out -->
  </div>
</div>`}</pre>
    </div>
  )
}

/* ── Good modal: focus trap, ESC, aria roles, focus return ── */
const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'

export function GoodModal() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dialogRef  = useRef(null)

  // Move focus into dialog when opened
  useEffect(() => {
    if (open) {
      const first = dialogRef.current?.querySelectorAll(FOCUSABLE)[0]
      first?.focus()
    } else {
      // Return focus to trigger when closed
      triggerRef.current?.focus()
    }
  }, [open])

  // Focus trap + ESC handler
  function handleKeyDown(e) {
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key !== 'Tab') return

    const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
  }

  return (
    <div>
      <p className="col-desc">
        Focus moves into dialog on open and returns to the trigger on close.
        Tab is trapped inside. ESC closes. Proper ARIA roles announced.
      </p>
      <div className="demo-box">
        <button
          ref={triggerRef}
          className="demo-btn btn-primary btn-accessible"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          Open Modal
        </button>

        {open && (
          <div
            className="modal-overlay"
            role="presentation"
            // Clicking overlay = close
            onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="modal-box"
              onKeyDown={handleKeyDown}
            >
              <h3 id="modal-title">Confirm action</h3>
              <p>Are you sure you want to proceed with this action?</p>
              <div className="modal-actions">
                <button
                  className="demo-btn btn-accessible"
                  style={{ background: '#e2e8f0' }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="demo-btn btn-primary btn-accessible"
                  onClick={() => setOpen(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <pre className="code-hint">{`<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title">
  <!-- focus trapped inside -->
  <!-- ESC closes, focus returns -->
</div>`}</pre>
    </div>
  )
}
