import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { getCurrentStepComponent } from '../../lib/utils/getCurrentStepComponents';
import { formManager, type FormListItem } from '../../model/multi-form-manager';
import type { FormInstanceStore } from '../../model/form-instance-store';
import { FormSurfaceShell } from '@/features/constructor-form/ui/form-step-card';
import { Container, ControlsRow, FormContent, HeaderSection } from './styles';
import { CreateFormModal } from '../create-form-modal/CreateFormModal';
import { FormsPopover, FormHeader, FormInfo } from './components';
import { useMyFormsActions } from './hooks';
import { Spinner } from '@admiral-ds/react-ui';
import { useCreateFormModal } from '@/features/my-forms/ui/create-form-modal/hooks';
import { useAppToast } from '@/shared/hooks/useAppToast';
export const MyFormsPage = observer(() => {
  const { showErrorToast } = useAppToast();
  const { formId, switchToForm, deleteForm, editForm, createFormFromTemplate } =
    useMyFormsActions();
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
    if (Object.keys(formManager.templates).length === 0 && !formManager.templatesLoading) {
      void formManager.loadTemplates();
    }
  }, []);
  const formList = formManager.formList;
  const currentForm = formManager.currentForm;
  const templatesLoading = formManager.templatesLoading;
  const templateId = currentForm?.templateId;
  const templateStepsCount =
    (templateId ? formManager.templates[templateId]?.steps?.length : undefined) ?? 0;
  const headerSteps = useMemo(() => {
    const resolvedTemplate = templateId ? formManager.templates[templateId] : null;
    const header: {
      title: string;
    }[] = [{ title: 'Welcome' }];
    if (
      resolvedTemplate &&
      Array.isArray(resolvedTemplate.steps) &&
      resolvedTemplate.steps.length > 0
    ) {
      resolvedTemplate.steps.forEach((s, idx) => {
        header.push({ title: s.title ?? `Step ${idx + 1}` });
      });
    } else {
      header.push({ title: 'Step 1' });
    }
    header.push({ title: 'Review' });
    return header;
  }, [templateId, templateStepsCount]);
  const handleCreateNewForm = useCallback(() => {
    if (!validateFormName()) return;
    const resolvedTemplateId =
      formManager.currentForm?.templateId ?? Object.keys(formManager.templates)[0];
    if (!resolvedTemplateId) {
      showErrorToast('Нет доступных шаблонов. Выберите форму в разделе «Мои формы».');
      return;
    }
    try {
      createFormFromTemplate(resolvedTemplateId, formName);
      closeModal();
    } catch {
      showErrorToast('Не удалось создать форму');
    }
  }, [validateFormName, formName, createFormFromTemplate, closeModal, showErrorToast]);
  const isReady = Boolean(currentForm) && !templatesLoading;
  return (
    <>
      {isModalVisible && (
        <CreateFormModal
          formName={formName}
          error={formNameError}
          onOkHandler={handleCreateNewForm}
          onCancelHandler={closeModal}
          onChangeFormName={updateFormName}
        />
      )}
      {!isReady || !currentForm ? (
        <Spinner />
      ) : (
        <MyFormsPageLayout
          form={currentForm}
          formId={formId}
          headerSteps={headerSteps}
          formList={formList}
          onSwitchForm={switchToForm}
          onDeleteForm={deleteForm}
          onEditForm={editForm}
          onCreateNewForm={openModal}
        />
      )}
    </>
  );
});
type MyFormsPageLayoutProps = {
  form: FormInstanceStore;
  formId: string | undefined;
  headerSteps: {
    title: string;
  }[];
  formList: FormListItem[];
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, newName: string) => void;
  onCreateNewForm: () => void;
};
const MyFormsPageLayout = observer(function MyFormsPageLayout({
  form,
  formId,
  headerSteps,
  formList,
  onSwitchForm,
  onDeleteForm,
  onEditForm,
  onCreateNewForm,
}: MyFormsPageLayoutProps) {
  return (
    <Container>
      <HeaderSection>
        <FormHeader currentStep={form.step} steps={headerSteps} />

        <ControlsRow>
          <FormsPopover
            currentFormId={formId}
            onSwitchForm={onSwitchForm}
            onDeleteForm={onDeleteForm}
            onEditForm={onEditForm}
            onCreateNewForm={onCreateNewForm}
            formList={formList}
          />
        </ControlsRow>
      </HeaderSection>
      <FormContent>
        <FormSurfaceShell>{getCurrentStepComponent(form.step)}</FormSurfaceShell>
      </FormContent>
      <FormInfo formId={formId} />
    </Container>
  );
});
