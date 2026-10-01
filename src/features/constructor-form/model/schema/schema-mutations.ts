import { nanoid } from 'nanoid';
import type {
  CrossFieldRule,
  Field,
  FormSchema,
  FormSettings,
  FormStep,
  LogicRule,
} from './form-schema';
function touchSchema(schema: FormSchema): FormSchema {
  return {
    ...schema,
    version: schema.version + 1,
    metadata: {
      ...schema.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
}
export function updateSchemaMetadata(
  schema: FormSchema,
  patch: Partial<FormSchema['metadata']>,
): FormSchema {
  return touchSchema({
    ...schema,
    metadata: { ...schema.metadata, ...patch },
  });
}
export function updateSchemaSettings(schema: FormSchema, patch: Partial<FormSettings>): FormSchema {
  return touchSchema({
    ...schema,
    settings: { ...schema.settings, ...patch },
  });
}
export function addStep(schema: FormSchema): FormSchema {
  const order = schema.steps.length + 1;
  const step: FormStep = {
    id: `step_${nanoid(8)}`,
    title: `Шаг ${order}`,
    description: '',
    order,
    isSkippable: false,
    allowBack: true,
    layout: { columns: 12, gap: 16 },
    fields: [],
  };
  return touchSchema({
    ...schema,
    steps: [...schema.steps, step],
  });
}
export function removeStep(schema: FormSchema, stepId: string): FormSchema {
  const steps = schema.steps
    .filter((step) => step.id !== stepId)
    .map((step, index) => ({ ...step, order: index + 1 }));
  return touchSchema({ ...schema, steps });
}
export function updateStep(
  schema: FormSchema,
  stepId: string,
  patch: Partial<FormStep>,
): FormSchema {
  return touchSchema({
    ...schema,
    steps: schema.steps.map((step) => (step.id === stepId ? { ...step, ...patch } : step)),
  });
}
export function reorderSteps(schema: FormSchema, fromIndex: number, toIndex: number): FormSchema {
  const steps = [...schema.steps];
  const [moved] = steps.splice(fromIndex, 1);
  steps.splice(toIndex, 0, moved);
  return touchSchema({
    ...schema,
    steps: steps.map((step, index) => ({ ...step, order: index + 1 })),
  });
}
export function addFieldToStep(
  schema: FormSchema,
  stepId: string,
  field: Field,
  index?: number,
): FormSchema {
  return touchSchema({
    ...schema,
    steps: schema.steps.map((step) => {
      if (step.id !== stepId) return step;
      const fields = [...step.fields];
      const insertAt = index ?? fields.length;
      fields.splice(insertAt, 0, field);
      return { ...step, fields };
    }),
  });
}
export function removeField(schema: FormSchema, stepId: string, fieldId: string): FormSchema {
  return touchSchema({
    ...schema,
    steps: schema.steps.map((step) =>
      step.id === stepId
        ? { ...step, fields: step.fields.filter((field) => field.id !== fieldId) }
        : step,
    ),
  });
}
export function updateField(
  schema: FormSchema,
  stepId: string,
  fieldId: string,
  patch: Partial<Field>,
): FormSchema {
  return touchSchema({
    ...schema,
    steps: schema.steps.map((step) =>
      step.id === stepId
        ? {
            ...step,
            fields: step.fields.map((field) =>
              field.id === fieldId ? ({ ...field, ...patch } as Field) : field,
            ),
          }
        : step,
    ),
  });
}
export function moveField(
  schema: FormSchema,
  fromStepId: string,
  toStepId: string,
  fieldId: string,
  toIndex: number,
): FormSchema {
  let movedField: Field | undefined;
  const withoutField = schema.steps.map((step) => {
    if (step.id !== fromStepId) return step;
    const field = step.fields.find((item) => item.id === fieldId);
    if (field) movedField = field;
    return { ...step, fields: step.fields.filter((item) => item.id !== fieldId) };
  });
  if (!movedField) return schema;
  const withField = withoutField.map((step) => {
    if (step.id !== toStepId) return step;
    const fields = [...step.fields];
    fields.splice(toIndex, 0, movedField as Field);
    return { ...step, fields };
  });
  return touchSchema({ ...schema, steps: withField });
}
export function reorderFieldInStep(
  schema: FormSchema,
  stepId: string,
  fromIndex: number,
  toIndex: number,
): FormSchema {
  return touchSchema({
    ...schema,
    steps: schema.steps.map((step) => {
      if (step.id !== stepId) return step;
      const fields = [...step.fields];
      const [moved] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, moved);
      return { ...step, fields };
    }),
  });
}
export function setCrossFieldRules(schema: FormSchema, rules: CrossFieldRule[]): FormSchema {
  return touchSchema({ ...schema, crossFieldRules: rules });
}
export function addCrossFieldRule(schema: FormSchema): FormSchema {
  const firstInput = schema.steps
    .flatMap((step) => step.fields)
    .find((field) => field.type !== 'divider');
  const rule: CrossFieldRule = {
    id: `rule_${nanoid(8)}`,
    when: firstInput
      ? [{ fieldId: firstInput.id, operator: 'isNotEmpty' }]
      : [{ fieldId: '', operator: 'isEmpty' }],
    message: 'Правило не выполнено',
  };
  return touchSchema({
    ...schema,
    crossFieldRules: [...(schema.crossFieldRules ?? []), rule],
  });
}
export function updateFieldLogic(
  schema: FormSchema,
  stepId: string,
  fieldId: string,
  logic: LogicRule[],
): FormSchema {
  return updateField(schema, stepId, fieldId, { logic } as Partial<Field>);
}
export function getSortedSteps(schema: FormSchema): FormStep[] {
  return [...schema.steps].sort((a, b) => a.order - b.order);
}
export function findFieldLocation(
  schema: FormSchema,
  fieldId: string,
): {
  stepId: string;
  index: number;
} | null {
  for (const step of schema.steps) {
    const index = step.fields.findIndex((field) => field.id === fieldId);
    if (index >= 0) return { stepId: step.id, index };
  }
  return null;
}
export function getAllInputFields(schema: FormSchema): Field[] {
  return schema.steps.flatMap((step) => step.fields);
}
