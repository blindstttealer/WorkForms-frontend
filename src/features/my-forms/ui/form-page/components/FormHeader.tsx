import { observer } from 'mobx-react-lite';
import { ProgressSteps } from '@/components/ui/progress-bar/ProgressBar';
import { FormHeaderProps } from '../types';
export const FormHeader = observer(({ currentStep, steps }: FormHeaderProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '100%' }}>
        <ProgressSteps steps={steps} current={currentStep} />
      </div>
    </div>
  );
});
