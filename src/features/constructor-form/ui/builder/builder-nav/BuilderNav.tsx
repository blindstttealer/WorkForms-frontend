import { observer } from 'mobx-react-lite';
import { T } from '@admiral-ds/react-ui';
import { builderStore, type WorkspaceNavSection } from '../../../model/store/builder-store';
import { APP_UI_ICONS } from '@/shared/icons';
import {
  NavDivider,
  NavItem,
  NavItemIcon,
  NavList,
  NavPanel,
  NavWorkspaceFooter,
  PanelBody,
  PanelHeader,
  PanelHeaderIcon,
  PanelHeaderTitle,
} from './styles';
const NAV_ITEMS: {
  id: WorkspaceNavSection;
  label: string;
  icon: keyof typeof APP_UI_ICONS;
}[] = [
  { id: 'workspace', label: 'My workspace', icon: 'workspace' },
  { id: 'templates', label: 'Templates', icon: 'templates' },
  { id: 'whats-new', label: "What's new", icon: 'whatsNew' },
  { id: 'archive', label: 'Архив', icon: 'archive' },
];
export const BuilderNav = observer(() => {
  const { workspaceNav, schema } = builderStore;
  return (
    <NavPanel>
      <PanelHeader>
        <PanelHeaderTitle>
          <PanelHeaderIcon>
            <APP_UI_ICONS.workspace width={18} height={18} />
          </PanelHeaderIcon>
          Menu
        </PanelHeaderTitle>
      </PanelHeader>
      <PanelBody style={{ padding: 0 }}>
        <NavList>
          {NAV_ITEMS.map((item, index) => {
            const Icon = APP_UI_ICONS[item.icon];
            const isActive = workspaceNav === item.id;
            return (
              <div key={item.id}>
                {index === 3 ? <NavDivider /> : null}
                <NavItem
                  type="button"
                  $active={isActive}
                  onClick={() => builderStore.requestWorkspaceNav(item.id)}
                >
                  <NavItemIcon>
                    <Icon width={18} height={18} />
                  </NavItemIcon>
                  {item.label}
                </NavItem>
              </div>
            );
          })}
        </NavList>
        {workspaceNav === 'workspace' ? (
          <NavWorkspaceFooter>
            <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
              Текущая форма
            </T>
            <T font="Body/Body 1 Short" as="p" style={{ marginTop: 4 }}>
              {schema.metadata.title?.trim() || 'Новая форма'}
              {builderStore.isDirty ? ' • не сохранено' : ''}
            </T>
          </NavWorkspaceFooter>
        ) : null}
      </PanelBody>
    </NavPanel>
  );
});
BuilderNav.displayName = 'BuilderNav';
