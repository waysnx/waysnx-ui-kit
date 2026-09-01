import { useState } from 'react';
import type { DistanceCalculatorProps, TransportMode } from '../../types';

const MODES: { mode: TransportMode; icon: string; label: string }[] = [
  { mode: 'driving', icon: '🚗', label: 'Drive' },
  { mode: 'transit', icon: '🚌', label: 'Transit' },
  { mode: 'walking', icon: '🚶', label: 'Walk' },
  { mode: 'cycling', icon: '🚲', label: 'Cycle' },
];

export function DistanceCalculator({ from, to, mode = 'driving', onCalculate, onFromChange, onToChange, onModeChange, className = '' }: DistanceCalculatorProps) {
  const [fromVal, setFromVal] = useState(from?.formatted || '');
  const [toVal, setToVal] = useState(to?.formatted || '');
  const [activeMode, setActiveMode] = useState<TransportMode>(mode);
  const [result, setResult] = useState<{ distance: string; duration: string } | null>(null);

  const handleCalculate = () => {
    // UI shell — real routing via MapsAdapter
    setResult({ distance: '306.5 km', duration: '3 hr 36 min' });
    onCalculate?.({ distance: '306.5 km', duration: '3 hr 36 min', distanceMeters: 306500, durationSeconds: 12960 });
  };

  const handleModeChange = (m: TransportMode) => {
    setActiveMode(m);
    onModeChange?.(m);
  };

  return (
    <div className={`wx-adv-distance ${className}`}>
      <div className="wx-adv-distance__fields">
        <div className="wx-adv-distance__field">
          <span className="wx-adv-distance__field-label">From</span>
          <input value={fromVal} onChange={(e) => { setFromVal(e.target.value); onFromChange?.({ formatted: e.target.value }); }} placeholder="New York, NY, USA" aria-label="From address" />
        </div>
        <div className="wx-adv-distance__field">
          <span className="wx-adv-distance__field-label">To</span>
          <input value={toVal} onChange={(e) => { setToVal(e.target.value); onToChange?.({ formatted: e.target.value }); }} placeholder="Boston, MA, USA" aria-label="To address" />
        </div>
      </div>

      <div className="wx-adv-distance__modes">
        {MODES.map(({ mode: m, icon, label }) => (
          <button key={m} className={`wx-adv-distance__mode-btn ${activeMode === m ? 'wx-adv-distance__mode-btn--active' : ''}`} onClick={() => handleModeChange(m)} title={label} type="button" aria-label={label}>
            {icon}
          </button>
        ))}
      </div>

      {result && (
        <div className="wx-adv-distance__result">
          <div className="wx-adv-distance__result-item">
            <span className="wx-adv-distance__result-value">{result.distance}</span>
            <span className="wx-adv-distance__result-label">Distance</span>
          </div>
          <div className="wx-adv-distance__result-item">
            <span className="wx-adv-distance__result-value">{result.duration}</span>
            <span className="wx-adv-distance__result-label">Est. Duration</span>
          </div>
        </div>
      )}

      <button className="wx-adv-route-planner__btn" onClick={handleCalculate} type="button">Calculate</button>
    </div>
  );
}
