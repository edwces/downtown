import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import axios from '../../../lib/axios';
import useLocalCart from '../hooks/useLocalCart';
import CheckoutList from './CheckoutList';

export default function UnauthorizedCheckout() {
  const [cartProducts, _] = useLocalCart();
  const router = useRouter();

  const onClick = () => {
    const body = cartProducts!.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    axios
      .post('/payment/session', body)
      .then((response) => response.data)
      .then(({ url }) => {
        router.push(url);
      });
  };

  return (
    <>
      <CheckoutList data={cartProducts} />
      <Button onClick={onClick}>Procced payment</Button>
    </>
  );
}
