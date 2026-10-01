import { isAxiosError } from 'axios';
export function formatFormTemplateSaveError(err: unknown, fallback: string): string {
  if (!isAxiosError(err)) {
    return fallback;
  }
  const data = err.response?.data as {
    message?: unknown;
  };
  const msg = data?.message;
  if (typeof msg === 'string' && msg.trim()) {
    return msg.trim();
  }
  if (Array.isArray(msg) && typeof msg[0] === 'string') {
    return msg[0];
  }
  return fallback;
}
