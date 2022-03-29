import { Button, Card, Space, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
}

function ProductCard(props: ProductCardProps) {
  const { image, name, price } = props;

  return (
    <div>
      <Card shadow="md" p="lg">
        <Card.Section>
          <Image src="" alt="shirt" width={340} height={600} />
        </Card.Section>
        <Space h="lg" />
        <Text weight={300}>{name}</Text>
        <Text weight={500}>{price}</Text>
        <Button fullWidth>Get Now</Button>
      </Card>
    </div>
  );
}

export default ProductCard;
