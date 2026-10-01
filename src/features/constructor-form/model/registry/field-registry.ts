import { nanoid } from 'nanoid';
import type {
  CheckboxField,
  DividerField,
  Field,
  FieldPaletteCategory,
  FieldType,
  HeadingField,
  InputField,
  InputFieldType,
  ParagraphField,
  RadioField,
  SelectField,
} from '../schema/form-schema';
import type { PaletteItem } from './field-registry.types';
export type { PaletteItem } from './field-registry.types';
function createId(prefix: string): string {
  return `${prefix}_${nanoid(8)}`;
}
function baseInput(type: InputFieldType, label: string, partial?: Partial<InputField>): InputField {
  const id = createId('field');
  return {
    id,
    name: id,
    type,
    label,
    required: false,
    ui: { span: 12 },
    ...partial,
  } as InputField;
}
const defaultOptions = () => [
  { id: createId('opt'), label: 'Вариант 1', value: 'option_1' },
  { id: createId('opt'), label: 'Вариант 2', value: 'option_2' },
];
function paletteEntry(
  type: FieldType,
  category: FieldPaletteCategory,
  label: string,
  description: string,
  example: string,
  create: () => Field,
): PaletteItem {
  return { type, category, label, description, example, create };
}
export const FIELD_PALETTE: PaletteItem[] = [
  paletteEntry(
    'text',
    'input',
    'Текст',
    'Однострочное текстовое поле для коротких ответов.',
    'Имя, фамилия, название компании',
    () => baseInput('text', 'Текстовое поле'),
  ),
  paletteEntry(
    'textarea',
    'input',
    'Текстовая область',
    'Многострочное поле для развёрнутых ответов.',
    'Комментарий, описание опыта, пожелания',
    () => baseInput('textarea', 'Текстовая область'),
  ),
  paletteEntry(
    'email',
    'input',
    'Email',
    'Поле с валидацией формата email.',
    'contact@company.com',
    () => baseInput('email', 'Email'),
  ),
  paletteEntry(
    'password',
    'input',
    'Пароль',
    'Скрытый ввод для паролей и секретов.',
    'Пароль при регистрации',
    () => baseInput('password', 'Пароль'),
  ),
  paletteEntry(
    'tel',
    'input',
    'Телефон',
    'Поле для номера телефона с маской ввода.',
    '+7 (999) 123-45-67',
    () => baseInput('tel', 'Телефон'),
  ),
  paletteEntry(
    'url',
    'input',
    'URL',
    'Поле для ссылок на сайты и профили.',
    'https://portfolio.example.com',
    () => baseInput('url', 'Ссылка'),
  ),
  paletteEntry(
    'number',
    'input',
    'Число',
    'Числовой ввод с min/max и шагом.',
    'Возраст, количество лет опыта, зарплата',
    () => baseInput('number', 'Число'),
  ),
  paletteEntry(
    'date',
    'input',
    'Дата',
    'Выбор даты из календаря.',
    'Дата начала работы, день рождения',
    () => baseInput('date', 'Дата'),
  ),
  paletteEntry(
    'time',
    'input',
    'Время',
    'Выбор времени суток.',
    'Удобное время для звонка — 14:30',
    () => baseInput('time', 'Время'),
  ),
  paletteEntry(
    'slider',
    'input',
    'Слайдер',
    'Выбор значения на шкале перетаскиванием.',
    'Уровень владения навыком от 0 до 100',
    () => baseInput('slider', 'Слайдер', { defaultValue: 50 }),
  ),
  paletteEntry(
    'switch',
    'input',
    'Переключатель',
    'Булевый выбор «да / нет».',
    'Согласие на обработку данных, удалённая работа',
    () => baseInput('switch', 'Переключатель', { defaultValue: false }),
  ),
  paletteEntry(
    'file',
    'media',
    'Файл',
    'Загрузка документов и изображений.',
    'Резюме PDF, портфолио, сертификат',
    () => baseInput('file', 'Файл', { multiple: false }),
  ),
  paletteEntry(
    'select',
    'choice',
    'Выпадающий список',
    'Выбор одного значения из списка.',
    'Город, грейд, формат занятости',
    (): SelectField => ({
      ...(baseInput('select', 'Выберите значение') as SelectField),
      options: defaultOptions(),
    }),
  ),
  paletteEntry(
    'radio',
    'choice',
    'Radio',
    'Выбор одного варианта из видимого списка.',
    'Пол, тип занятости (офис / гибрид / удалёнка)',
    (): RadioField => ({
      ...(baseInput('radio', 'Выберите один') as RadioField),
      options: defaultOptions(),
    }),
  ),
  paletteEntry(
    'checkbox',
    'choice',
    'Checkbox',
    'Множественный выбор нескольких опций.',
    'Навыки, языки, интересующие направления',
    (): CheckboxField => ({
      ...(baseInput('checkbox', 'Выберите несколько') as CheckboxField),
      defaultValue: [],
      options: defaultOptions(),
    }),
  ),
  paletteEntry(
    'heading',
    'layout',
    'Заголовок',
    'Заголовок секции формы без сохранения в ответ.',
    '«Личные данные», «Опыт работы»',
    (): HeadingField => ({
      id: createId('field'),
      type: 'heading',
      label: 'Заголовок',
      level: 2,
      ui: { span: 12 },
    }),
  ),
  paletteEntry(
    'paragraph',
    'layout',
    'Параграф',
    'Поясняющий текст или инструкция для пользователя.',
    '«Заполните данные как в паспорте»',
    (): ParagraphField => ({
      id: createId('field'),
      type: 'paragraph',
      content: 'Текст параграфа',
      ui: { span: 12 },
    }),
  ),
  paletteEntry(
    'divider',
    'layout',
    'Разделитель',
    'Визуальная линия между блоками формы.',
    'Отделить контактные данные от опыта',
    (): DividerField => ({
      id: createId('field'),
      type: 'divider',
      ui: { span: 12 },
    }),
  ),
];
export const PALETTE_CATEGORIES: {
  id: FieldPaletteCategory;
  label: string;
}[] = [
  { id: 'input', label: 'Поля ввода' },
  { id: 'choice', label: 'Выбор' },
  { id: 'layout', label: 'Разметка' },
  { id: 'media', label: 'Медиа' },
];
export function createFieldByType(type: FieldType): Field {
  const item = FIELD_PALETTE.find((entry) => entry.type === type);
  if (!item) {
    return baseInput('text', 'Текстовое поле');
  }
  return item.create();
}
export function getFieldTypeLabel(type: FieldType): string {
  return FIELD_PALETTE.find((entry) => entry.type === type)?.label ?? type;
}
export function getPaletteItem(type: FieldType): PaletteItem | undefined {
  return FIELD_PALETTE.find((entry) => entry.type === type);
}
