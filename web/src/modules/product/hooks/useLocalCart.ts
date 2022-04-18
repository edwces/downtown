import { useLocalStorage } from '@mantine/hooks';

interface LocalCartItem {
  product: { id: number; image: string; price: string; name: string };
  quantity: number;
}

export type LocalCartItems = ReadonlyArray<LocalCartItem>;

const useLocalCart = () => {
  return useLocalStorage<LocalCartItems>({
    key: 'cart_products',
    defaultValue: [],
  });
};

export default useLocalCart;
