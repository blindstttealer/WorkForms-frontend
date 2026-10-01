import { Badge, Button, InputField } from '@admiral-ds/react-ui';
import {
  Avatar,
  ChatHeader,
  Composer,
  EmptyState,
  HeaderMeta,
  MessageBubble,
  MessageRow,
  MessagesWindow,
  Meta,
  Panel,
  RightColumn,
  Search,
  Sidebar,
  Status,
  StyledInput,
  UserContainer,
  UserInfo,
  UserName,
  UsersGrid,
  UsersList,
  UserSnippet,
} from '../../styles';
import { SearchIcon } from '../SearchIcon';
import { PhoneIcon } from '../PhoneIcon';
import { SendMessageIcon } from '../SendMessageIcon';
import { Message, Participant } from '../../types';
import { ChangeEvent, useCallback } from 'react';
interface ChatContentProps {
  activeParticipant: Participant;
  participants: Participant[];
  setActiveParticipant: (participant: Participant) => void;
  onOpenCallModal: () => void;
  userMessages: Message[];
  inputMessage: string;
  onChangeInputMessage: (value: string) => void;
  sendMessage: () => void;
  currentUser: string;
  isDrawerMode?: boolean;
}
export const ChatContent = ({
  participants,
  activeParticipant,
  setActiveParticipant,
  onOpenCallModal,
  userMessages,
  inputMessage,
  onChangeInputMessage,
  sendMessage,
  currentUser,
  isDrawerMode,
}: ChatContentProps) => {
  const handleSetActiveParticipant = useCallback(
    (participant: Participant) => {
      setActiveParticipant(participant);
    },
    [setActiveParticipant],
  );
  const handleOnChangeInputMessage = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeInputMessage(event.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  const handleClickSend = () => {
    sendMessage();
  };
  return (
    <>
      <Panel>
        <Sidebar>
          <Search>
            <InputField placeholder="Поиск по участникам" onChange={() => {}} />
          </Search>

          <UsersGrid aria-hidden />

          <UsersList>
            {participants.map((participant) => (
              <UserContainer
                key={participant.id}
                onClick={() => handleSetActiveParticipant(participant)}
                active={participant.id === activeParticipant?.id}
              >
                <Avatar size={44}>{participant.name.slice(0, 1).toUpperCase()}</Avatar>

                <UserInfo>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <UserName>{participant.name}</UserName>
                    {participant.unread ? <Badge>{participant.unread}</Badge> : null}
                  </div>
                  <UserSnippet>{participant.lastMessage}</UserSnippet>
                </UserInfo>
              </UserContainer>
            ))}
          </UsersList>

          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <Button appearance="ghost" dimension="s">
              Все чаты
            </Button>
          </div>
        </Sidebar>

        <RightColumn $isDrawerMode={isDrawerMode}>
          <ChatHeader>
            {activeParticipant ? (
              <>
                <Avatar size={48}>{activeParticipant.name.slice(0, 1).toUpperCase()}</Avatar>
                <HeaderMeta>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{activeParticipant.name}</div>
                  <Status>Онлайн</Status>
                </HeaderMeta>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                  <SearchIcon />
                  <button
                    onClick={onOpenCallModal}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <PhoneIcon />
                  </button>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: '#697386' }}>Выберите участника</div>
            )}
          </ChatHeader>

          {activeParticipant ? (
            <>
              <MessagesWindow>
                {userMessages?.map((msg) => {
                  const isOwn = msg.from === currentUser;
                  return (
                    <MessageRow key={msg.id} isOwn={isOwn}>
                      {!isOwn && <Avatar size={36}>{msg.from}</Avatar>}

                      <div>
                        <MessageBubble isOwn={isOwn}>{msg.text}</MessageBubble>
                        <Meta>{new Date(msg.createdAt).toLocaleTimeString()}</Meta>
                      </div>

                      {isOwn && <Avatar>Me</Avatar>}
                    </MessageRow>
                  );
                })}
              </MessagesWindow>

              <Composer>
                <StyledInput
                  value={inputMessage}
                  onChange={handleOnChangeInputMessage}
                  placeholder="Написать сообщение..."
                  onKeyDown={handleKeyDown}
                />
                <div onClick={handleClickSend} style={{ cursor: 'pointer' }}>
                  <SendMessageIcon />
                </div>
              </Composer>
            </>
          ) : (
            <EmptyState>Выберите участника</EmptyState>
          )}
        </RightColumn>
      </Panel>
    </>
  );
};
