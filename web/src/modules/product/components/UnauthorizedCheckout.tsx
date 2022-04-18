import useLocalCart from '../hooks/useLocalCart';
import CheckoutList from './CheckoutList';

export default function UnauthorizedCheckout() {
  const [cartProducts, _] = useLocalCart();

  return <CheckoutList data={cartProducts} />;
}
