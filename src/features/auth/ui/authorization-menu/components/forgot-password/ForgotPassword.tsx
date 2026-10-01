import { useForm } from 'react-hook-form';
import { Button, Modal, InputField } from '@admiral-ds/react-ui';
import { Column } from '../../styles';
import { StyledWrapper } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from './validationSchema';
type ForgotForm = {
  loginOrEmail: string;
};
export const ForgotVisible = ({
  setForgotVisible,
  forgotVisible,
}: {
  setForgotVisible: (value: boolean) => void;
  forgotVisible: boolean;
}) => {
  if (!forgotVisible) return null;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      loginOrEmail: '',
    },
  });
  const handleForgot = async (_values: ForgotForm) => {
    void _values;
  };
  return (
    <Modal onClose={() => setForgotVisible(false)} title="Восстановление пароля">
      <form onSubmit={handleSubmit(handleForgot)} noValidate>
        <Column>
          <InputField
            {...register('loginOrEmail')}
            label="Логин или Email"
            extraText={errors.loginOrEmail?.message}
            status={errors.loginOrEmail ? 'error' : undefined}
          />

          <StyledWrapper>
            <Button appearance="primary" type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить инструкцию'}
            </Button>
          </StyledWrapper>
        </Column>
      </form>
    </Modal>
  );
};
