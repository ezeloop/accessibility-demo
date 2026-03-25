const CONFIG = {
  fail:    { icon: '❌', label: 'FAIL',     bg: '#fff5f5', border: '#fc8181', color: '#c53030' },
  partial: { icon: '⚠️', label: 'PARTIAL',  bg: '#fffbeb', border: '#f6e05e', color: '#744210' },
  pass:    { icon: '✅', label: 'PASS',     bg: '#f0fff4', border: '#68d391', color: '#276749' },
  aa:      { icon: '✅', label: 'WCAG AA',  bg: '#f0fff4', border: '#68d391', color: '#276749' },
  aaa:     { icon: '✅', label: 'WCAG AAA', bg: '#e6fffa', border: '#38b2ac', color: '#1d4044' },
}

export default function WcagBadge({ level, size = 'md' }) {
  const c = CONFIG[level] ?? CONFIG.fail
  const isSmall = size === 'sm'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.3rem',
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        color: c.color,
        borderRadius: '20px',
        padding: isSmall ? '.1rem .5rem' : '.2rem .7rem',
        fontSize: isSmall ? '.72rem' : '.8rem',
        fontWeight: 700,
        letterSpacing: '.03em',
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true">{c.icon}</span>
      {c.label}
    </span>
  )
}
