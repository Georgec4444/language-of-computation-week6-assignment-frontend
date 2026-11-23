// Backend connection status — the single source of truth for the UI.
//
// This stays `false` until Asha's FastAPI backend is cloned, running in
// Docker, and its real openapi.json has been reviewed. No API endpoints
// are defined in the frontend yet, by design.

export const BACKEND_CONNECTED = false

export const BACKEND_STATUS = {
  label: 'Backend not connected',
  detail:
    'The FastAPI backend has not been connected yet. Data shown is static sample data for visual preview only, and saving is disabled.',
}

export const DISABLED_REASON = 'Available once the backend is connected'
