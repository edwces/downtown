import { Button, Card, Space, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
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
  const { user, status } = useMe();
  const { mutate } = useCartMutation();
  const [cartProducts, setCartProducts] = useLocalStorage<
    { id: number; price: string; image: string; name: string }[]
  >({ key: 'cart_products', defaultValue: [] });

  const onClick = () => {
    if (status === 'signIn') {
      mutate({ id: user!.id, product: id });
    } else {
      console.log('hello there');

      setCartProducts([...cartProducts, { id, image, name, price }]);
    }
  };

  return (
    <div>
      <Card shadow="md" p="lg">
        <Card.Section>
          <Image src={image} alt="shirt" width={480} height={600} />
        </Card.Section>
        <Space h="lg" />
        <Text weight={300}>{name}</Text>
        <Text weight={500}>{price}</Text>
        <Button onClick={onClick} fullWidth>
          Get Now
        </Button>
      </Card>
    </div>
  );
}
