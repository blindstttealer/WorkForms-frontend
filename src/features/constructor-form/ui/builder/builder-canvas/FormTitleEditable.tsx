import { useEffect, useRef, useState } from 'react';
import { T } from '@admiral-ds/react-ui';
import styled from 'styled-components';
const DEFAULT_TITLE = 'Новая форма';
const TitleInput = styled.input`
  font: inherit;
  font-weight: 600;
  color: inherit;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  border-radius: 8px;
  padding: 2px 8px;
  min-width: 120px;
  max-width: 100%;
`;
type Props = {
  title: string;
  onCommit: (title: string) => void;
};
export function FormTitleEditable({ title, onCommit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const displayTitle = title.trim() || DEFAULT_TITLE;
  useEffect(() => {
    if (!editing) setDraft(title);
  }, [title, editing]);
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);
  const commit = () => {
    const next = draft.trim() || DEFAULT_TITLE;
    onCommit(next);
    setEditing(false);
  };
  if (editing) {
    return (
      <TitleInput
        ref={inputRef}
        value={draft}
        aria-label="Название формы"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') {
            setDraft(title);
            setEditing(false);
          }
        }}
      />
    );
  }
  return (
    <T
      font="Subtitle/Subtitle 2"
      as="span"
      title="Двойной щелчок для редактирования"
      style={{ cursor: 'text', userSelect: 'none' }}
      onDoubleClick={() => setEditing(true)}
    >
      {displayTitle}
    </T>
  );
}
