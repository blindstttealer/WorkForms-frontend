import { useMemo, type ReactNode } from 'react';
import { computeLayout } from '../../../model/engines/layout-engine';
import type { Field } from '../../../model/schema/form-schema';
import { FormFieldsGridCell, FormFieldsGridRoot, FormFieldsGridRow } from './styles';
export type FormFieldsGridProps = {
  fields: Field[];
  renderField: (field: Field) => ReactNode;
};
export function FormFieldsGrid({ fields, renderField }: FormFieldsGridProps) {
  const rows = useMemo(() => computeLayout(fields), [fields]);
  if (fields.length === 0) {
    return null;
  }
  return (
    <FormFieldsGridRoot>
      {rows.map((row) => (
        <FormFieldsGridRow key={row.cells.map((c) => c.field.id).join('-')}>
          {row.cells.map((cell) => (
            <FormFieldsGridCell key={cell.field.id} $span={cell.span}>
              {renderField(cell.field)}
            </FormFieldsGridCell>
          ))}
        </FormFieldsGridRow>
      ))}
    </FormFieldsGridRoot>
  );
}
FormFieldsGrid.displayName = 'FormFieldsGrid';
