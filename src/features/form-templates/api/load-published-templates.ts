import type { FormSchema } from '@/features/constructor-form';
import {
  formTemplatesControllerGetByKey,
  formTemplatesControllerGetCatalog,
} from '@/api/generated/form-templates/form-templates';
import { parseFormTemplateSchema } from './parse-api-schema';
export async function loadPublishedFormTemplates(): Promise<Record<string, FormSchema>> {
  const catalog = await formTemplatesControllerGetCatalog();
  const entries = await Promise.all(
    catalog.items.map(async (item) => {
      const detail = await formTemplatesControllerGetByKey(item.schemaKey);
      const schema = parseFormTemplateSchema(detail.schema);
      return [item.schemaKey, schema] as const;
    }),
  );
  return Object.fromEntries(entries);
}
export async function loadPublishedFormTemplatesDevFallback(): Promise<Record<string, FormSchema>> {
  const res = await fetch('/fields.json', { cache: 'no-store' });
  if (!res.ok) return {};
  const json = await res.json();
  const list: FormSchema[] = Array.isArray(json) ? json : json.forms || [];
  return Object.fromEntries(list.map((schema) => [schema.id, schema]));
}
