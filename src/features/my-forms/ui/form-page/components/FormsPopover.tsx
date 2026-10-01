import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, Drawer, DrawerTitle, DrawerContent } from '@admiral-ds/react-ui';
import { CreateButtonWrapper } from '../styles';
import { FormsPopoverProps } from '../types';
import { MyFormList } from '../ui/form-list/MyFormList';
const FORMS_DRAWER_OVERLAY_Z_INDEX = 1100;
export const FormsPopover = observer(
  ({
    currentFormId,
    onSwitchForm,
    onDeleteForm,
    onEditForm,
    onCreateNewForm,
    formList,
  }: FormsPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = useCallback(() => setIsOpen(false), []);
    const handleSwitchForm = useCallback(
      (id: string) => {
        onSwitchForm(id);
        close();
      },
      [onSwitchForm, close],
    );
    const handleCreateNewForm = useCallback(() => {
      close();
      onCreateNewForm();
    }, [close, onCreateNewForm]);
    return (
      <>
        <Button appearance="secondary" dimension="m" onClick={() => setIsOpen(true)}>
          Мои формы
        </Button>

        <StyledDrawer
          isOpen={isOpen}
          onClose={close}
          position="right"
          backdrop
          closeOnBackdropClick
          closeOnEscapeKeyDown
          displayCloseIcon
          aria-labelledby="my-forms-drawer-title"
          overlayStyle={{ zIndex: FORMS_DRAWER_OVERLAY_Z_INDEX }}
        >
          <DrawerTitle id="my-forms-drawer-title">Мои формы</DrawerTitle>
          <StyledDrawerContent>
            <ListScrollRegion>
              <MyFormList
                currentFormId={currentFormId}
                onSwitchForm={handleSwitchForm}
                onDeleteForm={onDeleteForm}
                onEditForm={onEditForm}
                formList={formList}
              />
            </ListScrollRegion>
            <CreateButtonWrapper>
              <CreateFormButton appearance="primary" dimension="s" onClick={handleCreateNewForm}>
                Создать новую форму
              </CreateFormButton>
            </CreateButtonWrapper>
          </StyledDrawerContent>
        </StyledDrawer>
      </>
    );
  },
);
const StyledDrawer = styled(Drawer)`
  width: min(720px, 100vw);
  box-sizing: border-box;
`;
const StyledDrawerContent = styled(DrawerContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding-top: 8px;
`;
const ListScrollRegion = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.color['Neutral/Neutral 10']};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color['Neutral/Neutral 30']};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color['Neutral/Neutral 40']};
  }
`;
const CreateFormButton = styled(Button)`
  width: 100%;
  max-width: 280px;
`;
