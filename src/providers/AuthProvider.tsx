import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { setupUnauthorizedInterceptor } from '@/api/interceptors/auth-interceptors';
export const AuthStoreProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    return setupUnauthorizedInterceptor(queryClient);
  }, [queryClient]);
  return <>{children}</>;
};
