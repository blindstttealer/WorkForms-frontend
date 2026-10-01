import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SystemDeleteSolid } from '@admiral-ds/icons';
import { fieldDndId } from '../../../cons/dnd-ids';
import { FormFieldCell } from '../../form-step-card';
import { getFieldPreviewValue } from '../../shared/field-renderer';
import { IconButton } from '../../shared/styles';
import { ResizeControl } from './ResizeControl';
import {
  BuilderFieldChrome,
  BuilderFieldContent,
  BuilderFieldShell,
} from '../insert/insert.styles';
import type { BuilderFieldCardProps } from './types';
export const BuilderFieldCard = observer(function BuilderFieldCard({
  stepId,
  field,
  isActive,
  isOverlay = false,
  onSelect,
  onDelete,
  onChangeSpan,
}: BuilderFieldCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: fieldDndId(stepId, field.id),
    disabled: isOverlay,
    animateLayoutChanges: () => false,
  });
  const previewValue = useMemo(() => getFieldPreviewValue(field), [field]);
  const style = isOverlay
    ? undefined
    : {
        transform: isDragging ? undefined : CSS.Transform.toString(transform),
        transition: isDragging ? undefined : transition,
      };
  return (
    <BuilderFieldShell
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      $active={isActive && !isDragging}
      $isDragging={isDragging}
      {...(isOverlay ? {} : { ...attributes, ...listeners })}
      onClick={isOverlay ? undefined : onSelect}
      data-field-id={field.id}
    >
      {!isOverlay ? (
        <BuilderFieldChrome $visible={isActive && !isDragging}>
          <IconButton
            type="button"
            title="Удалить поле"
            $danger
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          >
            <SystemDeleteSolid width={16} height={16} />
          </IconButton>
        </BuilderFieldChrome>
      ) : null}

      <BuilderFieldContent>
        <FormFieldCell field={field} value={previewValue} staticDisplay />
      </BuilderFieldContent>

      {isActive && !isDragging && !isOverlay ? (
        <ResizeControl field={field} onChangeSpan={onChangeSpan} />
      ) : null}
    </BuilderFieldShell>
  );
});
BuilderFieldCard.displayName = 'BuilderFieldCard';
