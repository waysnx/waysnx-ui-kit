import * as fs from 'fs';
import * as path from 'path';

/**
 * Test result data structure
 */
export interface TestResultData {
  component: string;
  story: string;
  tests: {
    name: string;
    passed: boolean;
    duration: number;
    error?: string;
  }[];
  timestamp: string;
  browser: string;
  totalDuration: number;
  passedCount: number;
  failedCount: number;
}

/**
 * Generate test results summary
 */
export interface TestSummary {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalDuration: number;
  browsers: string[];
  components: {
    name: string;
    passed: number;
    failed: number;
    total: number;
  }[];
  timestamp: string;
}

/**
 * Parse Playwright JSON report and generate summary
 */
export function parsePlaywrightReport(reportPath: string): TestSummary {
  try {
    const reportContent = fs.readFileSync(reportPath, 'utf-8');
    const report = JSON.parse(reportContent);

    const summary: TestSummary = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      totalDuration: 0,
      browsers: [],
      components: [],
      timestamp: new Date().toISOString(),
    };

    const componentMap = new Map<
      string,
      { passed: number; failed: number; total: number }
    >();
    const browserSet = new Set<string>();

    // Process test results
    if (report.suites) {
      report.suites.forEach((suite: any) => {
        processSuite(suite, summary, componentMap, browserSet);
      });
    }

    // Convert component map to array
    summary.components = Array.from(componentMap.entries()).map(([name, stats]) => ({
      name,
      ...stats,
    }));

    summary.browsers = Array.from(browserSet);

    return summary;
  } catch (error) {
    console.error('Error parsing Playwright report:', error);
    return {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      totalDuration: 0,
      browsers: [],
      components: [],
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Process test suite recursively
 */
function processSuite(
  suite: any,
  summary: TestSummary,
  componentMap: Map<string, { passed: number; failed: number; total: number }>,
  browserSet: Set<string>
): void {
  if (suite.tests) {
    suite.tests.forEach((test: any) => {
      summary.totalTests++;
      summary.totalDuration += test.duration || 0;

      const componentName = suite.title || 'Unknown';
      if (!componentMap.has(componentName)) {
        componentMap.set(componentName, { passed: 0, failed: 0, total: 0 });
      }

      const stats = componentMap.get(componentName)!;
      stats.total++;

      if (test.status === 'passed') {
        summary.passedTests++;
        stats.passed++;
      } else {
        summary.failedTests++;
        stats.failed++;
      }

      // Extract browser from test title or results
      if (test.results) {
        test.results.forEach((result: any) => {
          if (result.workerIndex !== undefined) {
            browserSet.add(`Browser ${result.workerIndex}`);
          }
        });
      }
    });
  }

  if (suite.suites) {
    suite.suites.forEach((childSuite: any) => {
      processSuite(childSuite, summary, componentMap, browserSet);
    });
  }
}

/**
 * Generate HTML report for test results
 */
export function generateHtmlReport(summary: TestSummary): string {
  const passRate = summary.totalTests > 0 
    ? ((summary.passedTests / summary.totalTests) * 100).toFixed(1)
    : 0;

  const componentRows = summary.components
    .map(
      (comp) => `
    <tr>
      <td>${comp.name}</td>
      <td>${comp.total}</td>
      <td style="color: green;">${comp.passed}</td>
      <td style="color: red;">${comp.failed}</td>
      <td>${((comp.passed / comp.total) * 100).toFixed(1)}%</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Component Test Results</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    .summary-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card.passed {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    }
    .summary-card.failed {
      background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
    }
    .summary-card h3 {
      margin: 0 0 10px 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .summary-card .value {
      font-size: 32px;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th {
      background-color: #f0f0f0;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    tr:hover {
      background-color: #f9f9f9;
    }
    .timestamp {
      color: #999;
      font-size: 12px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✅ Component Test Results</h1>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Tests</h3>
        <div class="value">${summary.totalTests}</div>
      </div>
      <div class="summary-card passed">
        <h3>Passed</h3>
        <div class="value">${summary.passedTests}</div>
      </div>
      <div class="summary-card failed">
        <h3>Failed</h3>
        <div class="value">${summary.failedTests}</div>
      </div>
      <div class="summary-card">
        <h3>Pass Rate</h3>
        <div class="value">${passRate}%</div>
      </div>
    </div>

    <h2>Component Results</h2>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Total Tests</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Pass Rate</th>
        </tr>
      </thead>
      <tbody>
        ${componentRows}
      </tbody>
    </table>

    <div class="timestamp">
      Generated: ${new Date(summary.timestamp).toLocaleString()}
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Save test results to JSON file
 */
export function saveTestResults(results: TestResultData[], outputPath: string): void {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
}

/**
 * Load test results from JSON file
 */
export function loadTestResults(filePath: string): TestResultData[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading test results:', error);
    return [];
  }
}
