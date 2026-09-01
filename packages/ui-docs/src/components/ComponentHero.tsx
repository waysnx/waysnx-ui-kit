/**
 * Component Hero Section
 * Displays component name, description, and metadata.
 */

import React from 'react';
import type { Component } from '../types/documentation';
import { getAccessibilityBadge, getComponentIconFallback } from '../utils/componentUtils';

export interface ComponentHeroProps {
  component: Component;
  className?: string;
}

export const ComponentHero: React.FC<ComponentHeroProps> = ({
  component,
  className = '',
}) => {
  const wcag = component.accessibility?.wcagLevel;

  const wcagBg =
    wcag === 'AAA' ? 'var(--wx-color-success-light)' :
    wcag === 'AA'  ? '#ecfdf5' :
    '#fef9c3';

  const wcagColor =
    wcag === 'AAA' ? 'var(--wx-color-success)' :
    wcag === 'AA'  ? '#065f46' :
    '#92400e';

  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(135deg, var(--wx-color-surface-alt) 0%, var(--wx-color-surface) 100%)',
        padding: '3rem 2rem',
        borderRadius: 'var(--wx-radius-lg)',
        border: '1px solid var(--wx-color-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        {/* Icon */}
        <div
          style={{
            flexShrink: 0,
            width: '64px',
            height: '64px',
            borderRadius: 'var(--wx-radius-md)',
            background: 'var(--wx-color-primary)',
            color: 'var(--wx-color-primary-contrast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
          }}
        >
          {component.icon || getComponentIconFallback(component.name)}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'var(--wx-font-size-xl)', fontWeight: 700, margin: 0, color: 'var(--wx-color-text)' }}>
              {component.name}
            </h1>
            {component.isDeprecated && (
              <span style={{
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: 'var(--wx-font-size-xs)',
                fontWeight: 600,
                background: 'var(--wx-color-error-light)',
                color: 'var(--wx-color-error)',
              }}>
                Deprecated
              </span>
            )}
            {component.status && component.status !== 'stable' && (
              <span style={{
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: 'var(--wx-font-size-xs)',
                fontWeight: 600,
                background: 'var(--wx-color-primary-light)',
                color: 'var(--wx-color-primary)',
              }}>
                {component.status}
              </span>
            )}
          </div>

          <p style={{ fontSize: 'var(--wx-font-size-md)', color: 'var(--wx-color-text-muted)', marginBottom: '1rem', margin: '0 0 1rem' }}>
            {component.description}
          </p>

          {component.isDeprecated && component.deprecationMessage && (
            <div style={{
              borderLeft: '4px solid var(--wx-color-error)',
              paddingLeft: '1rem',
              marginBottom: '1rem',
              color: 'var(--wx-color-error)',
              fontSize: 'var(--wx-font-size-sm)',
            }}>
              <strong>Deprecated:</strong> {component.deprecationMessage}
            </div>
          )}

          {/* Metadata row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: 'var(--wx-font-size-sm)' }}>
            {component.category && (
              <div>
                <span style={{ color: 'var(--wx-color-text-muted)' }}>Category:</span>
                <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--wx-color-text)' }}>
                  {component.category}
                </span>
              </div>
            )}

            {wcag && (
              <div>
                <span style={{ color: 'var(--wx-color-text-muted)' }}>Accessibility:</span>
                <span style={{
                  marginLeft: '6px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: 'var(--wx-font-size-xs)',
                  fontWeight: 600,
                  background: wcagBg,
                  color: wcagColor,
                }}>
                  {getAccessibilityBadge(wcag)}
                </span>
              </div>
            )}

            {component.tags && component.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--wx-color-text-muted)' }}>Tags:</span>
                {component.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: 'var(--wx-font-size-xs)',
                      background: 'var(--wx-color-primary-light)',
                      color: 'var(--wx-color-primary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ComponentHero.displayName = 'ComponentHero';
