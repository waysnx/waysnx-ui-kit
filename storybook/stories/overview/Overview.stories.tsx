import type { Meta, StoryObj } from '@storybook/react';
import { LINKS } from './libraries';
import './overview.css';

/**
 * WaysNX UI Kit landing page — the first thing a developer sees. It explains
 * what the kit is, that it is 18 focused libraries, how to explore, and where
 * to find deeper documentation. This is a lightweight overview, not a mirror of
 * the WDG documentation site.
 */
function Overview() {
  return (
    <div className="wx-lp">
      <header className="wx-lp__hero">
        <p className="wx-lp__eyebrow">WaysNX UI Kit</p>
        <h1 className="wx-lp__title">
          18 focused libraries for building accessible, enterprise-ready React
          applications.
        </h1>
        <p className="wx-lp__subtitle">
          A production-oriented React + TypeScript component ecosystem. This
          Storybook is the interactive component workbench — explore components,
          tweak controls, and read live examples.
        </p>
        <div className="wx-lp__meta">
          <span className="wx-lp__chip">React + TypeScript</span>
          <span className="wx-lp__chip">18 focused libraries</span>
          <span className="wx-lp__chip">1 aggregate package · @waysnx/ui-kit</span>
          <span className="wx-lp__chip">Accessibility-first</span>
        </div>
        <div className="wx-lp__actions">
          <a className="wx-lp__btn wx-lp__btn--primary" href="./?path=/story/waysnx-ui-kit-libraries--catalog">
            Browse Libraries
          </a>
          <a className="wx-lp__btn" href="./?path=/story/components-button--primary">
            Explore Components
          </a>
          <a className="wx-lp__btn" href={LINKS.docs} target="_blank" rel="noopener noreferrer">
            Open Documentation
          </a>
          <a className="wx-lp__btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            View GitHub
          </a>
          <a className="wx-lp__btn" href={LINKS.npm} target="_blank" rel="noopener noreferrer">
            npm packages
          </a>
        </div>
      </header>

      <h2 className="wx-lp__section-title">How to explore</h2>
      <p className="wx-lp__section-sub">
        WaysNX UI Kit has three complementary development surfaces.
      </p>
      <div className="wx-lp__explore">
        <div className="wx-lp__explore-card">
          <h4>Demo</h4>
          <p>
            A complete reference application showing how the libraries compose
            into a real, working product.
          </p>
        </div>
        <div className="wx-lp__explore-card">
          <h4>Storybook <span aria-hidden>· you are here</span></h4>
          <p>
            Individual component and library development — exploration, controls
            and interactive examples.
          </p>
        </div>
        <div className="wx-lp__explore-card">
          <h4>Playwright</h4>
          <p>
            Browser-level validation of the actual Storybook and application
            behavior across Chromium, Firefox and WebKit.
          </p>
        </div>
      </div>

      <footer className="wx-lp__footer">
        Looking for the full API reference and prop tables?{' '}
        <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
          uikit.waysnx.tech
        </a>
        . Browse the{' '}
        <a href="./?path=/story/waysnx-ui-kit-libraries--catalog">library catalog</a>{' '}
        to see every library and where its components live.
      </footer>
    </div>
  );
}

const meta = {
  title: 'WaysNX UI Kit/Overview',
  component: Overview,
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview_: Story = { name: 'Overview' };
