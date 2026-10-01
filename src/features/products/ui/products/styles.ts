import styled from 'styled-components';
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const ProductsColumn = styled.div`
  flex: 1;
  padding: 1rem;
`;
export const Card = styled.div`
  background-color: ${({ theme }) => theme.color['Background/Background 1']};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: 0.2s ease;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;
export const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 1rem;
`;
export const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
`;
export const Price = styled.span`
  font-weight: bold;
  color: #2a9d8f;
  font-size: 1rem;
`;
export const Category = styled.span`
  font-size: 0.9rem;
  color: #666;
`;
