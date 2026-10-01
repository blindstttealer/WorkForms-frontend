import styled, { keyframes } from 'styled-components';
const dropPulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`;
export const DropIndicatorRoot = styled.div<{
  $orientation: 'horizontal' | 'vertical';
}>`
  position: absolute;
  z-index: 8;
  pointer-events: none;
  animation: ${dropPulse} 1.2s ease-in-out infinite;

  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? `
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    transform: translateY(-50%);
  `
      : `
    top: 8px;
    bottom: 8px;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
  `}
`;
export const DropIndicatorLine = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
`;
export const DropIndicatorDot = styled.div<{
  $orientation: 'horizontal' | 'vertical';
}>`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color['Primary/Primary 60 Main']};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.color['Primary/Primary 20']};

  ${({ $orientation }) =>
    $orientation === 'horizontal'
      ? `
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  `
      : `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;
export const DropIndicatorHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 7;
  pointer-events: none;
`;
export const RowDropIndicatorHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 7;
  pointer-events: none;
`;
