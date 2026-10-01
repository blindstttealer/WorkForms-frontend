import { makeAutoObservable, runInAction } from 'mobx';
import { nanoid } from 'nanoid';
import type { FormSchema } from '@/features/constructor-form';
import { loadPublishedFormTemplates } from '@/features/form-templates/api/load-published-templates';
import { FormInstanceStore } from './form-instance-store';
import { getFromLocalStorage, saveToLocalStorage } from '@/shared/utils/localStorage';
export interface SerializedForm {
  data: Record<string, unknown>;
  step: number;
  name: string;
  templateId?: string;
}
export type FormListItem = {
  id: string;
  step: number;
  data: Record<string, unknown>;
  name: string;
  templateId?: string;
};
const LS_KEY_FORMS = 'myForms';
const LS_KEY_LAST_ACTIVE = 'myForms:lastActive';
export class MultiFormManager {
  private forms: Record<string, FormInstanceStore> = {};
  private currentFormId: string | null = null;
  templates: Record<string, FormSchema> = {};
  isTemplatesLoading = false;
  templatesLoadError: string | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadForms();
  }
  async loadTemplates(): Promise<FormSchema[]> {
    try {
      runInAction(() => {
        this.isTemplatesLoading = true;
        this.templatesLoadError = null;
      });
      const loadedTemplates = await loadPublishedFormTemplates();
      runInAction(() => {
        this.templates = loadedTemplates;
        this.isTemplatesLoading = false;
      });
      return Object.values(loadedTemplates);
    } catch {
      runInAction(() => {
        this.templates = {};
        this.isTemplatesLoading = false;
        this.templatesLoadError = 'Не удалось загрузить шаблоны форм';
      });
      return [];
    }
  }
  createFromTemplate(templateId: string, name?: string) {
    const template = this.templates[templateId];
    if (!template) throw new Error('Template not found: ' + templateId);
    const id = `form_${nanoid()}`;
    const form = new FormInstanceStore(id, {}, 1, name ?? template.metadata.title, templateId);
    runInAction(() => {
      this.forms[id] = form;
      this.currentFormId = id;
      this.saveForms();
    });
    return form;
  }
  getForm(formId: string) {
    return this.forms[formId];
  }
  get currentForm() {
    return this.currentFormId ? this.forms[this.currentFormId] : undefined;
  }
  switchForm(formId: string) {
    if (!this.forms[formId]) return;
    runInAction(() => {
      this.currentFormId = formId;
      this.saveForms();
    });
  }
  deleteForm(formId: string) {
    if (!this.forms[formId]) return;
    runInAction(() => {
      delete this.forms[formId];
      if (this.currentFormId === formId) {
        this.currentFormId = Object.keys(this.forms)[0] || null;
      }
      this.saveForms();
    });
  }
  editForm(formId: string, newName: string) {
    const form = this.forms[formId];
    if (!form) return;
    form.setName(newName);
    this.saveForms();
  }
  saveForms() {
    const payload = Object.entries(this.forms).reduce<Record<string, SerializedForm>>(
      (acc, [id, form]) => {
        acc[id] = form.serialize();
        return acc;
      },
      {},
    );
    saveToLocalStorage(LS_KEY_FORMS, payload);
    saveToLocalStorage(LS_KEY_LAST_ACTIVE, this.currentFormId);
  }
  private loadForms() {
    const saved = getFromLocalStorage<Record<string, SerializedForm>>(LS_KEY_FORMS);
    const last = getFromLocalStorage<string>(LS_KEY_LAST_ACTIVE);
    if (!saved) return;
    runInAction(() => {
      Object.entries(saved).forEach(([id, s]) => {
        this.forms[id] = new FormInstanceStore(id, s.data, s.step, s.name, s.templateId);
      });
      if (last && this.forms[last]) this.currentFormId = last;
      else this.currentFormId = Object.keys(this.forms)[0] || null;
    });
  }
  get formList() {
    return Object.values(this.forms).map((f) => ({
      id: f.id,
      step: f.step,
      data: { ...f.data },
      name: f.name,
      templateId: f.templateId,
    }));
  }
  get templatesLoading() {
    return this.isTemplatesLoading;
  }
}
export const formManager = new MultiFormManager();
