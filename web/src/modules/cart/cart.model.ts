import { Customer } from "../auth/customer.model";
import { CartItem } from "./cart-item.model";

export interface Cart {
  id: number;
  items: CartItem[];
  owner: Customer;
}
