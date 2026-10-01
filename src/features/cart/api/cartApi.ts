import { httpClient } from '../../../shared/api/httpClient';
import { CartsResponse } from './cartApi.types';
export const cartApi = {
  async fetchCart() {
    const { data } = await httpClient.get<CartsResponse[]>('/carts');
    return data;
  },
  async getSingleCart(cartId: number) {
    await httpClient.get(`/carts${cartId}`);
  },
  async removeFromCart(productId: number) {
    await httpClient.delete(`/cart/${productId}`);
  },
  async updateQuantity(productId: number, quantity: number) {
    await httpClient.patch(`/cart/${productId}`, { quantity });
  },
};
