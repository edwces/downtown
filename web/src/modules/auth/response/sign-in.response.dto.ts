import { Customer } from "../customer.model";

// TODO: Should actually return only the needed data
export interface SignInResponseDTO {
  customer: Customer;
  token: string;
}
