import { Product } from '../../../types';
import CheckoutCard from './CheckoutCard';
import { Stack } from '@mantine/core';

interface CheckoutListProps {
  data: Product[];
}

export default function CheckoutList({ data }: CheckoutListProps) {
  return (
    <Stack>
      {data.map((product) => (
        <CheckoutCard
          key={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </Stack>
  );
}
