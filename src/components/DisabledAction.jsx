import { DISABLED_REASON } from '../config/backend'
import Icon from './Icon'

// A visible-but-inactive action. Uses aria-disabled (not `disabled`) so the
// tooltip still appears on hover and the button remains focusable.
function DisabledAction({ icon, label, reason = DISABLED_REASON, variant = 'ghost' }) {
  return (
    <button
      type="button"
      className={`btn btn--${variant} btn--sm`}
      aria-disabled="true"
      title={reason}
      onClick={(e) => e.preventDefault()}
    >
      {icon && <Icon name={icon} size={16} />}
      <span>{label}</span>
    </button>
  )
}

export default DisabledAction
