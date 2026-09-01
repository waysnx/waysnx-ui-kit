import React, { useState } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';
import { AccessibilityCenterProps } from '../../types';
import type { AccessibilitySettings } from '../../types';
import { FloatingButton } from '../FloatingButton/FloatingButton';
import { useTranslation } from '@waysnx/ui-i18n';
import './AccessibilityCenter.css';

/**
 * AccessibilityCenter Component
 * The main UI for accessibility settings
 */
export const AccessibilityCenter = React.forwardRef<HTMLDivElement, AccessibilityCenterProps>(
  (
    {
      position = 'bottom-right',
      variant = 'floating-button',
      showProfile = true,
      showAccessibilityScore = false,
      showQuickActions = true,
      showSettings = true,
      className,
      style,
      onSettingsChange,
      onProfileChange,
      customProfiles,
    },
    ref
  ) => {
    const {
      settings,
      currentProfile,
      profiles,
      updateSetting,
      applyProfile,
      resetToDefaults,
    } = useAccessibility();

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'profiles' | 'settings' | 'score'>('profiles');

    // Helper to resolve translation with fallback
    const label = (key: string, fallback: string) => {
      const resolved = t(key as any);
      return resolved && !resolved.includes('.') ? resolved : fallback;
    };

    // Filter profiles (presets + custom)
    const availableProfiles = customProfiles ? [...profiles, ...customProfiles] : profiles;

    const handleProfileChange = (profileId: string) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (profile) {
        applyProfile(profile);
        onProfileChange?.(profile);
      }
    };

    const handleSettingChange = (key: string, value: string | boolean) => {
      updateSetting(key as keyof AccessibilitySettings, value as AccessibilitySettings[keyof AccessibilitySettings]);
      onSettingsChange?.(settings);
    };

    // Build tabs based on visible sections
    const tabs: { id: 'profiles' | 'settings' | 'score'; label: string }[] = [];
    if (showProfile || showQuickActions) {
      tabs.push({ id: 'profiles', label: 'Profiles' });
    }
    if (showSettings) {
      tabs.push({ id: 'settings', label: 'Settings' });
    }
    if (showAccessibilityScore) {
      tabs.push({ id: 'score', label: 'Score' });
    }

    const renderContent = () => (
      <div className="wx-accessibility-center-content">
        {/* Tab Navigation */}
        {tabs.length > 1 && (
          <div className="wx-a11y-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`wx-a11y-tab ${activeTab === tab.id ? 'wx-a11y-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Profiles & Quick Actions Tab */}
        {activeTab === 'profiles' && (showProfile || showQuickActions) && (
          <div className="wx-a11y-tab-content" role="tabpanel">
            {showProfile && (
              <div className="wx-a11y-section">
                <h3 className="wx-a11y-section-subtitle">Current Profile</h3>
                <div className="wx-profile-display">
                  <span className="wx-profile-name">
                    {currentProfile?.name || 'Default'}
                  </span>
                </div>
              </div>
            )}

            {showQuickActions && (
              <div className="wx-a11y-section">
                <div className="wx-quick-actions wx-quick-actions-grid">
                  <button
                    className="wx-quick-action-btn"
                    onClick={() => resetToDefaults()}
                    aria-label="Reset all accessibility settings"
                  >
                    Reset All
                  </button>
                  {availableProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      className={`wx-quick-action-btn ${
                        currentProfile?.id === profile.id ? 'wx-active' : ''
                      }`}
                      onClick={() => handleProfileChange(profile.id)}
                      aria-label={`Apply ${profile.name} profile`}
                      aria-pressed={currentProfile?.id === profile.id}
                    >
                      {profile.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && showSettings && (
          <div className="wx-a11y-tab-content" role="tabpanel">
            <div className="wx-settings-panel">
              {/* Text Size */}
              <div className="wx-setting">
                <label htmlFor="text-size">{label('accessibility.setting.textSize', 'Text Size')}</label>
                <select
                  id="text-size"
                  value={settings.textSize}
                  onChange={(e) => handleSettingChange('textSize', e.target.value)}
                  className="wx-select"
                >
                  <option value="normal">{label('accessibility.option.normal', 'Normal')}</option>
                  <option value="large">{label('accessibility.option.large', 'Large')}</option>
                  <option value="x-large">{label('accessibility.option.xLarge', 'X-Large')}</option>
                  <option value="xx-large">{label('accessibility.option.xxLarge', 'XX-Large')}</option>
                </select>
              </div>

              {/* Contrast */}
              <div className="wx-setting">
                <label htmlFor="contrast">{label('accessibility.setting.contrast', 'Contrast')}</label>
                <select
                  id="contrast"
                  value={settings.contrast}
                  onChange={(e) => handleSettingChange('contrast', e.target.value)}
                  className="wx-select"
                >
                  <option value="normal">{label('accessibility.option.normal', 'Normal')}</option>
                  <option value="high">{label('accessibility.option.high', 'High')}</option>
                  <option value="yellow-black">{label('accessibility.option.yellowBlack', 'Yellow on Black')}</option>
                </select>
              </div>

              {/* Focus Mode */}
              <div className="wx-setting">
                <label htmlFor="focus-mode">{label('accessibility.setting.focusMode', 'Focus Mode')}</label>
                <select
                  id="focus-mode"
                  value={settings.focusMode}
                  onChange={(e) => handleSettingChange('focusMode', e.target.value)}
                  className="wx-select"
                >
                  <option value="standard">{label('accessibility.option.standard', 'Standard')}</option>
                  <option value="high-visibility">{label('accessibility.option.highVisibility', 'High Visibility')}</option>
                  <option value="box-outline">{label('accessibility.option.boxOutline', 'Box Outline')}</option>
                </select>
              </div>

              {/* Font */}
              <div className="wx-setting">
                <label htmlFor="font">{label('accessibility.setting.font', 'Font')}</label>
                <select
                  id="font"
                  value={settings.font}
                  onChange={(e) => handleSettingChange('font', e.target.value)}
                  className="wx-select"
                >
                  <option value="default">{label('accessibility.option.default', 'Default')}</option>
                  <option value="dyslexia-friendly">{label('accessibility.option.dyslexiaFriendly', 'Dyslexia Friendly')}</option>
                </select>
              </div>

              {/* Text Spacing */}
              <div className="wx-setting">
                <label htmlFor="text-spacing">{label('accessibility.setting.textSpacing', 'Text Spacing')}</label>
                <select
                  id="text-spacing"
                  value={settings.textSpacing}
                  onChange={(e) => handleSettingChange('textSpacing', e.target.value)}
                  className="wx-select"
                >
                  <option value="normal">{label('accessibility.option.normal', 'Normal')}</option>
                  <option value="loose">{label('accessibility.option.loose', 'Loose')}</option>
                  <option value="extra-loose">{label('accessibility.option.extraLoose', 'Extra Loose')}</option>
                </select>
              </div>

              {/* Toggle Options — inline row */}
              <div className="wx-settings-checkboxes">
                <label className="wx-setting-checkbox">
                  <input
                    id="reduced-motion"
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                  />
                  {label('accessibility.setting.reducedMotion', 'Reduce Motion')}
                </label>

                <label className="wx-setting-checkbox">
                  <input
                    id="reading-guide"
                    type="checkbox"
                    checked={settings.readingGuide}
                    onChange={(e) => handleSettingChange('readingGuide', e.target.checked)}
                  />
                  {label('accessibility.setting.readingGuide', 'Reading Guide')}
                </label>

                <label className="wx-setting-checkbox">
                  <input
                    id="highlight-links"
                    type="checkbox"
                    checked={settings.highlightLinks}
                    onChange={(e) => handleSettingChange('highlightLinks', e.target.checked)}
                  />
                  {label('accessibility.setting.highlightLinks', 'Highlight Links')}
                </label>

                <label className="wx-setting-checkbox">
                  <input
                    id="magnifier"
                    type="checkbox"
                    checked={settings.magnifier}
                    onChange={(e) => handleSettingChange('magnifier', e.target.checked)}
                  />
                  Magnifier
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Score Tab */}
        {activeTab === 'score' && showAccessibilityScore && (
          <div className="wx-a11y-tab-content" role="tabpanel">
            <div className="wx-score">
              <div className="wx-score-circle">92%</div>
              <p>Setting updated</p>
            </div>
          </div>
        )}
      </div>
    );

    if (variant === 'floating-button') {
      return (
        <div ref={ref} className={`wx-accessibility-center ${className || ''}`} style={style}>
          <FloatingButton
            position={position}
            onClick={() => setIsOpen(!isOpen)}
            ariaLabel="Toggle accessibility settings"
          />
          {isOpen && (
            <div className={`wx-accessibility-panel wx-position-${position}`}>
              {renderContent()}
            </div>
          )}
        </div>
      );
    }

    if (variant === 'panel') {
      return (
        <div
          ref={ref}
          className={`wx-accessibility-center wx-accessibility-panel-always-visible ${className || ''}`}
          style={style}
        >
          {renderContent()}
        </div>
      );
    }

    if (variant === 'drawer') {
      return (
        <div ref={ref} className={`wx-accessibility-center ${className || ''}`} style={style}>
          <FloatingButton
            position={position}
            onClick={() => setIsOpen(!isOpen)}
            ariaLabel="Toggle accessibility settings"
          />
          {isOpen && (
            <>
              <div
                className="wx-accessibility-drawer-backdrop"
                onClick={() => setIsOpen(false)}
              />
              <div className={`wx-accessibility-drawer wx-position-${position}`}>
                {renderContent()}
              </div>
            </>
          )}
        </div>
      );
    }

    if (variant === 'modal') {
      return (
        <div ref={ref} className={`wx-accessibility-center ${className || ''}`} style={style}>
          <FloatingButton
            position={position}
            onClick={() => setIsOpen(!isOpen)}
            ariaLabel="Toggle accessibility settings"
          />
          {isOpen && (
            <>
              <div
                className="wx-accessibility-modal-backdrop"
                onClick={() => setIsOpen(false)}
              />
              <div className="wx-accessibility-modal" role="dialog" aria-modal="true">
                <div className="wx-accessibility-modal-header">
                  <h2>Accessibility Settings</h2>
                  <button
                    className="wx-accessibility-modal-close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close accessibility settings"
                  >
                    ✕
                  </button>
                </div>
                <div className="wx-accessibility-modal-body">{renderContent()}</div>
              </div>
            </>
          )}
        </div>
      );
    }

    return null;
  }
);

AccessibilityCenter.displayName = 'AccessibilityCenter';
