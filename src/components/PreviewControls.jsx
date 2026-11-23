import Icon from './Icon'

// Lets the reviewer switch between the sample-data preview and the
// empty state the page will show before real data exists.
export function PreviewToggle({ mode, onChange }) {
  const options = [
    { value: 'sample', label: 'Sample data' },
    { value: 'empty', label: 'Empty state' },
  ]
  return (
    <div className="segmented" role="group" aria-label="Preview mode">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="segmented__option"
          aria-pressed={mode === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function SampleDataBanner() {
  return (
    <div className="notice notice--gold">
      <Icon name="info" />
      <p>
        <strong>Sample data for visual preview only.</strong> These records are
        not from the backend, and field names may change once the real API
        specification is available.
      </p>
    </div>
  )
}
