import { http } from "../../../config/http.config";
import { Product } from "../product.model";
import { useQuery } from "react-query";

type GetProductsQuery = { ids?: string[] };

type UseProductsArgs = {
  initialData?: Product[];
  query?: GetProductsQuery;
  enabled?: boolean;
};

export const getProducts = (query?: GetProductsQuery) => {
  return http
    .get<Product[]>("/products", { params: query })
    .then((response) => response.data);
};

export const useProducts = ({
  initialData,
  query,
  enabled,
}: UseProductsArgs) => {
  return useQuery(["products", query], () => getProducts(query), {
    initialData,
    enabled,
  });
};
