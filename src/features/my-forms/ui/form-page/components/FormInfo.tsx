import { observer } from 'mobx-react-lite';
import { formManager } from '../../../model/multi-form-manager';
import { FormInfoProps } from '../types';
import {
  FormInfoBlock,
  FormInfoItem,
  FormInfoTitle,
} from '@/features/my-forms/ui/form-page/styles';
import { isInputField, type InputField } from '@/features/constructor-form';
export const FormInfo = observer(({ formId }: FormInfoProps) => {
  const currentForm = formManager.currentForm;
  const currentTemplate = currentForm ? formManager.templates[currentForm.templateId] : undefined;
  if (!currentForm || !currentTemplate) return null;
  const currentStepIndex = currentForm.step - 1;
  const currentStep = currentTemplate.steps[currentStepIndex];
  const requiredFields: InputField[] = [];
  for (const field of currentStep?.fields ?? []) {
    if (isInputField(field) && field.required) requiredFields.push(field);
  }
  const stepNamespace = currentStep?.id ?? currentStepIndex;
  const stepData = currentForm.data[stepNamespace] || {};
  const emptyRequiredFields = requiredFields.filter((field) => {
    const value = stepData?.[field.name];
    return value === '' || value === null || value === undefined;
  });
  const stepTitle =
    currentTemplate?.steps.length >= currentForm?.step ? currentStep?.title : 'Review';
  return (
    <FormInfoBlock>
      <FormInfoTitle>Информация о текущей форме:</FormInfoTitle>
      <FormInfoItem>ID: {formId}</FormInfoItem>
      <FormInfoItem>Шаблон: {currentTemplate.metadata.title}</FormInfoItem>
      <FormInfoItem>
        Шаг {currentForm.step}: {stepTitle}
      </FormInfoItem>
      {!!requiredFields.length && (
        <FormInfoItem>Незаполненных обязательных полей: {emptyRequiredFields.length}</FormInfoItem>
      )}
    </FormInfoBlock>
  );
});
