import type { Field, FieldPaletteCategory, FieldType } from '../schema/form-schema';
export interface PaletteItem {
  type: FieldType;
  category: FieldPaletteCategory;
  label: string;
  description: string;
  example: string;
  create: () => Field;
}
