import { Button, Card, Space, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import useMe from '../../../store/useMe';
import useCartMutation from '../hooks/useCartMutation';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  id: number;
}

export default function ProductCard(props: ProductCardProps) {
  const { image, name, price, id } = props;
  const { user } = useMe();
  const { mutate } = useCartMutation();

  return (
    <div>
      <Card shadow="md" p="lg">
        <Card.Section>
          <Image src={image} alt="shirt" width={480} height={600} />
        </Card.Section>
        <Space h="lg" />
        <Text weight={300}>{name}</Text>
        <Text weight={500}>{price}</Text>
        <Button onClick={() => mutate({ id: user!.id, product: id })} fullWidth>
          Get Now
        </Button>
      </Card>
    </div>
  );
}
