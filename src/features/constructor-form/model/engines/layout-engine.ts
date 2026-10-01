import type { Field } from '../schema/form-schema';
import { GRID_COLUMNS, normalizeSpan, type FieldSpan } from '../../cons/grid';
import type { LayoutCell, LayoutRow } from './layout-engine.types';
export type { LayoutCell, LayoutRow } from './layout-engine.types';
export function getFieldSpan(field: Field): FieldSpan {
  return normalizeSpan(field.ui?.span);
}
export function computeLayout(fields: Field[]): LayoutRow[] {
  const rows: LayoutRow[] = [];
  let cells: LayoutCell[] = [];
  let usedSpan = 0;
  fields.forEach((field, fieldIndex) => {
    let span = getFieldSpan(field);
    if (usedSpan + span > GRID_COLUMNS && cells.length > 0) {
      rows.push({ cells, usedSpan, remainingSpan: GRID_COLUMNS - usedSpan });
      cells = [];
      usedSpan = 0;
    }
    if (span > GRID_COLUMNS) span = GRID_COLUMNS;
    cells.push({ field, fieldIndex, span });
    usedSpan += span;
    if (usedSpan >= GRID_COLUMNS) {
      rows.push({ cells, usedSpan, remainingSpan: 0 });
      cells = [];
      usedSpan = 0;
    }
  });
  if (cells.length > 0) {
    rows.push({ cells, usedSpan, remainingSpan: GRID_COLUMNS - usedSpan });
  }
  return rows;
}
function fitSpanToSpace(space: number): FieldSpan {
  const ordered: FieldSpan[] = [12, 9, 8, 6, 4, 3, 2, 1];
  return ordered.find((span) => span <= space) ?? 12;
}
export function getSuggestedSpanAtInsert(fields: Field[], index: number): FieldSpan {
  let usedInRow = 0;
  for (let i = 0; i < index; i += 1) {
    const span = getFieldSpan(fields[i]);
    if (usedInRow + span > GRID_COLUMNS) usedInRow = 0;
    usedInRow += span;
    if (usedInRow >= GRID_COLUMNS) usedInRow = 0;
  }
  if (usedInRow === 0) return 12;
  return fitSpanToSpace(GRID_COLUMNS - usedInRow);
}
