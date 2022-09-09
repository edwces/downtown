import { http } from "../../../config/http.config";
import { Product } from "../product.model";
import { useQuery } from "react-query";

type UseProductsArgs = { initialData: Product[] };

export const getProducts = () => {
  return Promise.resolve([
    { label: "T shirt", id: 1 },
    { label: "Pants", id: 2 },
    { label: "Hat", id: 3 },
    { label: "Hoodie", id: 4 },
  ] as Product[]);
};

export const useProducts = ({ initialData }: UseProductsArgs) => {
  return useQuery("products", () => getProducts(), { initialData });
};
