import { DropIndicatorDot, DropIndicatorLine, DropIndicatorRoot } from './drop-indicator.styles';
import type { DropIndicatorProps } from './types';
export function DropIndicator({ orientation }: DropIndicatorProps) {
  return (
    <DropIndicatorRoot $orientation={orientation}>
      <DropIndicatorLine />
      <DropIndicatorDot $orientation={orientation} />
    </DropIndicatorRoot>
  );
}
DropIndicator.displayName = 'DropIndicator';
