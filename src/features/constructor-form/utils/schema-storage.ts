import { getFromLocalStorage, saveToLocalStorage } from '@/shared/utils/localStorage';
import type { FormSchema, FormSubmission } from '../model/schema/form-schema';
const SCHEMA_KEY = 'constructor-form:schema';
const SUBMISSIONS_KEY = 'constructor-form:submissions';
const SERVER_RECORD_ID_KEY = 'constructor-form:server-record-id';
const SERVER_STATUS_KEY = 'constructor-form:server-status';
export type StoredServerStatus = 'DRAFT' | 'PUBLISHED';
export function loadSchemaFromStorage(): FormSchema | null {
  return getFromLocalStorage<FormSchema>(SCHEMA_KEY);
}
export function saveSchemaToStorage(schema: FormSchema): void {
  saveToLocalStorage(SCHEMA_KEY, schema);
}
export function loadServerRecordIdFromStorage(): string | null {
  return getFromLocalStorage<string>(SERVER_RECORD_ID_KEY);
}
export function saveServerRecordIdToStorage(id: string | null): void {
  if (!id) {
    localStorage.removeItem(SERVER_RECORD_ID_KEY);
    return;
  }
  saveToLocalStorage(SERVER_RECORD_ID_KEY, id);
}
export function loadServerStatusFromStorage(): StoredServerStatus | null {
  return getFromLocalStorage<StoredServerStatus>(SERVER_STATUS_KEY);
}
export function saveServerStatusToStorage(status: StoredServerStatus | null): void {
  if (!status) {
    localStorage.removeItem(SERVER_STATUS_KEY);
    return;
  }
  saveToLocalStorage(SERVER_STATUS_KEY, status);
}
export function loadSubmissionsFromStorage(): FormSubmission[] {
  return getFromLocalStorage<FormSubmission[]>(SUBMISSIONS_KEY) ?? [];
}
export function saveSubmissionToStorage(submission: FormSubmission): void {
  const existing = loadSubmissionsFromStorage();
  saveToLocalStorage(SUBMISSIONS_KEY, [...existing, submission]);
}
export function exportSchemaJson(schema: FormSchema): string {
  return JSON.stringify(schema, null, 2);
}
export function importSchemaJson(raw: string): FormSchema {
  const parsed = JSON.parse(raw) as FormSchema;
  if (!parsed.id || !parsed.steps) {
    throw new Error('Некорректная схема формы');
  }
  return parsed;
}
