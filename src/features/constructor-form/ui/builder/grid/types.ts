import type { FieldSpan } from '../../../cons/grid';
import type { Field } from '../../../model/schema/form-schema';
export interface BuilderFieldCardProps {
  stepId: string;
  field: Field;
  span: FieldSpan;
  isActive: boolean;
  isOverlay?: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onChangeSpan: (span: FieldSpan) => void;
}
export interface GridLayoutProps {
  stepId: string;
  fields: Field[];
  activeInsertIndex?: number | null;
  onActivateInsert: (index: number) => void;
  onOpenInsertLibrary: (index: number) => void;
  onQuickInsertText: (index: number, text: string) => void;
  onDeactivateInsert: () => void;
}
export interface ResizeControlProps {
  field: Field;
  onChangeSpan: (span: FieldSpan) => void;
}
export interface DropIndicatorProps {
  orientation: 'horizontal' | 'vertical';
}
