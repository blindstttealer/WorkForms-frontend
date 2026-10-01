export interface FieldRuntimeState {
  hidden: boolean;
  disabled: boolean;
  required: boolean;
  goToStepId?: string;
}
export interface LogicEvaluationResult {
  fieldStates: Record<string, FieldRuntimeState>;
  valuePatches: Record<string, unknown>;
}
