import { SettingsBlock } from './SettingsBlock';
import styled from 'styled-components';
import {
  SecuritySafeCertificateSolid,
  SystemDownloadOutline,
  SystemDeleteOutline,
} from '@admiral-ds/icons';
import { Card, Content, SpanText, StyledButton, SubTitle } from '../styles';
import { CheckboxBlock } from './CheckboxBlock';
export const ProfileVisibility = () => {
  return (
    <SettingsBlock title="Приватность и видимость" icon={SecuritySafeCertificateSolid}>
      <Content>
        <SubTitle>Настройки видимости профиля</SubTitle>

        <CheckboxBlock
          title="Показывать ожидания по зарплате"
          description="Отображать ожидаемую зарплату работодателям"
          name="privacy.showSalaryExpectations"
        />
        <CheckboxBlock
          title="Показывать контактную информацию"
          description="Разрешить работодателям видеть ваш email и телефон"
          name="privacy.showContactInfo"
        />

        <CheckboxBlock
          title="Разрешить сообщения от рекрутеров"
          description="Позволить рекрутерам связываться с вами напрямую"
          name="privacy.allowRecruiterMessages"
        />

        <ActionCard hoverable={false}>
          <div>
            <SubTitle>Скачать мои данные</SubTitle>
            <SpanText>
              Экспортировать все ваши профессиональные данные, отклики и историю активности в
              загружаемый файл.
            </SpanText>
          </div>

          <StyledButton dimension="m" iconStart={<SystemDownloadOutline />}>
            Скачать мои данные
          </StyledButton>
        </ActionCard>

        <ActionCard hoverable={false}>
          <div>
            <SubTitle>Очистить историю откликов</SubTitle>
            <SpanText>
              Это действие безвозвратно удалит все сохраненные вакансии, историю откликов и данные
              поиска. Это действие нельзя отменить.
            </SpanText>
          </div>

          <StyledButton dimension="m" appearance="danger" iconStart={<SystemDeleteOutline />}>
            Очистить историю откликов
          </StyledButton>
        </ActionCard>
      </Content>
    </SettingsBlock>
  );
};
const ActionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
