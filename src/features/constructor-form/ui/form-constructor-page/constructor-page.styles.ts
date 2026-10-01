import styled, { css } from 'styled-components';
import { PageShell } from '../shared/styles';
import { SETTINGS_DRAWER_RESERVE_WIDTH } from '../builder/settings/settings-panel.styles';
export const ConstructorPageShell = styled(PageShell)<{
  $settingsOpen?: boolean;
}>`
  box-sizing: border-box;
  transition: padding-right 0.25s ease;

  ${({ $settingsOpen }) =>
    $settingsOpen &&
    css`
      padding-right: calc(${SETTINGS_DRAWER_RESERVE_WIDTH} + 12px);

      @media (max-width: 640px) {
        padding-right: 2px;
      }
    `}
`;
