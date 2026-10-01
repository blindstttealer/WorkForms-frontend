import { DrawerTitle } from '@admiral-ds/react-ui';
import { observer } from 'mobx-react-lite';
import { builderStore } from '../../../model/store/builder-store';
import { isInputField } from '../../../model/schema/form-schema';
import { SettingsPanelContent } from '../settings-panel/SettingsPanel';
import {
  SETTINGS_DRAWER_OVERLAY_Z_INDEX,
  SettingsDrawerBody,
  SettingsDrawerTab,
  SettingsDrawerTabs,
  StyledSettingsDrawer,
  StyledSettingsDrawerContent,
} from '../settings/settings-panel.styles';
interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}
function getDrawerTitle(): string {
  const { settingsTab, selectedField } = builderStore;
  if (settingsTab === 'general') return 'Общие настройки';
  if (selectedField) {
    const { field } = selectedField;
    if (field.type === 'heading') return field.label || 'Заголовок';
    if (field.type === 'paragraph') return 'Параграф';
    if (field.type === 'divider') return 'Разделитель';
    if (isInputField(field)) return field.label ?? field.name ?? 'Поле';
  }
  return 'Настройки поля';
}
export const SettingsDrawer = observer(function SettingsDrawer({
  open,
  onClose,
}: SettingsDrawerProps) {
  const { settingsTab, selectedFieldId } = builderStore;
  const fieldTabDisabled = !selectedFieldId;
  return (
    <StyledSettingsDrawer
      isOpen={open}
      onClose={onClose}
      position="right"
      backdrop={false}
      closeOnEscapeKeyDown
      displayCloseIcon
      aria-labelledby="form-settings-drawer-title"
      overlayStyle={{ zIndex: SETTINGS_DRAWER_OVERLAY_Z_INDEX }}
    >
      <DrawerTitle id="form-settings-drawer-title">{getDrawerTitle()}</DrawerTitle>

      <SettingsDrawerTabs role="tablist" aria-label="Раздел настроек">
        <SettingsDrawerTab
          type="button"
          role="tab"
          aria-selected={settingsTab === 'general'}
          $active={settingsTab === 'general'}
          onClick={() => builderStore.setSettingsTab('general')}
        >
          Общие
        </SettingsDrawerTab>
        <SettingsDrawerTab
          type="button"
          role="tab"
          aria-selected={settingsTab === 'field'}
          $active={settingsTab === 'field'}
          $disabled={fieldTabDisabled}
          disabled={fieldTabDisabled}
          onClick={() => {
            if (!fieldTabDisabled) {
              builderStore.setSettingsTab('field');
            }
          }}
        >
          Поле
        </SettingsDrawerTab>
      </SettingsDrawerTabs>

      <StyledSettingsDrawerContent>
        <SettingsDrawerBody>
          <SettingsPanelContent />
        </SettingsDrawerBody>
      </StyledSettingsDrawerContent>
    </StyledSettingsDrawer>
  );
});
SettingsDrawer.displayName = 'SettingsDrawer';
