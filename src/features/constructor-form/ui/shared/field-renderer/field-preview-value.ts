import type { Field } from '../../../model/schema/form-schema';
import { isInputField } from '../../../model/schema/form-schema';
export function getFieldPreviewValue(field: Field): unknown {
  if (!isInputField(field)) return undefined;
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }
  switch (field.type) {
    case 'checkbox':
      return [];
    case 'switch':
      return false;
    case 'slider':
      return field.validation?.min ?? 50;
    case 'number':
      return '';
    default:
      return '';
  }
}
