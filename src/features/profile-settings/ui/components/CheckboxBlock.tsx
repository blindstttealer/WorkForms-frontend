import { Card, SpanText } from '../styles';
import { CheckboxField } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { Controller, useFormContext, type FieldPath } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
type Props = {
  title: string;
  description?: string;
  name: FieldPath<SaveSettingsDto>;
  background?: string;
};
export const CheckboxBlock = ({ title, description, name, background }: Props) => {
  const { control } = useFormContext<SaveSettingsDto>();
  return (
    <CheckboxWrapper background={background}>
      <div>
        <p>{title}</p>
        <SpanText>{description}</SpanText>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CheckboxField
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
          />
        )}
      />
    </CheckboxWrapper>
  );
};
const CheckboxWrapper = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
