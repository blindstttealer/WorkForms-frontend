import styled from 'styled-components';
export const Container = styled.div`
  max-width: 720px;
  margin: 40px auto;
  padding: 30px 35px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color['Background/Background 1']};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
export const StyledCard = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  padding: 16px;
`;
export const Section = styled.section`
  margin-bottom: 24px;
`;
export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  margin-bottom: 16px;
  border-left: 5px solid ${({ theme }) => theme.color['Primary/Primary 60']};
  padding-left: 12px;
  text-transform: uppercase;
  ${({ theme }) => theme.typography['Subtitle/Subtitle 2']};
`;
export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color['Background/Background 1']};
`;
export const Label = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  text-transform: capitalize;
  letter-spacing: 0.04em;
  ${({ theme }) => theme.typography['Subtitle/Subtitle 3']};
`;
export const Value = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ theme }) => theme.typography['Body/Body 1 Short']};
`;
export const NoData = styled.div`
  color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
  font-style: italic;
  padding: 16px 0;
  text-align: center;
  ${({ theme }) => theme.typography['Body/Body 2 Long']};
`;
export const EditButton = styled.button`
  margin-top: 16px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  ${({ theme }) => theme.typography['Button/Button 2']};

  &:hover {
    background-color: ${({ theme }) => theme.color['Primary/Primary 70']};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 16px;
`;
