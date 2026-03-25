// WCAG 2.1 contrast ratio calculator

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function linearize(c) {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function luminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/** Returns WCAG contrast ratio between two hex colours, rounded to 2 dp. */
export function contrastRatio(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1))
  const l2 = luminance(hexToRgb(hex2))
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100
}

/**
 * Returns 'aaa' | 'aa' | 'fail'
 * isLarge: large text thresholds (3:1 for AA, 4.5:1 for AAA)
 */
export function wcagLevel(ratio, isLarge = false) {
  if (ratio >= (isLarge ? 4.5 : 7))   return 'aaa'
  if (ratio >= (isLarge ? 3.0 : 4.5)) return 'aa'
  return 'fail'
}
