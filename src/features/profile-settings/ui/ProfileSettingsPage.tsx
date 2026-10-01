import type { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  CategoryColorSolid,
  SecuritySafeCertificateSolid,
  SystemNotificationsSolid,
  SystemPersonSolid,
  SystemSettingsSolid,
} from '@admiral-ds/icons';
import { General } from './components/General';
import { WorkPreferences } from './components/WorkPreferences';
import { Notifications } from './components/Notifications';
import { ProfileVisibility } from './components/ProfileVisibility';
import { Account } from './components/Account';
import {
  getSettingsControllerGetSettingsQueryKey,
  useSettingsControllerGetSettings,
  useSettingsControllerSaveSettings,
} from '@/api/generated/settings/settings';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import { toFormDefaults } from '../utils/mergeUserSettings';
import { formatSettingsSaveError } from '../utils/formatSettingsSaveError';
import { useAppToast } from '@/shared/hooks/useAppToast';
import { HorizontalTabs, type TabItem } from '@/components/ui/tab-menu/TabMenu';
import { SETTINGS_TABS } from './const';
import type { SettingsTabId } from './types';
import {
  Banner,
  HeaderSaveButton,
  HeaderTopRow,
  PageShell,
  PageSubtitle,
  PageTitle,
  PageTitleGroup,
  StickyHeader,
  TabBarWrap,
  TabContentViewport,
  TabHint,
  TabSectionStack,
} from './styles';
const TAB_ICONS: Record<SettingsTabId, ReactElement> = {
  profile: <SystemPersonSolid width={20} height={20} />,
  work: <CategoryColorSolid width={20} height={20} />,
  notifications: <SystemNotificationsSolid width={20} height={20} />,
  privacy: <SecuritySafeCertificateSolid width={20} height={20} />,
  account: <SystemSettingsSolid width={20} height={20} />,
};
export const ProfileSettingsPage = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useAppToast();
  const { data, isError, isLoading } = useSettingsControllerGetSettings();
  const saveMutation = useSettingsControllerSaveSettings();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTabId>('profile');
  const methods = useForm<SaveSettingsDto>({
    defaultValues: toFormDefaults(undefined),
  });
  const { reset, handleSubmit } = methods;
  useEffect(() => {
    if (data) {
      reset(toFormDefaults(data));
      setPhotoFile(null);
    }
  }, [data, reset]);
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as SettingsTabId);
  }, []);
  const tabItems: TabItem[] = useMemo(
    () =>
      SETTINGS_TABS.map((tab) => ({
        tabId: tab.id,
        text: tab.text,
        icon: TAB_ICONS[tab.id],
      })),
    [],
  );
  const activeHint = SETTINGS_TABS.find((tab) => tab.id === activeTab)?.hint ?? '';
  const onSubmit = async (values: SaveSettingsDto) => {
    try {
      await saveMutation.mutateAsync({
        data: {
          settings: JSON.stringify(values),
          photo: photoFile ?? undefined,
        },
      });
      await queryClient.invalidateQueries({ queryKey: getSettingsControllerGetSettingsQueryKey() });
      setPhotoFile(null);
      showSuccessToast('Настройки сохранены', 'Профиль');
    } catch (err) {
      showErrorToast(formatSettingsSaveError(err), 'Профиль');
    }
  };
  if (isError) {
    return (
      <PageShell>
        <Banner role="alert">Не удалось загрузить настройки. Проверьте авторизацию и сеть.</Banner>
      </PageShell>
    );
  }
  const avatarSrc = data?.profile?.photo?.trim();
  return (
    <PageShell>
      {isLoading && !data ? <Banner>Загрузка настроек…</Banner> : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <StickyHeader>
            <HeaderTopRow>
              <PageTitleGroup>
                <PageTitle>Настройки профиля</PageTitle>
                <PageSubtitle>
                  Разделы ниже — выберите вкладку. Сохранение вручную: изменения уйдут на сервер
                  после нажатия «Сохранить».
                </PageSubtitle>
              </PageTitleGroup>
              <HeaderSaveButton
                dimension="m"
                appearance="primary"
                type="submit"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Сохранение…' : 'Сохранить'}
              </HeaderSaveButton>
            </HeaderTopRow>
            <TabBarWrap>
              <HorizontalTabs
                tabs={tabItems}
                selectedTabId={activeTab}
                onTabChange={handleTabChange}
                dimension="m"
              />
            </TabBarWrap>
          </StickyHeader>

          <TabHint>{activeHint}</TabHint>

          <TabContentViewport data-settings-tab-panel>
            <TabSectionStack>
              {activeTab === 'profile' ? (
                <General
                  avatarSrc={avatarSrc}
                  onPhotoSelected={setPhotoFile}
                  onPhotoError={(msg) => showErrorToast(msg, 'Фото')}
                />
              ) : null}
              {activeTab === 'work' ? <WorkPreferences /> : null}
              {activeTab === 'notifications' ? <Notifications /> : null}
              {activeTab === 'privacy' ? <ProfileVisibility /> : null}
              {activeTab === 'account' ? (
                <Account emailFromServer={data?.account?.email?.trim() || ''} />
              ) : null}
            </TabSectionStack>
          </TabContentViewport>
        </form>
      </FormProvider>
    </PageShell>
  );
};
