import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, T, Spinner } from '@admiral-ds/react-ui';
import { templatesWorkspaceStore } from '../../../model/store/templates-workspace-store';
import { builderStore } from '../../../model/store/builder-store';
import { useAppToast } from '@/shared/hooks/useAppToast';
import type { ConstructorTemplateListItem } from '../../../model/store/templates-workspace-store';
import {
  StatusBadge,
  TemplateCard,
  TemplateCardActions,
  TemplateCardTop,
  TemplatesPanelHeader,
  TemplatesPanelShell,
  TemplatesPanelTitle,
  TemplatesScroll,
} from './styles';
function formatUpdatedAt(iso: string) {
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
function TemplateCardItem({ item }: { item: ConstructorTemplateListItem }) {
  const { showErrorToast, showSuccessToast } = useAppToast();
  const openTemplate = async () => {
    try {
      await builderStore.openServerTemplate(item.id);
    } catch {
      showErrorToast('Не удалось открыть шаблон');
    }
  };
  const archive = async () => {
    try {
      await templatesWorkspaceStore.runLifecycle(item.id, 'archive');
      showSuccessToast('Перенесено в архив');
    } catch {
      showErrorToast('Не удалось архивировать');
    }
  };
  return (
    <TemplateCard>
      <TemplateCardTop>
        <div>
          <T font="Subtitle/Subtitle 3" as="h3">
            {item.title}
          </T>
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 4 }}>
            Обновлено: {formatUpdatedAt(item.updatedAt)}
          </T>
        </div>
        <StatusBadge $variant={item.status === 'PUBLISHED' ? 'published' : 'draft'}>
          {item.status === 'PUBLISHED' ? 'Опубликовано' : 'Черновик'}
        </StatusBadge>
      </TemplateCardTop>
      <TemplateCardActions>
        <Button dimension="s" appearance="primary" onClick={() => void openTemplate()}>
          Открыть
        </Button>
        <Button dimension="s" appearance="secondary" onClick={() => void archive()}>
          Архивировать
        </Button>
      </TemplateCardActions>
    </TemplateCard>
  );
}
export const TemplatesPanel = observer(function TemplatesPanel() {
  useEffect(() => {
    void templatesWorkspaceStore.loadActive();
  }, []);
  const { activeItems, isLoadingActive, loadError } = templatesWorkspaceStore;
  return (
    <TemplatesPanelShell>
      <TemplatesPanelHeader>
        <TemplatesPanelTitle>Templates</TemplatesPanelTitle>
      </TemplatesPanelHeader>
      <TemplatesScroll>
        {isLoadingActive ? <Spinner dimension="m" /> : null}
        {loadError ? (
          <T font="Body/Body 2 Short" color="Error/Error 60 Main" as="p">
            {loadError}
          </T>
        ) : null}
        {!isLoadingActive && !loadError && activeItems.length === 0 ? (
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
            Нет черновиков. Сохраните форму в My workspace — она появится здесь.
          </T>
        ) : null}
        {activeItems.map((item) => (
          <TemplateCardItem key={item.id} item={item} />
        ))}
      </TemplatesScroll>
    </TemplatesPanelShell>
  );
});
