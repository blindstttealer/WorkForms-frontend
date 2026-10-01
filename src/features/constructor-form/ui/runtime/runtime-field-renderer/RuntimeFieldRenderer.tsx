import { FieldRenderer } from '../../shared/field-renderer';
import type { RuntimeFieldRendererProps } from './types';
export function RuntimeFieldRenderer({
  field,
  value,
  runtimeState,
  error,
  onChange,
  wrap = true,
}: RuntimeFieldRendererProps) {
  return (
    <FieldRenderer
      field={field}
      mode="runtime"
      value={value}
      runtimeState={runtimeState}
      error={error}
      onChange={onChange}
      wrap={wrap}
    />
  );
}
RuntimeFieldRenderer.displayName = 'RuntimeFieldRenderer';
