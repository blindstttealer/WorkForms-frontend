import { PropsWithChildren } from 'react';
import { ChatHeader, ModalCard, ModalOverlay } from './styles';
import { Button } from '@admiral-ds/react-ui';
interface ModalChatModeProps {
  onOpen: boolean;
  onCloseChat: () => void;
  setChatMode: () => void;
}
export const ModalChatMode = ({
  onCloseChat,
  onOpen,
  setChatMode,
  children,
}: PropsWithChildren<ModalChatModeProps>) => {
  return onOpen ? (
    <ModalOverlay
      onClick={(e) => {
        if (e.target === e.currentTarget) onCloseChat();
      }}
    >
      <ModalCard
        style={{
          width: 960,
          height: 640,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <ChatHeader style={{ cursor: 'grab' }}>
          <strong>Онлайн чат</strong>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Button dimension="s" appearance="ghost" onClick={setChatMode}>
              В Drawer
            </Button>

            <Button dimension="s" appearance="ghost" onClick={onCloseChat}>
              ✕
            </Button>
          </div>
        </ChatHeader>

        <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      </ModalCard>
    </ModalOverlay>
  ) : null;
};
