import { styled } from 'styled-components';
import { Button, Link } from '@admiral-ds/react-ui';
export const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 24px;
`;
export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color['Primary/Primary 10']} 0%,
    ${({ theme }) => theme.color['Neutral/Neutral 10']} 50%,
    ${({ theme }) => theme.color['Special/Static White']} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.color['Purple/Purple 10']} 0%,
      transparent 70%
    );
    opacity: 0.3;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.color['Blue/Blue 10']} 0%,
      transparent 70%
    );
    opacity: 0.2;
    z-index: 0;
  }
`;
export const FormCard = styled.div`
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.color['Neutral/Neutral 05']} 0%,
    ${({ theme }) => theme.color['Special/Static White']} 100%
  );
  border-radius: 32px;
  padding: 56px 48px;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.12),
      0 12px 40px rgba(0, 0, 0, 0.06),
      0 4px 12px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: 40px 32px;
    border-radius: 24px;
    max-width: 420px;
  }

  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 20px;
  }
`;
export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;
export const FormIcon = styled.div<{
  icon?: string;
}>`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color['Primary/Primary 60']} 0%,
    ${({ theme }) => theme.color['Purple/Purple 60']} 100%
  );
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(74, 58, 255, 0.2);

  &::before {
    content: '${(props) => props.icon || '👤'}';
    font-size: 28px;
    filter: brightness(0) invert(1);
  }
`;
export const FormTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color['Neutral/Neutral 90']} 0%,
    ${({ theme }) => theme.color['Primary/Primary 70']} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;
export const FormSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  line-height: 1.5;
  margin: 0;
  text-align: center;
`;
export const FieldRow = styled.div`
  margin-top: 20px;
  position: relative;

  &:first-of-type {
    margin-top: 0;
  }
`;
export const Actions = styled.div<{
  isOneAction?: boolean;
}>`
  display: flex;
  justify-content: ${({ isOneAction }) => (isOneAction ? 'center' : 'space-between')};
  align-items: center;
  margin-top: 40px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;
export const AuthLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 32px;
  padding-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.color['Neutral/Neutral 30']} 50%,
      transparent 100%
    );
  }
`;
export const AuthText = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
  font-size: 14px;
  margin-right: 8px;
`;
export const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;
export const SubmitButton = styled(Button)`
  min-width: 120px;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 58, 255, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
export const GhostButton = styled(Button)`
  height: 48px;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`;
