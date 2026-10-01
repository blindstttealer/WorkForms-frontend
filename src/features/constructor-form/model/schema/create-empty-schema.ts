import { nanoid } from 'nanoid';
import type { FormSchema } from './form-schema';
export function createEmptySchema(title = 'Новая форма'): FormSchema {
  const stepId = `step_${nanoid(8)}`;
  return {
    id: `form_${nanoid(8)}`,
    version: 1,
    metadata: {
      title,
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    settings: {
      submitButtonText: 'Отправить',
      allowDraft: true,
      allowMultipleSubmissions: true,
      showProgressBar: true,
      showStepNumbers: true,
      successMessage: 'Форма успешно отправлена!',
    },
    steps: [
      {
        id: stepId,
        title: 'Шаг 1',
        description: '',
        order: 1,
        isSkippable: false,
        allowBack: false,
        layout: { columns: 12, gap: 16 },
        fields: [],
      },
    ],
    crossFieldRules: [],
  };
}
