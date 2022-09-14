import { useMutation } from "react-query";
import { http } from "../../../config/http.config";
import { CheckoutItem } from "../cart.types";

const checkout = (data: CheckoutItem[]) => {
  return http.post("/checkout", { items: data });
};

export const useCheckoutMutation = () => {
  return useMutation((data: CheckoutItem[]) => checkout(data));
};
