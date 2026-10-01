import { CheckboxField, FieldSet } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { Controller, useFormContext, type FieldPath } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import { LegendText } from '../styles';
import type { CheckboxOptionItem } from '../types';
type Props = {
  title: string;
  name: FieldPath<SaveSettingsDto>;
  data: CheckboxOptionItem[];
};
export const CheckboxGroup = ({ title, name, data }: Props) => {
  const { control } = useFormContext<SaveSettingsDto>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = (field.value as string[] | undefined) ?? [];
        const toggle = (id: string) => {
          const set = new Set(selected);
          if (set.has(id)) {
            set.delete(id);
          } else {
            set.add(id);
          }
          field.onChange([...set]);
        };
        return (
          <FieldSet flexDirection="column">
            <LegendText>{title}</LegendText>
            <CheckboxGrid>
              {data.map((option) => (
                <StyledCheckboxField
                  key={option.id}
                  checked={selected.includes(option.id)}
                  onChange={() => toggle(option.id)}
                >
                  {option.value}
                </StyledCheckboxField>
              ))}
            </CheckboxGrid>
          </FieldSet>
        );
      }}
    />
  );
};
const CheckboxGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;
const StyledCheckboxField = styled(CheckboxField)`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  border-radius: 8px;
  padding: 10px 12px;
  min-width: 140px;
  flex: 1 1 140px;
  max-width: 200px;
`;
