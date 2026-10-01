import { useEffect } from 'react';
import { SETTINGS_DRAWER_RESERVE_WIDTH } from '../builder/settings/settings-panel.styles';
const INSET_VAR = '--constructor-settings-inset';
export function useConstructorSettingsLayout(settingsOpen: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    if (settingsOpen) {
      root.style.setProperty(INSET_VAR, SETTINGS_DRAWER_RESERVE_WIDTH);
    } else {
      root.style.removeProperty(INSET_VAR);
    }
    return () => {
      root.style.removeProperty(INSET_VAR);
    };
  }, [settingsOpen]);
}
