import { BaseEntity } from '@/types';

export interface Product extends BaseEntity {
  id: number;
  images: ProductImage[];
  name: string;
  price: number;
  category: ProductCategory;
}

export interface ProductCategory extends BaseEntity {
  id: number;
  name: string;
}

export interface ProductImage extends BaseEntity {
  url: string;
  index: number;
}
