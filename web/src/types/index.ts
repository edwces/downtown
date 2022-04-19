export interface BaseEntity {
  created_at: string | Date;
  updated_at: string | Date;
}

export interface Product extends BaseEntity {
  id: number;
  image: string;
  name: string;
  price: string;
  category: ProductCategory;
}

export interface ProductCategory extends BaseEntity {
  id: number;
  name: string;
}

export interface ProductsFilterQuery {
  sort: string | null;
  order: 'asc' | 'desc' | null;
}

export type Products = ReadonlyArray<Product>;

export interface CartItem extends BaseEntity {
  quantity: number;
  product: Product;
}

export type CartItems = ReadonlyArray<CartItem>;
