import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from '@admiral-ds/react-ui';
import { LayoutContainer, LoaderContainer } from '../layout/AppLayout/styles';
import { useAuth } from '@/features/auth/hooks';
import { paths } from '@/shared/routes';
export type AuthAccess = 'public' | 'protected' | 'guest-only';
interface AuthGuardProps {
  children: React.ReactNode;
  access?: AuthAccess;
  redirectTo?: string;
  redirectAuthenticatedTo?: string;
}
export const AuthGuard: React.FC<AuthGuardProps> = observer((props: AuthGuardProps) => {
  const {
    children,
    access = 'public',
    redirectTo = paths.login,
    redirectAuthenticatedTo = paths.home,
  } = props;
  const location = useLocation();
  const { isAuth, isLoading } = useAuth();
  if (isLoading) {
    return (
      <LayoutContainer>
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      </LayoutContainer>
    );
  }
  switch (access) {
    case 'protected':
      if (!isAuth) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
      }
      break;
    case 'guest-only':
      if (isAuth) {
        const from = location.state?.from?.pathname || redirectAuthenticatedTo;
        return <Navigate to={from} replace />;
      }
      break;
    case 'public':
    default:
      break;
  }
  return <>{children}</>;
});
