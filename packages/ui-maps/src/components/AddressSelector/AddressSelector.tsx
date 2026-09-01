import { useState } from 'react';
import type { AddressSelectorProps } from '../../types';

export function AddressSelector({
  value,
  onChange,
  suggestions = [],
  onSearch,
  placeholder = 'Search address...',
  showCurrentLocation = true,
  loading = false,
  className = '',
}: AddressSelectorProps) {
  const [query, setQuery] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    onSearch?.(v);
  };

  const handleSelect = (suggestion: typeof suggestions[0]) => {
    const address = { id: suggestion.id, formatted: suggestion.description };
    onChange?.(address);
    setQuery('');
  };

  return (
    <div className={`wx-adv-address-selector ${className}`}>
      <div className="wx-adv-address-selector__input">
        <span className="wx-adv-address-selector__icon">📍</span>
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder={placeholder}
          aria-label="Address search"
        />
      </div>

      {value && (
        <div className="wx-adv-address-selector__selected">
          <span className="wx-adv-address-selector__selected-check">✓</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{value.formatted}</div>
            {value.city && <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>{value.city}, {value.state} {value.postalCode}</div>}
          </div>
        </div>
      )}

      {query && suggestions.length > 0 && (
        <div className="wx-adv-address-selector__suggestions" role="listbox">
          {suggestions.map((s) => (
            <div key={s.id} className="wx-adv-address-selector__suggestion-item" onClick={() => handleSelect(s)} role="option" tabIndex={0}>
              <span className="wx-adv-address-selector__suggestion-icon">📍</span>
              <div>
                <div style={{ fontWeight: 500 }}>{s.mainText}</div>
                <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>{s.secondaryText}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>Searching...</div>}

      {showCurrentLocation && (
        <button className="wx-adv-address-selector__current-location" type="button">
          📍 Use my current location
        </button>
      )}
    </div>
  );
}
