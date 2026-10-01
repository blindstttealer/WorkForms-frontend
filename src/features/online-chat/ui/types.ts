export interface Message {
  id: string;
  sender: string;
  text: string;
  createdAt: string;
  from: string;
  to: string;
}
export interface Participant {
  id: string;
  name: string;
  lastMessage?: string;
  unread?: number;
}
export type ChatCurrentUser = {
  id: string;
};

export interface ChatDrawerProps {
  currentUser?: ChatCurrentUser | null;
  chatIcon?: React.ReactNode;
  drawerContainerRef: HTMLDivElement | null;
}
export type ChatModeType = 'modal' | 'drawer';
