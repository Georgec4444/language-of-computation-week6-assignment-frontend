// tone: 'success' | 'warning' | 'danger' | 'neutral' | 'brand'
function StatusBadge({ tone = 'neutral', children }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export default StatusBadge
