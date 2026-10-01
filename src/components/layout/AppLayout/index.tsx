import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AppHeader from '../AppHeader';
import { NavigationPanel } from '../../navigation/NavigationPanel';
import { AuthorizationMenu } from '@/features/auth/ui/authorization-menu';
import { Chat } from '@/features/online-chat/ui/OnlineChat';
import { ContentLayout, LayoutContainer, MainContent } from './styles';
import { DropDownUserMenuContainer } from '@/features/auth/ui/authorization-menu/components/user-menu/DropDownUserMenuContainer';
import { useAuth } from '@/features/auth/hooks';
interface AppLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  toggleCollapse: () => void;
}
export const AppLayout: React.FC<AppLayoutProps> = observer(({ children, collapsed }) => {
  const [headerContainer, setHeaderContainer] = useState<HTMLDivElement | null>(null);
  const { user, isAuth } = useAuth();
  const setDrawerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setHeaderContainer(node);
    }
  }, []);
  return (
    <LayoutContainer>
      {isAuth && (
        <AppHeader ref={setDrawerRef}>
          <NavigationPanel />
          <DropDownUserMenuContainer login={user?.login} email={user?.email} />
          <AuthorizationMenu />
        </AppHeader>
      )}

      <ContentLayout $hasHeader={isAuth}>
        <MainContent $collapsed={collapsed}>{children}</MainContent>

        {isAuth && headerContainer && (
          <Chat drawerContainerRef={headerContainer} currentUser={user} />
        )}
      </ContentLayout>
    </LayoutContainer>
  );
});
