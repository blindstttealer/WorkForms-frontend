import { isInputField } from '../../model/schema/form-schema';
import type { FieldRuntimeState } from '../../model/engines/logic-engine';
import type { Field } from '../../model/schema/form-schema';
import { RuntimeFieldRenderer } from '../runtime/runtime-field-renderer';
export type FormFieldCellProps = {
  field: Field;
  value: unknown;
  runtimeState?: FieldRuntimeState;
  error?: string;
  onChange?: (value: unknown) => void;
  staticDisplay?: boolean;
};
export function FormFieldCell({
  field,
  value,
  runtimeState,
  error,
  onChange,
  staticDisplay = false,
}: FormFieldCellProps) {
  const displayField =
    staticDisplay && isInputField(field)
      ? { ...field, ui: { ...field.ui, readOnly: true } }
      : field;
  return (
    <RuntimeFieldRenderer
      field={displayField}
      value={value}
      runtimeState={runtimeState}
      error={error}
      onChange={onChange ?? (() => undefined)}
      wrap={false}
    />
  );
}
FormFieldCell.displayName = 'FormFieldCell';
