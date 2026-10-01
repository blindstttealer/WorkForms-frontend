import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import { formManager } from '../../../model/multi-form-manager';
export const useMyFormsActions = () => {
  const { formId } = useParams<{
    formId: string;
  }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const switchToForm = async (id: string) => {
    setIsLoading(true);
    try {
      await formManager.switchForm(id);
      navigate(paths.myForms.form(id));
    } finally {
      setIsLoading(false);
    }
  };
  const deleteForm = (id: string) => {
    formManager.deleteForm(id);
    if (id === formId) {
      const nextForm = formManager.formList.find((f) => f.id !== id);
      if (nextForm) {
        navigate(paths.myForms.form(nextForm.id));
      } else {
        navigate(paths.myForms.index);
      }
    }
  };
  const editForm = (id: string, newName: string) => {
    formManager.editForm(id, newName);
  };
  const createFormFromTemplate = (templateId: string, formName: string) => {
    const form = formManager.createFromTemplate(templateId, formName.trim());
    navigate(paths.myForms.form(form.id));
    return form;
  };
  useEffect(() => {
    if (formId) {
      switchToForm(formId);
    }
  }, [formId]);
  return {
    formId,
    isLoading,
    switchToForm,
    deleteForm,
    editForm,
    createFormFromTemplate,
  };
};
