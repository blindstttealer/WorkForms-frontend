import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, T, Spinner } from '@admiral-ds/react-ui';
import { builderStore } from '../../../model/store/builder-store';
import { templatesWorkspaceStore } from '../../../model/store/templates-workspace-store';
import { useAppToast } from '@/shared/hooks/useAppToast';
import type { ConstructorTemplateListItem } from '../../../model/store/templates-workspace-store';
import {
  TemplateCard,
  TemplateCardActions,
  TemplateCardTop,
  TemplatesPanelHeader,
  TemplatesPanelShell,
  TemplatesPanelTitle,
  TemplatesScroll,
} from '../templates-panel/styles';
function ArchiveCardItem({ item }: { item: ConstructorTemplateListItem }) {
  const { showErrorToast, showSuccessToast } = useAppToast();
  const restore = async () => {
    try {
      await templatesWorkspaceStore.runLifecycle(item.id, 'restore');
      showSuccessToast('Шаблон восстановлен в Templates');
    } catch {
      showErrorToast('Не удалось восстановить');
    }
  };
  const permanentDelete = async () => {
    if (!window.confirm(`Удалить «${item.title}» безвозвратно? Это действие нельзя отменить.`)) {
      return;
    }
    try {
      const linkedToWorkspace = builderStore.serverTemplateId === item.id;
      await templatesWorkspaceStore.permanentDelete(item.id);
      if (linkedToWorkspace) {
        builderStore.detachServerTemplate();
        showSuccessToast(
          'Шаблон удалён на сервере. Локальная копия осталась в My workspace — «Сохранить» создаст новый черновик.',
        );
      } else {
        showSuccessToast('Шаблон удалён безвозвратно');
      }
    } catch {
      showErrorToast('Не удалось удалить');
    }
  };
  return (
    <TemplateCard>
      <TemplateCardTop>
        <T font="Subtitle/Subtitle 3" as="h3">
          {item.title}
        </T>
      </TemplateCardTop>
      <TemplateCardActions>
        <Button dimension="s" appearance="primary" onClick={() => void restore()}>
          Восстановить
        </Button>
        <Button dimension="s" appearance="secondary" onClick={() => void permanentDelete()}>
          Удалить навсегда
        </Button>
      </TemplateCardActions>
    </TemplateCard>
  );
}
export const ArchivePanel = observer(function ArchivePanel() {
  useEffect(() => {
    void templatesWorkspaceStore.loadArchive();
  }, []);
  const { archiveItems, isLoadingArchive, loadError } = templatesWorkspaceStore;
  return (
    <TemplatesPanelShell>
      <TemplatesPanelHeader>
        <TemplatesPanelTitle>Архив</TemplatesPanelTitle>
      </TemplatesPanelHeader>
      <TemplatesScroll>
        {isLoadingArchive ? <Spinner dimension="m" /> : null}
        {loadError ? (
          <T font="Body/Body 2 Short" color="Error/Error 60 Main" as="p">
            {loadError}
          </T>
        ) : null}
        {!isLoadingArchive && !loadError && archiveItems.length === 0 ? (
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
            Архив пуст.
          </T>
        ) : null}
        {archiveItems.map((item) => (
          <ArchiveCardItem key={item.id} item={item} />
        ))}
      </TemplatesScroll>
    </TemplatesPanelShell>
  );
});
