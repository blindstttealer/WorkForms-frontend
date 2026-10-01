import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import type { FormSchema } from '@/features/constructor-form';
import { FormRuntimeStep } from '@/features/constructor-form/ui/runtime/form-runtime-step';
import { evaluateLogic } from '@/features/constructor-form/model/engines/logic-engine';
import {
  validateStep,
  type FieldErrors,
} from '@/features/constructor-form/model/engines/validation-engine';
import type { FormInstanceStore } from '../../model/form-instance-store';
import {
  findStepByFieldName,
  mergeTemplateStepValues,
  pickStepFieldValues,
} from '../../lib/merge-template-step-values';
import { formManager } from '../../model/multi-form-manager';
import { T } from '@admiral-ds/react-ui';
type Props = {
  stepIndex: number;
};
const Missing = ({ children }: { children: string }) => (
  <T
    font="Body/Body 1 Long"
    color="Neutral/Neutral 50"
    as="p"
    style={{ padding: 24, textAlign: 'center' }}
  >
    {children}
  </T>
);
const DynamicStepBody = observer(
  ({
    form,
    template,
    stepIndex,
  }: {
    form: FormInstanceStore;
    template: FormSchema;
    stepIndex: number;
  }) => {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const steps = useMemo(
      () => [...template.steps].sort((a, b) => a.order - b.order),
      [template.steps],
    );
    const stepDef = steps[stepIndex];
    const namespace = stepDef.id;
    const mergedValues = useMemo(
      () => mergeTemplateStepValues(template, form.data as Record<string, unknown>),
      [template, form.data],
    );
    const logicResult = useMemo(
      () => evaluateLogic(template, mergedValues),
      [template, mergedValues],
    );
    useEffect(() => {
      const patches = logicResult.valuePatches;
      if (Object.keys(patches).length === 0) return;
      for (const [fieldName, value] of Object.entries(patches)) {
        const ownerStep = findStepByFieldName(template, fieldName);
        if (!ownerStep) continue;
        const section = (form.data[ownerStep.id] as Record<string, unknown> | undefined) ?? {};
        form.setValue(ownerStep.id, { ...section, [fieldName]: value });
      }
    }, [logicResult.valuePatches, template, form]);
    const handleFieldChange = (name: string, value: unknown) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const section = (form.data[namespace] as Record<string, unknown> | undefined) ?? {};
      form.setValue(namespace, { ...section, [name]: value });
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    };
    const goNextStep = () => {
      const freshMerged = mergeTemplateStepValues(template, form.data as Record<string, unknown>);
      const payload = pickStepFieldValues(stepDef, freshMerged);
      form.updateData({ [namespace]: payload }, form.step + 1);
      setFieldErrors({});
    };
    const handleNext = () => {
      const errors = validateStep(stepDef, mergedValues, logicResult.fieldStates);
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;
      goNextStep();
    };
    const handleSkip = () => {
      form.setStep(form.step + 1);
      setFieldErrors({});
    };
    return (
      <FormRuntimeStep
        schema={template}
        step={stepDef}
        stepIndex={stepIndex}
        stepsCount={steps.length}
        values={mergedValues}
        fieldErrors={fieldErrors}
        touched={touched}
        onFieldChange={handleFieldChange}
        onNext={handleNext}
        onBack={() => form.setStep(Math.max(1, form.step - 1))}
        onSkip={stepDef.isSkippable ? handleSkip : undefined}
        nextLabel={stepIndex === steps.length - 1 ? 'Завершить' : 'Далее'}
      />
    );
  },
);
export const DynamicStep = observer(({ stepIndex }: Props) => {
  const form = formManager.currentForm;
  if (!form) return <Missing>Форма не найдена</Missing>;
  const templateId = form.templateId;
  if (!templateId) return <Missing>Шаблон у формы не задан</Missing>;
  const template = formManager.templates[templateId];
  if (!template) return <Missing>Шаблон не загружен</Missing>;
  const stepsCount = template.steps?.length ?? 0;
  if (stepIndex < 0 || stepIndex >= stepsCount) {
    return <Missing>{`Шаг ${stepIndex} не найден в шаблоне`}</Missing>;
  }
  return (
    <DynamicStepBody
      key={`${form.id}-${stepIndex}`}
      form={form}
      template={template}
      stepIndex={stepIndex}
    />
  );
});
export default DynamicStep;
