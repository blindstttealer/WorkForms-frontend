import { observer } from 'mobx-react-lite';
import { T } from '@admiral-ds/react-ui';
import { ServiceStructureSolid } from '@admiral-ds/icons';
import { builderStore } from '../../../model/store/builder-store';
import { FieldSettingsContent, GeneralSettingsContent } from '../settings/SettingsContent';
import { InspectorEmpty, InspectorScroll } from '../settings/settings-panel.styles';
export const SettingsPanelContent = observer(function SettingsPanelContent() {
  const { settingsTab, selectedField } = builderStore;
  if (settingsTab === 'field') {
    if (selectedField) {
      return <FieldSettingsContent />;
    }
    return (
      <InspectorScroll>
        <InspectorEmpty>
          <ServiceStructureSolid width={32} height={32} style={{ opacity: 0.35 }} />
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
            Выберите поле на canvas, чтобы редактировать его настройки.
          </T>
        </InspectorEmpty>
      </InspectorScroll>
    );
  }
  return <GeneralSettingsContent />;
});
SettingsPanelContent.displayName = 'SettingsPanelContent';
