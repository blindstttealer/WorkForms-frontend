import { isAxiosError } from 'axios';
type ClassValidatorItem = {
  property?: string;
  constraints?: Record<string, string>;
};
function firstConstraintMessage(item: ClassValidatorItem): string | undefined {
  const c = item.constraints;
  if (!c) return undefined;
  const values = Object.values(c);
  return values.find((v): v is string => typeof v === 'string');
}
export function formatSettingsSaveError(err: unknown): string {
  if (!isAxiosError(err)) {
    return 'Не удалось сохранить настройки';
  }
  const data = err.response?.data as {
    message?: unknown;
  };
  const msg = data?.message;
  if (Array.isArray(msg)) {
    const first = msg[0] as ClassValidatorItem;
    const detail = firstConstraintMessage(first);
    if (detail) return detail;
    if (typeof first?.property === 'string') {
      return `Проверьте поле «${first.property}»`;
    }
  }
  if (typeof msg === 'string') {
    return msg;
  }
  return 'Не удалось сохранить настройки';
}
