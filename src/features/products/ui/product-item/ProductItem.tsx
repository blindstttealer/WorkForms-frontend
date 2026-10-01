import { Card, Category, Image, Price, Title } from '../products/styles';
import { Product } from '../../api/productsApi.types';
interface ProductItem {
  onItemClick: (id: number) => void;
  product: Product;
}
export const ProductItem = ({ product, onItemClick }: ProductItem) => {
  return (
    <Card onClick={() => onItemClick(product.id)} key={product.id}>
      <Image src={product.images[0]} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Category>{product.category}</Category>
    </Card>
  );
};
