import type {
  Field,
  FormStep,
  InputField,
  OptionsValidation,
  TextValidation,
} from '../schema/form-schema';
import { isInputField } from '../schema/form-schema';
import type { FieldRuntimeState } from './logic-engine.types';
import type { FieldErrors } from './validation-engine.types';
export type { FieldErrors } from './validation-engine.types';
function textValidationMessage(
  validation: TextValidation | undefined,
  value: unknown,
  required: boolean,
): string | null {
  const str = typeof value === 'string' ? value : value == null ? '' : String(value);
  if (required && str.trim() === '') {
    return validation?.message ?? 'Обязательное поле';
  }
  if (!required && str.trim() === '') return null;
  if (validation?.minLength != null && str.length < validation.minLength) {
    return validation.message ?? `Минимум ${validation.minLength} символов`;
  }
  if (validation?.maxLength != null && str.length > validation.maxLength) {
    return validation.message ?? `Максимум ${validation.maxLength} символов`;
  }
  if (validation?.pattern) {
    try {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(str)) {
        return validation.message ?? 'Неверный формат';
      }
    } catch {
      return validation.message ?? 'Неверный формат';
    }
  }
  return null;
}
function numberValidationMessage(
  validation:
    | {
        min?: number;
        max?: number;
        message?: string;
      }
    | undefined,
  value: unknown,
  required: boolean,
): string | null {
  if (value == null || value === '') {
    return required ? (validation?.message ?? 'Обязательное поле') : null;
  }
  const num = Number(value);
  if (Number.isNaN(num)) return validation?.message ?? 'Введите число';
  if (validation?.min != null && num < validation.min) {
    return validation.message ?? `Минимум ${validation.min}`;
  }
  if (validation?.max != null && num > validation.max) {
    return validation.message ?? `Максимум ${validation.max}`;
  }
  return null;
}
function optionsValidationMessage(
  validation: OptionsValidation | undefined,
  value: unknown,
  required: boolean,
): string | null {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  if (required && selected.length === 0) {
    return validation?.message ?? 'Выберите значение';
  }
  if (validation?.minSelected != null && selected.length < validation.minSelected) {
    return validation.message ?? `Выберите минимум ${validation.minSelected}`;
  }
  if (validation?.maxSelected != null && selected.length > validation.maxSelected) {
    return validation.message ?? `Выберите максимум ${validation.maxSelected}`;
  }
  return null;
}
export function validateField(
  field: InputField,
  value: unknown,
  runtimeState?: FieldRuntimeState,
): string | null {
  if (runtimeState?.hidden) return null;
  const required = runtimeState?.required ?? !!field.required;
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
      return textValidationMessage(field.validation, value, required);
    case 'number':
    case 'slider':
      return numberValidationMessage(field.validation, value, required);
    case 'date':
    case 'time':
      if (required && (value == null || value === '')) {
        return field.validation?.message ?? 'Обязательное поле';
      }
      return null;
    case 'switch':
      return null;
    case 'file':
      if (
        required &&
        (value == null || value === '' || (Array.isArray(value) && value.length === 0))
      ) {
        return field.validation?.message ?? 'Загрузите файл';
      }
      return null;
    case 'select':
    case 'radio':
      return optionsValidationMessage(field.validation, value, required);
    case 'checkbox':
      return optionsValidationMessage(field.validation, value as string[], required);
    default:
      return null;
  }
}
export function validateStep(
  step: FormStep,
  values: Record<string, unknown>,
  fieldStates: Record<string, FieldRuntimeState>,
): FieldErrors {
  const errors: FieldErrors = {};
  step.fields.forEach((field) => {
    if (!isInputField(field)) return;
    const state = fieldStates[field.id];
    if (state?.hidden) return;
    const message = validateField(field, values[field.name], state);
    if (message) errors[field.name] = message;
  });
  return errors;
}
export function validateAllSteps(
  steps: FormStep[],
  values: Record<string, unknown>,
  fieldStates: Record<string, FieldRuntimeState>,
): FieldErrors {
  return steps.reduce<FieldErrors>(
    (acc, step) => ({ ...acc, ...validateStep(step, values, fieldStates) }),
    {},
  );
}
export function getInitialValues(fields: Field[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  fields.forEach((field) => {
    if (!isInputField(field)) return;
    if (field.defaultValue !== undefined) {
      values[field.name] = field.defaultValue;
      return;
    }
    if (field.type === 'checkbox') {
      values[field.name] = [];
    } else if (field.type === 'switch') {
      values[field.name] = false;
    } else if (field.type === 'number' || field.type === 'slider') {
      values[field.name] = '';
    } else {
      values[field.name] = '';
    }
  });
  return values;
}
