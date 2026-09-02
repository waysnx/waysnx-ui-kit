import type { Meta, StoryObj } from '@storybook/react';
import { LIBRARIES, LINKS, type LibraryInfo } from './libraries';
import './overview.css';

// Link a card to a verified, existing Storybook story ID (confirmed against
// Storybook's generated index.json). We never derive a route from a section
// name — sections are not Docs pages. Cards without a reliable destination
// (no stories) are left unlinked.
function cardHref(lib: LibraryInfo): string | null {
  return lib.storyId ? `./?path=/story/${lib.storyId}` : null;
}

function LibraryCard({ lib }: { lib: LibraryInfo }) {
  const href = cardHref(lib);
  return (
    <div className="wx-lp__card">
      <div className="wx-lp__card-head">
        <h3 className="wx-lp__card-name">{lib.name}</h3>
        <span
          className={`wx-lp__badge wx-lp__badge--${lib.kind}`}
          title={
            lib.kind === 'functional'
              ? 'Primarily schema / API / runtime functionality'
              : 'Ships visual Storybook components'
          }
        >
          {lib.kind === 'functional' ? 'Functional' : 'Visual'}
        </span>
      </div>
      <p className="wx-lp__npm">{lib.npm}</p>
      <p className="wx-lp__desc">{lib.description}</p>
      {lib.note ? <p className="wx-lp__note">{lib.note}</p> : null}
      <div className="wx-lp__card-foot">
        {lib.storyCount > 0 ? (
          href ? (
            <a href={href}>
              {lib.storyCount} Storybook stor{lib.storyCount === 1 ? 'y' : 'ies'} →
            </a>
          ) : (
            <span>
              {lib.storyCount} Storybook stor{lib.storyCount === 1 ? 'y' : 'ies'}
            </span>
          )
        ) : (
          <span>No standalone Storybook stories</span>
        )}
      </div>
    </div>
  );
}

function Libraries() {
  const visual = LIBRARIES.filter((l) => l.kind === 'visual').length;
  const functional = LIBRARIES.filter((l) => l.kind === 'functional').length;
  return (
    <div className="wx-lp">
      <h1 className="wx-lp__title" style={{ fontSize: 'clamp(24px,4vw,34px)' }}>
        Library Catalog
      </h1>
      <p className="wx-lp__subtitle">
        {LIBRARIES.length} focused libraries — {visual} provide visual
        components, {functional} are functional/non-visual. The aggregate
        package <code>@waysnx/ui-kit</code> bundles the primary libraries and is
        not counted here.
      </p>
      <div className="wx-lp__grid">
        {LIBRARIES.map((lib) => (
          <LibraryCard key={lib.npm} lib={lib} />
        ))}
      </div>
      <footer className="wx-lp__footer">
        Full API reference and prop tables:{' '}
        <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
          uikit.waysnx.tech
        </a>
        .
      </footer>
    </div>
  );
}

const meta = {
  title: 'WaysNX UI Kit/Libraries',
  component: Libraries,
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
} satisfies Meta<typeof Libraries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = { name: 'Catalog' };
