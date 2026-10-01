import { Fragment, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import type { FieldSpan } from '../../../cons/grid';
import { fieldDndId, parseFieldDndId } from '../../../cons/dnd-ids';
import { computeLayout } from '../../../model/engines/layout-engine';
import { builderStore } from '../../../model/store/builder-store';
import { InlineInsertArea } from '../insert/InlineInsertArea';
import {
  CellInsertOverlay,
  DocumentGrid,
  EmptyDocumentZone,
  GapCellWrap,
  GridCellWrap,
  GridRowInner,
  GridRowWrap,
} from '../insert/insert.styles';
import { BuilderFieldCard } from './BuilderFieldCard';
import type { GridLayoutProps } from './types';
export const GridLayout = observer(
  ({
    stepId,
    fields,
    activeInsertIndex,
    onActivateInsert,
    onOpenInsertLibrary,
    onQuickInsertText,
    onDeactivateInsert,
  }: GridLayoutProps) => {
    const rows = useMemo(() => computeLayout(fields), [fields]);
    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [overlayWidth, setOverlayWidth] = useState<number | undefined>(undefined);
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: { distance: 8 },
      }),
    );
    const sortableIds = fields.map((field) => fieldDndId(stepId, field.id));
    const activeField = activeDragId ? parseFieldDndId(activeDragId) : null;
    const draggedField = activeField
      ? fields.find((field) => field.id === activeField.fieldId)
      : null;
    const handleDragStart = (event: DragStartEvent) => {
      setActiveDragId(String(event.active.id));
      const width = event.active.rect.current.initial?.width;
      setOverlayWidth(width ? Math.round(width) : undefined);
    };
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveDragId(null);
      setOverlayWidth(undefined);
      if (!over || active.id === over.id) return;
      const activeParsed = parseFieldDndId(String(active.id));
      const overParsed = parseFieldDndId(String(over.id));
      if (!activeParsed || !overParsed) return;
      const oldIndex = fields.findIndex((field) => field.id === activeParsed.fieldId);
      const newIndex = fields.findIndex((field) => field.id === overParsed.fieldId);
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;
      builderStore.reorderField(stepId, oldIndex, newIndex);
    };
    const handleDragCancel = () => {
      setActiveDragId(null);
      setOverlayWidth(undefined);
    };
    const insertAreaProps = (index: number, variant: 'row' | 'column' | 'empty' = 'row') => ({
      variant,
      active: activeInsertIndex === index,
      onActivate: () => onActivateInsert(index),
      onOpenLibrary: () => onOpenInsertLibrary(index),
      onCommitText: (text: string) => onQuickInsertText(index, text),
      onDeactivate: onDeactivateInsert,
    });
    if (fields.length === 0) {
      return (
        <EmptyDocumentZone $active={activeInsertIndex === 0}>
          <InlineInsertArea {...insertAreaProps(0, 'empty')} />
        </EmptyDocumentZone>
      );
    }
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
          <DocumentGrid>
            <InlineInsertArea {...insertAreaProps(0, 'row')} />

            {rows.map((row) => {
              const rowKey = row.cells.map((cell) => cell.field.id).join('-');
              const insertAfterIndex = row.cells[row.cells.length - 1].fieldIndex + 1;
              return (
                <Fragment key={rowKey}>
                  <GridRowWrap>
                    <GridRowInner>
                      {row.cells.map((cell, cellIndex) => (
                        <GridCellWrap key={cell.field.id} $span={cell.span}>
                          {cellIndex > 0 ? (
                            <CellInsertOverlay $raised={activeInsertIndex === cell.fieldIndex}>
                              <InlineInsertArea {...insertAreaProps(cell.fieldIndex, 'column')} />
                            </CellInsertOverlay>
                          ) : null}
                          <BuilderFieldCard
                            stepId={stepId}
                            field={cell.field}
                            span={cell.span}
                            isActive={builderStore.selectedFieldId === cell.field.id}
                            onSelect={() => builderStore.selectField(stepId, cell.field.id)}
                            onDelete={() => builderStore.deleteField(stepId, cell.field.id)}
                            onChangeSpan={(span: FieldSpan) =>
                              builderStore.patchField(stepId, cell.field.id, {
                                ui: { ...cell.field.ui, span },
                              })
                            }
                          />
                        </GridCellWrap>
                      ))}

                      {row.remainingSpan > 0 ? (
                        <GapCellWrap $span={row.remainingSpan}>
                          <CellInsertOverlay
                            style={{ left: 0 }}
                            $raised={activeInsertIndex === insertAfterIndex}
                          >
                            <InlineInsertArea {...insertAreaProps(insertAfterIndex, 'column')} />
                          </CellInsertOverlay>
                        </GapCellWrap>
                      ) : null}
                    </GridRowInner>
                  </GridRowWrap>

                  <InlineInsertArea {...insertAreaProps(insertAfterIndex, 'row')} />
                </Fragment>
              );
            })}
          </DocumentGrid>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {draggedField ? (
            <div style={overlayWidth ? { width: overlayWidth } : undefined}>
              <BuilderFieldCard
                stepId={stepId}
                field={draggedField}
                span={draggedField.ui?.span ?? 12}
                isActive
                isOverlay
                onSelect={() => undefined}
                onDelete={() => undefined}
                onChangeSpan={() => undefined}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  },
);
GridLayout.displayName = 'GridLayout';
