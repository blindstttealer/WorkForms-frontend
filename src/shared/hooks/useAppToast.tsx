import { DefaultToastItem, ToastItemWithAutoDelete, useToast } from '@admiral-ds/react-ui';
import { v4 as uuidv4 } from 'uuid';
export const useAppToast = () => {
  const { addToastItem, removeToastItem } = useToast();
  const showToast = (
    message: string,
    options?: {
      title?: string;
      status?: 'error' | 'success' | 'info' | 'warning';
      autoDeleteTime?: number;
      isClosable?: boolean;
    },
  ) => {
    const toastId = uuidv4();
    const renderToast = (id: string) => {
      const handleOnClose = () => removeToastItem({ id, renderToast });
      return (
        <ToastItemWithAutoDelete
          onRemoveNotification={handleOnClose}
          autoDeleteTime={options?.autoDeleteTime ?? 5000}
        >
          <DefaultToastItem
            status={options?.status ?? 'error'}
            title={options?.title ?? 'Уведомление'}
            isClosable={options?.isClosable ?? true}
            onClose={handleOnClose}
            displayStatusIcon
          >
            {message}
          </DefaultToastItem>
        </ToastItemWithAutoDelete>
      );
    };
    addToastItem({ id: toastId, renderToast });
  };
  return {
    showErrorToast: (msg: string, title?: string) => showToast(msg, { status: 'error', title }),
    showSuccessToast: (msg: string, title?: string) => showToast(msg, { status: 'success', title }),
    showInfoToast: (msg: string, title?: string) => showToast(msg, { status: 'info', title }),
    showWarningToast: (msg: string, title?: string) => showToast(msg, { status: 'warning', title }),
  };
};
