import { observer } from 'mobx-react-lite';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { builderStore } from '../../../model/store/builder-store';
import { parseStepDndId, stepDndId } from '../../../cons/dnd-ids';
import { APP_UI_ICONS } from '@/shared/icons';
import { StepNavTabDragWrap } from '../add-field-modal.styles';
import {
  StepNavAddButton,
  StepNavFieldCount,
  StepNavSticky,
  StepNavTab,
  StepNavTabOrder,
  StepNavTabs,
  StepNavTabTitle,
} from './styles';
const AddStepIcon = APP_UI_ICONS.addStep;
const DragIcon = APP_UI_ICONS.drag;
interface SortableStepTabProps {
  stepId: string;
  order: number;
  title: string;
  fieldCount: number;
  isActive: boolean;
}
function SortableStepTab({ stepId, order, title, fieldCount, isActive }: SortableStepTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: stepDndId(stepId),
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <StepNavTabDragWrap ref={setNodeRef} style={style} $active={isActive} $dragging={isDragging}>
      <StepNavTab
        type="button"
        $active={isActive}
        title={title}
        onClick={() => builderStore.selectStep(stepId)}
      >
        <span {...attributes} {...listeners} style={{ display: 'inline-flex', cursor: 'grab' }}>
          <DragIcon width={14} height={14} style={{ opacity: 0.45 }} />
        </span>
        <StepNavTabOrder>{order}</StepNavTabOrder>
        <StepNavTabTitle>{title}</StepNavTabTitle>
        <StepNavFieldCount>{fieldCount}</StepNavFieldCount>
      </StepNavTab>
    </StepNavTabDragWrap>
  );
}
export const StepNavigator = observer(() => {
  const { sortedSteps, selectedStepId } = builderStore;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );
  const stepIds = sortedSteps.map((step) => stepDndId(step.id));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeStepId = parseStepDndId(String(active.id));
    const overStepId = parseStepDndId(String(over.id));
    if (!activeStepId || !overStepId) return;
    const oldIndex = sortedSteps.findIndex((step) => step.id === activeStepId);
    const newIndex = sortedSteps.findIndex((step) => step.id === overStepId);
    if (oldIndex < 0 || newIndex < 0) return;
    builderStore.reorderStep(oldIndex, newIndex);
  };
  return (
    <StepNavSticky>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stepIds} strategy={horizontalListSortingStrategy}>
          <StepNavTabs>
            {sortedSteps.map((step) => (
              <SortableStepTab
                key={step.id}
                stepId={step.id}
                order={step.order}
                title={step.title}
                fieldCount={step.fields.length}
                isActive={selectedStepId === step.id}
              />
            ))}
          </StepNavTabs>
        </SortableContext>
      </DndContext>
      <StepNavAddButton
        type="button"
        title="Добавить шаг"
        onClick={() => builderStore.addNewStep()}
      >
        <AddStepIcon width={18} height={18} />
      </StepNavAddButton>
    </StepNavSticky>
  );
});
StepNavigator.displayName = 'StepNavigator';
