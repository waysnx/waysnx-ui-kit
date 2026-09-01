import React, { useState, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';
import type { JSONSchema, JSONSchemaProperty } from './types';
import { resolveField } from './DynamicField';
import { shouldShowField, shouldDisableField, shouldRequireField } from './conditionalLogic';
import './FormArray.css';

export interface FormArrayProps {
  /** Display label for the array section */
  label?: string;
  /** JSON Schema for each item in the array */
  itemSchema: JSONSchema;
  /** Current array value */
  value?: Record<string, any>[];
  /** Called when array data changes */
  onChange?: (value: Record<string, any>[]) => void;
  /** Show add button (default: true) */
  canAdd?: boolean;
  /** Show delete buttons (default: true) */
  canDelete?: boolean;
  /** Custom add button text */
  addButtonTitle?: string;
  /** Custom delete button text */
  deleteButtonTitle?: string;
  /** Minimum number of items */
  minItems?: number;
  /** Maximum number of items */
  maxItems?: number;
  /** Read-only mode */
  disabled?: boolean;
  /** CSS class name */
  className?: string;
  /** Test ID for targeting the root element in tests */
  testId?: string;
}

function createEmptyItem(schema: JSONSchema): Record<string, any> {
  const item: Record<string, any> = {};
  Object.entries(schema.properties).forEach(([key, prop]) => {
    if (prop.default !== undefined) {
      item[key] = prop.default;
    } else if (prop.type === 'boolean') {
      item[key] = false;
    } else if (prop.type === 'number' || prop.type === 'integer') {
      item[key] = undefined;
    } else if (prop.type === 'array') {
      item[key] = [];
    } else {
      item[key] = '';
    }
  });
  return item;
}

export function FormArray({
  label,
  itemSchema,
  value = [],
  onChange,
  canAdd = true,
  canDelete = true,
  addButtonTitle = 'Add',
  deleteButtonTitle = 'Remove',
  minItems = 0,
  maxItems,
  disabled = false,
  className,
  testId,
}: FormArrayProps) {
  // Ensure minimum items on mount
  const items = value.length > 0 ? value : (minItems > 0 ? [createEmptyItem(itemSchema)] : []);

  const handleAdd = useCallback(() => {
    if (maxItems && items.length >= maxItems) return;
    const newItems = [...items, createEmptyItem(itemSchema)];
    onChange?.(newItems);
  }, [items, itemSchema, maxItems, onChange]);

  const handleRemove = useCallback((index: number) => {
    if (items.length <= minItems) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange?.(newItems);
  }, [items, minItems, onChange]);

  const handleItemChange = useCallback((index: number, fieldName: string, fieldValue: any) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [fieldName]: fieldValue } : item
    );
    onChange?.(newItems);
  }, [items, onChange]);

  const requiredFields = itemSchema.required || [];
  const canRemove = canDelete && items.length > minItems && !disabled;
  const canAddMore = canAdd && (!maxItems || items.length < maxItems) && !disabled;

  return (
    <div className={`wx-form-array ${className || ''}`} role="region" aria-label={label || "Form array"} data-testid={testId}>
      {label && (
        <div className="wx-form-array-label">{label}</div>
      )}

      {items.map((item, index) => (
        <fieldset key={index} className="wx-form-array-fieldset" aria-label={`${label || 'Item'} ${index + 1} of ${items.length}`}>
          <legend className="wx-form-array-legend">
            #{index + 1}
          </legend>

          <div className="wx-form-array-fields">
            {Object.entries(itemSchema.properties).map(([fieldName, property]) => {
              // Evaluate conditional logic for each field
              const isVisible = shouldShowField(property['x-show-when'], item);
              const isDisabled = shouldDisableField(property['x-disable-when'], item) || disabled;
              const baseRequired = requiredFields.includes(fieldName);
              const fieldRequired = shouldRequireField(property['x-required-when'], item, baseRequired);

              // Skip hidden fields
              if (!isVisible) {
                return null;
              }

              const field = resolveField(
                fieldName,
                property,
                item[fieldName],
                (val) => handleItemChange(index, fieldName, val),
                fieldRequired,
                isDisabled,
              );

              return (
                <div key={fieldName}>
                  {field.useFormFieldLabel && (
                    <label className="wx-form-array-field-label">
                      {field.label}
                      {field.required && <span className="wx-form-array-required" aria-label="required">*</span>}
                    </label>
                  )}
                  {field.component}
                </div>
              );
            })}
          </div>

          {canRemove && (
            <div className="wx-form-array-remove">
              <Button
                variant="destructive"
                type="button"
                onClick={() => handleRemove(index)}
                aria-label={`Remove ${label || 'item'} ${index + 1}`}
              >
                {deleteButtonTitle}
              </Button>
            </div>
          )}
        </fieldset>
      ))}

      {canAddMore && (
        <div className="wx-form-array-add">
          <Button
            variant="primary"
            type="button"
            onClick={handleAdd}
            aria-label={`Add new ${label || 'item'}`}
          >
            + {addButtonTitle}
          </Button>
        </div>
      )}

      {maxItems && (
        <div className="wx-form-array-count" aria-live="polite" aria-atomic="true">
          {items.length} / {maxItems} items
        </div>
      )}
    </div>
  );
}
