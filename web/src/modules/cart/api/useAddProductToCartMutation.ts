import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/http.config";

type AddProductToCartDTO = { productId: number };

const addProductToCart = (data: AddProductToCartDTO) => {
  return http.put("me/cart/add-product", data);
};

export const useAddProductToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: AddProductToCartDTO) => addProductToCart(data), {
    onSuccess: () => queryClient.invalidateQueries("me/cart"),
  });
};
