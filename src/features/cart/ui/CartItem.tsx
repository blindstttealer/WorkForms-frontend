import { observer } from 'mobx-react-lite';
import { useCart } from '../lib/useCart';
import styled from 'styled-components';
import { Product } from '../../products/api/productsApi.types';
type Props = {
  product: Product;
};
const ItemCard = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color['Background/Background 2']};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  gap: 24px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  background-color: ${({ theme }) => theme.color['Background/Background 3']};
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 24px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }
`;
const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  margin: 0;
  width: 200px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
const Price = styled.p`
  color: ${({ theme }) => theme.color['Primary/Primary 60']};
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  min-width: 80px;
  text-align: center;
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  border-radius: 8px;
  overflow: hidden;
  height: 36px;
  background: ${({ theme }) => theme.color['Background/Background 1']};
`;
const QuantityBtn = styled.button`
  background: ${({ theme }) => theme.color['Background/Background 1']};
  border: none;
  padding: 0 12px;
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};

  &:hover {
    background: ${({ theme }) => theme.color['Background/Background 2']};
    border-radius: 8px;
  }

  &:active {
    background: ${({ theme }) => theme.color['Background/Background 3']};
  }

  &:disabled {
    color: ${({ theme }) => theme.color['Neutral/Neutral 40']};
    cursor: not-allowed;
  }
`;
const QuantityValue = styled.div`
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
const RemoveButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.color['Error/Error 60']};
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: color 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.color['Error/Error 70']};
    background: ${({ theme }) => theme.color['Error/Error 10']};
  }

  &:active {
    color: ${({ theme }) => theme.color['Error/Error 80']};
  }

  @media (max-width: 576px) {
    align-self: flex-end;
  }
`;
export const CartItem = observer(({ product }: Props) => {
  const cart = useCart();
  const item = cart.cartItems.find((p) => p.id === product.id);
  if (!item) return null;
  return (
    <ItemCard>
      <Image src={product.images[0]} alt={product.title} />
      <Content>
        <Title>{item.title}</Title>
        <Price>${item.price}</Price>
        <QuantityContainer>
          <QuantityBtn
            onClick={() => cart.decrementQuantity(product.id)}
            disabled={item.quantity <= 1}
          >
            −
          </QuantityBtn>
          <QuantityValue>{item.quantity}</QuantityValue>
          <QuantityBtn onClick={() => cart.incrementQuantity(product.id)}>+</QuantityBtn>
        </QuantityContainer>
        <RemoveButton onClick={() => cart.removeFromCart(product.id)}>Удалить</RemoveButton>
      </Content>
    </ItemCard>
  );
});
