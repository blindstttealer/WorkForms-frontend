import styled from 'styled-components';
import { Drawer, DrawerContent } from '@admiral-ds/react-ui';
export const SETTINGS_DRAWER_OVERLAY_Z_INDEX = 1100;
export const SETTINGS_DRAWER_RESERVE_WIDTH = 'min(420px, calc(100vw - 16px))';
export const StyledSettingsDrawer = styled(Drawer)`
  width: ${SETTINGS_DRAWER_RESERVE_WIDTH};
  box-sizing: border-box;
`;
export const StyledSettingsDrawerContent = styled(DrawerContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding-top: 0;
`;
export const SettingsDrawerTabs = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
  padding: 10px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
`;
export const SettingsDrawerTab = styled.button<{
  $active?: boolean;
  $disabled?: boolean;
}>`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 10']};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 00']};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }
`;
export const SettingsScopeDivider = styled.div`
  height: 1px;
  margin: 20px 0;
  background: ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const SettingsScopeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
export const SettingsDrawerBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
export const SettingsDrawerContent = styled.div`
  width: 100%;
`;
export const InspectorScroll = SettingsDrawerContent;
export const InspectorHeader = styled.div`
  padding: 0 0 20px;
  margin-bottom: 20px;
`;
export const InspectorHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;
export const InspectorHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 20']};
`;
export const InspectorStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const InspectorCollapsibleSection = styled.div`
  border-radius: 16px;
  overflow: hidden;
`;
export const InspectorCollapsibleHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  }
`;
export const InspectorCollapsibleBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 16px 16px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const InspectorCollapsibleChevron = styled.span<{
  $open?: boolean;
}>`
  font-size: 12px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  transform: rotate(${({ $open }) => ($open ? '0deg' : '-90deg')});
  transition: transform 0.15s ease;
`;
export const InspectorSectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};

  svg {
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }
`;
export const InspectorField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const InspectorFieldLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
export const InspectorToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;
export const InspectorToggleLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const InspectorEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 24px;
  text-align: center;
`;
export const InspectorActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
export const InspectorAddButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 30']};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color['Primary/Primary 20']};
  }
`;
export const InspectorRuleCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
