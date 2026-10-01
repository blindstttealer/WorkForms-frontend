import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color['Neutral/Neutral 05']};
`;
export const ContentLayout = styled.div<{
  $hasHeader: boolean;
}>`
  display: flex;
  flex: 1;
  min-height: ${(props) => (props.$hasHeader ? 'calc(100vh - 100px)' : '100vh')};
  position: relative;
`;
export const MainContent = styled.main<{
  $collapsed: boolean;
}>`
  flex: 1;
  padding: 24px;
  transition: all 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;
