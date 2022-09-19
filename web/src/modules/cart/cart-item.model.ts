import { Product } from "../product/product.model";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
