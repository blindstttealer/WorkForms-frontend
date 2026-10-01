import { InputField } from '@admiral-ds/react-ui';
import { keyframes, styled } from 'styled-components';
export const Panel = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100%;
  min-height: 0;
  gap: 0;
`;
export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-right: 1px solid rgba(18, 39, 63, 0.06);
  background: linear-gradient(180deg, rgba(250, 250, 252, 0.92), rgba(245, 246, 250, 0.92));
  min-height: 0;
`;
export const Search = styled.div`
  padding: 6px 0 2px;
`;
export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding-right: 6px;
  min-height: 0;
`;
export const UserContainer = styled.button<{
  active?: boolean;
}>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  background: ${({ active }) => (active ? 'rgba(0,102,204,0.08)' : 'transparent')};
  transition:
    background 140ms ease,
    transform 120ms ease,
    box-shadow 120ms;

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 0, 0, 0.03);
  }
`;
export const Avatar = styled.div<{
  size?: number;
}>`
  width: ${({ size }) => size ?? 48}px;
  height: ${({ size }) => size ?? 48}px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
  background: linear-gradient(135deg, #5ac3ff 0%, #0066cc 100%);
  flex: 0 0 auto;
  box-shadow: 0 6px 18px rgba(9, 20, 40, 0.06);
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;
export const UserName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0f1724;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const UserSnippet = styled.div`
  font-size: 13px;
  color: #697386;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const RightColumn = styled.section<{
  $isDrawerMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: ${({ $isDrawerMode }) => ($isDrawerMode ? '300px' : undefined)};
`;
export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(18, 39, 63, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(250, 251, 253, 0.6));
`;
export const HeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Status = styled.div`
  font-size: 13px;
  color: #1f6feb;
`;
export const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 6px 0;
  overflow-y: auto;
  min-height: 0;
  max-height: 220px;
`;
export const MessagesWindow = styled.div`
  padding: 18px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  background: linear-gradient(180deg, #ffffff, #fbfcff);
`;
export const MessageRow = styled.div<{
  isOwn?: boolean;
}>`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
`;
export const MessageBubble = styled.div<{
  isOwn?: boolean;
}>`
  position: relative;
  padding: 12px 14px;
  border-radius: 14px;
  border-bottom-right-radius: ${({ isOwn }) => (isOwn ? '6px' : '14px')};
  border-bottom-left-radius: ${({ isOwn }) => (isOwn ? '14px' : '6px')};
  background: ${({ isOwn }) => (isOwn ? 'linear-gradient(180deg,#2b86d1,#0066cc)' : '#f4f6f9')};
  color: ${({ isOwn }) => (isOwn ? '#fff' : '#0f1724')};
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 6px 18px rgba(12, 20, 40, 0.06);
`;
export const Meta = styled.div`
  font-size: 11px;
  color: #91a0b4;
  margin-top: 6px;
  text-align: left;
`;
export const Composer = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  align-items: center;
  border-top: 1px solid rgba(18, 39, 63, 0.04);
  background: linear-gradient(180deg, #fff, #fbfcff);
`;
export const EmptyState = styled.div`
  padding: 24px;
  color: #697386;
  text-align: center;
`;
export const StyledInput = styled(InputField)`
  display: block;
  flex: 1;
  box-sizing: border-box;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff, #f9fafb);
  padding: 6px;
  transition:
    box-shadow 180ms ease,
    border-color 180ms ease,
    transform 120ms ease;

  &:focus-within {
    border-color: #2b86d1;
    box-shadow:
      0 6px 18px rgba(9, 20, 40, 0.06),
      0 0 0 4px rgba(43, 134, 209, 0.06);
    transform: translateY(-1px);
  }
`;
export const fade = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 12, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;
export const ModalCard = styled.div`
  width: 480px;
  max-width: calc(100% - 40px);
  background: linear-gradient(180deg, #ffffff, #fbfbff);
  border-radius: 14px;
  box-shadow: 0 18px 48px rgba(12, 34, 80, 0.14);
  padding: 20px;
  animation: ${fade} 160ms ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;
export const ModalBody = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
export const VideoPreview = styled.div<{
  active?: boolean;
}>`
  width: 160px;
  height: 110px;
  border-radius: 10px;
  background: ${({ active }) => (active ? '#000' : 'linear-gradient(180deg,#f5f6fb,#eef2ff)')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? '#fff' : '#9aa2b2')};
  font-weight: 600;
  font-size: 13px;
  overflow: hidden;
`;
export const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;
export const ModalActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 6px;
  justify-content: flex-end;
`;
