import { ReactNode } from 'react';
import { FloatingIcon } from './styles';
import { ChatIcon as DefaultChatIcon } from '../ChatIcon';
interface FloatingButtonProps {
  onOpen: () => void;
  chatIcon: ReactNode;
}
export const FloatingButton = ({ chatIcon, onOpen }: FloatingButtonProps) => {
  return (
    <FloatingIcon onClick={onOpen} aria-label="Открыть чат">
      {chatIcon ?? <DefaultChatIcon />}
    </FloatingIcon>
  );
};
