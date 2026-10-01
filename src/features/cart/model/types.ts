import { Product } from '../../products/api/productsApi.types';
export interface CartItem extends Product {
  quantity: number;
}
