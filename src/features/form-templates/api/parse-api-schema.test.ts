import { parseFormTemplateSchema } from './parse-api-schema';
const minimalSchema = {
  id: 'form_test',
  version: 1,
  metadata: {
    title: 'Анкета',
    description: '',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  settings: {
    submitButtonText: 'Отправить',
    allowDraft: true,
    allowMultipleSubmissions: true,
    showProgressBar: true,
    showStepNumbers: true,
    successMessage: 'OK',
  },
  steps: [
    {
      id: 'step_1',
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
describe('parseFormTemplateSchema', () => {
  it('parses a valid API schema payload', () => {
    const parsed = parseFormTemplateSchema(minimalSchema);
    expect(parsed.id).toBe('form_test');
    expect(parsed.steps).toHaveLength(1);
    expect(parsed.metadata.title).toBe('Анкета');
  });
  it('rejects invalid payload', () => {
    expect(() => parseFormTemplateSchema({ version: 1 })).toThrow('Некорректная схема формы');
  });
});
