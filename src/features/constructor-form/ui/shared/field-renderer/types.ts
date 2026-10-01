import type { Field } from '../../../model/schema/form-schema';
import type { FieldRuntimeState } from '../../../model/engines/logic-engine.types';
export type FieldRendererMode = 'runtime' | 'builder';
export interface FieldRendererProps {
  field: Field;
  mode: FieldRendererMode;
  value?: unknown;
  runtimeState?: FieldRuntimeState;
  error?: string;
  disabled?: boolean;
  onChange?: (value: unknown) => void;
  onPlaceholderChange?: (value: string) => void;
  wrap?: boolean;
}
