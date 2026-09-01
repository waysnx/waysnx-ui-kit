import { useState } from 'react';
import type { GeofenceEditorProps, GeofenceZone } from '../../types';

export function GeofenceEditor({ zones: initialZones = [], onChange, height = 400, className = '' }: GeofenceEditorProps) {
  const [zones, setZones] = useState<GeofenceZone[]>(initialZones);

  const addZone = () => {
    const newZone: GeofenceZone = { id: `zone-${Date.now()}`, name: `Zone ${zones.length + 1}`, center: { lat: 40.7128, lng: -74.006 }, radius: 500, color: '#3b82f6' };
    const updated = [...zones, newZone];
    setZones(updated);
    onChange?.(updated);
  };

  const removeZone = (id: string) => {
    const updated = zones.filter(z => z.id !== id);
    setZones(updated);
    onChange?.(updated);
  };

  return (
    <div className={`wx-adv-card ${className}`} style={{ overflow: 'hidden' }}>
      <div className="wx-adv-map__container" style={{ height: (height as number) - 120, borderBottom: '1px solid var(--wx-adv-card-border)', flexDirection: 'column' }}>
        <div style={{ fontSize: 28 }}>🗺️</div>
        <div style={{ fontWeight: 500 }}>Geofence Editor</div>
        <div style={{ fontSize: 12 }}>Connect MapsAdapter to draw zones</div>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Zones ({zones.length})</span>
          <button onClick={addZone} style={{ padding: '4px 12px', background: 'var(--wx-color-primary)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }} type="button">+ Add Zone</button>
        </div>
        {zones.map(z => (
          <div key={z.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--wx-color-surface-alt)', borderRadius: 6, marginBottom: 4, fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: z.color, display: 'inline-block' }} />
              <span>{z.name}</span>
              <span style={{ fontSize: 11, color: 'var(--wx-color-text-muted)' }}>{z.radius}m radius</span>
            </div>
            <button onClick={() => removeZone(z.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--wx-color-error)', fontSize: 14 }} type="button" aria-label={`Remove ${z.name}`}>✕</button>
          </div>
        ))}
        {zones.length === 0 && <div style={{ fontSize: 12, color: 'var(--wx-color-text-muted)', textAlign: 'center', padding: 8 }}>No zones defined</div>}
      </div>
    </div>
  );
}
