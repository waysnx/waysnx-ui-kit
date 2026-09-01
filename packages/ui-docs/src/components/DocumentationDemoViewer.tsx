/**
 * DocumentationDemoViewer
 * Renders demo categories and examples from component.demo.generated.json
 * Uses --wx-* tokens instead of Tailwind.
 */

import React, { useState, useMemo } from 'react';
import { DemoCategory, DemoExample, DocumentationDemoViewerProps } from '../types';
import { useTranslation } from '@waysnx/ui-i18n';

const DemoExampleCard: React.FC<{
  example: DemoExample;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ example, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    style={{
      width: '100%',
      textAlign: 'left',
      border: `1px solid ${isSelected ? 'var(--wx-color-primary)' : 'var(--wx-color-border)'}`,
      borderRadius: 'var(--wx-radius-md)',
      padding: '12px 14px',
      background: isSelected ? 'var(--wx-color-primary-light)' : 'var(--wx-color-surface)',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontWeight: 600, fontSize: 'var(--wx-font-size-sm)', color: isSelected ? 'var(--wx-color-primary)' : 'var(--wx-color-text)' }}>
        {example.name || example.title}
      </span>
      {example.source && (
        <span style={{
          fontSize: 'var(--wx-font-size-xs)',
          padding: '1px 6px',
          borderRadius: '4px',
          background: 'var(--wx-color-surface-alt)',
          color: 'var(--wx-color-text-muted)',
          border: '1px solid var(--wx-color-border)',
        }}>
          {example.source}
        </span>
      )}
    </div>
    {example.description && (
      <p style={{ fontSize: 'var(--wx-font-size-xs)', color: 'var(--wx-color-text-muted)', margin: 0 }}>
        {example.description}
      </p>
    )}
    {example.confidence !== undefined && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: 'var(--wx-font-size-xs)', color: 'var(--wx-color-text-muted)' }}>
        <span>Confidence:</span>
        <div style={{ flex: 1, maxWidth: '120px', height: '4px', background: 'var(--wx-color-border)', borderRadius: '2px' }}>
          <div style={{ width: `${example.confidence}%`, height: '4px', background: 'var(--wx-color-success)', borderRadius: '2px' }} />
        </div>
        <span>{Math.round(example.confidence)}%</span>
      </div>
    )}
  </button>
);

