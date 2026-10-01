import { Button, Modal, T } from '@admiral-ds/react-ui';
import { useCallback, useState } from 'react';
import { Column, StyledWrapper } from '../../styles';
interface EmailConfirmationProps {
  emailToConfirm: string;
}
export const EmailConfirmation = ({ emailToConfirm }: EmailConfirmationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleClose = useCallback(() => setIsModalOpen(false), []);
  const handleResendConfirmation = useCallback(async () => {}, []);
  if (!isModalOpen) return null;
  return (
    <Modal closeOnOutsideClick title="Подтвердите почту">
      <Column>
        <T font="Body/Body 1 Short">
          Мы отправили письмо подтверждения на <strong>{emailToConfirm}</strong>. Пожалуйста,
          откройте письмо и перейдите по ссылке.
        </T>
        <StyledWrapper>
          <Button appearance="ghost" onClick={handleClose}>
            Закрыть
          </Button>
          <Button appearance="primary" onClick={handleResendConfirmation}>
            Отправить снова
          </Button>
        </StyledWrapper>
      </Column>
    </Modal>
  );
};
