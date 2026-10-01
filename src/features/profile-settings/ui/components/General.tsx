import { SettingsBlock } from './SettingsBlock';
import styled from 'styled-components';
import { InputField, SelectField, TextField, Option } from '@admiral-ds/react-ui';
import { experienceOptions, locationOptions, skillsOptions } from '../const';
import { SystemPersonSolid } from '@admiral-ds/icons';
import { Content, labelStyles } from '../styles';
import { CheckboxGroup } from './CheckboxGroup';
import { useFormContext } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import { useEffect, useState } from 'react';
import type { GeneralProps } from '../types';
import { AvatarPhoto } from './Avatar';
export const General = ({ avatarSrc, onPhotoSelected, onPhotoError }: GeneralProps) => {
  const { register } = useFormContext<SaveSettingsDto>();
  const [preview, setPreview] = useState<string | null>(null);
  const displaySrc = preview ?? avatarSrc;
  const handlePhoto = (file: File | null) => {
    onPhotoSelected(file);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  return (
    <SettingsBlock title="Профессиональный профиль" icon={SystemPersonSolid}>
      <Content>
        <AvatarPhoto
          imageSrc={displaySrc}
          onPhotoSelected={handlePhoto}
          onPhotoError={onPhotoError}
        />
        <InputsBlockWrapper>
          <InputField
            placeholder="Полное имя"
            label="Полное имя"
            labelCssMixins={{
              label: labelStyles,
            }}
            {...register('profile.name')}
          />

          <InputField
            placeholder="Текущая должность"
            label="Текущая должность"
            labelCssMixins={{
              label: labelStyles,
            }}
            {...register('profile.jobTitle')}
          />

          <SelectField
            label="Опыт работы"
            labelCssMixins={{
              label: labelStyles,
            }}
            {...register('profile.experience')}
          >
            {experienceOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>

          <SelectField
            label="Местоположение"
            labelCssMixins={{
              label: labelStyles,
            }}
            {...register('profile.location')}
          >
            {locationOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>
        </InputsBlockWrapper>

        <TextField
          label="Профессиональная биография"
          labelCssMixins={{
            label: labelStyles,
          }}
          autoHeight
          dimension="xl"
          {...register('profile.bio')}
        />

        <CheckboxGroup title="Навыки и экспертиза" data={skillsOptions} name="profile.skills" />
      </Content>
    </SettingsBlock>
  );
};
const InputsBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
