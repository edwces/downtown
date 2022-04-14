import { useQuery } from 'react-query';
import axios from '../../../lib/axios';
import { Products } from '../../product/hooks/useProducts';

export interface ShoppingCart {
  products: Products;
}

const fetchCart = async (id: number): Promise<ShoppingCart> => {
  const response = await axios.get(`/user/${id}/cart`);
  return response.data;
};

const useCart = (id: number) =>
  useQuery(['user', 'cart', id], () => fetchCart(id));

export default useCart;
