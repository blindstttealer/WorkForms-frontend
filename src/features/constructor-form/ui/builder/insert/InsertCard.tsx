import { useMemo } from 'react';
import { T } from '@admiral-ds/react-ui';
import type { PaletteItem } from '../../../model/registry/field-registry';
import { FormFieldTypeIcon } from '@/shared/icons';
import { FormFieldCell } from '../../form-step-card';
import { getFieldPreviewValue } from '../../shared/field-renderer';
import {
  InsertCardAction,
  InsertCardDescription,
  InsertCardHeader,
  InsertCardIcon,
  InsertCardPreviewWrap,
  InsertCardRoot,
} from './insert.styles';
interface InsertCardProps {
  item: PaletteItem;
  onInsert: () => void;
}
export function InsertCard({ item, onInsert }: InsertCardProps) {
  const previewField = useMemo(() => item.create(), [item]);
  const previewValue = useMemo(() => getFieldPreviewValue(previewField), [previewField]);
  return (
    <InsertCardRoot>
      <InsertCardHeader>
        <InsertCardIcon>
          <FormFieldTypeIcon type={item.type} size={22} />
        </InsertCardIcon>
        <T font="Body/Body 1 Short" as="span">
          {item.label}
        </T>
      </InsertCardHeader>

      <InsertCardPreviewWrap>
        <FormFieldCell field={previewField} value={previewValue} staticDisplay />
      </InsertCardPreviewWrap>

      <InsertCardDescription>{item.description}</InsertCardDescription>

      <InsertCardAction type="button" onClick={onInsert}>
        Вставить
      </InsertCardAction>
    </InsertCardRoot>
  );
}
InsertCard.displayName = 'InsertCard';
