import { useCallback, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  DropdownContainer,
  Menu,
  MenuItem,
  RenderOptionProps,
  typography,
} from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import { useQueryClient } from '@tanstack/react-query';
import { useUserControllerLogout } from '@/api/generated/user/user';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ThemeToggle } from '@/components/theme-switcher/ThemeSwitcher';
import { useThemeContext } from '@/providers/ThemeProvider';
interface Props {
  login: string;
  email: string;
}
const MenuWrapper = styled.div`
  min-width: 180px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;
const MenuItemStyled = styled(MenuItem)`
  ${typography['Body/Body 1 Short']};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
const ThemeRow = styled.div`
  padding: 4px 0 8px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  margin-bottom: 4px;
`;
export const DropDownUserMenuContainer = observer(({ login, email }: Props) => {
  const queryClient = useQueryClient();
  const logoutMutation = useUserControllerLogout();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        navigate(paths.registration, { replace: true });
      },
    });
  }, [logoutMutation, navigate, queryClient]);
  const handleClickOutside = (e: Event) => {
    if (e.target && targetRef.current?.contains(e.target as Node)) return;
    setOpen(false);
  };
  const model = useMemo(() => {
    return [
      {
        id: 'settings',
        render: (props: RenderOptionProps) => (
          <MenuItemStyled {...props} key="settings" onClick={() => navigate(paths.settings)}>
            Настройки
          </MenuItemStyled>
        ),
      },
      {
        id: 'logout',
        render: (props: RenderOptionProps) => (
          <MenuItemStyled {...props} key="logout" onClick={handleLogout}>
            Выйти
          </MenuItemStyled>
        ),
      },
    ];
  }, [handleLogout, navigate]);
  return (
    <>
      <div onClick={() => setOpen((v) => !v)} style={{ display: 'inline-block' }}>
        <UserAvatar ref={targetRef} name={login} email={email} />
      </div>

      {open && targetRef.current && (
        <DropdownContainer
          targetElement={targetRef.current}
          alignSelf="center"
          onClickOutside={handleClickOutside}
        >
          <MenuWrapper>
            <ThemeRow onClick={(event) => event.stopPropagation()}>
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </ThemeRow>
            <Menu model={model} />
          </MenuWrapper>
        </DropdownContainer>
      )}
    </>
  );
});
