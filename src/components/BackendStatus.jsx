import { BACKEND_CONNECTED, BACKEND_STATUS } from '../config/backend'

function BackendStatus() {
  const connected = BACKEND_CONNECTED
  return (
    <div
      className={`backend-status ${connected ? 'is-connected' : 'is-disconnected'}`}
      role="status"
      title={connected ? 'Connected to the library backend' : BACKEND_STATUS.detail}
    >
      <span className="backend-status__dot" aria-hidden="true" />
      <span>{connected ? 'Backend connected' : BACKEND_STATUS.label}</span>
    </div>
  )
}

export default BackendStatus
