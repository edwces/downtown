import { useQuery } from "react-query";
import { http } from "../../../config/http.config";
import { Cart } from "../cart.model";

const getServerCart = () => {
  return http.get<Cart>("me/cart").then((response) => response.data);
};

export const useServerCart = () => {
  return useQuery(["me", "cart"], getServerCart);
};
