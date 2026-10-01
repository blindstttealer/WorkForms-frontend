import { makeAutoObservable } from 'mobx';
import { CartItem } from './types';
import { Product } from '../../products/api/productsApi.types';
export class CartStore {
  cartItems: CartItem[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  addToCart(product: Product) {
    if (!product) return;
    const existing = this.cartItems.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }
  incrementQuantity = (id: number) => {
    const item = this.cartItems.find((item) => item.id === id);
    if (item) item.quantity += 1;
  };
  decrementQuantity = (id: number) => {
    const item = this.cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(id);
      }
    }
  };
  clearCart() {
    this.cartItems = [];
  }
  get totalItems() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
  get totalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
export const cartStore = new CartStore();
