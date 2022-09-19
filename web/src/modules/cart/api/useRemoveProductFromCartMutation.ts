import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/http.config";

type RemoveProductFromCartDTO = { productId: number };

const removeProductFromCart = (data: RemoveProductFromCartDTO) => {
  return http.put("me/cart/remove-product", data);
};

export const useRemoveProductFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: RemoveProductFromCartDTO) => removeProductFromCart(data),
    {
      onSuccess: () => queryClient.invalidateQueries(["me", "cart"]),
    }
  );
};
