import { Button, Card, Space, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';
import useMe from '../../../store/useMe';
import { deepEqual } from '../../../util/objectUtils';
import useCartMutation from '../hooks/useCartMutation';
import useLocalCart from '../hooks/useLocalCart';

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
  const [cartProducts, setCartProducts] = useLocalCart();

  // TODO: refactor on click method
  //       priority: High
  const onClick = () => {
    if (status === 'signIn') {
      mutate({ id: user!.id, product: id });
    } else {
      const AlreadyInCart = cartProducts.findIndex((item) => {
        return deepEqual(item.product, { id, image, name, price })
          ? true
          : false;
      });

      if (AlreadyInCart !== -1) {
        const newCartProducts = cartProducts.filter((item) => {
          return deepEqual(item.product, { id, image, name, price })
            ? false
            : true;
        });
        setCartProducts([
          ...newCartProducts,
          {
            product: { id, image, name, price },
            quantity: cartProducts[AlreadyInCart].quantity + 1,
          },
        ]);
      } else {
        setCartProducts([
          ...cartProducts,
          { product: { id, image, name, price }, quantity: 1 },
        ]);
      }
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
