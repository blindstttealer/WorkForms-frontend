import type { Field } from '../../../model/schema/form-schema';
import type { FieldRuntimeState } from '../../../model/engines/logic-engine';
export interface RuntimeFieldRendererProps {
  field: Field;
  value: unknown;
  runtimeState?: FieldRuntimeState;
  error?: string;
  onChange: (value: unknown) => void;
  wrap?: boolean;
}
