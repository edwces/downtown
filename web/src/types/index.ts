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

export interface RegisterDTO {
  email: string;
  name: string;
  password: string;
}

export type LoginDTO = Omit<RegisterDTO, 'name'>;
