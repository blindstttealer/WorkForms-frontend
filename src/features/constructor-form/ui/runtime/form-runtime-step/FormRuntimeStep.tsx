import { FormStepCard } from '../../form-step-card';
import type { FormRuntimeStepProps } from './types';
export type { FormRuntimeStepProps } from './types';
export function FormRuntimeStep(props: FormRuntimeStepProps) {
  return <FormStepCard {...props} />;
}
FormRuntimeStep.displayName = 'FormRuntimeStep';
