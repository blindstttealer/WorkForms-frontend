import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { InputField, T } from '@admiral-ds/react-ui';
import { FIELD_PALETTE, PALETTE_CATEGORIES } from '../../../model/registry/field-registry';
import type { FieldPaletteCategory, FieldType } from '../../../model/schema/form-schema';
import { FORM_FIELD_CATEGORY_ICONS, ICON_SIZE_SM } from '@/shared/icons';
import { InsertCard } from './InsertCard';
import {
  InsertCategoryTab,
  InsertCategoryTabs,
  InsertModalBackdrop,
  InsertModalBody,
  InsertModalCloseButton,
  InsertModalHeader,
  InsertModalPanel,
  InsertModalSearchWrap,
  InsertModalViewport,
  InsertPopoverGrid,
} from './insert.styles';
interface InsertFieldModalProps {
  onClose: () => void;
  onInsert: (type: FieldType) => void;
}
export function InsertFieldModal({ onClose, onInsert }: InsertFieldModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FieldPaletteCategory | 'all'>('all');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    return FIELD_PALETTE.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      const haystack = [item.label, item.description, item.example, item.type]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);
  const groupedItems = useMemo(() => {
    if (activeCategory !== 'all') {
      return [
        {
          id: activeCategory,
          label: PALETTE_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? '',
          items: filteredItems,
        },
      ];
    }
    return PALETTE_CATEGORIES.map((category) => ({
      id: category.id,
      label: category.label,
      items: filteredItems.filter((item) => item.category === category.id),
    })).filter((group) => group.items.length > 0);
  }, [activeCategory, filteredItems]);
  const handleInsert = (type: FieldType) => {
    onInsert(type);
    onClose();
  };
  return createPortal(
    <>
      <InsertModalBackdrop onClick={onClose} />
      <InsertModalViewport data-insert-modal-root>
        <InsertModalPanel
          role="dialog"
          aria-modal="true"
          aria-labelledby="insert-field-modal-title"
        >
          <InsertModalHeader>
            <div>
              <T font="Header/H5" as="h2" id="insert-field-modal-title">
                Библиотека компонентов
              </T>
              <T
                font="Body/Body 2 Short"
                color="Neutral/Neutral 50"
                as="p"
                style={{ marginTop: 6 }}
              >
                Выберите элемент и вставьте его в форму одним кликом
              </T>
            </div>
            <InsertModalCloseButton type="button" title="Закрыть" onClick={onClose}>
              ×
            </InsertModalCloseButton>
          </InsertModalHeader>

          <InsertModalSearchWrap>
            <InputField
              dimension="m"
              placeholder="Поиск по названию, описанию или типу…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </InsertModalSearchWrap>

          <InsertCategoryTabs>
            <InsertCategoryTab
              type="button"
              $active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            >
              Все
            </InsertCategoryTab>
            {PALETTE_CATEGORIES.map((category) => {
              const CategoryIcon = FORM_FIELD_CATEGORY_ICONS[category.id];
              return (
                <InsertCategoryTab
                  key={category.id}
                  type="button"
                  $active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CategoryIcon width={ICON_SIZE_SM} height={ICON_SIZE_SM} />
                  {category.label}
                </InsertCategoryTab>
              );
            })}
          </InsertCategoryTabs>

          <InsertModalBody>
            {filteredItems.length === 0 ? (
              <T font="Body/Body 2 Short" color="Neutral/Neutral 50" as="p">
                Ничего не найдено. Попробуйте другой запрос или категорию.
              </T>
            ) : (
              groupedItems.map((group) => {
                const CategoryIcon = FORM_FIELD_CATEGORY_ICONS[group.id as FieldPaletteCategory];
                return (
                  <div key={group.id} style={{ marginBottom: 24 }}>
                    {activeCategory === 'all' ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 12,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          opacity: 0.65,
                        }}
                      >
                        <CategoryIcon width={18} height={18} />
                        {group.label}
                      </div>
                    ) : null}
                    <InsertPopoverGrid>
                      {group.items.map((item) => (
                        <InsertCard
                          key={item.type}
                          item={item}
                          onInsert={() => handleInsert(item.type)}
                        />
                      ))}
                    </InsertPopoverGrid>
                  </div>
                );
              })
            )}
          </InsertModalBody>
        </InsertModalPanel>
      </InsertModalViewport>
    </>,
    document.body,
  );
}
InsertFieldModal.displayName = 'InsertFieldModal';
