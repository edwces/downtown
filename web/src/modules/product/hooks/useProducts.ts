import { useQuery } from 'react-query';
import axios from '../../../lib/axios';
import { Product } from '../../../types';

export interface ProductsFilterQuery {
  sort: string | null;
  order: 'asc' | 'desc' | null;
}

export type Products = ReadonlyArray<Product>;

// QueryFn
const fetchProducts = async (
  filters: ProductsFilterQuery
): Promise<Products> => {
  const reponse = await axios.get('/product', {
    params: { sort_by: filters.sort, order: filters.order },
  });
  return reponse.data;
};

// Query
const useProducts = (filters: ProductsFilterQuery) =>
  useQuery(['products', filters], () => fetchProducts(filters));

export default useProducts;
