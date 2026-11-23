import Icon from './Icon'

function EmptyState({ icon = 'inbox', title, message, children }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon name={icon} size={28} />
      </div>
      <h2 className="empty-state__title">{title}</h2>
      {message && <p className="empty-state__message">{message}</p>}
      {children && <div className="empty-state__actions">{children}</div>}
    </div>
  )
}

export default EmptyState
