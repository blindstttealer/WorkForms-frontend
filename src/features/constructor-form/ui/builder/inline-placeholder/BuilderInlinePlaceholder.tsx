import { useEffect, useRef, useState } from 'react';
import type { BuilderInlinePlaceholderProps } from './types';
import { PlaceholderEditor, PlaceholderHitArea, PlaceholderWrap } from './styles';
export function BuilderInlinePlaceholder({
  placeholder = '',
  onChange,
  children,
}: BuilderInlinePlaceholderProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(placeholder);
  const editorRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setDraft(placeholder);
  }, [placeholder]);
  useEffect(() => {
    if (editing) {
      editorRef.current?.focus();
      editorRef.current?.select();
    }
  }, [editing]);
  const commit = () => {
    onChange(draft.trim());
    setEditing(false);
  };
  const cancel = () => {
    setDraft(placeholder);
    setEditing(false);
  };
  const stopDrag = (event: React.PointerEvent | React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <PlaceholderWrap onPointerDown={stopDrag} onClick={stopDrag}>
      {children}
      {editing ? (
        <PlaceholderEditor
          ref={editorRef}
          value={draft}
          placeholder="Placeholder"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              event.preventDefault();
              commit();
            }
            if (event.key === 'Escape') {
              event.preventDefault();
              cancel();
            }
          }}
        />
      ) : (
        <PlaceholderHitArea
          type="button"
          title="Кликните, чтобы изменить placeholder"
          onClick={(event) => {
            event.stopPropagation();
            setEditing(true);
          }}
        >
          {placeholder || 'Добавить placeholder…'}
        </PlaceholderHitArea>
      )}
    </PlaceholderWrap>
  );
}
BuilderInlinePlaceholder.displayName = 'BuilderInlinePlaceholder';
