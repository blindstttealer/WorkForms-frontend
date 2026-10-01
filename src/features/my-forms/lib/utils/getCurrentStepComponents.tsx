import { MyFormsWelcome } from '../../ui/welcome/MyFormsWelcome';
import { ReviewInfoStep } from '../../ui/review-info-step/ReviewInfoStep';
import DynamicStep from '../../ui/dynamic-step/DynamicStep';
import { formManager } from '../../model/multi-form-manager';
export const getCurrentStepComponent = (step: number) => {
  const currentForm = formManager.currentForm;
  const templateId = currentForm.templateId;
  const template = formManager.templates[templateId];
  if (!template || !Array.isArray(template.steps)) return <MyFormsWelcome />;
  const stepsCount = template.steps.length;
  const normalizedStep = Math.max(0, step - 1);
  if (normalizedStep >= 0 && normalizedStep < stepsCount) {
    return <DynamicStep key={currentForm.id} stepIndex={normalizedStep} />;
  }
  if (normalizedStep >= stepsCount) {
    return <ReviewInfoStep key={currentForm.id} />;
  }
};
