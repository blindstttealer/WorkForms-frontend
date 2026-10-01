import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { T } from '@admiral-ds/react-ui';
import { SystemSettingsSolid } from '@admiral-ds/icons';
import { builderStore } from '../../../model/store/builder-store';
import { getSuggestedSpanAtInsert } from '../../../model/engines/layout-engine';
import type { FieldType } from '../../../model/schema/form-schema';
import { APP_UI_ICONS } from '@/shared/icons';
import { FormTitleEditable } from './FormTitleEditable';
import { FormStepHeader, FormSurfaceCard, FormSurfaceShell } from '../../form-step-card';
import { GridLayout } from '../grid/GridLayout';
import { InsertFieldModal } from '../insert/InsertFieldModal';
import { StepNavigator } from '../step-navigator';
import {
  CanvasPanelBody,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderActions,
  PanelHeaderIcon,
  PanelHeaderTitle,
  StepActions,
  StepBadge,
  StepContentScroll,
  StepHeader,
} from './styles';
const FormIcon = APP_UI_ICONS.newForm;
const DeleteIcon = APP_UI_ICONS.delete;
interface InsertTarget {
  stepId: string;
  index: number;
}
export const BuilderCanvas = observer(() => {
  const [insertTarget, setInsertTarget] = useState<InsertTarget | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const activeStep =
    builderStore.selectedStep ??
    builderStore.sortedSteps.find((step) => step.id === builderStore.selectedStepId) ??
    builderStore.sortedSteps[0] ??
    null;
  const handleActivateInsert = (index: number) => {
    if (!activeStep) return;
    setInsertTarget({ stepId: activeStep.id, index });
    setLibraryOpen(false);
  };
  const handleOpenInsertLibrary = (index: number) => {
    if (!activeStep) return;
    setInsertTarget({ stepId: activeStep.id, index });
    setLibraryOpen(true);
  };
  const clearInsertState = () => {
    setInsertTarget(null);
    setLibraryOpen(false);
  };
  const handleDeactivateInsert = () => {
    if (libraryOpen) return;
    clearInsertState();
  };
  const handleQuickInsertText = (index: number, text: string) => {
    if (!activeStep) return;
    const suggestedSpan = getSuggestedSpanAtInsert(activeStep.fields, index);
    builderStore.addQuickTextField(activeStep.id, index, text, suggestedSpan);
    clearInsertState();
  };
  const handleInsertField = (type: FieldType) => {
    if (!insertTarget) return;
    const step = builderStore.schema.steps.find((item) => item.id === insertTarget.stepId);
    const suggestedSpan = getSuggestedSpanAtInsert(step?.fields ?? [], insertTarget.index);
    builderStore.addFieldFromPalette(insertTarget.stepId, type, insertTarget.index, suggestedSpan);
    clearInsertState();
  };
  return (
    <Panel>
      <PanelHeader>
        <PanelHeaderTitle>
          <PanelHeaderIcon>
            <FormIcon width={18} height={18} />
          </PanelHeaderIcon>
          <FormTitleEditable
            title={builderStore.schema.metadata.title}
            onCommit={(nextTitle) => {
              builderStore.updateMetadata({ title: nextTitle });
              builderStore.markDirty();
              builderStore.persistSchema();
            }}
          />
        </PanelHeaderTitle>
        <PanelHeaderActions>
          <IconButton
            type="button"
            title="Настройки"
            $active={builderStore.settingsOpen}
            onClick={() => builderStore.toggleSettings()}
          >
            <SystemSettingsSolid width={16} height={16} />
          </IconButton>
        </PanelHeaderActions>
      </PanelHeader>

      <CanvasPanelBody>
        <StepNavigator />

        <StepContentScroll>
          <FormSurfaceShell>
            {!activeStep ? (
              <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
                Добавьте шаг, чтобы начать.
              </T>
            ) : (
              <FormSurfaceCard>
                <StepHeader>
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <StepBadge>{activeStep.order}</StepBadge>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <FormStepHeader
                        title={activeStep.title}
                        description={activeStep.description}
                      />
                    </div>
                  </div>
                  <StepActions>
                    <IconButton
                      type="button"
                      title="Удалить шаг"
                      $danger
                      disabled={builderStore.sortedSteps.length <= 1}
                      onClick={() => builderStore.deleteStep(activeStep.id)}
                    >
                      <DeleteIcon width={16} height={16} />
                    </IconButton>
                  </StepActions>
                </StepHeader>

                <GridLayout
                  stepId={activeStep.id}
                  fields={activeStep.fields}
                  activeInsertIndex={
                    insertTarget?.stepId === activeStep.id ? insertTarget.index : null
                  }
                  onActivateInsert={handleActivateInsert}
                  onOpenInsertLibrary={handleOpenInsertLibrary}
                  onQuickInsertText={handleQuickInsertText}
                  onDeactivateInsert={handleDeactivateInsert}
                />
              </FormSurfaceCard>
            )}
          </FormSurfaceShell>
        </StepContentScroll>
      </CanvasPanelBody>

      {libraryOpen && insertTarget ? (
        <InsertFieldModal onClose={() => setLibraryOpen(false)} onInsert={handleInsertField} />
      ) : null}
    </Panel>
  );
});
BuilderCanvas.displayName = 'BuilderCanvas';
