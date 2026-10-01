import styled from 'styled-components';
export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ProgressContainer = styled.div`
  width: 100%;
`;
export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
export const FormContent = styled.div`
  margin-top: 20px;
`;
export const FormInfo = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  border-radius: 8px;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};

  h4 {
    margin-bottom: 12px;
    color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
    ${({ theme }) => theme.typography['Subtitle/Subtitle 2']};
  }

  p {
    margin: 6px 0;
    color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
    ${({ theme }) => theme.typography['Body/Body 2 Long']};
  }
`;
export const FormsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
`;
export const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  margin-top: 12px;
`;
export const StyledButton = styled.button`
  width: 100%;
  max-width: 240px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 30']};
  background-color: ${({ theme }) => theme.color['Background/Background 1']};
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  cursor: pointer;
  transition: all 0.2s;
  ${({ theme }) => theme.typography['Button/Button 2']};

  &:hover {
    border-color: ${({ theme }) => theme.color['Primary/Primary 60']};
    color: ${({ theme }) => theme.color['Primary/Primary 60']};
  }
`;
export const FormInfoBlock = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  border-radius: 8px;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
export const FormInfoTitle = styled.h4`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  ${({ theme }) => theme.typography['Subtitle/Subtitle 2']};
`;
export const FormInfoItem = styled.p`
  margin: 6px 0;
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
  ${({ theme }) => theme.typography['Body/Body 2 Long']};
`;
