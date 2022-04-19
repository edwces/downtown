import CheckoutCard from './CheckoutCard';
import { Stack } from '@mantine/core';
import { CartItems } from '../../../types';
import { LocalCartItems } from '../hooks/useLocalCart';

interface CheckoutListProps {
  data?: CartItems | LocalCartItems;
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
