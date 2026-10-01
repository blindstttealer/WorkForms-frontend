import { useAuth } from '@/features/auth/hooks';
import { EmailConfirmation } from '@/features/auth/ui/authorization-menu/components/email-confirmation';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';
function EmailConfirmationPage() {
  const location = useLocation();
  const { user } = useAuth();
  const emailFromState = location.state?.email;
  const emailFromStore = user?.email;
  const emailToConfirm = emailFromState || emailFromStore;
  if (!emailToConfirm) {
    return <div>Email не найден. Пожалуйста, завершите регистрацию.</div>;
  }
  return <EmailConfirmation emailToConfirm={emailToConfirm} />;
}
export default observer(EmailConfirmationPage);
