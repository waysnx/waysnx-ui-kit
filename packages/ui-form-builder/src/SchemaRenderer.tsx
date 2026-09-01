import type { JSONSchema, FormFieldConfig } from './types';
import { resolveField } from './DynamicField';
import { shouldShowField, shouldDisableField, shouldRequireField } from './conditionalLogic';

/**
 * Converts a JSON Schema into an array of renderable form field configs.
 * Each field config contains the resolved React component from @waysnx/ui-core.
 * Supports conditional logic via x-show-when, x-disable-when, x-required-when.
 */
export function schemaToFormFields(
  schema: JSONSchema,
  formData: Record<string, any> = {},
  onChange: (name: string, value: any) => void = () => {},
): FormFieldConfig[] {
  const fields: FormFieldConfig[] = [];
  const requiredFields = schema.required || [];

  Object.entries(schema.properties).forEach(([name, property]) => {
    // Evaluate conditional logic
    const isVisible = shouldShowField(property['x-show-when'], formData);
    const isDisabled = shouldDisableField(property['x-disable-when'], formData);
    const baseRequired = requiredFields.includes(name);
    const required = shouldRequireField(property['x-required-when'], formData, baseRequired);

    // Skip hidden fields
    if (!isVisible) {
      return;
    }

    const value = formData[name];

    const field = resolveField(
      name,
      property,
      value,
      (val) => onChange(name, val),
      required,
      isDisabled,
    );

    fields.push(field);
  });

  return fields;
}
