import { Product } from '../api/productsApi.types';
import { makeAutoObservable } from 'mobx';
class ProductsStore {
  allProducts: Product[] = [];
  filteredProducts: Product[] | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setAllProducts(products: Product[]) {
    this.allProducts = products;
    this.filteredProducts = null;
  }
  setFilteredProducts(products: Product[]) {
    this.filteredProducts = products;
  }
  resetFilters() {
    this.filteredProducts = null;
  }
  get productsToShow(): Product[] {
    return this.filteredProducts ?? this.allProducts;
  }
}
export const productsStore = new ProductsStore();
