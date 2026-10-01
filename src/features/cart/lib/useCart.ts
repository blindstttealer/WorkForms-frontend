import { useContext, createContext } from 'react';
import { cartStore } from '../model/cart-store';
const CartContext = createContext(cartStore);
export const useCart = () => useContext(CartContext);
