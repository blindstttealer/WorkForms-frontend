import { PropsWithChildren } from 'react';
import { StyledDrawer } from './styles';
import { DrawerTitle, DrawerContent, DrawerButtonPanel, Button } from '@admiral-ds/react-ui';
interface DrawerChatModeProps {
  isOpen: boolean;
  onCloseChat: () => void;
  setChatMode: () => void;
  container: HTMLDivElement | null;
}
const CHAT_DRAWER_OVERLAY_Z_INDEX = 1100;
export const DrawerChatMode = ({
  children,
  isOpen,
  onCloseChat,
  setChatMode,
  container,
}: PropsWithChildren<DrawerChatModeProps>) => {
  void container;
  return (
    <StyledDrawer
      isOpen={isOpen}
      onClose={onCloseChat}
      aria-labelledby="chat-drawer-title"
      closeOnBackdropClick
      overlayStyle={{ zIndex: CHAT_DRAWER_OVERLAY_Z_INDEX }}
    >
      <DrawerTitle id="chat-drawer-title">Онлайн чат</DrawerTitle>
      <Button dimension="s" appearance="ghost" onClick={setChatMode}>
        Модальное окно
      </Button>

      <DrawerContent>{children}</DrawerContent>

      <DrawerButtonPanel />
    </StyledDrawer>
  );
};
