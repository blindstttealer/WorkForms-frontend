import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useCart } from '../../../features/cart/lib/useCart';
import { Product } from '../../../features/products/api/productsApi.types';
const Container = styled.div`
  margin: 32px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProductWrapper = styled.div`
  background-color: ${({ theme }) => theme.color['Background/Background 2']};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  gap: 24px;
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  }
`;
const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;
const Details = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  margin: 0;
`;
const Description = styled.p`
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
  line-height: 1.6;
  margin: 0;
`;
const Price = styled.span`
  color: ${({ theme }) => theme.color['Primary/Primary 60']};
`;
const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.color['Primary/Primary 70']};
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${({ theme }) => theme.color['Primary/Primary 80']};
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
export default function ProductDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const [product, setProduct] = useState<Product | null>(null);
  const cart = useCart();
  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      cart.addToCart(product);
    } else {
      throw new Error('Product not found');
    }
  };
  if (!product) return <div>Loading...</div>;
  return (
    <Container>
      <ProductWrapper>
        <Image src={product.images[0]} alt={product.title} />
        <Details>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>${product.price}</Price>
          <div>Category: {product.category}</div>
          <div>In stock: {product.stock} items</div>
          <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        </Details>
      </ProductWrapper>
    </Container>
  );
}
