import type { Field } from '@/features/constructor-form';

type FieldOption = { value: string | number; label: string };
type FileLike = { name?: string };

export const formatLabel = (labelOrKey: string) => {
  if (!labelOrKey) return '';
  return String(labelOrKey)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase());
};
export const formatValue = (field: Field, rawVal: unknown) => {
  if (rawVal == null || rawVal === '') return '-';
  const t = 'type' in field ? field.type : undefined;
  if (t === 'date') {
    const d =
      rawVal instanceof Date
        ? rawVal
        : new Date(typeof rawVal === 'string' ? rawVal : String(rawVal));
    return isNaN(d.getTime()) ? String(rawVal) : d.toLocaleDateString();
  }
  if (t === 'time') {
    return String(rawVal);
  }
  if ((t === 'select' || t === 'radio') && 'options' in field && Array.isArray(field.options)) {
    const found = (field.options as FieldOption[]).find(
      (o) => o.value === rawVal || o.value === String(rawVal),
    );
    return found ? found.label : String(rawVal);
  }
  if (
    t === 'checkbox' &&
    'options' in field &&
    Array.isArray(field.options) &&
    Array.isArray(rawVal)
  ) {
    const options = field.options as FieldOption[];
    return (
      rawVal
        .map((v) => {
          const found = options.find((o) => o.value === v);
          return found ? found.label : String(v);
        })
        .join(', ') || '-'
    );
  }
  if (t === 'switch') return rawVal ? 'Да' : 'Нет';
  if (t === 'slider') return String(rawVal);
  if (t === 'file') {
    if (Array.isArray(rawVal) && rawVal.length > 0) {
      return rawVal.map((f) => (f as FileLike).name || 'Файл').join(', ');
    }
    return 'Файл загружен';
  }
  return String(rawVal);
};
