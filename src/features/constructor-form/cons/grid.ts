import type { FieldUI } from '../model/schema/form-schema';
export const GRID_COLUMNS = 12;
export type FieldSpan = NonNullable<FieldUI['span']>;
export const SPAN_PRESETS: {
  label: string;
  span: FieldSpan;
}[] = [
  { label: '100%', span: 12 },
  { label: '75%', span: 9 },
  { label: '66%', span: 8 },
  { label: '50%', span: 6 },
  { label: '33%', span: 4 },
  { label: '25%', span: 3 },
];
export const VALID_SPANS = new Set<FieldSpan>([1, 2, 3, 4, 6, 8, 9, 12]);
export function normalizeSpan(span?: number): FieldSpan {
  if (span && VALID_SPANS.has(span as FieldSpan)) {
    return span as FieldSpan;
  }
  return 12;
}
