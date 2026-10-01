import React from 'react';
import { Stepper, Step, StepContent } from '@admiral-ds/react-ui';
export type ProgressStep = {
  title: string;
};
type ProgressStepsProps = {
  steps: ProgressStep[];
  current?: number;
};
export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, current = 0 }) => {
  return (
    <Stepper activeStep={current}>
      {steps.map((step, idx) => (
        <Step key={idx}>
          <StepContent>{step.title}</StepContent>
        </Step>
      ))}
    </Stepper>
  );
};
