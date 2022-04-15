import { useMutation } from 'react-query';
import axios from '../../../lib/axios';

interface CartProductDTO {
  id: number;
  product: number;
}

const postProductToCart = async ({
  id,
  product,
}: CartProductDTO): Promise<void> => {
  await axios.post(`/user/${id}/cart`, { productId: product });
};

const useCartMutation = () =>
  useMutation(({ id, product }: CartProductDTO) =>
    postProductToCart({ id, product })
  );

export default useCartMutation;
