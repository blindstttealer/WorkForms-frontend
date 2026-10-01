import { useState } from 'react';
import { ForgotVisible } from './components/forgot-password';
import { StyledWrapper } from './styles';
import { observer } from 'mobx-react-lite';
export const AuthorizationMenu = observer(() => {
  const [forgotVisible, setForgotVisible] = useState(false);
  return (
    <StyledWrapper>
      <ForgotVisible forgotVisible={forgotVisible} setForgotVisible={setForgotVisible} />
    </StyledWrapper>
  );
});
