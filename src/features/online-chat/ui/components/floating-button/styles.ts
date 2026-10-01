import { styled } from 'styled-components';
export const FloatingIcon = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4aa8ff 0%, #0066cc 100%);
  box-shadow: 0 10px 30px rgba(5, 22, 48, 0.28);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition:
    transform 180ms cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 180ms;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 18px 40px rgba(5, 22, 48, 0.36);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;
