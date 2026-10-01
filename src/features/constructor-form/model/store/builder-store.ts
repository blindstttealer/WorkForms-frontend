import { makeAutoObservable } from 'mobx';
import type { FieldSpan } from '../../cons/grid';
import type {
  Field,
  FieldType,
  FormSettings,
  FormSchema,
  HeadingField,
  LogicRule,
  ParagraphField,
} from '../schema/form-schema';
import type {
  BuilderMode,
  SelectionTarget,
  ServerTemplateStatus,
  SettingsTab,
  WorkspaceNavSection,
} from './builder-store.types';
import {
  formTemplatesControllerCreate,
  formTemplatesControllerGetById,
  formTemplatesControllerUpdate,
} from '@/api/generated/form-templates/form-templates';
import { templatesWorkspaceStore } from './templates-workspace-store';
import type { FormTemplateDetailDto } from '@/api/generated/model';
import type { CreateFormTemplateDtoSchema } from '@/api/generated/model/createFormTemplateDtoSchema';
import type { CreateFormTemplateDtoStatus } from '@/api/generated/model/createFormTemplateDtoStatus';
import { parseFormTemplateSchema } from '@/features/form-templates/api/parse-api-schema';
import { createFieldByType } from '../registry/field-registry';
import { inferQuickTextField } from '../engines/infer-quick-text-field';
import {
  addCrossFieldRule,
  addFieldToStep,
  addStep,
  moveField,
  removeField,
  removeStep,
  reorderFieldInStep,
  reorderSteps,
  setCrossFieldRules,
  updateField,
  updateFieldLogic,
  updateSchemaMetadata,
  updateSchemaSettings,
  updateStep,
} from '../schema/schema-mutations';
import { createEmptySchema } from '../schema/create-empty-schema';
import {
  exportSchemaJson,
  importSchemaJson,
  loadSchemaFromStorage,
  loadServerRecordIdFromStorage,
  loadServerStatusFromStorage,
  saveSchemaToStorage,
  saveServerRecordIdToStorage,
  saveServerStatusToStorage,
} from '../../utils/schema-storage';
export type {
  BuilderMode,
  SelectionTarget,
  SettingsTab,
  WorkspaceNavSection,
} from './builder-store.types';
export class BuilderStore {
  schema: FormSchema;
  mode: BuilderMode = 'builder';
  workspaceNav: WorkspaceNavSection = 'workspace';
  selectedStepId: string | null = null;
  selectedFieldId: string | null = null;
  selectionTarget: SelectionTarget = 'form';
  settingsTab: SettingsTab = 'general';
  settingsOpen = false;
  serverTemplateId: string | null = loadServerRecordIdFromStorage();
  serverStatus: ServerTemplateStatus | null = loadServerStatusFromStorage();
  isSaving = false;
  private schemaSnapshot = '';
  constructor(initial?: FormSchema) {
    this.schema = initial ?? loadSchemaFromStorage() ?? createEmptySchema();
    this.selectedStepId = this.schema.steps[0]?.id ?? null;
    this.syncSchemaSnapshot();
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get isDirty(): boolean {
    return exportSchemaJson(this.schema) !== this.schemaSnapshot;
  }
  private syncSchemaSnapshot() {
    this.schemaSnapshot = exportSchemaJson(this.schema);
  }
  markDirty() {}
  requestWorkspaceNav(section: WorkspaceNavSection): boolean {
    if (section === this.workspaceNav) return true;
    if (
      this.isDirty &&
      this.workspaceNav === 'workspace' &&
      section !== 'workspace' &&
      typeof window !== 'undefined' &&
      !window.confirm('Есть несохранённые изменения. Перейти без сохранения?')
    ) {
      return false;
    }
    this.workspaceNav = section;
    if (section === 'templates') {
      void templatesWorkspaceStore.loadActive();
    }
    if (section === 'archive') {
      void templatesWorkspaceStore.loadArchive();
    }
    return true;
  }
  get sortedSteps() {
    return [...this.schema.steps].sort((a, b) => a.order - b.order);
  }
  get selectedStep() {
    return this.schema.steps.find((step) => step.id === this.selectedStepId) ?? null;
  }
  get selectedField(): {
    stepId: string;
    field: Field;
  } | null {
    if (!this.selectedFieldId) return null;
    for (const step of this.schema.steps) {
      const field = step.fields.find((item) => item.id === this.selectedFieldId);
      if (field) return { stepId: step.id, field };
    }
    return null;
  }
  setMode(mode: BuilderMode) {
    this.mode = mode;
  }
  setWorkspaceNav(section: WorkspaceNavSection) {
    this.requestWorkspaceNav(section);
  }
  selectForm() {
    this.selectionTarget = 'form';
    this.selectedFieldId = null;
    this.settingsTab = 'general';
    this.settingsOpen = true;
  }
  selectStep(stepId: string) {
    this.selectionTarget = 'step';
    this.selectedStepId = stepId;
    this.selectedFieldId = null;
    this.settingsTab = 'general';
    this.settingsOpen = true;
  }
  selectField(stepId: string, fieldId: string) {
    this.selectionTarget = 'field';
    this.selectedStepId = stepId;
    this.selectedFieldId = fieldId;
    this.settingsTab = 'field';
    this.settingsOpen = true;
  }
  setSettingsTab(tab: SettingsTab) {
    this.settingsTab = tab;
    this.settingsOpen = true;
  }
  openSettings() {
    this.settingsOpen = true;
  }
  closeSettings() {
    this.settingsOpen = false;
  }
  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }
  resetSchema() {
    this.schema = createEmptySchema();
    this.selectedStepId = this.schema.steps[0]?.id ?? null;
    this.selectedFieldId = null;
    this.selectionTarget = 'form';
    this.clearServerBinding();
    this.syncSchemaSnapshot();
  }
  detachServerTemplate(): void {
    this.serverTemplateId = null;
    this.serverStatus = null;
    saveServerRecordIdToStorage(null);
    saveServerStatusToStorage(null);
  }
  private clearServerBinding() {
    this.detachServerTemplate();
  }
  private applyServerDetail(detail: FormTemplateDetailDto) {
    this.serverTemplateId = detail.id;
    this.serverStatus = detail.status;
    this.schema = parseFormTemplateSchema(detail.schema);
    this.selectedStepId = this.sortedSteps[0]?.id ?? null;
    saveServerRecordIdToStorage(detail.id);
    saveServerStatusToStorage(detail.status);
    saveSchemaToStorage(this.schema);
    this.syncSchemaSnapshot();
  }
  async openServerTemplate(id: string) {
    const detail = await formTemplatesControllerGetById(id);
    this.applyServerDetail(detail);
    this.selectedFieldId = null;
    this.selectionTarget = 'form';
    this.workspaceNav = 'workspace';
  }
  updateMetadata(patch: Partial<FormSchema['metadata']>) {
    this.schema = updateSchemaMetadata(this.schema, patch);
  }
  updateSettings(patch: Partial<FormSettings>) {
    this.schema = updateSchemaSettings(this.schema, patch);
  }
  addNewStep() {
    this.schema = addStep(this.schema);
    const last = this.sortedSteps.at(-1);
    if (last) this.selectStep(last.id);
  }
  deleteStep(stepId: string) {
    this.schema = removeStep(this.schema, stepId);
    if (this.selectedStepId === stepId) {
      this.selectedStepId = this.sortedSteps[0]?.id ?? null;
      this.selectedFieldId = null;
      this.selectionTarget = 'form';
    }
  }
  patchStep(stepId: string, patch: Parameters<typeof updateStep>[2]) {
    this.schema = updateStep(this.schema, stepId, patch);
  }
  reorderStep(fromIndex: number, toIndex: number) {
    this.schema = reorderSteps(this.schema, fromIndex, toIndex);
  }
  addFieldFromPalette(stepId: string, type: FieldType, index?: number, span?: FieldSpan) {
    const field = createFieldByType(type);
    if (span) {
      field.ui = { ...field.ui, span };
    }
    this.schema = addFieldToStep(this.schema, stepId, field, index);
    this.selectField(stepId, field.id);
  }
  addQuickTextField(stepId: string, index: number, text: string, span?: FieldSpan) {
    const inferred = inferQuickTextField(text);
    if (!inferred) return;
    if (inferred.kind === 'heading') {
      const field = createFieldByType('heading') as HeadingField;
      field.label = inferred.text;
      field.level = inferred.level;
      if (span) {
        field.ui = { ...field.ui, span };
      }
      this.schema = addFieldToStep(this.schema, stepId, field, index);
      this.selectField(stepId, field.id);
      return;
    }
    const field = createFieldByType('paragraph') as ParagraphField;
    field.content = inferred.text;
    if (span) {
      field.ui = { ...field.ui, span };
    }
    this.schema = addFieldToStep(this.schema, stepId, field, index);
    this.selectField(stepId, field.id);
  }
  deleteField(stepId: string, fieldId: string) {
    this.schema = removeField(this.schema, stepId, fieldId);
    if (this.selectedFieldId === fieldId) {
      this.selectedFieldId = null;
      this.selectionTarget = 'step';
    }
  }
  patchField(stepId: string, fieldId: string, patch: Partial<Field>) {
    this.schema = updateField(this.schema, stepId, fieldId, patch);
  }
  moveFieldBetweenSteps(fromStepId: string, toStepId: string, fieldId: string, toIndex: number) {
    this.schema = moveField(this.schema, fromStepId, toStepId, fieldId, toIndex);
  }
  reorderField(stepId: string, fromIndex: number, toIndex: number) {
    this.schema = reorderFieldInStep(this.schema, stepId, fromIndex, toIndex);
  }
  setFieldLogic(stepId: string, fieldId: string, logic: LogicRule[]) {
    this.schema = updateFieldLogic(this.schema, stepId, fieldId, logic);
  }
  addCrossRule() {
    this.schema = addCrossFieldRule(this.schema);
  }
  replaceCrossRules(rules: FormSchema['crossFieldRules']) {
    this.schema = setCrossFieldRules(this.schema, rules ?? []);
  }
  persistSchema() {
    saveSchemaToStorage(this.schema);
  }
  async saveToServer(status?: ServerTemplateStatus): Promise<void> {
    this.isSaving = true;
    try {
      saveSchemaToStorage(this.schema);
      const detail = this.serverTemplateId
        ? await formTemplatesControllerUpdate(this.serverTemplateId, {
            schema: this.schema as unknown as CreateFormTemplateDtoSchema,
            ...(status ? { status: status as CreateFormTemplateDtoStatus } : {}),
          })
        : await formTemplatesControllerCreate({
            schema: this.schema as unknown as CreateFormTemplateDtoSchema,
            status: (status ?? 'DRAFT') as CreateFormTemplateDtoStatus,
          });
      this.applyServerDetail(detail);
      void templatesWorkspaceStore.refreshAll();
    } finally {
      this.isSaving = false;
    }
  }
  async publishToServer(): Promise<void> {
    await this.saveToServer('PUBLISHED');
  }
  loadFromStorage() {
    const stored = loadSchemaFromStorage();
    if (stored) {
      this.schema = stored;
      this.selectedStepId = this.sortedSteps[0]?.id ?? null;
    }
  }
  exportJson(): string {
    return exportSchemaJson(this.schema);
  }
  importJson(raw: string) {
    this.schema = importSchemaJson(raw);
    this.selectedStepId = this.sortedSteps[0]?.id ?? null;
    this.selectedFieldId = null;
    this.selectionTarget = 'form';
    this.clearServerBinding();
    this.syncSchemaSnapshot();
  }
}
export const builderStore = new BuilderStore();
