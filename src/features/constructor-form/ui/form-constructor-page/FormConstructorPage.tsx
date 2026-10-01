import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { ConstructorPageShell } from './constructor-page.styles';
import { useConstructorSettingsLayout } from './use-constructor-settings-layout';
import { useAppToast } from '@/shared/hooks/useAppToast';
import { formatFormTemplateSaveError } from '../../lib/format-form-template-save-error';
import { builderStore } from '../../model/store/builder-store';
import { APP_UI_ICONS, ICON_SIZE } from '@/shared/icons';
import { BuilderCanvas } from '../builder/builder-canvas';
import { BuilderNav } from '../builder/builder-nav';
import { SettingsDrawer } from '../builder/settings-drawer';
import { WorkspacePlaceholder } from '../builder/workspace-placeholder';
import { TemplatesPanel } from '../builder/templates-panel';
import { ArchivePanel } from '../builder/archive-panel';
import { FormRuntime } from '../runtime/form-runtime';
import {
  ActionButton,
  BuilderGrid,
  ModeButton,
  ModeSwitch,
  PanelBody,
  RuntimePanel,
  Toolbar,
  ToolbarGroup,
} from './styles';
export const FormConstructorPage = observer(() => {
  const { showSuccessToast, showErrorToast } = useAppToast();
  const importInputRef = useRef<HTMLInputElement>(null);
  const settingsOpen = builderStore.settingsOpen;
  useConstructorSettingsLayout(settingsOpen);
  const BuilderIcon = APP_UI_ICONS.builder;
  const PreviewIcon = APP_UI_ICONS.runtime;
  const SaveIcon = APP_UI_ICONS.save;
  const ExportIcon = APP_UI_ICONS.export;
  const ImportIcon = APP_UI_ICONS.import;
  const NewFormIcon = APP_UI_ICONS.newForm;
  const SettingsIcon = APP_UI_ICONS.settings;
  const handleSave = async () => {
    try {
      await builderStore.saveToServer();
      showSuccessToast('Схема сохранена на сервере');
    } catch (err) {
      builderStore.persistSchema();
      showErrorToast(
        formatFormTemplateSaveError(err, 'Не удалось сохранить на сервере. Сохранено локально'),
      );
    }
  };
  const handlePublish = async () => {
    try {
      await builderStore.publishToServer();
      showSuccessToast('Форма опубликована — доступна в разделе «Мои формы»');
    } catch (err) {
      showErrorToast(formatFormTemplateSaveError(err, 'Не удалось опубликовать форму'));
    }
  };
  const handleExport = () => {
    const blob = new Blob([builderStore.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${builderStore.schema.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleImportClick = () => importInputRef.current?.click();
  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const raw = await file.text();
      builderStore.importJson(raw);
      showSuccessToast('Схема импортирована');
    } catch {
      showErrorToast('Не удалось импортировать JSON');
    } finally {
      event.target.value = '';
    }
  };
  return (
    <ConstructorPageShell $settingsOpen={settingsOpen}>
      <Toolbar>
        <ToolbarGroup>
          <ModeSwitch>
            <ModeButton
              type="button"
              $active={builderStore.mode === 'builder'}
              onClick={() => builderStore.setMode('builder')}
            >
              <BuilderIcon width={ICON_SIZE} height={ICON_SIZE} />
              Builder
            </ModeButton>
            <ModeButton
              type="button"
              $active={builderStore.mode === 'preview'}
              onClick={() => builderStore.setMode('preview')}
            >
              <PreviewIcon width={ICON_SIZE} height={ICON_SIZE} />
              Предпросмотр
            </ModeButton>
          </ModeSwitch>
        </ToolbarGroup>

        <ToolbarGroup>
          <ActionButton
            type="button"
            $variant={settingsOpen ? 'secondary' : 'ghost'}
            onClick={() => builderStore.toggleSettings()}
          >
            <SettingsIcon width={16} height={16} />
            Настройки
          </ActionButton>
          <ActionButton
            type="button"
            $variant="secondary"
            disabled={builderStore.isSaving}
            onClick={() => void handleSave()}
          >
            <SaveIcon width={16} height={16} />
            Сохранить
          </ActionButton>
          <ActionButton
            type="button"
            disabled={builderStore.isSaving}
            onClick={() => void handlePublish()}
          >
            Опубликовать
          </ActionButton>
          <ActionButton type="button" onClick={handleExport}>
            <ExportIcon width={16} height={16} />
            Export
          </ActionButton>
          <ActionButton type="button" onClick={handleImportClick}>
            <ImportIcon width={16} height={16} />
            Import
          </ActionButton>
          <ActionButton type="button" onClick={() => builderStore.resetSchema()}>
            <NewFormIcon width={16} height={16} />
            Новая форма
          </ActionButton>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleImportFile}
          />
        </ToolbarGroup>
      </Toolbar>

      {builderStore.mode === 'builder' ? (
        <BuilderGrid>
          <BuilderNav />
          {builderStore.workspaceNav === 'workspace' ? (
            <BuilderCanvas />
          ) : builderStore.workspaceNav === 'templates' ? (
            <TemplatesPanel />
          ) : builderStore.workspaceNav === 'archive' ? (
            <ArchivePanel />
          ) : (
            <WorkspacePlaceholder section={builderStore.workspaceNav} />
          )}
        </BuilderGrid>
      ) : (
        <RuntimePanel>
          <PanelBody>
            <FormRuntime schema={builderStore.schema} />
          </PanelBody>
        </RuntimePanel>
      )}
      <SettingsDrawer
        open={builderStore.settingsOpen}
        onClose={() => builderStore.closeSettings()}
      />
    </ConstructorPageShell>
  );
});
FormConstructorPage.displayName = 'FormConstructorPage';
