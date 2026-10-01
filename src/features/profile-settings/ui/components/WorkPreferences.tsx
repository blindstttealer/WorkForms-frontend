import { SelectField, Option, NumberInputField, FieldSet } from '@admiral-ds/react-ui';
import { Content, labelStyles, LegendText } from '../styles';
import { SettingsBlock } from './SettingsBlock';
import { employmentTypesOptions, preferredIndustriesOptions, workLocationOptions } from '../const';
import styled from 'styled-components';
import { CategoryColorSolid } from '@admiral-ds/icons';
import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxBlock } from './CheckboxBlock';
import { Controller, useFormContext } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
export const WorkPreferences = () => {
  const { register, control } = useFormContext<SaveSettingsDto>();
  return (
    <SettingsBlock title="Предпочтения по работе" icon={CategoryColorSolid}>
      <Content>
        <CheckboxGroup
          title="Тип занятости"
          data={employmentTypesOptions}
          name="jobPreferences.jobType"
        />

        <SelectField
          label="Предпочтения по местоположению работы"
          labelCssMixins={{
            label: labelStyles,
          }}
          {...register('jobPreferences.workLocation')}
        >
          {workLocationOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </SelectField>

        <FieldSet>
          <LegendText>Ожидаемая зарплата (₽)</LegendText>
          <InputsBlockWrapper>
            <Controller
              name="jobPreferences.salaryMin"
              control={control}
              render={({ field }) => (
                <NumberInputField
                  min={0}
                  step={1000}
                  label="Минимум"
                  labelCssMixins={{
                    label: labelStyles,
                  }}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                />
              )}
            />
            <Controller
              name="jobPreferences.salaryMax"
              control={control}
              render={({ field }) => (
                <NumberInputField
                  min={0}
                  step={1000}
                  label="Максимум"
                  labelCssMixins={{
                    label: labelStyles,
                  }}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                />
              )}
            />
          </InputsBlockWrapper>
        </FieldSet>

        <CheckboxGroup
          title="Предпочтительные отрасли"
          data={preferredIndustriesOptions}
          name="jobPreferences.industries"
        />

        <CheckboxBlock
          title="Готовность к переезду"
          description="Рассматривать вакансии в других городах"
          name="jobPreferences.willingToRelocate"
          background="Neutral/Neutral 05"
        />
      </Content>
    </SettingsBlock>
  );
};
const InputsBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  margin: 0;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
