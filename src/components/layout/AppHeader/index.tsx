import { ReactNode, forwardRef } from 'react';
import { StyledHeader, Container } from './styles';
interface AppHeaderProps {
  children?: ReactNode;
}
const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(({ children }, ref) => {
  return (
    <StyledHeader ref={ref}>
      <Container>{children}</Container>
    </StyledHeader>
  );
});
AppHeader.displayName = 'AppHeader';
export default AppHeader;
