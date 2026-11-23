import Icon from './Icon'

function SearchInput({ value, onChange, placeholder, label }) {
  return (
    <label className="search">
      <span className="visually-hidden">{label}</span>
      <Icon name="search" className="search__icon" />
      <input
        type="search"
        className="search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

export default SearchInput
