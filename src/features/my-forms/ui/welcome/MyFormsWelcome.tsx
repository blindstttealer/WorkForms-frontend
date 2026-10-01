import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { formManager } from '../../model/multi-form-manager';
import { StyledButton, Wrapper } from './styles';
import { observer } from 'mobx-react-lite';
import { Option, SelectField } from '@admiral-ds/react-ui';
import type { FormSchema } from '@/features/constructor-form';
import { CreateFormModal } from '@/features/my-forms/ui/create-form-modal/CreateFormModal';
import { useCreateFormModal } from '@/features/my-forms/ui/create-form-modal/hooks';
import { paths } from '@/shared/routes';
export const MyFormsWelcome = observer(() => {
  const navigate = useNavigate();
  const { formId } = useParams<{
    formId: string;
  }>();
  const [templates, setTemplates] = useState<FormSchema[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const {
    isModalVisible,
    formName,
    formNameError,
    openModal,
    closeModal,
    updateFormName,
    validateFormName,
  } = useCreateFormModal();
  useEffect(() => {
    formManager.loadTemplates().then((fields) => {
      setTemplates(fields);
    });
  }, []);
  const handleStartClick = () => {
    if (formId) {
      const currentForm = formManager.getForm(formId);
      currentForm?.setStep(1);
      return;
    }
    openModal();
  };
  const handleCreateForm = () => {
    if (validateFormName()) {
      const form = formManager.createFromTemplate(selectedTemplate, formName);
      navigate(paths.myForms.form(form.id));
      updateFormName('');
      closeModal();
    }
  };
  const StepInfoTitle = useMemo(() => {
    return formId ? 'Продолжить заполнение карточки' : 'Приступить к заполнению карточки';
  }, [formId]);
  const renderOptions = () => {
    return templates.map((option) => {
      return (
        <Option key={option.id} value={option.id}>
          {option.metadata.title}
        </Option>
      );
    });
  };
  return (
    <Wrapper>
      <SelectField
        mode="searchSelect"
        label="Выберите форму"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        placeholder={'выбрать форму из списка'}
      >
        {renderOptions()}
      </SelectField>

      <StyledButton hasFormId={!!formId} onClick={handleStartClick} disabled={!selectedTemplate}>
        {StepInfoTitle}
      </StyledButton>

      {isModalVisible && (
        <CreateFormModal
          formName={formName}
          error={formNameError}
          onChangeFormName={updateFormName}
          onCancelHandler={closeModal}
          onOkHandler={handleCreateForm}
        />
      )}
    </Wrapper>
  );
});
