import { useNavigate, useLocation } from 'react-router';
import { matchesNavTab, paths } from '@/shared/routes';
import { HorizontalTabs, TabItem } from '../ui/tab-menu/TabMenu';
export const NavigationPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs: TabItem[] = [
    { text: 'Акции', tabId: paths.promotion },
    { text: 'Мои формы', tabId: paths.myForms.index },
    { text: 'Доставка', tabId: paths.delivery },
    { text: 'О нас', tabId: paths.about },
    { text: 'Конструктор форм', tabId: paths.formConstructor },
  ];
  const currentTabId = tabs.find((tab) => matchesNavTab(location.pathname, tab.tabId))?.tabId;
  return (
    <HorizontalTabs
      tabs={tabs}
      selectedTabId={currentTabId}
      onTabChange={(tabId) => navigate(tabId)}
    />
  );
};
