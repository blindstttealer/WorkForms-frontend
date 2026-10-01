import { useMemo, type ReactNode } from 'react';
import { Button } from '@admiral-ds/react-ui';
import { evaluateLogic } from '../../model/engines/logic-engine';
import { FormFieldsGrid } from '../runtime/form-fields-grid';
import { FormFieldCell } from './FormFieldCell';
import { FormStepHeader } from './FormStepHeader';
import { FormSurfaceCard, RuntimeActions } from './styles';
import type { FormStepCardProps } from './types';
import type { Field } from '../../model/schema/form-schema';
function renderFormFieldCell(
  field: Field,
  props: Pick<
    FormStepCardProps,
    'values' | 'fieldErrors' | 'touched' | 'onFieldChange' | 'showAllFields'
  >,
  logicHidden: boolean,
  runtimeState: ReturnType<typeof evaluateLogic>['fieldStates'][string],
): ReactNode {
  if (logicHidden && !props.showAllFields) {
    return null;
  }
  const name = 'name' in field ? field.name : field.id;
  const error =
    props.touched && props.fieldErrors
      ? props.touched[name] || Object.keys(props.fieldErrors).length > 0
        ? props.fieldErrors[name]
        : undefined
      : undefined;
  const interactive = Boolean(props.onFieldChange);
  return (
    <FormFieldCell
      field={field}
      value={props.values[name]}
      runtimeState={runtimeState}
      error={error}
      staticDisplay={!interactive}
      onChange={interactive ? (value) => props.onFieldChange?.(name, value) : undefined}
    />
  );
}
export function FormStepCard({
  schema,
  step,
  stepIndex,
  stepsCount,
  values,
  fieldErrors = {},
  touched = {},
  onFieldChange,
  onNext,
  onBack,
  onSkip,
  nextLabel,
  allowDraft,
  onSaveDraft,
  isLastStep: isLastStepProp,
  onSubmit,
  submitLabel,
  embedded = false,
  slotBeforeActions,
  hideStepHeader = false,
  showAllFields = false,
  renderFieldDecorator,
}: FormStepCardProps) {
  const logicResult = useMemo(() => evaluateLogic(schema, values), [schema, values]);
  const isLastStep = isLastStepProp ?? stepIndex >= stepsCount - 1;
  const showBack = step.allowBack !== false && stepIndex > 0 && onBack;
  const showActions = Boolean(onNext || onSubmit);
  const primaryLabel =
    nextLabel ??
    (isLastStep ? (submitLabel ?? schema.settings.submitButtonText ?? 'Отправить') : 'Далее');
  const handlePrimary = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
      return;
    }
    onNext?.();
  };
  const fieldProps = { values, fieldErrors, touched, onFieldChange, showAllFields };
  const body = (
    <>
      {!hideStepHeader ? (
        <FormStepHeader
          title={step.title ?? `Шаг ${stepIndex + 1}`}
          description={step.description}
        />
      ) : null}

      <FormFieldsGrid
        fields={step.fields}
        renderField={(field) => {
          const runtimeState = logicResult.fieldStates[field.id];
          const hidden = Boolean(runtimeState?.hidden);
          const cell = renderFormFieldCell(field, fieldProps, hidden, runtimeState);
          if (cell == null) return null;
          return renderFieldDecorator ? renderFieldDecorator(field, cell) : cell;
        }}
      />

      {slotBeforeActions}

      {showActions ? (
        <RuntimeActions>
          {showBack ? (
            <Button appearance="secondary" dimension="m" onClick={onBack}>
              Назад
            </Button>
          ) : null}
          {step.isSkippable && onSkip && !isLastStep ? (
            <Button appearance="secondary" dimension="m" onClick={onSkip}>
              Пропустить
            </Button>
          ) : null}
          {allowDraft && onSaveDraft ? (
            <Button appearance="secondary" dimension="m" onClick={onSaveDraft}>
              Черновик
            </Button>
          ) : null}
          <Button appearance="primary" dimension="m" onClick={handlePrimary}>
            {primaryLabel}
          </Button>
        </RuntimeActions>
      ) : null}
    </>
  );
  if (embedded) {
    return body;
  }
  return <FormSurfaceCard>{body}</FormSurfaceCard>;
}
FormStepCard.displayName = 'FormStepCard';
