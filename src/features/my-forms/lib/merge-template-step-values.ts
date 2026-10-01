import type { FormSchema, FormStep } from '@/features/constructor-form/model/schema/form-schema';
import { isInputField } from '@/features/constructor-form/model/schema/form-schema';
import { getInitialValues } from '@/features/constructor-form/model/engines/validation-engine';
export function mergeTemplateStepValues(
  template: FormSchema,
  dataByStepId: Record<string, unknown>,
): Record<string, unknown> {
  const allFields = template.steps.flatMap((step) => step.fields);
  const values = getInitialValues(allFields);
  for (const step of template.steps) {
    const stepData = dataByStepId[step.id];
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      Object.assign(values, stepData as Record<string, unknown>);
    }
  }
  return values;
}
export function findStepByFieldName(template: FormSchema, fieldName: string): FormStep | undefined {
  return template.steps.find((step) =>
    step.fields.some((field) => isInputField(field) && field.name === fieldName),
  );
}
export function pickStepFieldValues(
  step: FormStep,
  mergedValues: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of step.fields) {
    if (!isInputField(field)) continue;
    if (mergedValues[field.name] !== undefined) {
      out[field.name] = mergedValues[field.name];
    }
  }
  return out;
}
