import { observer } from 'mobx-react-lite';
import { T } from '@admiral-ds/react-ui';
import {
  CategoryComponentSolid,
  RedactTextBoldOutline,
  ServiceStructureSolid,
  SystemSettingsSolid,
} from '@admiral-ds/icons';
import { SPAN_PRESETS } from '../../../cons/grid';
import { builderStore } from '../../../model/store/builder-store';
import { getAllInputFields } from '../../../model/schema/schema-mutations';
import type { LogicOperator } from '../../../model/schema/form-schema';
import { hasOptions, isInputField } from '../../../model/schema/form-schema';
import { FormFieldTypeIcon } from '@/shared/icons';
import { SpanChip, ResizeControlWrap } from '../insert/insert.styles';
import { CollapsibleSection } from './CollapsibleSection';
import {
  InspectorActionRow,
  InspectorAddButton,
  InspectorField,
  InspectorFieldLabel,
  InspectorHeader,
  InspectorHeaderIcon,
  InspectorHeaderTop,
  InspectorRuleCard,
  InspectorScroll,
  InspectorStack,
  SettingsScopeDivider,
  SettingsScopeLabel,
} from './settings-panel.styles';
import { InspectorCheckbox, InspectorSelect, InspectorTextInput, Option } from './InspectorFields';
const LOGIC_OPERATORS: LogicOperator[] = [
  'equals',
  'notEquals',
  'contains',
  'includes',
  'greaterThan',
  'greaterOrEqual',
  'lessThan',
  'lessOrEqual',
  'isEmpty',
  'isNotEmpty',
];
function getDefaultValueString(field: { defaultValue?: unknown }): string {
  if (field.defaultValue === undefined || field.defaultValue === null) return '';
  if (Array.isArray(field.defaultValue)) return field.defaultValue.join(', ');
  return String(field.defaultValue);
}
function parseDefaultValue(
  field: {
    type: string;
  },
  raw: string,
): unknown {
  if (!raw.trim()) return undefined;
  if (field.type === 'number' || field.type === 'slider') return Number(raw);
  if (field.type === 'switch') return raw === 'true';
  if (field.type === 'checkbox') {
    return raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return raw;
}
export const FormSettingsSections = observer(function FormSettingsSections() {
  const schema = builderStore.schema;
  const allFields = getAllInputFields(schema).filter(isInputField);
  return (
    <InspectorStack>
      <CollapsibleSection title="Основное" icon={<RedactTextBoldOutline width={12} height={12} />}>
        <InspectorTextInput
          label="Название"
          value={schema.metadata.title}
          onChange={(value) => builderStore.updateMetadata({ title: value })}
        />
        <InspectorTextInput
          label="Описание"
          multiline
          value={schema.metadata.description ?? ''}
          onChange={(value) => builderStore.updateMetadata({ description: value })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Поведение" icon={<ServiceStructureSolid width={12} height={12} />}>
        <InspectorTextInput
          label="Текст кнопки отправки"
          value={schema.settings.submitButtonText ?? ''}
          onChange={(value) => builderStore.updateSettings({ submitButtonText: value })}
        />
        <InspectorTextInput
          label="Сообщение об успехе"
          value={schema.settings.successMessage ?? ''}
          onChange={(value) => builderStore.updateSettings({ successMessage: value })}
        />
        <InspectorCheckbox
          label="Разрешить черновик"
          checked={!!schema.settings.allowDraft}
          onChange={(checked) => builderStore.updateSettings({ allowDraft: checked })}
        />
        <InspectorCheckbox
          label="Показывать progress bar"
          checked={!!schema.settings.showProgressBar}
          onChange={(checked) => builderStore.updateSettings({ showProgressBar: checked })}
        />
        <InspectorCheckbox
          label="Показывать номера шагов"
          checked={!!schema.settings.showStepNumbers}
          onChange={(checked) => builderStore.updateSettings({ showStepNumbers: checked })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Cross-field rules" defaultOpen={false}>
        <InspectorActionRow>
          <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="span">
            Правила формы
          </T>
          <InspectorAddButton type="button" onClick={() => builderStore.addCrossRule()}>
            + Правило
          </InspectorAddButton>
        </InspectorActionRow>
        {(schema.crossFieldRules ?? []).map((rule, index) => (
          <InspectorRuleCard key={rule.id}>
            <InspectorTextInput
              label="Сообщение"
              value={rule.message}
              onChange={(value) => {
                const rules = [...(schema.crossFieldRules ?? [])];
                rules[index] = { ...rule, message: value };
                builderStore.replaceCrossRules(rules);
              }}
            />
            <InspectorSelect
              label="Поле"
              value={rule.when[0]?.fieldId ?? ''}
              onChange={(value) => {
                const rules = [...(schema.crossFieldRules ?? [])];
                rules[index] = { ...rule, when: [{ ...rule.when[0], fieldId: value }] };
                builderStore.replaceCrossRules(rules);
              }}
            >
              {allFields.map((field) => (
                <Option key={field.id} value={field.id}>
                  {field.label ?? field.name}
                </Option>
              ))}
            </InspectorSelect>
          </InspectorRuleCard>
        ))}
      </CollapsibleSection>
    </InspectorStack>
  );
});
export const FormSettingsContent = observer(function FormSettingsContent() {
  return (
    <InspectorScroll>
      <InspectorHeader>
        <InspectorHeaderTop>
          <InspectorHeaderIcon>
            <SystemSettingsSolid width={18} height={18} />
          </InspectorHeaderIcon>
          <div>
            <T font="Subtitle/Subtitle 2" as="div">
              Настройки формы
            </T>
            <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 2 }}>
              Метаданные и поведение
            </T>
          </div>
        </InspectorHeaderTop>
      </InspectorHeader>
      <FormSettingsSections />
    </InspectorScroll>
  );
});
export const StepSettingsSections = observer(function StepSettingsSections() {
  const selectedStep = builderStore.selectedStep;
  if (!selectedStep) return null;
  return (
    <InspectorStack>
      <CollapsibleSection title="Основное" icon={<RedactTextBoldOutline width={12} height={12} />}>
        <InspectorTextInput
          label="Заголовок"
          value={selectedStep.title}
          onChange={(value) => builderStore.patchStep(selectedStep.id, { title: value })}
        />
        <InspectorTextInput
          label="Описание"
          multiline
          value={selectedStep.description ?? ''}
          onChange={(value) => builderStore.patchStep(selectedStep.id, { description: value })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Layout" icon={<CategoryComponentSolid width={12} height={12} />}>
        <InspectorSelect
          label="Колонки сетки"
          value={String(selectedStep.layout?.columns ?? 12)}
          onChange={(value) =>
            builderStore.patchStep(selectedStep.id, {
              layout: {
                ...selectedStep.layout,
                columns: Number(value) as 1 | 2 | 3 | 4 | 6 | 12,
              },
            })
          }
        >
          {[1, 2, 3, 4, 6, 12].map((columns) => (
            <Option key={columns} value={String(columns)}>
              {columns}
            </Option>
          ))}
        </InspectorSelect>
        <InspectorCheckbox
          label="Можно пропустить"
          checked={!!selectedStep.isSkippable}
          onChange={(checked) => builderStore.patchStep(selectedStep.id, { isSkippable: checked })}
        />
        <InspectorCheckbox
          label="Разрешить «Назад»"
          checked={selectedStep.allowBack !== false}
          onChange={(checked) => builderStore.patchStep(selectedStep.id, { allowBack: checked })}
        />
      </CollapsibleSection>
    </InspectorStack>
  );
});
export const StepSettingsContent = observer(function StepSettingsContent() {
  const selectedStep = builderStore.selectedStep;
  if (!selectedStep) return null;
  return (
    <InspectorScroll>
      <InspectorHeader>
        <InspectorHeaderTop>
          <InspectorHeaderIcon>
            <ServiceStructureSolid width={18} height={18} />
          </InspectorHeaderIcon>
          <div>
            <T font="Subtitle/Subtitle 2" as="div">
              Настройки шага
            </T>
            <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 2 }}>
              Шаг {selectedStep.order}
            </T>
          </div>
        </InspectorHeaderTop>
      </InspectorHeader>
      <StepSettingsSections />
    </InspectorScroll>
  );
});
export const GeneralSettingsContent = observer(function GeneralSettingsContent() {
  const selectedStep = builderStore.selectedStep;
  return (
    <InspectorScroll>
      <SettingsScopeLabel>
        <SystemSettingsSolid width={12} height={12} />
        Форма
      </SettingsScopeLabel>
      <FormSettingsSections />

      {selectedStep ? (
        <>
          <SettingsScopeDivider />
          <SettingsScopeLabel>
            <ServiceStructureSolid width={12} height={12} />
            Шаг {selectedStep.order} · {selectedStep.title}
          </SettingsScopeLabel>
          <StepSettingsSections />
        </>
      ) : null}
    </InspectorScroll>
  );
});
export const FieldSettingsContent = observer(function FieldSettingsContent() {
  const selected = builderStore.selectedField;
  if (!selected) return null;
  const { stepId, field } = selected;
  const allFields = getAllInputFields(builderStore.schema).filter(isInputField);
  if (field.type === 'heading') {
    return (
      <InspectorScroll>
        <InspectorHeader>
          <InspectorHeaderTop>
            <InspectorHeaderIcon>
              <FormFieldTypeIcon type="heading" size={18} />
            </InspectorHeaderIcon>
            <T font="Subtitle/Subtitle 2" as="div">
              Заголовок
            </T>
          </InspectorHeaderTop>
        </InspectorHeader>
        <CollapsibleSection title="Основное">
          <InspectorTextInput
            label="Текст"
            value={field.label}
            onChange={(value) => builderStore.patchField(stepId, field.id, { label: value })}
          />
        </CollapsibleSection>
      </InspectorScroll>
    );
  }
  if (field.type === 'paragraph') {
    return (
      <InspectorScroll>
        <InspectorHeader>
          <InspectorHeaderTop>
            <InspectorHeaderIcon>
              <FormFieldTypeIcon type="paragraph" size={18} />
            </InspectorHeaderIcon>
            <T font="Subtitle/Subtitle 2" as="div">
              Параграф
            </T>
          </InspectorHeaderTop>
        </InspectorHeader>
        <CollapsibleSection title="Основное">
          <InspectorTextInput
            label="Содержимое"
            value={field.content}
            onChange={(value) => builderStore.patchField(stepId, field.id, { content: value })}
          />
        </CollapsibleSection>
      </InspectorScroll>
    );
  }
  if (!isInputField(field)) return null;
  const currentSpan = field.ui?.span ?? 12;
  return (
    <InspectorScroll>
      <InspectorHeader>
        <InspectorHeaderTop>
          <InspectorHeaderIcon>
            <FormFieldTypeIcon type={field.type} size={18} />
          </InspectorHeaderIcon>
          <div>
            <T font="Subtitle/Subtitle 2" as="div">
              {field.label ?? field.name}
            </T>
            <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p" style={{ marginTop: 2 }}>
              {field.type}
            </T>
          </div>
        </InspectorHeaderTop>
      </InspectorHeader>

      <InspectorStack>
        <CollapsibleSection
          title="Основное"
          icon={<RedactTextBoldOutline width={12} height={12} />}
        >
          <InspectorTextInput
            label="Label"
            value={field.label ?? ''}
            onChange={(value) => builderStore.patchField(stepId, field.id, { label: value })}
          />
          <InspectorTextInput
            label="Name (submission key)"
            value={field.name}
            onChange={(value) => builderStore.patchField(stepId, field.id, { name: value })}
          />
          <InspectorTextInput
            label="Placeholder"
            value={field.placeholder ?? ''}
            onChange={(value) => builderStore.patchField(stepId, field.id, { placeholder: value })}
          />
          <InspectorTextInput
            label="Description"
            multiline
            value={field.description ?? ''}
            onChange={(value) => builderStore.patchField(stepId, field.id, { description: value })}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Валидация">
          <InspectorCheckbox
            label="Обязательное"
            checked={!!field.required}
            onChange={(checked) => builderStore.patchField(stepId, field.id, { required: checked })}
          />
          {(field.type === 'text' ||
            field.type === 'textarea' ||
            field.type === 'email' ||
            field.type === 'password') && (
            <>
              <InspectorTextInput
                label="Min length"
                value={field.validation?.minLength?.toString() ?? ''}
                onChange={(value) =>
                  builderStore.patchField(stepId, field.id, {
                    validation: {
                      ...field.validation,
                      minLength: value ? Number(value) : undefined,
                    },
                  })
                }
              />
              <InspectorTextInput
                label="Max length"
                value={field.validation?.maxLength?.toString() ?? ''}
                onChange={(value) =>
                  builderStore.patchField(stepId, field.id, {
                    validation: {
                      ...field.validation,
                      maxLength: value ? Number(value) : undefined,
                    },
                  })
                }
              />
              <InspectorTextInput
                label="Pattern (regex)"
                value={field.validation?.pattern ?? ''}
                onChange={(value) =>
                  builderStore.patchField(stepId, field.id, {
                    validation: {
                      ...field.validation,
                      pattern: value || undefined,
                    },
                  })
                }
              />
            </>
          )}
          {(field.type === 'number' || field.type === 'slider') && (
            <>
              <InspectorTextInput
                label="Min"
                value={field.validation?.min?.toString() ?? ''}
                onChange={(value) =>
                  builderStore.patchField(stepId, field.id, {
                    validation: {
                      ...field.validation,
                      min: value ? Number(value) : undefined,
                    },
                  })
                }
              />
              <InspectorTextInput
                label="Max"
                value={field.validation?.max?.toString() ?? ''}
                onChange={(value) =>
                  builderStore.patchField(stepId, field.id, {
                    validation: {
                      ...field.validation,
                      max: value ? Number(value) : undefined,
                    },
                  })
                }
              />
            </>
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Layout">
          <InspectorField>
            <InspectorFieldLabel>Ширина</InspectorFieldLabel>
            <ResizeControlWrap style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
              {SPAN_PRESETS.map((preset) => (
                <SpanChip
                  key={preset.span}
                  type="button"
                  $active={currentSpan === preset.span}
                  onClick={() =>
                    builderStore.patchField(stepId, field.id, {
                      ui: { ...field.ui, span: preset.span },
                    })
                  }
                >
                  {preset.label}
                </SpanChip>
              ))}
            </ResizeControlWrap>
          </InspectorField>
          <InspectorCheckbox
            label="Скрыто по умолчанию"
            checked={!!field.ui?.hidden}
            onChange={(checked) =>
              builderStore.patchField(stepId, field.id, { ui: { ...field.ui, hidden: checked } })
            }
          />
        </CollapsibleSection>

        <CollapsibleSection title="Дополнительно" defaultOpen={false}>
          <InspectorTextInput
            label="Default value"
            value={getDefaultValueString(field)}
            onChange={(value) =>
              builderStore.patchField(stepId, field.id, {
                defaultValue: parseDefaultValue(field, value),
              } as Partial<typeof field>)
            }
          />
          <InspectorCheckbox
            label="Readonly"
            checked={!!field.ui?.readOnly}
            onChange={(checked) =>
              builderStore.patchField(stepId, field.id, { ui: { ...field.ui, readOnly: checked } })
            }
          />
          <InspectorCheckbox
            label="Disabled"
            checked={!!field.ui?.disabled}
            onChange={(checked) =>
              builderStore.patchField(stepId, field.id, { ui: { ...field.ui, disabled: checked } })
            }
          />
        </CollapsibleSection>

        {hasOptions(field) && (
          <CollapsibleSection title="Options" defaultOpen={false}>
            {field.options.map((option, optionIndex) => (
              <InspectorTextInput
                key={option.id}
                label={`Вариант ${optionIndex + 1}`}
                value={option.label}
                onChange={(value) => {
                  const options = field.options.map((item, idx) =>
                    idx === optionIndex ? { ...item, label: value } : item,
                  );
                  builderStore.patchField(stepId, field.id, { options } as Partial<typeof field>);
                }}
              />
            ))}
          </CollapsibleSection>
        )}

        <CollapsibleSection title="Visibility" defaultOpen={false}>
          <InspectorSelect
            label="Условие: поле"
            value={field.logic?.[0]?.when.fieldId ?? ''}
            placeholder="Выберите поле"
            onChange={(value) => {
              builderStore.setFieldLogic(stepId, field.id, [
                {
                  when: {
                    fieldId: value,
                    operator: field.logic?.[0]?.when.operator ?? 'isNotEmpty',
                  },
                  actions: field.logic?.[0]?.actions ?? [{ type: 'show', targetId: field.id }],
                },
              ]);
            }}
          >
            {allFields.map((inputField) => (
              <Option key={inputField.id} value={inputField.id}>
                {inputField.label ?? inputField.name}
              </Option>
            ))}
          </InspectorSelect>
          <InspectorSelect
            label="Оператор"
            value={field.logic?.[0]?.when.operator ?? 'isNotEmpty'}
            onChange={(value) => {
              const current = field.logic?.[0];
              builderStore.setFieldLogic(stepId, field.id, [
                {
                  when: {
                    fieldId: current?.when.fieldId ?? allFields[0]?.id ?? '',
                    operator: value as LogicOperator,
                    value: current?.when.value,
                  },
                  actions: current?.actions ?? [{ type: 'show', targetId: field.id }],
                },
              ]);
            }}
          >
            {LOGIC_OPERATORS.map((operator) => (
              <Option key={operator} value={operator}>
                {operator}
              </Option>
            ))}
          </InspectorSelect>
        </CollapsibleSection>
      </InspectorStack>
    </InspectorScroll>
  );
});
