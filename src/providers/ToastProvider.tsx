import React, { ReactNode } from 'react';
import { ToastProvider as AdmiralToastProvider, Toast } from '@admiral-ds/react-ui';
import styled from 'styled-components';
const TOAST_Z_INDEX = 1200;
interface ToastProviderProps {
  children: ReactNode;
  autoDeleteTime?: number;
}
const AppToast = styled(Toast)`
  z-index: ${TOAST_Z_INDEX};
  right: calc(var(--constructor-settings-inset, 0px) + 24px);
  transition: right 0.25s ease;
`;
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  autoDeleteTime = 5000,
}) => {
  return (
    <AdmiralToastProvider autoDeleteTime={autoDeleteTime}>
      {children}
      <AppToast position="bottom-right" />
    </AdmiralToastProvider>
  );
};
