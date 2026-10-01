import { useState, useMemo, forwardRef, ReactElement, ComponentPropsWithoutRef } from 'react';
import { TabMenuHorizontal, HorizontalTab, TabIcon, TabText, MenuItem } from '@admiral-ds/react-ui';
export interface TabItem {
  tabId: string;
  text: string | ReactElement;
  icon?: ReactElement;
  disabled?: boolean;
}
interface HorizontalTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  selectedTabId?: string;
  onTabChange?: (tabId: string) => void;
  dimension?: 'l' | 'm';
}
type HorizontalTabProps = ComponentPropsWithoutRef<typeof HorizontalTab> & {
  text: string | ReactElement;
  icon?: ReactElement;
};

const CustomHorizontalTab = forwardRef<HTMLButtonElement, HorizontalTabProps>(
  ({ text, icon, selected, disabled, tabId, onSelectTab, dimension = 'l', ...props }, ref) => (
    <HorizontalTab
      {...props}
      tabId={tabId}
      ref={ref}
      selected={selected}
      disabled={disabled}
      onSelectTab={onSelectTab}
      dimension={dimension}
    >
      {icon && (
        <TabIcon $dimension={dimension} $disabled={disabled}>
          {icon}
        </TabIcon>
      )}
      <TabText>{typeof text === 'string' ? text : ''}</TabText>
    </HorizontalTab>
  ),
);
export const HorizontalTabs = ({
  tabs,
  defaultTabId,
  selectedTabId: controlledTabId,
  onTabChange,
  dimension = 'l',
}: HorizontalTabsProps) => {
  const tabsMap = useMemo(() => tabs.map((tab) => tab.tabId), [tabs]);
  const [internalSelectedTabId, setInternalSelectedTabId] = useState(defaultTabId || tabs[0].tabId);
  const selectedTabId = controlledTabId ?? internalSelectedTabId;
  const handleSelectTab = (tabId: string) => {
    if (!tabs.find((tab) => tab.tabId === tabId)?.disabled) {
      if (!controlledTabId) setInternalSelectedTabId(tabId);
      onTabChange?.(tabId);
    }
  };
  const renderTab = (tabId: string, selected?: boolean, onSelectTab?: (tabId: string) => void) => {
    const currentTab = tabs.find((tab) => tab.tabId === tabId);
    if (!currentTab) return null;
    return (
      <CustomHorizontalTab
        key={tabId}
        tabId={tabId}
        text={currentTab.text}
        icon={currentTab.icon}
        selected={selected}
        disabled={currentTab.disabled}
        onSelectTab={onSelectTab}
        dimension={dimension}
      />
    );
  };
  const tabIsDisabled = (tabId: string) => !!tabs.find((tab) => tab.tabId === tabId)?.disabled;
  const renderDropMenuItem = (tabId: string) => {
    const currentTab = tabs.find((tab) => tab.tabId === tabId);
    if (!currentTab) return null;
    return (options: ComponentPropsWithoutRef<typeof MenuItem>) => (
      <MenuItem {...options} key={tabId}>
        {typeof currentTab.text === 'string' ? currentTab.text : 'Таб'}
      </MenuItem>
    );
  };
  return (
    <TabMenuHorizontal
      selectedTabId={selectedTabId}
      defaultSelectedTabId={defaultTabId || tabs[0].tabId}
      onSelectTab={handleSelectTab}
      tabsId={tabsMap}
      renderTab={renderTab}
      tabIsDisabled={tabIsDisabled}
      renderDropMenuItem={renderDropMenuItem}
    />
  );
};
