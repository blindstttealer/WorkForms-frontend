export type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};
export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
};
export type DeletedProduct = Product & {
  isDeleted: boolean;
  deletedOn: string;
};
export type ProductCategories = {
  slug: string;
  name: string;
  url: string;
};
export type ProductCategory =
  | 'beauty'
  | 'fragrances'
  | 'furniture'
  | 'groceries'
  | 'home-decoration'
  | 'kitchen-accessories'
  | 'laptops'
  | 'mens-shirts'
  | 'mens-shoes'
  | 'mens-watches'
  | 'mobile-accessories'
  | 'motorcycle'
  | 'skin-care'
  | 'smartphones'
  | 'sports-accessories'
  | 'sunglasses'
  | 'tablets'
  | 'tops'
  | 'vehicle'
  | 'womens-bags'
  | 'womens-dresses'
  | 'womens-jewellery'
  | 'womens-shoes'
  | 'womens-watches';
export type CategoryList = ProductCategory[];
export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
