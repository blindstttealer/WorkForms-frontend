import { useState } from 'react';
import styled from 'styled-components';
import { CheckOutlined, EditOutlined } from '@mui/icons-material';
type EditFieldProps = {
  text: string;
  width?: string;
  onStartEditMode?: () => void;
  onFinishEditMode?: () => void;
  onSave?: (newText: string) => void;
  onCancel?: () => void;
  className?: string;
};
const Container = styled.div<{
  $width?: string;
}>`
  display: flex;
  align-items: center;
`;
const EditInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  min-width: 150px;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;
const DisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const DisplayText = styled.span`
  cursor: text;
  padding: 4px 0;
  flex: 1;
`;
const IconButton = styled.button`
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  &:hover {
    color: #374151;
  }
`;
const SaveButton = styled(IconButton)`
  color: #3b82f6;

  &:hover {
    color: #2563eb;
  }
`;
export const EditField = ({
  text,
  width,
  onStartEditMode,
  onFinishEditMode,
  onSave,
  onCancel,
  className,
}: EditFieldProps) => {
  const [tempFieldText, setTempFieldText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true);
    onStartEditMode?.();
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    setTempFieldText(text);
    onFinishEditMode?.();
  };
  const handleSave = () => {
    onSave?.(tempFieldText);
    setEditMode(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      onCancel?.();
      deactivateEditMode();
    }
  };
  return (
    <Container $width={width} className={className}>
      {editMode ? (
        <>
          <EditInput
            value={tempFieldText}
            onChange={(e) => setTempFieldText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <SaveButton onClick={handleSave}>
            <CheckOutlined fontSize="small" />
          </SaveButton>
        </>
      ) : (
        <DisplayWrapper>
          <DisplayText onDoubleClick={activateEditMode}>{text}</DisplayText>
          <IconButton onClick={activateEditMode}>
            <EditOutlined fontSize="small" />
          </IconButton>
        </DisplayWrapper>
      )}
    </Container>
  );
};
