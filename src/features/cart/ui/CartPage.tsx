import { observer } from 'mobx-react-lite';
import { useCart } from '../lib/useCart';
import { CartItem } from './CartItem';
import styled from 'styled-components';
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 32px auto;
  padding: 16px;
`;
const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
  text-align: center;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  font-weight: 700;
`;
const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Summary = styled.div`
  margin-top: 32px;
  padding: 16px;
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  border-radius: 12px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
const SummaryRow = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
    font-weight: 700;
  }
`;
const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
`;
const SummaryValue = styled.span`
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
const Empty = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
  margin-top: 32px;
  padding: 16px;
`;
const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color['Primary/Primary 70']};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ theme }) => theme.color['Primary/Primary 80']};
    transform: translateY(0);
  }
`;
export const CartPage = observer(() => {
  const cart = useCart();
  if (cart.cartItems.length === 0) {
    return <Empty>🛒 Ваша корзина пуста</Empty>;
  }
  return (
    <PageWrapper>
      <Title>🛒 Ваша корзина</Title>
      <ItemsList>
        {cart.cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </ItemsList>
      <Summary>
        <SummaryRow>
          <SummaryLabel>Товаров:</SummaryLabel>
          <SummaryValue>{cart.totalItems}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Сумма:</SummaryLabel>
          <SummaryValue>${cart.totalPrice.toFixed(2)}</SummaryValue>
        </SummaryRow>
        <CheckoutButton onClick={() => undefined}>Оформить заказ</CheckoutButton>
      </Summary>
    </PageWrapper>
  );
});
