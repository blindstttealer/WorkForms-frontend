import { CloseOutlined, SwapHorizOutlined } from '@mui/icons-material';
import { FC } from 'react';
import { ActionButton, ActionsContainer, FormItemContainer } from './styles';
import { EditField } from '../../../../../../components/ui/edit-field/EditField';
import { observer } from 'mobx-react-lite';
type MyFormListItemProps = {
  currentFormId?: string;
  id: string;
  onSwitchForm: (id: string) => void;
  onDeleteForm: (id: string) => void;
  onEditForm: (id: string, text: string) => void;
  title: string;
};
export const MyFormListItem: FC<MyFormListItemProps> = observer(
  ({ currentFormId, onSwitchForm, onDeleteForm, id, title, onEditForm }) => {
    const onSaveHandler = (text: string) => {
      onEditForm(id, text);
    };
    const handleSwitchClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSwitchForm(id);
    };
    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDeleteForm(id);
    };
    return (
      <FormItemContainer $isActive={currentFormId === id}>
        <div style={{ flexGrow: 1 }}>
          <EditField
            text={title}
            onStartEditMode={() => {}}
            onFinishEditMode={() => {}}
            onSave={onSaveHandler}
            onCancel={() => {}}
          />
        </div>

        <ActionsContainer>
          <ActionButton onClick={handleSwitchClick} aria-label="Переключить форму">
            <SwapHorizOutlined />
          </ActionButton>

          <ActionButton onClick={handleDeleteClick} aria-label="Удалить">
            <CloseOutlined />
          </ActionButton>
        </ActionsContainer>
      </FormItemContainer>
    );
  },
);
