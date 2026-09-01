/**
 * @file components/Legend/Legend.tsx
 * Legend component — explains colors and symbols used in the visualization.
 */

import { useTranslation } from '@waysnx/ui-i18n';

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  shape?: 'circle' | 'square';
}

export interface LegendProps {
  items: LegendItem[];
  title?: string;
  className?: string;
}

export function Legend({ items, title, className = '' }: LegendProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t('visualization.legend.title');

  return (
    <div
      className={`wx-vis-legend ${className}`}
      role="note"
      aria-label={resolvedTitle}
    >
      <div className="wx-vis-legend__title">{resolvedTitle}</div>
      <ul className="wx-vis-legend__items" role="list">
        {items.map((item) => (
          <li key={item.id} className="wx-vis-legend__item" role="listitem">
            <span
              className="wx-vis-legend__swatch"
              style={{
                backgroundColor: item.color,
                borderRadius: item.shape === 'square' ? '2px' : '50%',
              }}
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Legend;
