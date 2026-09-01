import React from 'react';
import testResults from './testResults.json';

interface TestBadgeProps {
  /** Component name key (matches spec file: "Button", "Visualization", "Accessibility", etc.) */
  componentName?: string;
  /** Manual override — passed count */
  passed?: number;
  /** Manual override — failed count */
  failed?: number;
  /** Manual override — total count */
  total?: number;
  /** Browsers to show */
  browsers?: string[];
}

export const TestBadge: React.FC<TestBadgeProps> = ({
  componentName,
  passed: passedOverride,
  failed: failedOverride,
  total: totalOverride,
  browsers = ['Chromium', 'Firefox', 'WebKit'],
}) => {
  // Try to get dynamic counts from parsed test results
  let passed = passedOverride ?? 0;
  let failed = failedOverride ?? 0;
  let total = totalOverride ?? 0;

  if (componentName) {
    // Case-insensitive lookup
    const key = Object.keys(testResults as Record<string, any>).find(
      (k) => k.toLowerCase() === componentName.toLowerCase()
    );
    if (key && (testResults as Record<string, any>)[key]) {
      const data = (testResults as Record<string, any>)[key];
      passed = passedOverride ?? data.passed ?? 0;
      failed = failedOverride ?? data.failed ?? 0;
      total = totalOverride ?? data.total ?? 0;
    }
  }

  // If no data at all, don't render
  if (total === 0 && !passedOverride && !totalOverride) {
    return null;
  }

  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const status = failed === 0 ? 'success' : 'warning';

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '16px',
        borderLeft: `4px solid ${status === 'success' ? '#28a745' : '#ffc107'}`,
      }}
    >
      <div>
        <strong>Playwright Tests</strong>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          {passed}/{total} passed ({passRate}%)
        </div>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
        {browsers.map((browser) => (
          <span
            key={browser}
            style={{
              padding: '4px 8px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            ✅ {browser}
          </span>
        ))}
      </div>
    </div>
  );
};
