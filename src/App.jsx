import ScenarioCard   from './components/ScenarioCard.jsx'
import SummaryBanner  from './components/SummaryBanner.jsx'
import { BadButton,   GoodButton   } from './components/scenarios/Scenario1Button.jsx'
import { BadModal,    GoodModal    } from './components/scenarios/Scenario2Modal.jsx'
import { BadKeyboard, GoodKeyboard } from './components/scenarios/Scenario3Keyboard.jsx'
import { BadFeedback, GoodFeedback } from './components/scenarios/Scenario4Feedback.jsx'
import { BadContrast, GoodContrast } from './components/scenarios/Scenario5Contrast.jsx'

const scenarios = [
  {
    number: 1,
    title: 'Button without accessible label',
    description: 'Icon-only buttons need an aria-label so screen readers can describe their purpose.',
    scores: {
      bad: 45,
      good: 97,
      criteria: [
        { label: 'Button has accessible name', wcag: '4.1.2', bad: 'fail',    good: 'pass' },
        { label: 'ARIA attributes valid',       wcag: '4.1.2', bad: 'fail',    good: 'pass' },
        { label: 'Interactive elements named',  wcag: '1.3.1', bad: 'fail',    good: 'pass' },
      ],
    },
    BadComponent: BadButton,
    GoodComponent: GoodButton,
  },
  {
    number: 2,
    title: 'Modal dialog',
    description: 'Dialogs must trap focus, support ESC, return focus to the trigger, and carry proper ARIA roles.',
    scores: {
      bad: 52,
      good: 95,
      criteria: [
        { label: 'dialog role present',          wcag: '4.1.2', bad: 'fail',    good: 'pass' },
        { label: 'aria-modal attribute',          wcag: '4.1.2', bad: 'fail',    good: 'pass' },
        { label: 'Focus management on open',      wcag: '2.4.3', bad: 'fail',    good: 'pass' },
        { label: 'Focus trap (2.1.2 No Trap)',    wcag: '2.1.2', bad: 'fail',    good: 'pass' },
        { label: 'Focus returns on close',        wcag: '2.4.3', bad: 'fail',    good: 'pass' },
      ],
    },
    BadComponent: BadModal,
    GoodComponent: GoodModal,
  },
  {
    number: 3,
    title: 'Keyboard navigation',
    description: 'Avoid positive tabIndex values that override DOM order. Always show a visible focus indicator.',
    scores: {
      bad: 48,
      good: 96,
      criteria: [
        { label: 'No positive tabIndex misuse',  wcag: '2.4.3', bad: 'fail',    good: 'pass' },
        { label: 'Logical focus order',           wcag: '2.4.3', bad: 'fail',    good: 'pass' },
        { label: 'Focus indicator visible',       wcag: '2.4.7', bad: 'fail',    good: 'pass' },
        { label: 'Keyboard accessible (2.1.1)',   wcag: '2.1.1', bad: 'partial', good: 'pass' },
      ],
    },
    BadComponent: BadKeyboard,
    GoodComponent: GoodKeyboard,
  },
  {
    number: 4,
    title: 'Dynamic feedback',
    description: 'UI changes triggered by user actions must be announced via aria-live regions.',
    scores: {
      bad: 62,
      good: 95,
      criteria: [
        { label: 'Status messages announced',     wcag: '4.1.3', bad: 'fail',    good: 'pass' },
        { label: 'aria-live region present',       wcag: '4.1.3', bad: 'fail',    good: 'pass' },
        { label: 'Dynamic changes perceivable',    wcag: '1.3.1', bad: 'partial', good: 'pass' },
      ],
    },
    BadComponent: BadFeedback,
    GoodComponent: GoodFeedback,
  },
  {
    number: 5,
    title: 'Color contrast',
    description: 'Normal text must achieve a contrast ratio ≥ 4.5:1 against its background (WCAG AA).',
    scores: {
      bad: 33,
      good: 98,
      criteria: [
        { label: 'color-contrast Lighthouse audit', wcag: '1.4.3', bad: 'fail', good: 'pass' },
        { label: 'WCAG AA compliance (≥ 4.5:1)',    wcag: '1.4.3', bad: 'fail', good: 'aa'   },
        { label: 'WCAG AAA compliance (≥ 7:1)',     wcag: '1.4.6', bad: 'fail', good: 'aaa'  },
      ],
    },
    BadComponent: BadContrast,
    GoodComponent: GoodContrast,
  },
]

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="app-header">
        <div className="header-inner">

          <p className="header-eyebrow" aria-label="Section: Accessibility in Practice">
            <span aria-hidden="true">♿</span>
            WCAG 2.1 · Accessibility in Practice
          </p>

          <h1 className="header-headline">
            <span className="line-1">Two identical interfaces.</span>
            <span className="line-2">
              <span className="headline-works">One works.</span>{' '}
              <span className="headline-doesnt">One&nbsp;doesn't.</span>
            </span>
          </h1>

          <div className="header-quote-wrap">
            <span className="header-quote-line"       aria-hidden="true" />
            <p className="header-quote">
              "If it's not <em>accessible</em>, it's not <em>usable</em>."
            </p>
            <span className="header-quote-line right" aria-hidden="true" />
          </div>

          <div className="header-divider" aria-hidden="true" />

          <p className="header-description">
            Five real-world scenarios — each shown with a <strong>non-accessible</strong> and
            an <strong>accessible</strong> implementation side-by-side, with live WCAG metrics
            and estimated Lighthouse scores.
          </p>

          <div className="header-tags" aria-label="Technologies and standards used">
            {['React', 'WCAG 2.1', 'Lighthouse', 'ARIA', 'Focus Management', 'Color Contrast', 'Live Regions'].map(t => (
              <span key={t} className="header-tag">{t}</span>
            ))}
          </div>

          <div className="header-creds" role="list" aria-label="Standards and testing credentials">
            <span className="header-cred-badge" role="listitem">
              <span className="cred-icon" aria-hidden="true">✓</span>
              WCAG 2.2 aligned
            </span>
            <span className="header-cred-badge" role="listitem">
              <span className="cred-icon" aria-hidden="true">✓</span>
              Tested with VoiceOver &amp; NVDA
            </span>
          </div>

        </div>
      </header>

      <main id="main-content" className="app-main">
        <p className="info-banner" role="note">
          <span className="info-banner-icon" aria-hidden="true">ℹ</span>
          This demo intentionally includes non-accessible implementations to demonstrate
          real-world accessibility issues. Lighthouse warnings are expected in those sections.
        </p>

        <aside className="try-this-banner" aria-label="Keyboard navigation tip">
          <span className="try-this-icon" aria-hidden="true">⌨</span>
          <div className="try-this-body">
            <p className="try-this-title">Try this</p>
            <p className="try-this-text">
              Navigate this page using only your <kbd className="kbd-key">Tab</kbd> key.
              Now imagine this is the <em>only way</em> you can interact with a product.
            </p>
          </div>
        </aside>

        <SummaryBanner scenarios={scenarios} />

        <div className="col-orientation-header" aria-hidden="true">
          <div className="col-orientation-bad">✗ Non-Accessible Version</div>
          <div className="col-orientation-good">✓ Accessible Version</div>
        </div>

        {scenarios.map((s) => (
          <ScenarioCard key={s.number} {...s} />
        ))}
      </main>

      <section className="takeaway" aria-labelledby="takeaway-title">
        <p className="takeaway-eyebrow" aria-hidden="true">Final takeaway</p>
        <h2 id="takeaway-title" className="takeaway-headline" tabIndex={0}>
          Accessibility is not a feature.<br />
          It determines whether your product<br className="takeaway-br" /> can be used at all.
        </h2>
        <p className="takeaway-cta">
          <kbd className="kbd-key">Tab</kbd> Try navigating again using only your keyboard.
        </p>
      </section>

      <footer className="app-footer">
        Criteria mapped to WCAG 2.1 · Scores simulate Lighthouse 11 accessibility audits
      </footer>
    </>
  )
}
