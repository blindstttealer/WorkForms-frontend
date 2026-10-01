import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { ServicePlusOutline } from '@admiral-ds/icons';
import {
  InlineInsertAreaHint,
  InlineInsertAreaHost,
  InlineInsertAreaInput,
  InlineInsertAreaPanel,
  InlineInsertAreaPlusButton,
} from './insert.styles';
interface InlineInsertAreaProps {
  variant?: 'row' | 'column' | 'empty';
  active?: boolean;
  onActivate: () => void;
  onOpenLibrary: () => void;
  onCommitText: (text: string) => void;
  onDeactivate: () => void;
  placeholder?: string;
}
const DEFAULT_PLACEHOLDERS = {
  row: 'Введите текст или нажмите + для выбора компонента…',
  column: 'Добавить элемент…',
  empty: 'Начните вводить текст или выберите компонент…',
} as const;
export function InlineInsertArea({
  variant = 'row',
  active,
  onActivate,
  onOpenLibrary,
  onCommitText,
  onDeactivate,
  placeholder,
}: InlineInsertAreaProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (active) {
      setValue('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [active]);
  useEffect(() => {
    if (!active) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (hostRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-insert-modal-root]')) return;
      onDeactivate();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDeactivate();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onDeactivate]);
  const handleHostClick = (event: MouseEvent) => {
    if (active) return;
    event.stopPropagation();
    onActivate();
  };
  const handlePlusPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handlePlusClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!active) {
      onActivate();
    }
    onOpenLibrary();
  };
  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const text = value.trim();
      if (text) {
        onCommitText(text);
        setValue('');
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      onDeactivate();
    }
  };
  return (
    <InlineInsertAreaHost
      ref={hostRef}
      $variant={variant}
      $active={active}
      $hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleHostClick}
    >
      {active ? (
        <InlineInsertAreaPanel
          data-insert-area
          $variant={variant}
          onClick={(event) => event.stopPropagation()}
        >
          <InlineInsertAreaPlusButton
            type="button"
            title="Выбрать компонент"
            data-insert-library-trigger
            onPointerDown={handlePlusPointerDown}
            onClick={handlePlusClick}
          >
            <ServicePlusOutline width={18} height={18} />
          </InlineInsertAreaPlusButton>
          <InlineInsertAreaInput
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder ?? DEFAULT_PLACEHOLDERS[variant]}
          />
        </InlineInsertAreaPanel>
      ) : (
        <InlineInsertAreaHint $variant={variant} $visible={hovered} data-insert-hint />
      )}
    </InlineInsertAreaHost>
  );
}
InlineInsertArea.displayName = 'InlineInsertArea';
