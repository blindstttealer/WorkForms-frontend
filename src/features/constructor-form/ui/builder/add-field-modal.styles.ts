import styled from 'styled-components';
export const StepNavTabDragWrap = styled.div<{
  $active?: boolean;
  $dragging?: boolean;
}>`
  display: inline-flex;
  flex-shrink: 0;
  opacity: ${({ $dragging }) => ($dragging ? 0.45 : 1)};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;
export const FieldDragHandle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  cursor: grab;
  touch-action: none;

  &:hover {
    background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
    color: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  }

  &:active {
    cursor: grabbing;
  }
`;
