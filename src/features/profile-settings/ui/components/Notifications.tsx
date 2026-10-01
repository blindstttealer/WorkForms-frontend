import { FieldSet, RadioButton } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import { SettingsBlock } from './SettingsBlock';
import { SystemNotificationsSolid } from '@admiral-ds/icons';
import { Card, Content, SpanText, SubTitle } from '../styles';
import { CheckboxBlock } from './CheckboxBlock';
import { Controller, useFormContext } from 'react-hook-form';
import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import { SettingsNotificationsDtoNotificationStyle } from '@/api/generated/model/settingsNotificationsDtoNotificationStyle';
export const Notifications = () => {
  const { control } = useFormContext<SaveSettingsDto>();
  return (
    <SettingsBlock title="Настройки уведомлений" icon={SystemNotificationsSolid}>
      <Content>
        <SubTitle>Настройки оповещений</SubTitle>

        <CheckboxBlock
          title="Новые вакансии"
          description="Получать уведомления о новых вакансиях, соответствующих вашим предпочтениям"
          name="notifications.alerts.jobMatches"
        />

        <CheckboxBlock
          title="Обновления по откликам"
          description="Отслеживать статус ваших откликов на вакансии"
          name="notifications.alerts.applicationUpdates"
        />

        <CheckboxBlock
          title="Напоминания о собеседованиях"
          description="Не пропустить ни одного собеседования с своевременными напоминаниями"
          name="notifications.alerts.interviewReminders"
        />

        <CheckboxBlock
          title="Обновления по формам"
          description="Получать уведомления о новых шаблонах и изменениях в ваших формах"
          name="notifications.alerts.formsInsights"
        />

        <Controller
          name="notifications.notificationStyle"
          control={control}
          render={({ field }) => (
            <NotificationWrapper hoverable={false}>
              <SubTitle>Способ доставки уведомлений</SubTitle>
              <FieldSet>
                <Card>
                  <StyledRadioButton
                    value={SettingsNotificationsDtoNotificationStyle.push}
                    checked={field.value === SettingsNotificationsDtoNotificationStyle.push}
                    onChange={() => field.onChange(SettingsNotificationsDtoNotificationStyle.push)}
                    name="notification-style"
                  >
                    Только push-уведомления
                    <SpanText>Получать мгновенные оповещения на устройство</SpanText>
                  </StyledRadioButton>
                </Card>
                <Card>
                  <StyledRadioButton
                    value={SettingsNotificationsDtoNotificationStyle.email}
                    checked={field.value === SettingsNotificationsDtoNotificationStyle.email}
                    onChange={() => field.onChange(SettingsNotificationsDtoNotificationStyle.email)}
                    name="notification-style"
                  >
                    Только email <SpanText>Получать обновления по электронной почте</SpanText>
                  </StyledRadioButton>
                </Card>
                <Card>
                  <StyledRadioButton
                    value={SettingsNotificationsDtoNotificationStyle.both}
                    checked={field.value === SettingsNotificationsDtoNotificationStyle.both}
                    onChange={() => field.onChange(SettingsNotificationsDtoNotificationStyle.both)}
                    name="notification-style"
                  >
                    Push и Email <SpanText>Получать уведомления по всем каналам</SpanText>
                  </StyledRadioButton>
                </Card>
              </FieldSet>
            </NotificationWrapper>
          )}
        />
      </Content>
    </SettingsBlock>
  );
};
const NotificationWrapper = styled(Card)`
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
`;
const StyledRadioButton = styled(RadioButton)`
  align-items: center;
  gap: 5px;
`;
