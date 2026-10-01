import type { FormSchema } from '@/features/constructor-form/model/schema/form-schema';
import { importSchemaJson } from '@/features/constructor-form/utils/schema-storage';
export function parseFormTemplateSchema(schema: unknown): FormSchema {
  return importSchemaJson(JSON.stringify(schema));
}
