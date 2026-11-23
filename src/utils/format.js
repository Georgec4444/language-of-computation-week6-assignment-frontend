const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

// Formats a 'YYYY-MM-DD' string as a local date (avoids UTC off-by-one).
export function formatDate(value) {
  if (!value) return '—'
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return value
  return dateFormatter.format(new Date(y, m - 1, d))
}

export function formatYear(year) {
  if (year == null) return '—'
  return year < 0 ? `${Math.abs(year)} BC` : String(year)
}

export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function matchesQuery(query, ...fields) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return fields.some((f) => String(f ?? '').toLowerCase().includes(q))
}
