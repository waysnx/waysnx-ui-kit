import { useState } from 'react';
import type { AddressAutocompleteProps } from '../../types';

export function AddressAutocomplete({ value = '', onChange, onSelect, suggestions = [], onSearch, placeholder = 'Search address...', loading = false, className = '' }: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    onChange?.(v);
    onSearch?.(v);
  };

  return (
    <div className={`wx-adv-address-selector ${className}`}>
      <div className="wx-adv-address-selector__input">
        <span className="wx-adv-address-selector__icon">🔍</span>
        <input type="text" value={query} onChange={handleChange} placeholder={placeholder} aria-label="Address autocomplete" aria-expanded={suggestions.length > 0} aria-autocomplete="list" />
      </div>
      {suggestions.length > 0 && (
        <div className="wx-adv-address-selector__suggestions" role="listbox">
          {suggestions.map((s) => (
            <div key={s.id} className="wx-adv-address-selector__suggestion-item" onClick={() => { onSelect?.({ formatted: s.description }); setQuery(s.description); }} role="option" tabIndex={0}>
              <span className="wx-adv-address-selector__suggestion-icon">📍</span>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{s.mainText}</div>
                <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>{s.secondaryText}</div>
              </div>
            </div>
          ))}
          {loading && <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--wx-color-text-muted)' }}>Searching...</div>}
        </div>
      )}
    </div>
  );
}
