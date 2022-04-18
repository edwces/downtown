import CheckoutCard from './CheckoutCard';
import { Stack } from '@mantine/core';
import { CartItems } from '../../../types';

interface CheckoutListProps {
  data?: CartItems;
}

export default function CheckoutList({ data = [] }: CheckoutListProps) {
  return (
    <Stack>
      {data.map((item) => (
        <CheckoutCard
          key={item.product.id}
          name={item.product.name}
          image={item.product.image}
          price={item.product.price}
          quantity={item.quantity}
        />
      ))}
    </Stack>
  );
}
