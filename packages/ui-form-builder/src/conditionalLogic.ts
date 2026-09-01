import type { ControlCondition } from './types';

/**
 * Safely evaluates a condition without using eval() or new Function().
 * Returns true if the condition is met.
 */
export function evaluateCondition(
  condition: ControlCondition,
  fieldValue: any,
): boolean {
  const { value: expectedValue, operator = '==' } = condition;

  // Handle undefined/null field values
  if (fieldValue === undefined || fieldValue === null) {
    if (operator === 'isEmpty') return true;
    if (operator === 'notEmpty') return false;
    
    // For boolean comparisons, treat undefined/null as false
    if (typeof expectedValue === 'boolean') {
      fieldValue = false;
    } else {
      return false;
    }
  }

  // Handle special operators
  if (operator === 'notEmpty') {
    if (Array.isArray(fieldValue)) {
      return fieldValue.length > 0;
    }
    return !!fieldValue;
  }

  if (operator === 'isEmpty') {
    if (Array.isArray(fieldValue)) {
      return fieldValue.length === 0;
    }
    return !fieldValue;
  }

  // Handle array expected values (value IN array)
  if (Array.isArray(expectedValue)) {
    const stringValue = String(fieldValue);
    const found = expectedValue.includes(stringValue) || expectedValue.includes(fieldValue);
    return operator === '!=' ? !found : found;
  }

  // Handle array field values (array contains value)
  if (Array.isArray(fieldValue)) {
    return fieldValue.includes(expectedValue);
  }

  // Handle comparison operators
  switch (operator) {
    case '==':
      return fieldValue == expectedValue;
    case '!=':
      return fieldValue != expectedValue;
    case '>':
      return Number(fieldValue) > Number(expectedValue);
    case '<':
      return Number(fieldValue) < Number(expectedValue);
    case '>=':
      return Number(fieldValue) >= Number(expectedValue);
    case '<=':
      return Number(fieldValue) <= Number(expectedValue);
    default:
      return fieldValue == expectedValue;
  }
}

/**
 * Evaluates multiple conditions.
 * Returns true if ANY condition is met (OR logic).
 */
export function evaluateConditions(
  conditions: ControlCondition[],
  formData: Record<string, any>,
): boolean {
  if (!conditions || conditions.length === 0) return false;

  return conditions.some((condition) => {
    const fieldValue = formData[condition.name];
    return evaluateCondition(condition, fieldValue);
  });
}

/**
 * Determines if a field should be visible based on x-show-when conditions.
 * Field is hidden if ANY condition is NOT met.
 */
export function shouldShowField(
  conditions: ControlCondition[] | undefined,
  formData: Record<string, any>,
): boolean {
  if (!conditions || conditions.length === 0) return true;

  // Field is visible only if ALL conditions are met
  return conditions.every((condition) => {
    const fieldValue = formData[condition.name];
    return evaluateCondition(condition, fieldValue);
  });
}

/**
 * Determines if a field should be disabled based on x-disable-when conditions.
 * Field is disabled if ANY condition is met.
 */
export function shouldDisableField(
  conditions: ControlCondition[] | undefined,
  formData: Record<string, any>,
): boolean {
  if (!conditions || conditions.length === 0) return false;

  // Field is disabled if ANY condition is met
  return evaluateConditions(conditions, formData);
}

/**
 * Determines if a field should be required based on x-required-when conditions.
 * Field is required if ANY condition is met.
 */
export function shouldRequireField(
  conditions: ControlCondition[] | undefined,
  formData: Record<string, any>,
  originalRequired: boolean,
): boolean {
  if (!conditions || conditions.length === 0) return originalRequired;

  // Field is required if ANY condition is met
  return evaluateConditions(conditions, formData);
}
