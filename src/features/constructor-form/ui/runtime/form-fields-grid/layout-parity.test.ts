import type { FieldSpan } from '../../../cons/grid';
import { computeLayout } from '../../../model/engines/layout-engine';
import type { Field } from '../../../model/schema/form-schema';
function textField(id: string, span: FieldSpan): Field {
  return {
    id,
    type: 'text',
    name: id,
    label: id,
    ui: { span },
  };
}
export function flattenLayoutFieldIds(fields: Field[]): string[] {
  return computeLayout(fields).flatMap((row) => row.cells.map((cell) => cell.field.id));
}
describe('form fields grid layout parity', () => {
  it('wraps to new row when span sum exceeds 12', () => {
    const fields = [textField('a', 8), textField('b', 6), textField('c', 4)];
    const rows = computeLayout(fields);
    expect(rows).toHaveLength(2);
    expect(rows[0].cells.map((c) => c.field.id)).toEqual(['a']);
    expect(rows[1].cells.map((c) => c.field.id)).toEqual(['b', 'c']);
  });
  it('flatten order matches row-major field order', () => {
    const fields = [textField('f1', 6), textField('f2', 6), textField('f3', 12)];
    expect(flattenLayoutFieldIds(fields)).toEqual(['f1', 'f2', 'f3']);
  });
});
