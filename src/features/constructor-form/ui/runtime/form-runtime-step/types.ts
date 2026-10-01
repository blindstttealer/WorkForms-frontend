import type { FormSchema, FormStep } from '../../../model/schema/form-schema';
import type { FieldErrors } from '../../../model/engines/validation-engine';
export type FormRuntimeStepProps = {
  schema: FormSchema;
  step: FormStep;
  stepIndex: number;
  stepsCount: number;
  values: Record<string, unknown>;
  fieldErrors: FieldErrors;
  touched: Record<string, boolean>;
  onFieldChange: (name: string, value: unknown) => void;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
};
