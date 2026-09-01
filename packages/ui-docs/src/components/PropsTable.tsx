/**
 * Props Table Component
 * Renders component props in a formatted table using --wx-* tokens.
 */

import React from 'react';
import type { ComponentProp } from '../types/documentation';
import { formatPropType, sortComponentProps } from '../utils/componentUtils';
import { renderDefaultValue, renderEnumValues } from '../utils/renderUtils';
import { useTranslation } from '@waysnx/ui-i18n';

export interface PropsTableProps {
  props: ComponentProp[];
  title?: string;
  showDeprecated?: boolean;
  className?: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({
  props,
  title,
  showDeprecated = false,
  className = '',
}) => {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t('docs.componentProps');

  if (!props || props.length === 0) {
    return (
      <div style={{
        padding: '1rem',
        background: 'var(--wx-color-surface-alt)',
        border: '1px solid var(--wx-color-border)',
        borderRadius: 'var(--wx-radius-md)',
        color: 'var(--wx-color-text-muted)',
        fontSize: 'var(--wx-font-size-sm)',
      }}>
        {t('docs.noProps')}
      </div>
    );
  }

  const filteredProps = showDeprecated ? props : props.filter((p) => !p.deprecated);
  const sortedProps = sortComponentProps(filteredProps);

  if (sortedProps.length === 0) {
    return (
      <div style={{
        padding: '1rem',
        background: 'var(--wx-color-surface-alt)',
        border: '1px solid var(--wx-color-border)',
        borderRadius: 'var(--wx-radius-md)',
        color: 'var(--wx-color-text-muted)',
        fontSize: 'var(--wx-font-size-sm)',
      }}>
        {t('docs.noProps')}
      </div>
    );
  }

  return (
    <div className={className}>
      {resolvedTitle && (
        <h3 style={{ fontSize: 'var(--wx-font-size-lg)', fontWeight: 600, marginBottom: '1rem', color: 'var(--wx-color-text)' }}>
          {resolvedTitle}
        </h3>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--wx-font-size-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--wx-color-surface-alt)', borderBottom: '2px solid var(--wx-color-border)' }}>
              {['Property', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontWeight: 600,
                  color: 'var(--wx-color-text)',
                  fontSize: 'var(--wx-font-size-sm)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedProps.map((prop, index) => (
              <tr
                key={`${prop.name}-${index}`}
                style={{
                  borderBottom: '1px solid var(--wx-color-border)',
                  background: index % 2 === 0 ? 'var(--wx-color-surface)' : 'var(--wx-color-surface-alt)',
                }}
              >
                {/* Name */}
                <td style={{ padding: '10px 14px', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <code style={{
                      background: 'var(--wx-color-surface-alt)',
                      border: '1px solid var(--wx-color-border)',
                      padding: '2px 6px',
                      borderRadius: 'var(--wx-radius-sm)',
                      fontFamily: 'monospace',
                      fontSize: 'var(--wx-font-size-xs)',
                      color: 'var(--wx-color-text)',
                    }}>
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: 'var(--wx-font-size-xs)',
                        fontWeight: 600,
                        background: 'var(--wx-color-error-light)',
                        color: 'var(--wx-color-error)',
                      }}>
                        Required
                      </span>
                    )}
                    {prop.deprecated && (
                      <span style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: 'var(--wx-font-size-xs)',
                        fontWeight: 600,
                        background: '#fef9c3',
                        color: '#92400e',
                        textDecoration: 'line-through',
                      }}>
                        Deprecated
                      </span>
                    )}
                  </div>
                </td>

                {/* Type */}
                <td style={{ padding: '10px 14px', verticalAlign: 'top' }}>
                  <code style={{
                    background: 'var(--wx-color-primary-light)',
                    padding: '2px 6px',
                    borderRadius: 'var(--wx-radius-sm)',
                    fontFamily: 'monospace',
                    fontSize: 'var(--wx-font-size-xs)',
                    color: 'var(--wx-color-primary)',
                  }}>
                    {formatPropType(prop.type)}
                  </code>
                  {prop.enum && prop.enum.length > 0 && (
                    <div style={{ fontSize: 'var(--wx-font-size-xs)', color: 'var(--wx-color-text-muted)', marginTop: '4px' }}>
                      {renderEnumValues(prop.enum)}
                    </div>
                  )}
                </td>

                {/* Default */}
                <td style={{ padding: '10px 14px', verticalAlign: 'top' }}>
                  {prop.defaultValue !== undefined ? (
                    <code style={{
                      background: 'var(--wx-color-success-light)',
                      padding: '2px 6px',
                      borderRadius: 'var(--wx-radius-sm)',
                      fontFamily: 'monospace',
                      fontSize: 'var(--wx-font-size-xs)',
                      color: 'var(--wx-color-success)',
                    }}>
                      {renderDefaultValue(prop.defaultValue)}
                    </code>
                  ) : (
                    <span style={{ color: 'var(--wx-color-text-muted)' }}>—</span>
                  )}
                </td>

                {/* Description */}
                <td style={{ padding: '10px 14px', verticalAlign: 'top', color: 'var(--wx-color-text)', lineHeight: 1.5 }}>
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PropsTable.displayName = 'PropsTable';
