import { http } from "../../../config/http.config";
import { Product } from "../product.model";
import { useQuery } from "react-query";

type UseProductsArgs = { initialData: Product[] };

export const getProducts = () => {
  return http.get<Product[]>("/products").then((response) => response.data);
};

export const useProducts = ({ initialData }: UseProductsArgs) => {
  return useQuery("products", () => getProducts(), { initialData });
};
