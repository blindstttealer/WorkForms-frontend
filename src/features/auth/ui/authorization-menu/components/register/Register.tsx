import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import axios from 'axios';
import { RegisterFormData, registerSchema } from './validationSchema';
import { useUserControllerRegister } from '@/api/generated/user/user';
import { useAppToast } from '@/shared/hooks/useAppToast';
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
} from '../../styles';
export const Register: React.FC = () => {
  const registerMutation = useUserControllerRegister();
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useAppToast();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });
  const onSubmit = async (values: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync({
        data: {
          login: values.login,
          email: values.email,
          password: values.password,
        },
      });
      navigate(paths.emailConfirmation, { state: { email: values.email } });
      showSuccessToast('Регистрация прошла успешно', 'Подтверждение');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = err.response?.data;
        const message = response?.message || err.message || 'Ошибка регистрации';
        showErrorToast(message, 'Ошибка при регистрации');
        return;
      }
      showErrorToast('Произошла ошибка. Попробуйте позже.', 'Ошибка');
    }
  };
  const handleBackToLogin = () => {
    navigate(paths.login);
  };
  return (
    <PageWrapper>
      <FormCard>
        <FormHeader>
          <FormIcon icon="👤" />
          <FormTitle>Регистрация</FormTitle>
          <FormSubtitle>Создайте аккаунт, чтобы получить доступ ко всем возможностям</FormSubtitle>
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} noValidate>
          <FieldRow>
            <InputField
              label="Логин"
              {...registerField('login')}
              status={errors.login ? 'error' : undefined}
              extraText={errors.login?.message}
              dimension="xl"
            />
          </FieldRow>

          <FieldRow>
            <InputField
              label="Email"
              type="email"
              {...registerField('email')}
              status={errors.email ? 'error' : undefined}
              extraText={errors.email?.message}
              dimension="xl"
            />
          </FieldRow>

          <FieldRow>
            <InputField
              label="Пароль"
              type="password"
              {...registerField('password')}
              status={errors.password ? 'error' : undefined}
              extraText={errors.password?.message}
              dimension="xl"
            />
          </FieldRow>

          <Actions isOneAction>
            <SubmitButton
              appearance="primary"
              type="submit"
              disabled={isSubmitting || !isValid || registerMutation.isPending}
              dimension="xl"
            >
              {isSubmitting || registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </SubmitButton>
          </Actions>
        </form>

        <AuthLinkWrapper>
          <AuthText>Уже есть аккаунт?</AuthText>
          <StyledLink appearance="primary" onClick={handleBackToLogin}>
            Войти
          </StyledLink>
        </AuthLinkWrapper>
      </FormCard>
    </PageWrapper>
  );
};
