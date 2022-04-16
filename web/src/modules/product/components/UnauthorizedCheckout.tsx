import { useLocalStorage } from '@mantine/hooks';
import CheckoutList from './CheckoutList';

export default function UnauthorizedCheckout() {
  const [cartProducts, _] = useLocalStorage({
    key: 'cart_products',
    defaultValue: [],
  });

  return <CheckoutList data={cartProducts} />;
}
