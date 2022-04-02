import { BaseEntity } from '../../../types';

export interface Product extends BaseEntity {
  id: number;
  image: string;
  name: string;
  price: number;
  category: ProductCategory;
}

export interface ProductCategory extends BaseEntity {
  id: number;
  name: string;
}
