import { useState } from 'react';
import { DynamicForm } from '@waysnx/ui-form-builder';
import { Stepper } from '@waysnx/ui-layout';
import { Header } from '@waysnx/ui-navigation';
import type { BreadcrumbItem } from '@waysnx/ui-navigation';
import { useToast } from '@waysnx/ui-feedback';
import { useAppTranslation } from '../hooks/useAppTranslation';
import {
  personalInfoSchema, personalInfoLayout,
  employmentSchema, employmentLayout,
  contactSchema, contactLayout,
  additionalSchema, additionalLayout,
  applyLayoutTranslations,
} from '../data/onboarding';
import {
  personalInfoTranslations,
  employmentTranslations,
  contactTranslations,
  additionalTranslations,
} from '../i18n/formTranslations';

export function EmployeeOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formDataByStep, setFormDataByStep] = useState<Record<number, Record<string, unknown>>>({});
  const toast = useToast();
  const { t, locale } = useAppTranslation();

  const steps = [
    { label: t('onboarding.personal'), description: t('onboarding.personalDesc') },
    { label: t('onboarding.employment'), description: t('onboarding.employmentDesc') },
    { label: t('onboarding.contactAddress'), description: t('onboarding.contactAddressDesc') },
    { label: t('onboarding.additional'), description: t('onboarding.additionalDesc') },
    { label: t('onboarding.review'), description: t('onboarding.reviewDesc') },
  ];

  const layoutTranslations = {
    saveDraft: t('form.saveDraft'),
    next: t('form.next'),
    previous: t('form.previous'),
  };

  const stepConfigs = [
    {
      schema: personalInfoSchema,
      layout: applyLayoutTranslations(personalInfoLayout, { ...layoutTranslations, fieldGroup: t('onboarding.personalInfo') }),
      translations: personalInfoTranslations,
    },
    {
      schema: employmentSchema,
      layout: applyLayoutTranslations(employmentLayout, { ...layoutTranslations, fieldGroup: t('onboarding.employmentDetails') }),
      translations: employmentTranslations,
    },
    {
      schema: contactSchema,
      layout: applyLayoutTranslations(contactLayout, { ...layoutTranslations, fieldGroup: t('onboarding.contactAndAddress') }),
      translations: contactTranslations,
    },
    {
      schema: additionalSchema,
      layout: applyLayoutTranslations(additionalLayout, { ...layoutTranslations, fieldGroup: t('onboarding.additionalInfo') }),
      translations: additionalTranslations,
    },
  ];

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const handleSubmit = (data: Record<string, unknown>) => {
    // Filter to only keys defined in the current step's schema,
    // preventing the library from leaking fields from previous steps.
    const schemaKeys = new Set(Object.keys(stepConfigs[currentStep].schema.properties ?? {}));
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => schemaKeys.has(key))
    );
    const updatedData = { ...formDataByStep, [currentStep]: filteredData };
    setFormDataByStep(updatedData);
    if (currentStep < steps.length - 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBtnClick = (buttonName: string) => {
    if (buttonName === 'previous' && currentStep > 0) setCurrentStep(currentStep - 1);
    if (buttonName === 'saveDraft') toast.success(t('onboarding.draftSaved'));
    if (buttonName === 'submit') toast.success(t('onboarding.onboardingComplete'));
  };

  // Build a label map for each step — use Marathi translations when locale is 'mr',
  // otherwise fall back to the English titles from the schema.
  const translationsList = [personalInfoTranslations, employmentTranslations, contactTranslations, additionalTranslations];

  const schemaLabelMaps = stepConfigs.map(({ schema }, idx) =>
    Object.fromEntries(
      Object.entries(schema.properties ?? {}).map(([key, def]) => {
        const mrLabel = locale === 'mr' ? translationsList[idx][key]?.label : undefined;
        return [key, mrLabel ?? (def as { title?: string }).title ?? key];
      })
    )
  );

  const reviewSections = [
    { label: t('onboarding.personalInfo'), stepIndex: 0 },
    { label: t('onboarding.employmentDetails'), stepIndex: 1 },
    { label: t('onboarding.contactAndAddress'), stepIndex: 2 },
    { label: t('onboarding.additionalInfo'), stepIndex: 3 },
  ];

  const formatValue = (value: unknown): string => {
    if (value === undefined || value === null || value === '') return '—';
    if (value instanceof File) return value.name;
    if (Array.isArray(value)) return (value as string[]).join(', ');
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  const renderReviewStep = () => {
    return (
      <div className="dashboard-card">
        <h3 style={{ marginBottom: '8px', fontSize: 'calc(16px * var(--wx-accessibility-font-scale, 1))', fontWeight: 600 }}>{t('onboarding.reviewConfirm')}</h3>
        <p style={{ fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', marginBottom: '20px' }}>{t('onboarding.reviewMessage')}</p>

        {reviewSections.map(({ label, stepIndex }) => {
          const stepData = formDataByStep[stepIndex];
          const labelMap = schemaLabelMaps[stepIndex];
          const entries = stepData ? Object.entries(stepData).filter(([, v]) => v !== undefined && v !== null && v !== '') : [];
          return (
            <div key={stepIndex} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--wx-color-primary)', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--wx-color-border)' }}>
                {label}
              </div>
              {entries.length === 0 ? (
                <p style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', fontStyle: 'italic' }}>No data entered</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {entries.map(([key, value]) => (
                    <div key={key} style={{ padding: '8px 10px', background: 'var(--wx-color-surface-alt)', borderRadius: '6px' }}>
                      <div style={{ fontSize: 'calc(11px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)' }}>{labelMap[key] ?? key}</div>
                      <div style={{ fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500, marginTop: '2px' }}>{formatValue(value)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={() => setCurrentStep(currentStep - 1)} style={{ padding: '10px 20px', border: '1px solid var(--wx-color-border)', borderRadius: '6px', background: 'var(--wx-color-surface)', cursor: 'pointer', fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500 }}>
            {t('onboarding.previous')}
          </button>
          <button onClick={() => handleBtnClick('submit')} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', background: 'var(--wx-color-primary)', color: 'white', cursor: 'pointer', fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500 }}>
            {t('onboarding.submit')}
          </button>
        </div>
      </div>
    );
  };

  // Step progress colors
  const getStepColor = (idx: number) => {
    if (idx < currentStep) return '#22c55e'; // completed = green
    if (idx === currentStep) return 'var(--wx-color-primary)'; // active = blue
    return 'var(--wx-color-text-light)'; // pending = gray
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { id: 'home', label: t('common.home'), href: '/' },
    { id: 'forms', label: t('nav.forms'), href: '/onboarding' },
    { id: 'onboarding', label: t('onboarding.title') },
  ];

  return (
    <div>
      {/* Page Header */}
      <Header title={t('onboarding.title')} breadcrumbs={breadcrumbs} />

      {/* Stepper */}
      <div style={{ marginBottom: '24px' }}>
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="onboarding-wrapper">
        {/* Form area */}
        <div className="dashboard-card">
          {/* Section title with icon */}
          {currentStep < steps.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--wx-color-border)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--wx-color-primary-light)', color: 'var(--wx-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                {currentStep === 0 && '👤'}
                {currentStep === 1 && '💼'}
                {currentStep === 2 && '📍'}
                {currentStep === 3 && '📋'}
              </div>
              <h3 style={{ fontSize: 'calc(15px * var(--wx-accessibility-font-scale, 1))', fontWeight: 600 }}>{steps[currentStep].label}</h3>
            </div>
          )}

          {currentStep < steps.length - 1 ? (
            <DynamicForm
              schema={stepConfigs[currentStep].schema}
              formLayout={stepConfigs[currentStep].layout}
              formData={formDataByStep[currentStep] as Record<string, unknown> | undefined}
              onSubmit={handleSubmit}
              onBtnClick={handleBtnClick}
              showErrorSummary={false}
              translations={locale === 'mr' ? stepConfigs[currentStep].translations : undefined}
            />
          ) : (
            renderReviewStep()
          )}
        </div>

        {/* Progress sidebar */}
        <div className="onboarding-sidebar">
          <h3 style={{ fontSize: 'calc(14px * var(--wx-accessibility-font-scale, 1))', fontWeight: 600, marginBottom: '4px' }}>{t('onboarding.formProgress')}</h3>
          <div className="form-progress__bar">
            <div className="form-progress__fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', marginBottom: '16px' }}>
            {Math.round(progressPercent)}% {t('onboarding.completed')}
          </div>

          <ul className="form-progress__steps">
            {steps.map((step, idx) => (
              <li key={idx} className="form-progress__step" style={{ color: getStepColor(idx) }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: idx < currentStep ? '#22c55e' : idx === currentStep ? 'var(--wx-color-primary)' : 'var(--wx-color-border)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontWeight: idx === currentStep ? 600 : 400 }}>{step.label}</span>
              </li>
            ))}
          </ul>

          {/* Tips section */}
          <div style={{ marginTop: '24px', padding: '14px', background: 'var(--wx-color-surface-alt)', borderRadius: '8px', border: '1px solid var(--wx-color-border)' }}>
            <h4 style={{ fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 600, marginBottom: '10px' }}>{t('onboarding.tips')}</h4>
            <p style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', lineHeight: 1.6 }}>{t('onboarding.tip1')}</p>
            <p style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', lineHeight: 1.6, marginTop: '8px' }}>{t('onboarding.tip2')}</p>
            <p style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)', lineHeight: 1.6, marginTop: '8px' }}>{t('onboarding.tip3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
