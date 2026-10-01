import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import { Button, T } from '@admiral-ds/react-ui';
import { httpClient } from '@/shared/api/httpClient';
import axios from 'axios';
import { Center, Wrapper } from './styles';
import { getTokenFromSearch } from './utils';
import { Status } from './types';
export const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useMemo(() => getTokenFromSearch(location.search), [location.search]);
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Отсутствует токен подтверждения в ссылке.');
      return;
    }
    const confirmEmail = async () => {
      try {
        const resp = await httpClient.post('/auth/confirmVerification', { token });
        const data = resp?.data ?? resp;
        setStatus('success');
        setMessage(data?.message || 'Email успешно подтверждён.');
      } catch (err: unknown) {
        const data = axios.isAxiosError(err)
          ? (err.response?.data as { code?: string; message?: string; email?: string })
          : undefined;
        const code = data?.code;
        setEmail(data?.email || null);
        switch (code) {
          case 'expired':
            setStatus('expired');
            setMessage(data?.message || 'Срок действия ссылки подтверждения истёк.');
            break;
          case 'already_confirmed':
            setStatus('already_confirmed');
            setMessage(data?.message || 'Email уже подтверждён.');
            break;
          default:
            setStatus('error');
            setMessage(data?.message || 'Не удалось подтвердить email.');
        }
      }
    };
    confirmEmail();
  }, [token, navigate]);
  const handleResend = async () => {
    if (!email) {
      setResendMessage(
        'Не удалось определить email. Введите почту вручную на странице повторной отправки.',
      );
      return;
    }
    setResendLoading(true);
    setResendMessage(null);
    try {
      await httpClient.post('/auth/resend-confirmation', { email });
      setResendMessage('Письмо с подтверждением отправлено повторно. Проверьте почту.');
    } catch (err: unknown) {
      const data = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string })
        : undefined;
      const respMsg =
        data?.message ||
        (err instanceof Error ? err.message : undefined) ||
        'Не удалось отправить письмо повторно.';
      setResendMessage(respMsg);
    } finally {
      setResendLoading(false);
    }
  };
  return (
    <Wrapper>
      <Center>
        {status === 'loading' && <T font="Body/Body 1 Short">Проверяем ссылку...</T>}

        {status === 'success' && (
          <>
            <T font="Body/Body 1 Short">Email подтверждён</T>
            <T font="Body/Body 1 Short">{message}</T>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button appearance="primary" onClick={() => navigate(paths.login)}>
                Перейти к входу
              </Button>
              <Button appearance="secondary" onClick={() => navigate(paths.home)}>
                На главную
              </Button>
            </div>
          </>
        )}

        {status === 'already_confirmed' && (
          <>
            <T font="Body/Body 1 Short">Email уже подтверждён</T>
            <T font="Body/Body 1 Short">{message}</T>
            <Button appearance="primary" onClick={() => navigate(paths.login)}>
              Войти
            </Button>
          </>
        )}

        {status === 'expired' && (
          <>
            <T font="Body/Body 1 Short">Срок действия ссылки истёк</T>
            <T font="Body/Body 1 Short">{message}</T>
            {resendMessage && <T font="Body/Body 1 Short">{resendMessage}</T>}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button appearance="secondary" onClick={handleResend} disabled={resendLoading}>
                {resendLoading ? 'Отправка...' : 'Отправить письмо снова'}
              </Button>
              <Button appearance="primary" onClick={() => navigate(paths.login)}>
                Войти
              </Button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <T font="Body/Body 1 Short">Ошибка подтверждения</T>
            <T font="Body/Body 1 Short">{message}</T>
            <Button appearance="secondary" onClick={() => navigate(paths.support)}>
              Связаться с поддержкой
            </Button>
          </>
        )}
      </Center>
    </Wrapper>
  );
};
