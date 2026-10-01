export interface FormSchema {
  id: string;
  version: number;
  metadata: FormMetadata;
  settings: FormSettings;
  steps: FormStep[];
  crossFieldRules?: CrossFieldRule[];
}
export interface FormMetadata {
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  tags?: string[];
}
export interface FormSettings {
  submitButtonText?: string;
  allowDraft?: boolean;
  allowMultipleSubmissions?: boolean;
  showProgressBar?: boolean;
  showStepNumbers?: boolean;
  successMessage?: string;
}
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  order: number;
  isSkippable?: boolean;
  allowBack?: boolean;
  layout?: StepLayout;
  fields: Field[];
}
export interface StepLayout {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: number;
}
export interface FieldUI {
  span?: 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12;
  hidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}
export interface Option {
  id: string;
  label: string;
  value: string;
}
export interface TextValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}
export interface NumberValidation {
  min?: number;
  max?: number;
  step?: number;
  message?: string;
}
export interface DateValidation {
  min?: string;
  max?: string;
  message?: string;
}
export interface TimeValidation {
  min?: string;
  max?: string;
  message?: string;
}
export interface FileValidation {
  allowedExtensions?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  message?: string;
}
export interface OptionsValidation {
  minSelected?: number;
  maxSelected?: number;
  message?: string;
}
export interface BaseInputField {
  id: string;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  ui?: FieldUI;
  logic?: LogicRule[];
}
export interface TextField extends BaseInputField {
  type: 'text';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface TextareaField extends BaseInputField {
  type: 'textarea';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface EmailField extends BaseInputField {
  type: 'email';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface PasswordField extends BaseInputField {
  type: 'password';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface PhoneField extends BaseInputField {
  type: 'tel';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface UrlField extends BaseInputField {
  type: 'url';
  defaultValue?: string;
  validation?: TextValidation;
}
export interface NumberField extends BaseInputField {
  type: 'number';
  defaultValue?: number;
  validation?: NumberValidation;
}
export interface DateField extends BaseInputField {
  type: 'date';
  defaultValue?: string;
  validation?: DateValidation;
}
export interface TimeField extends BaseInputField {
  type: 'time';
  defaultValue?: string;
  validation?: TimeValidation;
}
export interface SliderField extends BaseInputField {
  type: 'slider';
  defaultValue?: number;
  validation?: NumberValidation;
}
export interface SwitchField extends BaseInputField {
  type: 'switch';
  defaultValue?: boolean;
}
export interface FileField extends BaseInputField {
  type: 'file';
  defaultValue?: string | string[];
  multiple?: boolean;
  validation?: FileValidation;
}
export interface SelectField extends BaseInputField {
  type: 'select';
  defaultValue?: string;
  options: Option[];
  validation?: OptionsValidation;
}
export interface RadioField extends BaseInputField {
  type: 'radio';
  defaultValue?: string;
  options: Option[];
  validation?: OptionsValidation;
}
export interface CheckboxField extends BaseInputField {
  type: 'checkbox';
  defaultValue?: string[];
  options: Option[];
  validation?: OptionsValidation;
}
export interface HeadingField {
  id: string;
  type: 'heading';
  label: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  ui?: Pick<FieldUI, 'span' | 'hidden'>;
}
export interface ParagraphField {
  id: string;
  type: 'paragraph';
  content: string;
  ui?: Pick<FieldUI, 'span' | 'hidden'>;
}
export interface DividerField {
  id: string;
  type: 'divider';
  ui?: Pick<FieldUI, 'span' | 'hidden'>;
}
export interface LogicRule {
  when: LogicCondition;
  actions: LogicAction[];
}
export interface LogicCondition {
  fieldId: string;
  operator: LogicOperator;
  value?: unknown;
}
export interface LogicAction {
  type: LogicActionType;
  targetId?: string;
  value?: unknown;
}
export interface CrossFieldRule {
  id: string;
  when: LogicCondition[];
  message: string;
}
export type SubmissionStatus = 'draft' | 'submitted';
export interface FormSubmission {
  formId: string;
  formVersion: number;
  status: SubmissionStatus;
  values: Record<string, unknown>;
  currentStepId?: string;
  submittedAt?: string;
  meta?: FormSubmissionMeta;
}
export interface FormSubmissionMeta {
  userId?: string;
  source?: string;
}
export type FieldPaletteCategory = 'input' | 'choice' | 'layout' | 'media';
export interface FieldDefinition<T extends InputField = InputField> {
  type: InputFieldType;
  category: FieldPaletteCategory;
  label: string;
  create: (config?: Partial<T>) => T;
  defaultValue: T extends {
    defaultValue?: infer V;
  }
    ? V
    : unknown;
}
export type InputField =
  | TextField
  | TextareaField
  | EmailField
  | PasswordField
  | PhoneField
  | UrlField
  | NumberField
  | DateField
  | TimeField
  | SliderField
  | SwitchField
  | FileField
  | SelectField
  | RadioField
  | CheckboxField;
export type LayoutField = HeadingField | ParagraphField | DividerField;
export type Field = InputField | LayoutField;
export type InputFieldType = InputField['type'];
export type FieldType = Field['type'];
export type LogicOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'includes'
  | 'greaterThan'
  | 'greaterOrEqual'
  | 'lessThan'
  | 'lessOrEqual'
  | 'isEmpty'
  | 'isNotEmpty';
export type LogicActionType =
  | 'show'
  | 'hide'
  | 'enable'
  | 'disable'
  | 'require'
  | 'optional'
  | 'setValue'
  | 'clearValue'
  | 'goToStep';
export function isInputField(field: Field): field is InputField {
  return field.type !== 'heading' && field.type !== 'paragraph' && field.type !== 'divider';
}
export function isLayoutField(field: Field): field is LayoutField {
  return !isInputField(field);
}
export function hasOptions(field: Field): field is SelectField | RadioField | CheckboxField {
  return field.type === 'select' || field.type === 'radio' || field.type === 'checkbox';
}
