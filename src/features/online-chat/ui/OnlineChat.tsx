import React, { useEffect, useState } from 'react';
import { FloatingButton } from './components/floating-button';
import { DrawerChatMode } from './components/drawer-mode';
import { ModalChatMode } from './components/modal-mode';
import { ChatDrawerProps, ChatModeType, Message, Participant } from './types';
import { ChatContent } from './components/chat-content';
import { socket } from '@/api/services';

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: 'hr', name: 'HR', lastMessage: 'Привет! Добро пожаловать в команду.', unread: 0 },
  { id: 'anna', name: 'Anna', lastMessage: 'Готов обсудить дизайн', unread: 2 },
  { id: 'max', name: 'Max', lastMessage: 'Починил баг в тестах', unread: 0 },
  { id: 'dev', name: 'Dev Team', lastMessage: 'Деплой на staging прошёл', unread: 5 },
];

export const Chat: React.FC<ChatDrawerProps> = ({ currentUser, chatIcon, drawerContainerRef }) => {
  const [opened, setOpened] = useState(false);
  const participants = INITIAL_PARTICIPANTS;
  const [activeParticipant, setActiveParticipant] = useState<Participant>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    ['hr']: [],
    ['anna']: [],
    ['max']: [],
    ['dev']: [],
  });
  const [inputMessage, setInputMessage] = useState('');
  const [chatMode, setChatMode] = useState<ChatModeType>('drawer');

  useEffect(() => {
    if (!currentUser?.id) return;
    socket.on('new-message', (message: Message) => {
      const dialogUserId = message.from === currentUser.id ? message.to : message.from;
      setMessages((prev) => ({
        ...prev,
        [dialogUserId]: [...(prev[dialogUserId] || []), message],
      }));
    });
    return () => {
      socket.off('new-message');
    };
  }, [currentUser?.id]);

  const closeChat = () => setOpened(false);
  const handleSend = () => {
    if (!inputMessage.trim() || !activeParticipant) return;
    socket.emit('send-message', {
      toUserId: activeParticipant.id,
      text: inputMessage,
    });
    setInputMessage('');
  };
  const openCallModal = () => undefined;
  const setChatModeHandler = (mode: ChatModeType) => {
    setChatMode(mode);
  };
  const renderChatByMode = (chatMode: ChatModeType) => {
    const contentProps = {
      activeParticipant,
      inputMessage,
      onChangeInputMessage: setInputMessage,
      participants,
      userMessages: messages[activeParticipant?.id] || [],
      sendMessage: handleSend,
      onOpenCallModal: openCallModal,
      setActiveParticipant,
      currentUser: currentUser?.id,
    };
    switch (chatMode) {
      case 'drawer': {
        return (
          <DrawerChatMode
            isOpen={opened}
            onCloseChat={closeChat}
            setChatMode={() => setChatModeHandler('modal')}
            container={drawerContainerRef}
          >
            <ChatContent {...contentProps} isDrawerMode={chatMode === 'drawer'} />
          </DrawerChatMode>
        );
      }
      case 'modal': {
        return (
          <ModalChatMode
            onCloseChat={closeChat}
            onOpen={opened}
            setChatMode={() => setChatModeHandler('drawer')}
          >
            <ChatContent {...contentProps} />
          </ModalChatMode>
        );
      }
      default:
        return null;
    }
  };
  return (
    <>
      <FloatingButton chatIcon={chatIcon} onOpen={() => setOpened((prevValue) => !prevValue)} />

      {renderChatByMode(chatMode)}
    </>
  );
};
