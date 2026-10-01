import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { T } from '@admiral-ds/react-ui';
import { ServiceCheckSolid } from '@admiral-ds/icons';
import type { FormSubmission } from '../../../model/schema/form-schema';
import { evaluateCrossFieldRules, evaluateLogic } from '../../../model/engines/logic-engine';
import {
  getInitialValues,
  validateStep,
  type FieldErrors,
} from '../../../model/engines/validation-engine';
import { saveSubmissionToStorage } from '../../../utils/schema-storage';
import { FormStepCard } from '../../form-step-card';
import {
  ErrorText,
  JsonPreview,
  ProgressFill,
  ProgressTrack,
  RuntimeCard,
  RuntimeHeader,
  RuntimeShell,
  SuccessCard,
  SuccessIconWrap,
} from './styles';
import type { FormRuntimeProps } from './types';
export const FormRuntime = observer(({ schema }: FormRuntimeProps) => {
  const sortedSteps = useMemo(
    () => [...schema.steps].sort((a, b) => a.order - b.order),
    [schema.steps],
  );
  const allFields = useMemo(() => sortedSteps.flatMap((step) => step.fields), [sortedSteps]);
  const [values, setValues] = useState<Record<string, unknown>>(() => getInitialValues(allFields));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [crossErrors, setCrossErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const currentStep = sortedSteps[currentStepIndex];
  const logicResult = useMemo(() => evaluateLogic(schema, values), [schema, values]);
  useEffect(() => {
    if (Object.keys(logicResult.valuePatches).length === 0) return;
    setValues((prev) => ({ ...prev, ...logicResult.valuePatches }));
  }, [logicResult.valuePatches]);
  const updateValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);
  const goToStepById = (stepId: string) => {
    const index = sortedSteps.findIndex((step) => step.id === stepId);
    if (index >= 0) setCurrentStepIndex(index);
  };
  const handleNext = () => {
    if (!currentStep) return;
    const errors = validateStep(currentStep, values, logicResult.fieldStates);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const goToStepId = currentStep.fields
      .map((field) => logicResult.fieldStates[field.id]?.goToStepId)
      .find(Boolean);
    if (goToStepId) {
      goToStepById(goToStepId);
      return;
    }
    if (currentStepIndex < sortedSteps.length - 1) {
      setCurrentStepIndex((index) => index + 1);
    }
  };
  const handleBack = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((index) => index - 1);
  };
  const handleSkip = () => {
    if (currentStepIndex < sortedSteps.length - 1) {
      setCurrentStepIndex((index) => index + 1);
    }
  };
  const handleSaveDraft = () => {
    const draft: FormSubmission = {
      formId: schema.id,
      formVersion: schema.version,
      status: 'draft',
      values,
      currentStepId: currentStep?.id,
    };
    saveSubmissionToStorage(draft);
    setSubmission(draft);
  };
  const handleSubmit = () => {
    const stepErrors = sortedSteps.reduce<FieldErrors>((acc, step) => {
      return { ...acc, ...validateStep(step, values, logicResult.fieldStates) };
    }, {});
    setFieldErrors(stepErrors);
    const cross = evaluateCrossFieldRules(schema, values);
    setCrossErrors(cross);
    if (Object.keys(stepErrors).length > 0 || cross.length > 0) return;
    const result: FormSubmission = {
      formId: schema.id,
      formVersion: schema.version,
      status: 'submitted',
      values,
      currentStepId: currentStep?.id,
      submittedAt: new Date().toISOString(),
    };
    saveSubmissionToStorage(result);
    setSubmission(result);
    setIsSubmitted(true);
  };
  if (isSubmitted && submission) {
    return (
      <RuntimeShell>
        <SuccessCard>
          <SuccessIconWrap>
            <ServiceCheckSolid width={28} height={28} />
          </SuccessIconWrap>
          <T font="Header/H4" as="h2">
            {schema.settings.successMessage ?? 'Форма отправлена'}
          </T>
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 8 }}>
            Submission сохранён локально (без backend).
          </T>
          <JsonPreview>{JSON.stringify(submission, null, 2)}</JsonPreview>
        </SuccessCard>
      </RuntimeShell>
    );
  }
  if (!currentStep) {
    return (
      <RuntimeShell>
        <T font="Body/Body 1 Long" as="p">
          В форме нет шагов.
        </T>
      </RuntimeShell>
    );
  }
  const progress = ((currentStepIndex + 1) / sortedSteps.length) * 100;
  const isLastStep = currentStepIndex === sortedSteps.length - 1;
  return (
    <RuntimeShell>
      <RuntimeCard>
        <RuntimeHeader>
          <T font="Header/H3" as="h1">
            {schema.metadata.title}
          </T>
          {schema.metadata.description ? (
            <T font="Body/Body 1 Long" color="Neutral/Neutral 50" as="p">
              {schema.metadata.description}
            </T>
          ) : null}
        </RuntimeHeader>

        {schema.settings.showProgressBar ? (
          <div style={{ marginBottom: 24 }}>
            <ProgressTrack>
              <ProgressFill $value={progress} />
            </ProgressTrack>
            {schema.settings.showStepNumbers ? (
              <T
                font="Body/Body 2 Short"
                color="Neutral/Neutral 50"
                as="div"
                style={{ marginTop: 10 }}
              >
                Шаг {currentStepIndex + 1} из {sortedSteps.length}
              </T>
            ) : null}
          </div>
        ) : null}

        <FormStepCard
          embedded
          schema={schema}
          step={currentStep}
          stepIndex={currentStepIndex}
          stepsCount={sortedSteps.length}
          values={values}
          fieldErrors={fieldErrors}
          touched={touched}
          onFieldChange={updateValue}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={currentStep.isSkippable ? handleSkip : undefined}
          isLastStep={isLastStep}
          onSubmit={handleSubmit}
          allowDraft={schema.settings.allowDraft}
          onSaveDraft={handleSaveDraft}
          submitLabel={schema.settings.submitButtonText ?? 'Отправить'}
          slotBeforeActions={
            <>
              {crossErrors.map((message) => (
                <ErrorText key={message}>{message}</ErrorText>
              ))}
            </>
          }
        />
      </RuntimeCard>
    </RuntimeShell>
  );
});
FormRuntime.displayName = 'FormRuntime';
