import { useUserControllerGetMe } from '@/api/generated/user/user';
export function useAuth() {
  const { data, isLoading, isError, isFetched, isSuccess } = useUserControllerGetMe();
  return {
    user: data,
    isAuth: !!data,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  };
}
