import styled from 'styled-components';
export const FormItemContainer = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s;
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.color['Background/Background 2'] : theme.color['Background/Background 1']};

  &:hover {
    border-color: ${({ theme }) => theme.color['Neutral/Neutral 30']};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;
export const FormTitle = styled.span`
  flex: 1;
  cursor: pointer;
  margin: 0;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  ${({ theme }) => theme.typography['Body/Body 2 Long']};

  &.current {
    color: ${({ theme }) => theme.color['Primary/Primary 60']};
    ${({ theme }) => theme.typography['Subtitle/Subtitle 3']};
  }
`;
export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export const ActionButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  cursor: pointer;
  transition: all 0.2s;
  ${({ theme }) => theme.typography['Caption/Caption 1']};

  &:hover {
    color: ${({ theme }) => theme.color['Primary/Primary 60']};
    background-color: ${({ theme }) => theme.color['Background/Background 2']};
  }
`;
