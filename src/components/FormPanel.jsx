import { BACKEND_CONNECTED } from '../config/backend'
import Icon from './Icon'

// Side panel for add/edit forms. The submit button stays disabled until the
// backend is connected, and the panel says so plainly.
function FormPanel({ title, subtitle, submitLabel, onClose, children }) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <aside className="panel form-panel" aria-label={title}>
      <div className="panel__header">
        <div>
          <h2 className="panel__title">{title}</h2>
          {subtitle && <p className="panel__subtitle">{subtitle}</p>}
        </div>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close form">
          <Icon name="close" />
        </button>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {children}

        {!BACKEND_CONNECTED && (
          <div className="notice notice--muted">
            <Icon name="info" />
            <p>
              Saving is disabled because the backend is not connected. Fields
              will be finalized from the backend&apos;s API specification.
            </p>
          </div>
        )}

        <div className="form__actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={!BACKEND_CONNECTED}>
            {submitLabel}
          </button>
        </div>
      </form>
    </aside>
  )
}

export function FormField({ label, id, hint, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  )
}

export default FormPanel
