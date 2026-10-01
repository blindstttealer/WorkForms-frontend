import type { CheckboxOptionItem, SelectOptionItem, SettingsTabId } from './types';
export const skillsOptions: CheckboxOptionItem[] = [
  { id: '1', value: 'JavaScript' },
  { id: '2', value: 'Python' },
  { id: '3', value: 'Java' },
  { id: '4', value: 'React' },
  { id: '5', value: 'Node.js' },
  { id: '6', value: 'SQL' },
  { id: '7', value: 'Управление проектами' },
  { id: '8', value: 'Анализ данных' },
  { id: '9', value: 'Маркетинг' },
];
export const employmentTypesOptions: CheckboxOptionItem[] = [
  { id: '1', value: 'Полная занятость' },
  { id: '2', value: 'Частичная занятость' },
  { id: '3', value: 'Контракт' },
  { id: '4', value: 'Фриланс' },
  { id: '5', value: 'Стажировка' },
];
export const preferredIndustriesOptions: CheckboxOptionItem[] = [
  { id: '1', value: 'Технологии' },
  { id: '2', value: 'Здравоохранение' },
  { id: '3', value: 'Финансы' },
  { id: '4', value: 'Образование' },
  { id: '5', value: 'Маркетинг' },
  { id: '6', value: 'Продажи' },
  { id: '7', value: 'Розничная торговля' },
  { id: '8', value: 'Производство' },
  { id: '9', value: 'Гостиничный бизнес' },
  { id: '10', value: 'Консалтинг' },
];
export const experienceOptions: SelectOptionItem[] = [
  { value: '0-1', label: '0-1 год' },
  { value: '1-3', label: '1-3 года' },
  { value: '3-5', label: '3-5 лет' },
  { value: '5-10', label: '5-10 лет' },
  { value: '10+', label: '10+ лет' },
];
export const locationOptions: SelectOptionItem[] = [
  { value: 'Moscow', label: 'Moscow' },
  { value: 'Saint-Petersburg', label: 'Saint-Petersburg' },
  { value: 'Omsk', label: 'Omsk' },
];
export const workLocationOptions: SelectOptionItem[] = [
  { value: 'remote', label: 'Только удаленно' },
  { value: 'office', label: 'Только в офисе' },
  { value: 'hybrid', label: 'Гибридный формат' },
];
export const languageOptions: SelectOptionItem[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];
export type SettingsTabMeta = {
  id: SettingsTabId;
  text: string;
  hint: string;
};
export const SETTINGS_TABS: readonly SettingsTabMeta[] = [
  {
    id: 'profile',
    text: 'Профиль',
    hint: 'Как вас видят работодатели: имя, роль, опыт, фото и навыки.',
  },
  {
    id: 'work',
    text: 'Работа',
    hint: 'Тип занятости, формат, зарплатные ожидания и отрасли.',
  },
  {
    id: 'notifications',
    text: 'Уведомления',
    hint: 'Когда и как присылать новости по вакансиям и откликам.',
  },
  {
    id: 'privacy',
    text: 'Приватность',
    hint: 'Что показывать в профиле и кому можно писать.',
  },
  {
    id: 'account',
    text: 'Аккаунт',
    hint: 'Язык интерфейса и данные входа.',
  },
] as const;
