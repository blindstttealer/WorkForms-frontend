import styled, { css } from 'styled-components';
export const PageShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 120px);
  padding: 4px 2px 24px;
`;
export const PageHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 24px 28px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color['Primary/Primary 10']} 0%,
    ${({ theme }) => theme.color['Neutral/Neutral 00']} 55%,
    ${({ theme }) => theme.color['Primary/Primary 10']} 100%
  );
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.06);
`;
export const HeaderTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
`;
export const HeaderIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  box-shadow: 0 8px 24px rgba(0, 98, 255, 0.12);
`;
export const PageTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const HeaderStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;
export const StatBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
`;
export const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
export const ModeSwitch = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: 12px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const ModeButton = styled.button<{
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.18s ease;
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Neutral/Neutral 00'] : 'transparent'};
  box-shadow: ${({ $active }) => ($active ? '0 4px 14px rgba(15, 23, 42, 0.08)' : 'none')};

  &:hover {
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }
`;
export const ActionButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'ghost';
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.18s ease;
  border: 1px solid transparent;

  ${({ $variant = 'ghost', theme }) =>
    $variant === 'primary'
      ? css`
          color: #fff;
          background: ${theme.color['Primary/Primary 60 Main']};
          box-shadow: 0 8px 20px rgba(0, 98, 255, 0.22);
        `
      : $variant === 'secondary'
        ? css`
            color: ${theme.color['Neutral/Neutral 90']};
            background: ${theme.color['Neutral/Neutral 05']};
            border-color: ${theme.color['Neutral/Neutral 10']};
          `
        : css`
            color: ${theme.color['Neutral/Neutral 50']};
            background: transparent;

            &:hover {
              background: ${theme.color['Neutral/Neutral 05']};
              color: ${theme.color['Neutral/Neutral 90']};
            }
          `}
`;
export const BuilderGrid = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 18px;
  flex: 1;
  min-height: 640px;
  align-items: stretch;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;
export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`;
export const NavItem = styled.button<{
  $active?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : 'transparent'};
  transition: all 0.18s ease;

  &:hover {
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
    background: ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 05']};
  }
`;
export const NavItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  flex-shrink: 0;
  color: inherit;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
`;
export const NavDivider = styled.div`
  height: 1px;
  margin: 8px 12px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  overflow: hidden;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.05);
`;
export const NavPanel = styled(Panel)``;
export const PlaceholderPanel = styled(Panel)`
  grid-column: 2 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  min-height: 400px;
`;
export const NavWorkspaceFooter = styled.div`
  padding: 12px 16px 16px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const PlaceholderIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 18px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
`;
export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.color['Neutral/Neutral 00']} 0%,
    ${({ theme }) => theme.color['Neutral/Neutral 05']} 100%
  );
`;
export const PanelHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const PanelHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
`;
export const PanelHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const PanelBody = styled.div`
  padding: 16px;
  overflow: auto;
  flex: 1;
  min-height: 0;
`;
export const CanvasPanelBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;
export const StepNavSticky = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 2;
  overflow-x: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }
`;
export const StepNavTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;
export const StepNavTab = styled.button<{
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 10']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 05']};
  color: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 50']};
  cursor: pointer;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: all 0.18s ease;
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(0, 98, 255, 0.1)' : 'none')};

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }
`;
export const StepNavTabOrder = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
`;
export const StepNavTabTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StepNavFieldCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
`;
export const StepNavAddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.color['Neutral/Neutral 20']};
  background: transparent;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 40']};
    background: ${({ theme }) => theme.color['Primary/Primary 10']};
  }
`;
export const StepContentScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
`;
export const CategoryBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;
export const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
export const PaletteItem = styled.button<{
  $dragging?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  cursor: grab;
  opacity: ${({ $dragging }) => ($dragging ? 0.55 : 1)};
  transition: all 0.18s ease;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
    box-shadow: 0 10px 24px rgba(0, 98, 255, 0.08);
  }
`;
export const PaletteItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Primary/Primary 10']};
`;
export const PaletteItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;
export const StepCard = styled.div<{
  $active?: boolean;
}>`
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  border-radius: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
`;
export const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;
export const StepBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 20']};
`;
export const StepActions = styled.div`
  display: flex;
  gap: 6px;
