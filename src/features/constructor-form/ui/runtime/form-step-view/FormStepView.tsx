import { FormStepCard } from '../../form-step-card';
import type { FormStepViewProps } from './types';
export function FormStepView(props: FormStepViewProps) {
  return <FormStepCard {...props} />;
}
FormStepView.displayName = 'FormStepView';
