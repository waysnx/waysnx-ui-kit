import { useState } from 'react';
import type { RoutePlannerProps, RouteStop } from '../../types';

const DEFAULT_STOPS: RouteStop[] = [
  { id: '1', address: { formatted: 'New York, NY, USA' }, order: 0 },
  { id: '2', address: { formatted: 'Hartford, CT, USA' }, order: 1 },
  { id: '3', address: { formatted: 'Providence, RI, USA' }, order: 2 },
  { id: '4', address: { formatted: 'Boston, MA, USA' }, order: 3 },
];

export function RoutePlanner({ stops: initialStops, showGetDirections = true, onCalculate, className = '' }: RoutePlannerProps) {
  const [stops, _setStops] = useState<RouteStop[]>(initialStops || DEFAULT_STOPS);
  const [calculated, setCalculated] = useState(false);

  const handleGetDirections = () => {
    setCalculated(true);
    onCalculate?.([{ distance: '306.5 km', duration: '3 hr 36 min', distanceMeters: 306500, durationSeconds: 12960 }]);
  };

  return (
    <div className={`wx-adv-route-planner ${className}`}>
      <div className="wx-adv-route-planner__stops">
        {stops.map((stop, i) => (
          <div key={stop.id}>
            <div className="wx-adv-route-planner__stop">
              <div className={`wx-adv-route-planner__stop-dot ${i === 0 ? 'wx-adv-route-planner__stop-dot--start' : ''}`} />
              <span style={{ fontSize: 13 }}>{stop.address.formatted}</span>
            </div>
            {i < stops.length - 1 && <div className="wx-adv-route-planner__stop-line" />}
          </div>
        ))}
      </div>

      {calculated && (
        <div className="wx-adv-route-planner__summary">
          <div>
            <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>Total Distance</div>
            <div style={{ fontWeight: 600 }}>306.5 km</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>Est. Duration</div>
            <div style={{ fontWeight: 600 }}>3 hr 36 min</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)' }}>Via I-95 N</div>
        </div>
      )}

      {showGetDirections && (
        <button className="wx-adv-route-planner__btn" onClick={handleGetDirections} type="button">
          ➤ Get Directions
        </button>
      )}
    </div>
  );
}
