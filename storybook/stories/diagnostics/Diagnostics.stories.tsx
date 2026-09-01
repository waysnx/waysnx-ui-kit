import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagnosticsProvider,
  DiagnosticsErrorBoundary,
  useCaptureError,
} from '@waysnx/ui-diagnostics/react';
import {
  createDiagnostics,
  createMemoryReporter,
  type DiagnosticEvent,
} from '@waysnx/ui-diagnostics';

/**
 * These stories demonstrate the user-observable behavior of the diagnostics
 * React integration: the provider supplying an instance to the tree, the error
 * boundary catching a render error and showing fallback UI, manual capture, and
 * boundary reset. Captured events are surfaced in the DOM so browser-level tests
 * can assert observable outcomes.
 *
 * A memory reporter is used so nothing leaves the browser during the demo.
 */

const meta = {
  title: 'Diagnostics/Diagnostics',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Child component that throws on demand to exercise the error boundary. */
function Crashy({ crash }: { crash: boolean }): React.ReactElement {
  if (crash) {
    throw new Error('Simulated render failure in Crashy');
  }
  return <div data-testid="child-ok">Child rendered successfully</div>;
}

/** Renders the list of captured events from a memory reporter. */
function CapturedList({
  events,
}: {
  events: ReadonlyArray<DiagnosticEvent>;
}): React.ReactElement {
  return (
    <div data-testid="captured" style={{ marginTop: 12 }}>
      <div>
        Captured events: <span data-testid="captured-count">{events.length}</span>
      </div>
      <ul>
        {events.map((e) => (
          <li key={e.id} data-testid="captured-item" data-category={e.category}>
            {e.category}: {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ManualCaptureButton(): React.ReactElement {
  const capture = useCaptureError();
  return (
    <button
      type="button"
      data-testid="manual-capture"
      onClick={() =>
        capture(new Error('Manual capture from button'), {
          category: 'COMPONENT',
          source: 'ManualCaptureButton',
        })
      }
    >
      Trigger manual capture
    </button>
  );
}

/**
 * Full interactive scenario. Playwright drives the buttons and reads the
 * rendered output. State is forced through React re-renders (useState) so the
 * behavior is deterministic across browsers.
 */
function DiagnosticsDemo(): React.ReactElement {
  // One reporter/instance per mount; memory reporter keeps events in the DOM.
  const reporterRef = React.useRef(createMemoryReporter());
  const diagnosticsRef = React.useRef(
    createDiagnostics({
      application: { name: 'Storybook Demo', environment: 'test' },
      reporter: reporterRef.current,
      // Deterministic in the demo: no sampling, no dedupe suppression.
      sampling: { rate: 1 },
      dedupe: { windowMs: 0 },
    }),
  );

  const [crash, setCrash] = React.useState(false);
  // Bump to force a re-render so the captured list reflects the reporter.
  const [, forceRender] = React.useState(0);
  const rerender = () => forceRender((n) => n + 1);

  return (
    <DiagnosticsProvider diagnostics={diagnosticsRef.current}>
      <div data-testid="diagnostics-demo" style={{ fontFamily: 'sans-serif' }}>
        <h3>Diagnostics Error Boundary Demo</h3>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            type="button"
            data-testid="trigger-crash"
            onClick={() => setCrash(true)}
          >
            Trigger render error
          </button>
          <ManualCaptureButton />
          <button type="button" data-testid="refresh" onClick={rerender}>
            Refresh captured list
          </button>
        </div>

        <DiagnosticsErrorBoundary
          component="CrashyDemo"
          category="RENDER"
          onError={() => {
            // Reflect the new capture in the visible list.
            rerender();
          }}
          fallback={(error, reset) => (
            <div data-testid="fallback" role="alert">
              <p data-testid="fallback-message">Something went wrong: {error.message}</p>
              <button
                type="button"
                data-testid="reset"
                onClick={() => {
                  setCrash(false);
                  reset();
                }}
              >
                Reset
              </button>
            </div>
          )}
        >
          <Crashy crash={crash} />
        </DiagnosticsErrorBoundary>

        <CapturedList events={reporterRef.current.events} />
      </div>
    </DiagnosticsProvider>
  );
}

/** Default interactive scenario used by Playwright. */
export const Default: Story = {
  render: () => <DiagnosticsDemo />,
};

/** Shows the healthy path: provider + child render, no errors captured. */
export const HealthyChild: Story = {
  render: () => {
    const diagnostics = createDiagnostics({
      application: { name: 'Storybook Demo', environment: 'test' },
      reporter: createMemoryReporter(),
    });
    return (
      <DiagnosticsProvider diagnostics={diagnostics}>
        <DiagnosticsErrorBoundary component="HealthyChild">
          <div data-testid="child-ok">Child rendered successfully</div>
        </DiagnosticsErrorBoundary>
      </DiagnosticsProvider>
    );
  },
};
