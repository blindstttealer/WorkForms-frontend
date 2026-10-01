import { SelectField, Option, Button, InputField } from '@admiral-ds/react-ui';
import { SettingsBlock } from './SettingsBlock';
import styled from 'styled-components';
import { languageOptions } from '../const';
import {
  SystemSettingsSolid,
  SystemEmailOutline,
  SecurityLockOutline,
  ServiceInfoOutline,
  CategoryGlobeOutline,
  SystemExitOutline,
} from '@admiral-ds/icons';
import { Card, Content, SpanText, StyledButton, SubTitle } from '../styles';
import type { ComponentType } from 'react';
import { useFormContext } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import type { AccountProps } from '../types';
export const Account = ({ emailFromServer }: AccountProps) => {
  const { register } = useFormContext<SaveSettingsDto>();
  return (
    <SettingsBlock title="Настройки аккаунта" icon={SystemSettingsSolid}>
      <Content>
        <SettingCard>
          <SectionTitle title="Email адрес" icon={SystemEmailOutline} />
          <InputRow>
            <EmailInput
              placeholder="Email адрес"
              value={emailFromServer ?? ''}
              readOnly
              disabled
              aria-readonly
            />
            <UpdateButton dimension="m" type="button" disabled>
              Обновить
            </UpdateButton>
          </InputRow>
        </SettingCard>

        <SettingCard>
          <SectionTitle title="Пароль и безопасность" icon={SecurityLockOutline} />
          <ActionBlock>
            <SpanText>Обеспечьте безопасность вашего аккаунта, регулярно обновляя пароль.</SpanText>
            <StyledButton dimension="m" appearance="tertiary" type="button">
              Изменить пароль
            </StyledButton>
          </ActionBlock>
        </SettingCard>

        <SettingCard>
          <SectionTitle title="Информация о платформе" icon={ServiceInfoOutline} />
          <p>
            Версия: <SpanText>3.2.1</SpanText>
          </p>
          <p>
            Последнее обновление: <SpanText>2 января 2026</SpanText>
          </p>
          <p>
            Окружение: <SpanText>Production</SpanText>
          </p>
        </SettingCard>
        <SettingCard>
          <SectionTitle title="Язык интерфейса" icon={CategoryGlobeOutline} />
          <SelectField {...register('account.language')}>
            {languageOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </SelectField>
        </SettingCard>

        <SettingCard>
          <SectionTitle title="Выход из аккаунта" icon={SystemExitOutline} />
          <ActionBlock>
            <SpanText>
              Выйти из аккаунта. Вам потребуется снова войти для доступа к профилю и откликам.
            </SpanText>
            <StyledButton dimension="m" appearance="tertiary" type="button">
              Выйти
            </StyledButton>
          </ActionBlock>
        </SettingCard>
      </Content>
    </SettingsBlock>
  );
};
const TitleRow = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
  margin-left: -4px;
  align-items: center;
`;
type SectionProps = {
  title: string;
  icon?: ComponentType<{
    width?: number;
    height?: number;
  }>;
};
const SectionTitle = ({ title, icon: Icon }: SectionProps) => {
  return (
    <TitleRow>
      {Icon && <Icon width={28} height={28} />}
      <SubTitle>{title}</SubTitle>
    </TitleRow>
  );
};
const SettingCard = styled(Card).attrs({
  hoverable: false,
})`
  display: flex;
  flex-direction: column;
`;
const EmailInput = styled(InputField)`
  flex: 7;
`;
const UpdateButton = styled(Button)`
  flex: 1;
`;
const InputRow = styled.div`
  display: flex;
  gap: 10px;
`;
const ActionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
