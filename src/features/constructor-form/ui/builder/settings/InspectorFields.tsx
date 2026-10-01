import type { ChangeEvent } from 'react';
import { InputField, Option, SelectField, TextField, Toggle } from '@admiral-ds/react-ui';
import type { InspectorSelectProps, InspectorTextInputProps, InspectorToggleProps } from './types';
import {
  InspectorField,
  InspectorFieldLabel,
  InspectorToggleLabel,
  InspectorToggleRow,
} from './settings-panel.styles';
export function readInputValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string {
  return event.target.value;
}
export function InspectorTextInput({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: InspectorTextInputProps) {
  return (
    <InspectorField>
      <InspectorFieldLabel>{label}</InspectorFieldLabel>
      {multiline ? (
        <TextField
          dimension="s"
          autoHeight
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(readInputValue(event))}
        />
      ) : (
        <InputField
          dimension="s"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(readInputValue(event))}
        />
      )}
    </InspectorField>
  );
}
export function InspectorToggle({ label, checked, onChange }: InspectorToggleProps) {
  return (
    <InspectorToggleRow>
      <InspectorToggleLabel>{label}</InspectorToggleLabel>
      <Toggle
        dimension="s"
        checked={checked}
        onChange={(event) => onChange((event.target as HTMLInputElement).checked)}
      />
    </InspectorToggleRow>
  );
}
export const InspectorCheckbox = InspectorToggle;
export function InspectorSelect({
  label,
  value,
  placeholder,
  onChange,
  children,
}: InspectorSelectProps) {
  return (
    <InspectorField>
      <InspectorFieldLabel>{label}</InspectorFieldLabel>
      <SelectField
        dimension="s"
        value={value}
        placeholder={placeholder}
        onSelectedChange={(next) => onChange(String(next))}
      >
        {children}
      </SelectField>
    </InspectorField>
  );
}
export { Option };
