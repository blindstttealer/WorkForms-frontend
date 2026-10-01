import { observer } from 'mobx-react-lite';
import {
  Container,
  Item,
  Label,
  SectionTitle,
  NoData,
  StyledCard,
  ButtonContainer,
} from './styles';
import { EditField } from '../../../../components/ui/edit-field/EditField';
import { useEmailSender } from '../../../../shared/api/useEmailSender';
import { useAppToast } from '@/shared/hooks/useAppToast';
import { formManager } from '../../model/multi-form-manager';
import { useParams } from 'react-router';
import { formatLabel, formatValue } from './utils';
import { Button } from '@admiral-ds/react-ui';
export const ReviewInfoStep = observer(() => {
  const { formId } = useParams<{
    formId: string;
  }>();
  const currentForm = formManager.getForm(formId || '');
  if (!currentForm) {
    return (
      <Container>
        <NoData>Форма не выбрана</NoData>
      </Container>
    );
  }
  const template = formManager.templates[currentForm.templateId];
  const emailSender = useEmailSender();
  const { showSuccessToast, showErrorToast } = useAppToast();
  const collectAllDataFlat = () => {
    const out: Record<string, unknown> = {};
    if (template && Array.isArray(template.steps)) {
      template.steps.forEach((stepDef) => {
        const stepData = currentForm.data[stepDef.id];
        if (typeof stepData === 'object' && stepData !== null) Object.assign(out, stepData);
      });
    }
    return out;
  };
  const sendEmail = async () => {
    const payload = collectAllDataFlat();
    try {
      await emailSender.sendEmail(
        { data: payload },
        {
          onSuccess: () => showSuccessToast('Форма отправлена на email'),
          onError: () => showErrorToast('Не удалось отправить форму'),
        },
      );
    } catch {
      showErrorToast('Не удалось отправить форму');
    }
  };
  const goToStep = (idx: number) => {
    currentForm.setStep(idx + 1);
  };
  if (!template || !Array.isArray(template.steps)) {
    return (
      <Container>
        <StyledCard>
          <SectionTitle>Данные формы</SectionTitle>
          <NoData>Нет шаблона для формы</NoData>
        </StyledCard>
      </Container>
    );
  }
  return (
    <Container>
      {template.steps.map((stepDef, idx) => {
        const fullData = currentForm.data[stepDef.id] as Record<string, unknown> | undefined;
        return (
          <StyledCard key={stepDef.id}>
            <SectionTitle>
              {stepDef.title ?? `Шаг ${idx + 1}`}
              <Button
                appearance="ghost"
                dimension="s"
                style={{ marginLeft: 12 }}
                onClick={() => goToStep(idx)}
              >
                Редактировать
              </Button>
            </SectionTitle>

            {Array.isArray(stepDef.fields) && stepDef.fields.length > 0 ? (
              stepDef.fields.map((field) => {
                const valueKey = 'name' in field ? field.name : field.id;
                const label =
                  'label' in field && field.label
                    ? field.label
                    : 'content' in field
                      ? field.content
                      : formatLabel(valueKey);
                return (
                  <Item key={field.id}>
                    <Label>{label}</Label>
                    <EditField text={formatValue(field, fullData?.[valueKey])} />
                  </Item>
                );
              })
            ) : (
              <NoData>Нет данных</NoData>
            )}
          </StyledCard>
        );
      })}

      <ButtonContainer>
        <Button
          appearance="secondary"
          dimension="m"
          onClick={() => {
            const lastIndex = template.steps.length - 1;
            currentForm.setStep(lastIndex + 1);
          }}
        >
          Вернуться к редактированию
        </Button>

        <Button appearance="primary" dimension="m" onClick={sendEmail}>
          Отправить форму
        </Button>
      </ButtonContainer>
    </Container>
  );
});
export default ReviewInfoStep;
