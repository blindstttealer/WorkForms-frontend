import { styled } from 'styled-components';
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
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(18, 39, 63, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(250, 251, 253, 0.6));
`;
