import {
  Button,
  InputField,
  ModalButtonPanel,
  ModalContent,
  ModalTitle,
} from '@admiral-ds/react-ui';
import { StyledModal } from './styles';
interface CreateFormModalProps {
  formName: string;
  error: string;
  onOkHandler: () => void;
  onCancelHandler: () => void;
  onChangeFormName: (name: string) => void;
}
export const CreateFormModal = ({
  onOkHandler,
  formName,
  error,
  onCancelHandler,
  onChangeFormName,
}: CreateFormModalProps) => {
  return (
    <StyledModal onClose={onCancelHandler} dimension={'m'}>
      <ModalTitle>Новая форма</ModalTitle>
      <ModalContent>
        <form>
          <InputField
            value={formName}
            onChange={(event) => {
              onChangeFormName(event.target.value);
            }}
            status={error ? 'error' : undefined}
            extraText={error}
            placeholder="Введите название формы"
          />
        </form>
      </ModalContent>
      <ModalButtonPanel>
        <Button appearance="primary" dimension="s" onClick={onOkHandler} disabled={!formName}>
          Создать
        </Button>
        <Button appearance="secondary" dimension="s" onClick={onCancelHandler}>
          Отмена
        </Button>
      </ModalButtonPanel>
    </StyledModal>
  );
};