const CodeDisplay: React.FC<{ code: string; language?: string }> = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#1e1e2e', borderRadius: 'var(--wx-radius-md)', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px',
        background: '#181825',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <span style={{ fontSize: 'var(--wx-font-size-xs)', color: '#94a3b8' }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: 'var(--wx-font-size-xs)',
            padding: '3px 10px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '4px',
            color: '#e2e8f0',
            cursor: 'pointer',
          }}
        >
          {copied ? t('docs.copied') : t('docs.copy')}
        </button>
      </div>
      <pre style={{ padding: '1rem', fontSize: 'var(--wx-font-size-sm)', color: '#e2e8f0', overflowX: 'auto', margin: 0, fontFamily: 'monospace' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const DocumentationDemoViewer: React.FC<DocumentationDemoViewerProps> = ({
  demos = [],
  selectedExample: initialSelectedExample,
  onExampleSelect,
  categoryTabs = true,
  showMetadata = true,
}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(demos[0]?.id || '');
  const [selectedExample, setSelectedExample] = useState<string | undefined>(initialSelectedExample);

  const currentCategory = useMemo(
    () => demos.find((cat) => cat.id === selectedCategory),
    [selectedCategory, demos]
  );

  const currentExample = useMemo(
    () => currentCategory?.examples.find((ex) => ex.id === selectedExample),
    [selectedCategory, selectedExample, currentCategory]
  );

  const handleExampleSelect = (exampleId: string) => {
    setSelectedExample(exampleId);
    onExampleSelect?.(exampleId);
  };

  if (!demos || demos.length === 0) {
    return (
      <div style={{
        border: '2px dashed var(--wx-color-border)',
        borderRadius: 'var(--wx-radius-lg)',
        padding: '3rem',
        textAlign: 'center',
        color: 'var(--wx-color-text-muted)',
        fontSize: 'var(--wx-font-size-sm)',
      }}>
        {t('docs.noDemos')}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category Tabs */}
      {categoryTabs && demos.length > 1 && (
        <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--wx-color-border)', overflowX: 'auto' }}>
          {demos.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '8px 16px',
                fontSize: 'var(--wx-font-size-sm)',
                fontWeight: 500,
                border: 'none',
                borderBottom: `2px solid ${selectedCategory === category.id ? 'var(--wx-color-primary)' : 'transparent'}`,
                marginBottom: '-2px',
                background: 'transparent',
                color: selectedCategory === category.id ? 'var(--wx-color-primary)' : 'var(--wx-color-text-muted)',
                cursor: 'pointer',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {category.name}
              {category.examples.length > 0 && (
                <span style={{
                  marginLeft: '6px',
                  fontSize: 'var(--wx-font-size-xs)',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  background: 'var(--wx-color-surface-alt)',
                  color: 'var(--wx-color-text-muted)',
                }}>
                  {category.examples.length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {currentCategory?.description && (
        <p style={{ fontSize: 'var(--wx-font-size-sm)', color: 'var(--wx-color-text-muted)', margin: 0 }}>
          {currentCategory.description}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Examples list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: 'var(--wx-font-size-sm)', fontWeight: 600, margin: '0 0 8px', color: 'var(--wx-color-text)' }}>
            Examples
          </h3>
          {currentCategory?.examples.map((example) => (
            <DemoExampleCard
              key={example.id}
              example={example}
              isSelected={selectedExample === example.id}
              onSelect={() => handleExampleSelect(example.id)}
            />
          ))}
        </div>

        {/* Example detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentExample ? (
            <>
              <div>
                <h3 style={{ fontSize: 'var(--wx-font-size-md)', fontWeight: 600, margin: '0 0 4px', color: 'var(--wx-color-text)' }}>
                  {currentExample.name || currentExample.title}
                </h3>
                {currentExample.description && (
                  <p style={{ fontSize: 'var(--wx-font-size-sm)', color: 'var(--wx-color-text-muted)', margin: 0 }}>
                    {currentExample.description}
                  </p>
                )}
              </div>

              {currentExample.props && Object.keys(currentExample.props).length > 0 && (
                <div style={{
                  border: '1px solid var(--wx-color-border)',
                  borderRadius: 'var(--wx-radius-md)',
                  padding: '1rem',
                  background: 'var(--wx-color-surface-alt)',
                }}>
                  <h4 style={{ fontSize: 'var(--wx-font-size-sm)', fontWeight: 600, margin: '0 0 8px', color: 'var(--wx-color-text)' }}>Props</h4>
                  <pre style={{ fontSize: 'var(--wx-font-size-xs)', color: 'var(--wx-color-text)', overflowX: 'auto', margin: 0, fontFamily: 'monospace' }}>
                    {JSON.stringify(currentExample.props, null, 2)}
                  </pre>
                </div>
              )}

              {currentExample.code && (
                <div>
                  <h4 style={{ fontSize: 'var(--wx-font-size-sm)', fontWeight: 600, margin: '0 0 8px', color: 'var(--wx-color-text)' }}>Code</h4>
                  <CodeDisplay code={currentExample.code} language={currentExample.language} />
                </div>
              )}

              {showMetadata && (currentExample.id || currentExample.source || currentExample.keywords?.length) && (
                <div style={{ borderTop: '1px solid var(--wx-color-border)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: 'var(--wx-font-size-sm)', fontWeight: 600, margin: '0 0 8px', color: 'var(--wx-color-text)' }}>Metadata</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--wx-font-size-xs)' }}>
                    {currentExample.source && (
                      <div>
                        <span style={{ color: 'var(--wx-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source: </span>
                        <span style={{ color: 'var(--wx-color-text)', textTransform: 'capitalize' }}>{currentExample.source}</span>
                      </div>
                    )}
                    {currentExample.confidence !== undefined && (
                      <div>
                        <span style={{ color: 'var(--wx-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence: </span>
                        <span style={{ color: 'var(--wx-color-text)' }}>{Math.round(currentExample.confidence)}%</span>
                      </div>
                    )}
                    {currentExample.keywords && currentExample.keywords.length > 0 && (
                      <div>
                        <div style={{ color: 'var(--wx-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Keywords:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {currentExample.keywords.map((kw: string, i: number) => (
                            <span key={i} style={{
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'var(--wx-color-primary-light)',
                              color: 'var(--wx-color-primary)',
                            }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--wx-color-text-muted)', fontSize: 'var(--wx-font-size-sm)' }}>
              {t('docs.selectExample')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
