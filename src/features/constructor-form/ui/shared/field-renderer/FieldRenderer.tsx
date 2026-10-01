import type { ReactNode } from 'react';
import { T } from '@admiral-ds/react-ui';
import { hasOptions, isInputField } from '../../../model/schema/form-schema';
import { validateField } from '../../../model/engines/validation-engine';
import { normalizeSpan } from '../../../cons/grid';
import {
  FormCheckboxGroup,
  FormDateInput,
  FormFileInput,
  FormInput,
  FormNumberInput,
  FormPhoneInput,
  FormRadioGroup,
  FormSelect,
  FormSlider,
  FormTextArea,
  FormTimeInput,
  FormToggle,
} from '@/components/ui/form-fields';
import { BuilderInlinePlaceholder } from '../../builder/inline-placeholder/BuilderInlinePlaceholder';
import { DividerLine, ErrorText, RuntimeFieldWrap } from './styles';
import type { FieldRendererProps } from './types';
export type { FieldRendererMode } from './types';
const PLACEHOLDER_FIELD_TYPES = new Set([
  'text',
  'email',
  'password',
  'url',
  'tel',
  'textarea',
  'number',
  'date',
  'time',
  'select',
]);
export function FieldRenderer({
  field,
  mode,
  value,
  runtimeState,
  error,
  onChange,
  onPlaceholderChange,
  wrap = true,
}: FieldRendererProps) {
  const isBuilder = mode === 'builder';
  const span = normalizeSpan(field.ui?.span);
  const disabled = runtimeState?.disabled || (isInputField(field) ? !!field.ui?.disabled : false);
  const required = runtimeState?.required ?? (isInputField(field) ? !!field.required : false);
  const readOnly = isBuilder || (isInputField(field) ? !!field.ui?.readOnly : false);
  const status = !isBuilder && error ? ('error' as const) : undefined;
  const noop = () => undefined;
  const builderValue = isBuilder ? '' : value;
  const builderPlaceholder = isBuilder ? '' : isInputField(field) ? field.placeholder : undefined;
  const wrapNode = (node: ReactNode) =>
    wrap ? <RuntimeFieldWrap $span={span}>{node}</RuntimeFieldWrap> : node;
  const wrapBuilderPlaceholder = (node: ReactNode) => {
    if (
      !isBuilder ||
      !isInputField(field) ||
      !onPlaceholderChange ||
      !PLACEHOLDER_FIELD_TYPES.has(field.type)
    ) {
      return node;
    }
    return (
      <BuilderInlinePlaceholder placeholder={field.placeholder} onChange={onPlaceholderChange}>
        {node}
      </BuilderInlinePlaceholder>
    );
  };
  if (field.type === 'heading') {
    const headingFont =
      field.level != null && field.level <= 2
        ? 'Header/H3'
        : field.level === 3
          ? 'Header/H4'
          : 'Header/H5';
    return wrapNode(
      <T font={headingFont as 'Header/H3'} as="div">
        {field.label}
      </T>,
    );
  }
  if (field.type === 'paragraph') {
    return wrapNode(
      <T font="Body/Body 1 Long" as="p">
        {field.content}
      </T>,
    );
  }
  if (field.type === 'divider') {
    return wrapNode(<DividerLine />);
  }
  if (!isInputField(field)) return null;
  const common = {
    label: field.label,
    required,
    disabled,
    readOnly,
    status,
    extraText: isBuilder ? field.description : error,
    placeholder: builderPlaceholder,
  };
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'url':
        return wrapBuilderPlaceholder(
          <FormInput
            {...common}
            type={field.type === 'text' ? 'text' : field.type}
            value={String(builderValue ?? '')}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'textarea':
        return wrapBuilderPlaceholder(
          <FormTextArea
            {...common}
            value={String(builderValue ?? '')}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'tel':
        return wrapBuilderPlaceholder(
          <FormPhoneInput
            {...common}
            value={String(builderValue ?? '')}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'number':
        return wrapBuilderPlaceholder(
          <FormNumberInput
            {...common}
            value={builderValue === '' || builderValue == null ? '' : String(builderValue)}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
            minValue={field.validation?.min}
            maxValue={field.validation?.max}
          />,
        );
      case 'date':
        return wrapBuilderPlaceholder(
          <FormDateInput
            {...common}
            value={String(builderValue ?? '')}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'time':
        return wrapBuilderPlaceholder(
          <FormTimeInput
            {...common}
            value={String(builderValue ?? '')}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'slider':
        return (
          <FormSlider
            {...common}
            value={Number(builderValue ?? field.validation?.min ?? 0)}
            minValue={field.validation?.min ?? 0}
            maxValue={field.validation?.max ?? 100}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />
        );
      case 'switch':
        return (
          <FormToggle
            label={field.label}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            extraText={isBuilder ? field.description : error}
            error={!isBuilder && !!error}
            checked={Boolean(builderValue)}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />
        );
      case 'file':
        return (
          <FormFileInput
            {...common}
            multiple={field.multiple}
            onChange={isBuilder ? noop : (files) => onChange?.(files[0]?.name ?? '')}
          />
        );
      case 'select':
        return wrapBuilderPlaceholder(
          <FormSelect
            {...common}
            value={String(builderValue ?? '')}
            options={field.options.map((option) => ({ label: option.label, value: option.value }))}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />,
        );
      case 'radio':
        return (
          <FormRadioGroup
            {...common}
            name={field.name}
            value={String(builderValue ?? '')}
            error={!isBuilder && !!error}
            options={field.options.map((option) => ({ label: option.label, value: option.value }))}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />
        );
      case 'checkbox':
        return (
          <FormCheckboxGroup
            label={field.label}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            extraText={isBuilder ? field.description : error}
            error={!isBuilder && !!error}
            value={Array.isArray(builderValue) ? builderValue : []}
            options={field.options.map((option) => ({ label: option.label, value: option.value }))}
            onChange={isBuilder ? noop : (next) => onChange?.(next)}
          />
        );
      default:
        return null;
    }
  };
  const inlineError =
    !isBuilder &&
    (error ??
      (hasOptions(field) || isInputField(field)
        ? (validateField(field, value, runtimeState) ?? undefined)
        : undefined));
  return wrapNode(
    <>
      {renderInput()}

      {inlineError ? <ErrorText>{inlineError}</ErrorText> : null}
    </>,
  );
}
FieldRenderer.displayName = 'FieldRenderer';
