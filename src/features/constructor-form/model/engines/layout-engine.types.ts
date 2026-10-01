import type { Field } from '../schema/form-schema';
import type { FieldSpan } from '../../cons/grid';
export interface LayoutCell {
  field: Field;
  fieldIndex: number;
  span: FieldSpan;
}
export interface LayoutRow {
  cells: LayoutCell[];
  usedSpan: number;
  remainingSpan: number;
}
