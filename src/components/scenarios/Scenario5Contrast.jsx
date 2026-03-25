// Scenario 5 – Color contrast (with real WCAG ratio calculations)
import { contrastRatio, wcagLevel } from '../../utils/contrast.js'
import WcagBadge from '../WcagBadge.jsx'

// ── Color pair data ──────────────────────────────────────────────────────────
const BAD_PAIRS = [
  { fg: '#b0b0b0', bg: '#f0f0f0', label: 'Body text',     purpose: 'Primary content' },
  { fg: '#a8d5e2', bg: '#ffffff', label: 'Link color',    purpose: 'Navigation link' },
  { fg: '#f5a623', bg: '#ffffff', label: 'Warning label', purpose: 'Alert message'   },
]

const GOOD_PAIRS = [
  { fg: '#1a1a1a', bg: '#f0f0f0', label: 'Body text',     purpose: 'Primary content' },
  { fg: '#1a56db', bg: '#ffffff', label: 'Link color',    purpose: 'Navigation link' },
  { fg: '#92400e', bg: '#fef3c7', label: 'Warning label', purpose: 'Alert message'   },
]

// ── Reusable color pair row ──────────────────────────────────────────────────
function ColorPairRow({ fg, bg, label, purpose }) {
  const ratio = contrastRatio(fg, bg)
  const level = wcagLevel(ratio)

  return (
    <li className="contrast-pair-row">
      {/* Colour swatch */}
      <span
        className="contrast-swatch"
        style={{ background: bg, border: '1px solid #e2e8f0' }}
        aria-hidden="true"
      >
        <span style={{ color: fg, fontWeight: 600, fontSize: '.9rem' }}>Aa</span>
      </span>

      {/* Text info */}
      <span className="contrast-pair-info">
        <span className="contrast-pair-label">{label}</span>
        <span className="contrast-pair-hex">{fg} on {bg}</span>
        <span className="contrast-pair-purpose">{purpose}</span>
      </span>

      {/* Ratio + badge */}
      <span className="contrast-pair-metrics">
        <span
          className="contrast-ratio-number"
          style={{ color: level === 'fail' ? '#c53030' : level === 'aa' ? '#276749' : '#1d4044' }}
        >
          {ratio.toFixed(2)}:1
        </span>
        <WcagBadge level={level} size="sm" />
      </span>
    </li>
  )
}

// ── Bad version ──────────────────────────────────────────────────────────────
export function BadContrast() {
  return (
    <div>
      <p className="col-desc">
        Low-contrast colours fail WCAG AA. Screen users with low vision cannot
        read the text — and these combos fail automated Lighthouse audits.
      </p>
      <div className="demo-box">
        <ul className="contrast-pair-list">
          {BAD_PAIRS.map((p) => <ColorPairRow key={p.label} {...p} />)}
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '.8rem', color: '#c53030', fontStyle: 'italic' }}>
          All three pairs fail WCAG AA (require ≥ 4.5:1 for normal text)
        </p>
      </div>
      <pre className="code-hint">{`/* ✗ All fail WCAG AA */
color: #b0b0b0; background: #f0f0f0; /* ~1.9:1 */
color: #a8d5e2; background: #ffffff; /* ~1.6:1 */
color: #f5a623; background: #ffffff; /* ~2.1:1 */`}</pre>
    </div>
  )
}

// ── Good version ─────────────────────────────────────────────────────────────
export function GoodContrast() {
  return (
    <div>
      <p className="col-desc">
        High-contrast alternatives that preserve the same intent (body, link,
        warning) while meeting or exceeding WCAG AA (≥ 4.5:1).
      </p>
      <div className="demo-box">
        <ul className="contrast-pair-list">
          {GOOD_PAIRS.map((p) => <ColorPairRow key={p.label} {...p} />)}
        </ul>

        {/* WCAG threshold reference */}
        <div className="contrast-threshold-table">
          <div className="threshold-row">
            <WcagBadge level="fail" size="sm" />
            <span>Below 4.5:1 — normal text fails</span>
          </div>
          <div className="threshold-row">
            <WcagBadge level="aa"  size="sm" />
            <span>4.5:1 → 7:1 — WCAG AA normal text</span>
          </div>
          <div className="threshold-row">
            <WcagBadge level="aaa" size="sm" />
            <span>7:1 and above — WCAG AAA</span>
          </div>
        </div>
      </div>
      <pre className="code-hint">{`/* ✓ All pass WCAG AA or AAA */
color: #1a1a1a; background: #f0f0f0; /* ~16:1 AAA */
color: #1a56db; background: #ffffff; /* ~7.5:1 AA */
color: #92400e; background: #fef3c7; /* ~5.9:1 AA */`}</pre>
    </div>
  )
}
