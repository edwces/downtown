import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import axios from '../../../lib/axios';
import useMe from '../../../store/useMe';
import useCart from '../hooks/useCart';
import CheckoutList from './CheckoutList';

export default function AuthorizedCheckout() {
  const { user } = useMe();
  const { data, isLoading } = useCart(user!.id);
  const router = useRouter();

  const onClick = () => {
    const body = data!.items.map((item) => ({
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
      {isLoading ? null : <CheckoutList data={data!.items} />}
      <Button onClick={onClick}>Procced to payment</Button>
    </>
  );
}
