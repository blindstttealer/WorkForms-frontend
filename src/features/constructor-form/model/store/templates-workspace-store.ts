import { makeAutoObservable, runInAction } from 'mobx';
import {
  formTemplatesControllerGetMine,
  formTemplatesControllerRemove,
  formTemplatesControllerUpdateLifecycle,
} from '@/api/generated/form-templates/form-templates';
import type { FormTemplateListItemDto } from '@/api/generated/model';
import { FormTemplatesControllerGetMineBucket } from '@/api/generated/model/formTemplatesControllerGetMineBucket';
import type { UpdateFormTemplateLifecycleDtoAction } from '@/api/generated/model/updateFormTemplateLifecycleDtoAction';
export type ConstructorTemplateListItem = FormTemplateListItemDto;
export type TemplateLifecycleAction = UpdateFormTemplateLifecycleDtoAction;
export class TemplatesWorkspaceStore {
  activeItems: ConstructorTemplateListItem[] = [];
  archiveItems: ConstructorTemplateListItem[] = [];
  isLoadingActive = false;
  isLoadingArchive = false;
  loadError: string | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  async loadActive() {
    this.isLoadingActive = true;
    this.loadError = null;
    try {
      const response = await formTemplatesControllerGetMine({
        bucket: FormTemplatesControllerGetMineBucket.active,
      });
      runInAction(() => {
        this.activeItems = response.items;
        this.isLoadingActive = false;
      });
    } catch {
      runInAction(() => {
        this.activeItems = [];
        this.isLoadingActive = false;
        this.loadError = 'Не удалось загрузить черновики';
      });
    }
  }
  async loadArchive() {
    this.isLoadingArchive = true;
    this.loadError = null;
    try {
      const response = await formTemplatesControllerGetMine({
        bucket: FormTemplatesControllerGetMineBucket.trash,
      });
      runInAction(() => {
        this.archiveItems = response.items;
        this.isLoadingArchive = false;
      });
    } catch {
      runInAction(() => {
        this.archiveItems = [];
        this.isLoadingArchive = false;
        this.loadError = 'Не удалось загрузить архив';
      });
    }
  }
  async refreshAll() {
    await Promise.all([this.loadActive(), this.loadArchive()]);
  }
  async runLifecycle(id: string, action: TemplateLifecycleAction) {
    await formTemplatesControllerUpdateLifecycle(id, { action });
    await this.refreshAll();
  }
  async permanentDelete(id: string) {
    await formTemplatesControllerRemove(id, { permanent: true });
    await this.loadArchive();
  }
}
export const templatesWorkspaceStore = new TemplatesWorkspaceStore();
