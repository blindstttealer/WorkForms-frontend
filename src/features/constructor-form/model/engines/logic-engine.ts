import type {
  Field,
  FormSchema,
  LogicAction,
  LogicCondition,
  LogicOperator,
} from '../schema/form-schema';
import { isInputField } from '../schema/form-schema';
import type { FieldRuntimeState, LogicEvaluationResult } from './logic-engine.types';
export type { FieldRuntimeState, LogicEvaluationResult } from './logic-engine.types';
function defaultFieldState(field: Field): FieldRuntimeState {
  return {
    hidden: field.ui?.hidden ?? false,
    disabled: isInputField(field) ? !!field.ui?.disabled : false,
    required: isInputField(field) ? !!field.required : false,
  };
}
function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'boolean') return false;
  return false;
}
export function evaluateCondition(
  condition: LogicCondition,
  values: Record<string, unknown>,
  fieldsById: Map<string, Field>,
): boolean {
  const field = fieldsById.get(condition.fieldId);
  if (!field || !isInputField(field)) return false;
  const actual = values[field.name];
  const expected = condition.value;
  switch (condition.operator as LogicOperator) {
    case 'equals':
      return actual === expected;
    case 'notEquals':
      return actual !== expected;
    case 'contains':
      return (
        typeof actual === 'string' && typeof expected === 'string' && actual.includes(expected)
      );
    case 'includes':
      return Array.isArray(actual) && actual.includes(expected);
    case 'greaterThan':
      return Number(actual) > Number(expected);
    case 'greaterOrEqual':
      return Number(actual) >= Number(expected);
    case 'lessThan':
      return Number(actual) < Number(expected);
    case 'lessOrEqual':
      return Number(actual) <= Number(expected);
    case 'isEmpty':
      return isEmpty(actual);
    case 'isNotEmpty':
      return !isEmpty(actual);
    default:
      return false;
  }
}
function applyAction(
  state: FieldRuntimeState,
  action: LogicAction,
  values: Record<string, unknown>,
  valuePatches: Record<string, unknown>,
  fieldsById: Map<string, Field>,
): FieldRuntimeState {
  const next = { ...state };
  switch (action.type) {
    case 'show':
      next.hidden = false;
      break;
    case 'hide':
      next.hidden = true;
      break;
    case 'enable':
      next.disabled = false;
      break;
    case 'disable':
      next.disabled = true;
      break;
    case 'require':
      next.required = true;
      break;
    case 'optional':
      next.required = false;
      break;
    case 'setValue':
      if (action.targetId) {
        const target = fieldsById.get(action.targetId);
        if (target && isInputField(target)) {
          valuePatches[target.name] = action.value;
        }
      }
      break;
    case 'clearValue':
      if (action.targetId) {
        const target = fieldsById.get(action.targetId);
        if (target && isInputField(target)) {
          valuePatches[target.name] =
            target.type === 'checkbox' ? [] : target.type === 'switch' ? false : '';
        }
      }
      break;
    case 'goToStep':
      if (action.targetId) next.goToStepId = action.targetId;
      break;
    default:
      break;
  }
  return next;
}
export function buildFieldsMap(schema: FormSchema): Map<string, Field> {
  const map = new Map<string, Field>();
  schema.steps.forEach((step) => {
    step.fields.forEach((field) => map.set(field.id, field));
  });
  return map;
}
export function evaluateLogic(
  schema: FormSchema,
  values: Record<string, unknown>,
): LogicEvaluationResult {
  const fieldsById = buildFieldsMap(schema);
  const fieldStates: Record<string, FieldRuntimeState> = {};
  const valuePatches: Record<string, unknown> = {};
  schema.steps.forEach((step) => {
    step.fields.forEach((field) => {
      let state = defaultFieldState(field);
      if (isInputField(field) && field.logic) {
        field.logic.forEach((rule) => {
          if (evaluateCondition(rule.when, values, fieldsById)) {
            rule.actions.forEach((action) => {
              if (action.targetId && action.targetId !== field.id) {
                const target = fieldsById.get(action.targetId);
                if (target) {
                  const targetState = fieldStates[target.id] ?? defaultFieldState(target);
                  fieldStates[target.id] = applyAction(
                    targetState,
                    action,
                    values,
                    valuePatches,
                    fieldsById,
                  );
                }
              } else {
                state = applyAction(state, action, values, valuePatches, fieldsById);
              }
            });
          }
        });
      }
      fieldStates[field.id] = state;
    });
  });
  return { fieldStates, valuePatches };
}
export function evaluateCrossFieldRules(
  schema: FormSchema,
  values: Record<string, unknown>,
): string[] {
  const fieldsById = buildFieldsMap(schema);
  const errors: string[] = [];
  (schema.crossFieldRules ?? []).forEach((rule) => {
    const passed = rule.when.every((condition) => evaluateCondition(condition, values, fieldsById));
    if (!passed) {
      errors.push(rule.message);
    }
  });
  return errors;
}
