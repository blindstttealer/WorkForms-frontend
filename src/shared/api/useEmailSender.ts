import emailjs from '@emailjs/browser';
type SendEmailParams<T extends Record<string, unknown>> = {
  templateId?: string;
  data: T;
};
type EmailConfig = {
  serviceId?: string;
  publicKey?: string;
  defaultTemplateId?: string;
};
type Callbacks = {
  onSuccess?: (response: unknown) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
};
export const useEmailSender = (userConfig?: EmailConfig) => {
  const config = {
    serviceId: userConfig?.serviceId || process.env.REACT_APP_EMAILJS_SERVICE_ID,
    publicKey: userConfig?.publicKey || process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    defaultTemplateId:
      userConfig?.defaultTemplateId || process.env.REACT_APP_EMAILJS_DEFAULT_TEMPLATE_ID,
  };
  if (!config.serviceId || !config.publicKey) {
    throw new Error('EmailJS serviceId and publicKey are required!');
  }
  const sendEmail = async <T extends Record<string, unknown>>(
    params: SendEmailParams<T>,
    callbacks?: Callbacks,
  ) => {
    const { templateId = config.defaultTemplateId, data } = params;
    if (!templateId) {
      throw new Error('templateId is required!');
    }
    try {
      const response = await emailjs.send(config.serviceId!, templateId, data, {
        publicKey: config.publicKey!,
      });
      callbacks?.onSuccess?.(response);
      return response;
    } catch (error) {
      callbacks?.onError?.(error);
      throw error;
    } finally {
      callbacks?.onFinally?.();
    }
  };
  return { sendEmail };
};
