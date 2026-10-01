import { SPAN_PRESETS, normalizeSpan } from '../../../cons/grid';
import { ResizeControlWrap, SpanChip } from '../insert/insert.styles';
import type { ResizeControlProps } from './types';
export function ResizeControl({ field, onChangeSpan }: ResizeControlProps) {
  const currentSpan = normalizeSpan(field.ui?.span);
  return (
    <ResizeControlWrap
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {SPAN_PRESETS.map((preset) => (
        <SpanChip
          key={preset.span}
          type="button"
          $active={currentSpan === preset.span}
          onClick={() => onChangeSpan(preset.span)}
        >
          {preset.label}
        </SpanChip>
      ))}
    </ResizeControlWrap>
  );
}
ResizeControl.displayName = 'ResizeControl';
