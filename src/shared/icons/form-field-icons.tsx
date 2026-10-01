import {
  CategoryClipboardOutline,
  CategoryComponentOutline,
  CommunicationPhoneOutline,
  DocumentsFilePDFOutline,
  RedactAmountOutline,
  RedactBorderHorizontalOutline,
  RedactFormatAlignJustifyOutline,
  RedactTextBoldOutline,
  RedactWrapOutline,
  SecurityPasswordOutline,
  ServiceAgreedOutline,
  ServiceIntervalOutline,
  ServiceReadCheckOutline,
  ServiceSizeChangerHorizontalOutline,
  SystemAttachFileOutline,
  SystemCalendarOutline,
  SystemEmailOutline,
  SystemHierarchyOutline,
  SystemLinkOutline,
  SystemSwitchPinnedAreasOutline,
  SystemTimeOutline,
} from '@admiral-ds/icons';
import { ICON_SIZE_SM } from './constants';
import type { FormFieldPaletteCategory, FormFieldType, IconComponent } from './types';
export const FORM_FIELD_TYPE_ICONS: Record<FormFieldType, IconComponent> = {
  text: RedactTextBoldOutline,
  textarea: RedactWrapOutline,
  email: SystemEmailOutline,
  password: SecurityPasswordOutline,
  tel: CommunicationPhoneOutline,
  url: SystemLinkOutline,
  number: RedactAmountOutline,
  date: SystemCalendarOutline,
  time: SystemTimeOutline,
  slider: ServiceSizeChangerHorizontalOutline,
  switch: SystemSwitchPinnedAreasOutline,
  file: SystemAttachFileOutline,
  select: CategoryClipboardOutline,
  radio: ServiceIntervalOutline,
  checkbox: ServiceReadCheckOutline,
  heading: SystemHierarchyOutline,
  paragraph: RedactFormatAlignJustifyOutline,
  divider: RedactBorderHorizontalOutline,
};
export const FORM_FIELD_CATEGORY_ICONS: Record<FormFieldPaletteCategory, IconComponent> = {
  input: RedactTextBoldOutline,
  choice: ServiceAgreedOutline,
  layout: CategoryComponentOutline,
  media: DocumentsFilePDFOutline,
};
export function FormFieldTypeIcon({
  type,
  size = ICON_SIZE_SM,
}: {
  type: FormFieldType;
  size?: number;
}) {
  const Icon = FORM_FIELD_TYPE_ICONS[type] ?? RedactTextBoldOutline;
  return <Icon width={size} height={size} />;
}
