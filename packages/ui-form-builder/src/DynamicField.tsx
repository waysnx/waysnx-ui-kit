import React from 'react';
import {
  Input,
  Currency,
  Select,
  Checkbox,
  Radio,
  Switch,
  Textarea,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  TimePicker,
  Autocomplete,
  FileUpload,
  Hidden,
  Tree,
  Link,
  HtmlEditor,
  HtmlContent,
  Button,
  Slider,
  SpeechToTextTextarea,
  IFrame,
  Image,
} from '@waysnx/ui-core';
import type { JSONSchemaProperty, FormFieldConfig } from './types';
import { FormArray } from './FormArray';

/**
 * Resolves a single JSON Schema property into a renderable form field config.
 */
export function resolveField(
  name: string,
  property: JSONSchemaProperty,
  value: any,
  onChange: (value: any) => void,
  required: boolean,
  disabled: boolean = false,
  fieldError?: string,
): FormFieldConfig {
  const label = property.title || name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
  const hint = property.description;
  const placeholder = property['x-placeholder'];
  const isDisabled = disabled || property.readOnly;

  // Accessibility props
  const fieldId = `wx-field-${name}`;
  const ariaDescribedByParts: string[] = [];
  if (hint) ariaDescribedByParts.push(`${fieldId}-hint`);
  if (property['x-error-message']) ariaDescribedByParts.push(`${fieldId}-error`);
  if (property['x-aria-described-by']) ariaDescribedByParts.push(property['x-aria-described-by']);
  const ariaDescribedBy = ariaDescribedByParts.length > 0 ? ariaDescribedByParts.join(' ') : undefined;
  const ariaLabel = property['x-aria-label'] || undefined;

  // Normalize undefined values to prevent uncontrolled component warnings
  let normalizedValue = value;
  if (value === undefined || value === null) {
    if (property.type === 'boolean') normalizedValue = false;
    else if (property.type === 'number' || property.type === 'integer') normalizedValue = '';
    else if (property.type === 'array') normalizedValue = [];
    else normalizedValue = '';
  }

  const validation = {
    minLength: property.minLength,
    maxLength: property.maxLength,
    min: property.minimum,
    max: property.maximum,
    pattern: property.pattern,
  };

  // Common validation props to pass to Input components
  const inputValidationProps: Record<string, any> = {};
  if (property.minLength !== undefined) inputValidationProps.minLength = property.minLength;
  if (property.maxLength !== undefined) inputValidationProps.maxLength = property.maxLength;
  if (property.minimum !== undefined) inputValidationProps.min = property.minimum;
  if (property.maximum !== undefined) inputValidationProps.max = property.maximum;
  if (property.pattern) inputValidationProps.pattern = property.pattern;
  if (property['x-error-message']) inputValidationProps.errorMessage = property['x-error-message'];

  let component: React.ReactElement;
  let useFormFieldLabel = true;
  const customComponent = property['x-component'];

  // --- Custom x-component overrides ---
  if (customComponent === 'hidden') {
    component = <Hidden name={name} />;
    useFormFieldLabel = false;
  }
  else if (customComponent === 'button') {
    component = (
      <Button type={property['x-button-type'] || 'button'} variant={property['x-button-variant'] || 'primary'}
        onClick={() => console.log(property['x-button-action'] || `${name} clicked`)} disabled={isDisabled}>
        {label}
      </Button>
    );
    useFormFieldLabel = false;
  }
  else if (customComponent === 'tree') {
    component = <Tree data={property['x-data'] || []} onChange={onChange} />;
  }
  else if (customComponent === 'link') {
    component = <Link label={label} href={property['x-href'] || normalizedValue || undefined} target={property['x-target'] || undefined} disabled={isDisabled} />;
    useFormFieldLabel = false;
  }
  else if (customComponent === 'html-editor' || customComponent === 'htmlEditor') {
    component = <HtmlEditor ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />;
  }
  else if (customComponent === 'html-content') {
    component = <HtmlContent content={normalizedValue || property['x-value'] || property.default || ''} />;
    useFormFieldLabel = false;
  }
  else if (customComponent === 'iframe') {
    component = (
      <IFrame
        src={property['x-src'] || ''}
        title={property['x-title'] || label}
        label={label}
        height={property['x-height'] || 400}
        sandbox={property['x-sandbox']}
        hint={hint}
      />
    );
    useFormFieldLabel = false;
  }
  else if (customComponent === 'image') {
    component = (
      <Image
        src={property['x-src'] || normalizedValue || ''}
        alt={property['x-alt'] || label}
        caption={property['x-caption']}
        fit={property['x-fit']}
        rounded={property['x-rounded']}
        width={property['x-width']}
        height={property['x-height']}
      />
    );
    useFormFieldLabel = false;
  }
  else if (customComponent === 'speech-to-text-textarea' || customComponent === 'speechToTextTextarea') {
    component = <SpeechToTextTextarea aria-label={ariaLabel || label} aria-describedby={ariaDescribedBy} required={required} maxLength={property.maxLength} rows={property['x-rows']} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} error={fieldError} />;
  }
  else if (customComponent === 'date-range-picker' || customComponent === 'dateRange') {
    const dateRange = normalizedValue || [null, null];
    component = (
      <DateRangePicker ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} startDate={dateRange[0]} endDate={dateRange[1]} dateFormat={property['x-date-format']} onChange={onChange} disabled={isDisabled} />
    );
  }
  else if (customComponent === 'autocomplete') {
    const options = property['x-data'] || [];
    component = (
      <Autocomplete ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} options={options} value={normalizedValue} onChange={onChange} placeholder={placeholder} error={fieldError}
        fetchOptions={property['x-xref-url'] ? undefined : undefined} xrefUrl={property['x-xref-url']}
        xrefIdProp={property['x-xref-id-prop']} xrefDisplayProp={property['x-xref-display-prop']} disabled={isDisabled} />
    );
  }
  else if (customComponent === 'slider') {
    component = <Slider value={value || property.minimum || 0} onChange={onChange} min={property.minimum} max={property.maximum} hint={hint} ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} />;
  }
  // --- Enum -> Select / Radio / MultiSelect ---
  else if (property.enum) {
    const labels = property['x-enum-labels'];
    const options = property.enum.map((val, i) => ({ label: labels?.[i] || val, value: val }));

    if (customComponent === 'multiselect') {
      component = <Select options={options} multiple showSelectAll searchable={!!property['x-searchable']} required={required} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />;
    } else if (customComponent === 'select') {
      // Explicit select component
      component = <Select options={options} searchable={!!property['x-searchable']} required={required} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />;
    } else if (customComponent === 'radio') {
      // Explicit radio
      component = <Radio name={name} options={options} columns={property['x-columns']} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} ariaDescribedBy={ariaDescribedBy} />;
    } else {
      component = <Select options={options} searchable={!!property['x-searchable']} required={required} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />;
    }
  }
  // --- Boolean -> Switch / Checkbox ---
  else if (property.type === 'boolean') {
    if (customComponent === 'checkbox') {
      component = <Checkbox label={label} checked={normalizedValue} onChange={(checked) => onChange(checked)} disabled={isDisabled} />;
      useFormFieldLabel = false;
    } else {
      component = <Switch label={label} checked={normalizedValue} onChange={(e) => onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)} disabled={isDisabled} />;
      useFormFieldLabel = false;
    }
  }
  // --- String with format ---
  else if (property.type === 'string') {
    if (property.format === 'date') {
      const minDate = property['x-show-past-dates'] === false ? new Date() : undefined;
      const maxDate = property['x-show-future-dates'] === false ? new Date() : undefined;
      component = <DatePicker ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} value={normalizedValue} placeholder={placeholder} dateFormat={property['x-date-format']} minDate={minDate} maxDate={maxDate} onChange={onChange} disabled={isDisabled} />;
    } else if (property.format === 'date-time') {
      const minDate = property['x-show-past-dates'] === false ? new Date() : undefined;
      const maxDate = property['x-show-future-dates'] === false ? new Date() : undefined;
      component = <DateTimePicker ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} value={normalizedValue} placeholder={placeholder} dateFormat={property['x-date-format']} minDate={minDate} maxDate={maxDate} onChange={onChange} disabled={isDisabled} />;
    } else if (property.format === 'time') {
      component = <TimePicker ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} value={normalizedValue} placeholder={placeholder} timeFormat={property['x-time-format']} onChange={onChange} disabled={isDisabled} />;
    } else if (property.format === 'email') {
      component = <Input name={name} type="email" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    } else if (property.format === 'uri' || property.format === 'url') {
      component = <Input name={name} type="url" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    } else if (property.format === 'tel') {
      component = <Input name={name} type="tel" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} mask={property['x-mask']} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    } else if (property.format === 'password') {
      component = <Input name={name} type="password" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    } else if (property.format === 'html' || property.contentMediaType === 'text/html') {
      component = <HtmlEditor ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />;
    } else if (property.format === 'binary' || property.contentMediaType?.startsWith('image/') || property.contentMediaType?.startsWith('application/')) {
      component = (
        <FileUpload ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} accept={property['x-accept']}
          maxSize={property['x-file-size'] ? property['x-file-size'] * 1024 * 1024 : undefined}
          format={property['x-file-format'] as 'blob' | 'binary'} showPreview={property['x-show-file-preview']}
          autoUpload={property['x-skip-file-upload-btn'] !== undefined ? !property['x-skip-file-upload-btn'] : undefined}
          browseButtonText={property['x-browse-button-text']} showLastModified={property['x-show-last-modified']}
          onChange={onChange} disabled={isDisabled} />
      );
    } else if (property.maxLength && property.maxLength > 200) {
      component = <Textarea ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} required={required} error={fieldError} maxLength={property.maxLength} rows={property['x-rows']} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    } else {
      component = <Input name={name} ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    }
  }
  // --- Number / Integer ---
  else if (property.type === 'number' || property.type === 'integer') {
    if (property['x-currency-symbol']) {
      component = (
        <Currency ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} currencySymbol={property['x-currency-symbol']}
          currencySymbolPosition={property['x-currency-position'] || 'start'} precision={property['x-precision'] || 2}
          thousandSeparator={property['x-thousand-separator'] || ','} decimalSeparator={property['x-decimal-separator'] || '.'}
          hint={hint} required={required} error={fieldError} value={normalizedValue} onChange={onChange} placeholder={placeholder} disabled={isDisabled} />
      );
    } else if (property['x-mask']) {
      component = (
        <Input name={name} type="number" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} mask={property['x-mask']}
          thousandSeparator={property['x-thousand-separator'] || ','} decimalSeparator={property['x-decimal-separator'] || '.'}
          decimalScale={property['x-decimal-scale'] || 2} hint={hint} required={required} {...inputValidationProps}
          value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />
      );
    } else if (property.minimum !== undefined && property.maximum !== undefined && customComponent === 'slider') {
      component = <Slider value={value || property.minimum} onChange={onChange} min={property.minimum} max={property.maximum} hint={hint} ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} />;
    } else {
      component = <Input name={name} type="number" ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
    }
  }
  // --- Array ---
  else if (property.type === 'array') {
    if (property.items?.type === 'object' && property.items?.properties) {
      component = (
        <FormArray label={label} itemSchema={{ type: 'object', properties: property.items.properties,
            required: Array.isArray(property.items.required) ? property.items.required : undefined }}
          value={normalizedValue} onChange={onChange} canAdd={property['x-can-add']} canDelete={property['x-can-delete']}
          addButtonTitle={property['x-add-button-title']} deleteButtonTitle={property['x-delete-button-title']}
          minItems={property['x-min-items']} maxItems={property['x-max-items']} disabled={isDisabled} />
      );
      useFormFieldLabel = false;
    }
    else if ((customComponent === 'checkbox-group' || customComponent === 'checkbox') && property.items?.enum) {
      const labels = property['x-enum-labels'];
      const selectedValues = value || [];
      component = (
        <Checkbox label={label} groupLabel={label} ariaDescribedBy={ariaDescribedBy} options={property.items.enum.map((opt: string, i: number) => ({ label: labels?.[i] || opt, value: opt }))}
          columns={property['x-columns']} error={fieldError} value={selectedValues} onChange={(checked: boolean | (string | number)[]) => onChange(checked)} disabled={isDisabled} />
      );
      useFormFieldLabel = false;
    } else if (customComponent === 'multiselect' && property.items?.enum) {
      const labels = property['x-enum-labels'] || property.items['x-enum-labels'];
      component = (
        <Select options={property.items.enum.map((val, i) => ({ label: labels?.[i] || val, value: val }))}
          multiple showSelectAll searchable={!!property['x-searchable']} required={required} error={fieldError} value={normalizedValue} onChange={onChange} disabled={isDisabled} />
      );
    } else if (property['x-accept'] || property.items?.format === 'binary') {
      component = (
        <FileUpload ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} error={fieldError} multiple accept={property['x-accept']}
          maxSize={property['x-file-size'] ? property['x-file-size'] * 1024 * 1024 : undefined}
          showPreview={property['x-show-file-preview']} showLastModified={property['x-show-last-modified']}
          autoUpload={property['x-skip-file-upload-btn'] !== undefined ? !property['x-skip-file-upload-btn'] : undefined}
          browseButtonText={property['x-browse-button-text']} onChange={onChange} disabled={isDisabled} />
      );
    } else {
      const options = property['x-data'] || [];
      component = <Autocomplete ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} options={options} value={normalizedValue} onChange={onChange} error={fieldError} disabled={isDisabled} />;
    }
  }
  // --- Default ---
  else {
    component = <Input name={name} ariaLabel={ariaLabel || label} ariaDescribedBy={ariaDescribedBy} hint={hint} required={required} {...inputValidationProps} value={normalizedValue} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={isDisabled} />;
  }

  return { name, label, component, required, useFormFieldLabel, validation };
}