`;
export const LabeledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  border-radius: 10px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
    background: ${({ theme }) => theme.color['Primary/Primary 10']};
  }
`;
export const IconButton = styled.button<{
  $danger?: boolean;
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 40'] : theme.color['Neutral/Neutral 10']};
  border-radius: 10px;
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 00']};
  color: ${({ $danger, $active, theme }) =>
    $danger
      ? theme.color['Error/Error 60 Main']
      : $active
        ? theme.color['Primary/Primary 60 Main']
        : theme.color['Neutral/Neutral 50']};
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    color: ${({ $danger, theme }) =>
      $danger ? theme.color['Error/Error 60 Main'] : theme.color['Primary/Primary 60 Main']};
    border-color: ${({ $danger, theme }) =>
      $danger ? theme.color['Error/Error 30'] : theme.color['Primary/Primary 30']};
    background: ${({ $danger, theme }) =>
      $danger ? theme.color['Error/Error 10'] : theme.color['Primary/Primary 10']};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
export const FieldCard = styled.div<{
  $active?: boolean;
  $span?: number;
}>`
  grid-column: span ${({ $span }) => $span ?? 12};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 10']};
  border-radius: 14px;
  padding: 14px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  cursor: grab;
  transition: all 0.18s ease;
  box-shadow: ${({ $active }) =>
    $active ? '0 10px 24px rgba(0, 98, 255, 0.1)' : '0 2px 10px rgba(15, 23, 42, 0.03)'};

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 30']};
  }
`;
export const FieldCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;
export const FieldCardMain = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  flex: 1;
`;
export const FieldTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
`;
export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
`;
export const DropZone = styled.div<{
  $active?: boolean;
}>`
  min-height: 56px;
  border-radius: 12px;
  border: 2px dashed
    ${({ $active, theme }) =>
      $active ? theme.color['Primary/Primary 60 Main'] : theme.color['Neutral/Neutral 20']};
  background: ${({ $active, theme }) =>
    $active ? theme.color['Primary/Primary 10'] : theme.color['Neutral/Neutral 05']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  font-size: 13px;
  font-weight: 500;
  margin-top: 12px;
  transition: all 0.18s ease;
`;
export const SettingsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const SettingsSectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
export const SettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const RuntimePanel = styled(Panel)`
  flex: 1;
`;
export {
  FormSurfaceCard as RuntimeCard,
  FormSurfaceShell as RuntimeShell,
} from '../../form-step-card/form-surface.styles';
export const RuntimeHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;
export const ProgressTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 10']};
  overflow: hidden;
`;
export const ProgressFill = styled.div<{
  $value: number;
}>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color['Primary/Primary 60 Main']} 0%,
    ${({ theme }) => theme.color['Primary/Primary 40']} 100%
  );
  transition: width 0.25s ease;
`;
export const RuntimeFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
`;
export const RuntimeFieldWrap = styled.div<{
  $span?: number;
}>`
  grid-column: span ${({ $span }) => $span ?? 12};
`;
export const RuntimeActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 8px;
`;
export const SuccessCard = styled.div`
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.color['Success/Success 10']} 0%,
    ${({ theme }) => theme.color['Neutral/Neutral 00']} 100%
  );
  border: 1px solid ${({ theme }) => theme.color['Success/Success 50 Main']};
  box-shadow: 0 16px 40px rgba(16, 185, 129, 0.12);
`;
export const SuccessIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.color['Success/Success 50 Main']};
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
`;
export const JsonPreview = styled.pre`
  margin-top: 16px;
  padding: 16px;
  border-radius: 12px;
  font-size: 12px;
  overflow: auto;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
export const ErrorText = styled.div`
  color: ${({ theme }) => theme.color['Error/Error 60 Main']};
  font-size: 12px;
  margin-top: 4px;
`;
export const CrossRuleCard = styled.div`
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
`;
export const DividerLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  margin: 8px 0;
`;
export const EmptyHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 16px;
  text-align: center;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
`;
