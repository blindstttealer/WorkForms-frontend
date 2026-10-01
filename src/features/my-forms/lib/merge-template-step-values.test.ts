import { mergeTemplateStepValues, pickStepFieldValues } from './merge-template-step-values';
import type { FormSchema } from '@/features/constructor-form/model/schema/form-schema';
const template: FormSchema = {
  id: 'form_test',
  version: 1,
  metadata: {
    title: 'T',
    description: '',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  settings: {
    submitButtonText: 'OK',
    allowDraft: true,
    allowMultipleSubmissions: true,
    showProgressBar: true,
    showStepNumbers: true,
    successMessage: 'OK',
  },
  steps: [
    {
      id: 'step_a',
      title: 'A',
      description: '',
      order: 1,
      isSkippable: false,
      allowBack: false,
      layout: { columns: 12, gap: 16 },
      fields: [
        {
          id: 'f1',
          type: 'text',
          name: 'firstName',
          label: 'Имя',
          required: true,
        },
      ],
    },
    {
      id: 'step_b',
      title: 'B',
      description: '',
      order: 2,
      isSkippable: false,
      allowBack: true,
      layout: { columns: 12, gap: 16 },
      fields: [
        {
          id: 'f2',
          type: 'email',
          name: 'email',
          label: 'Email',
        },
      ],
    },
  ],
  crossFieldRules: [],
};
describe('mergeTemplateStepValues', () => {
  it('merges per-step buckets into flat field.name map', () => {
    const merged = mergeTemplateStepValues(template, {
      step_a: { firstName: 'Анна' },
      step_b: { email: 'a@test.com' },
    });
    expect(merged.firstName).toBe('Анна');
    expect(merged.email).toBe('a@test.com');
  });
  it('pickStepFieldValues keeps only fields of the step', () => {
    const merged = { firstName: 'Анна', email: 'a@test.com' };
    expect(pickStepFieldValues(template.steps[0], merged)).toEqual({ firstName: 'Анна' });
  });
});
