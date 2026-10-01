import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import { useQueryClient } from '@tanstack/react-query';
import { getUserControllerGetMeQueryKey, useUserControllerLogin } from '@/api/generated/user/user';
import { useAppToast } from '@/shared/hooks/useAppToast';
import axios from 'axios';
import { LoginFormData, loginSchema } from './validationSchema';
import {
  PageWrapper,
  FormCard,
  FormHeader,
  FormIcon,
  FormTitle,
  FormSubtitle,
  FieldRow,
  Actions,
  AuthLinkWrapper,
  AuthText,
  StyledLink,
  SubmitButton,
  GhostButton,
} from '../../styles';
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useUserControllerLogin();
  const { showErrorToast } = useAppToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const handleLogin = async (values: LoginFormData) => {
    try {
      const data = await loginMutation.mutateAsync({
        data: { login: values.loginOrEmail, password: values.password },
      });
      queryClient.setQueryData(getUserControllerGetMeQueryKey(), data);
      navigate(paths.home);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string })?.message || err.message
        : 'Не удалось войти';
      showErrorToast(message, 'Ошибка входа');
    }
  };
  const goToForgot = () => navigate(paths.forgot);
  const handleBackToRegister = () => navigate(paths.registration);
  return (
    <PageWrapper>
      <FormCard>
        <FormHeader>
          <FormIcon icon="🔐" />
          <FormTitle>Вход в аккаунт</FormTitle>
          <FormSubtitle>Введите свои данные, чтобы войти в систему</FormSubtitle>
        </FormHeader>

        <form onSubmit={handleSubmit(handleLogin)} style={{ width: '100%' }} noValidate>
          <FieldRow>
            <InputField
              label="Логин или Email"
              {...register('loginOrEmail')}
              status={errors.loginOrEmail ? 'error' : undefined}
              extraText={errors.loginOrEmail?.message}
              dimension="xl"
            />
          </FieldRow>

          <FieldRow>
            <InputField
              label="Пароль"
              type="password"
              {...register('password')}
              status={errors.password ? 'error' : undefined}
              extraText={errors.password?.message}
              dimension="xl"
            />
          </FieldRow>

          <Actions>
            <GhostButton appearance="ghost" onClick={goToForgot} dimension="xl">
              Забыли пароль?
            </GhostButton>
            <SubmitButton
              appearance="primary"
              type="submit"
              disabled={isSubmitting || !isValid || loginMutation.isPending}
              dimension="xl"
            >
              {isSubmitting || loginMutation.isPending ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </Actions>

          <AuthLinkWrapper>
            <AuthText>Нет аккаунта?</AuthText>
            <StyledLink appearance="primary" onClick={handleBackToRegister}>
              Зарегистрироваться
            </StyledLink>
          </AuthLinkWrapper>
        </form>
      </FormCard>
    </PageWrapper>
  );
};
