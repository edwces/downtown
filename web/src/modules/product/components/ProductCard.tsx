import { Button, Card, Space, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { useMutation } from 'react-query';
import axios from '../../../lib/axios';
import useMe from '../../../store/useMe';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  id: number;
}

export default function ProductCard(props: ProductCardProps) {
  // Get basic image props
  // schowcase them in mantine card
  // on click add to cart via mutation
  // get userId from userstore
  // EXTRA: when hovering on image show other image
  // ? maybe i should move useMutation hook up one level
  const { image, name, price, id } = props;
  const { user } = useMe();
  const mutation = useMutation<
    any,
    unknown,
    { userId: number; productId: number }
  >(({ userId, productId }) =>
    axios
      .post(`/user/${userId}/cart`, { productId })
      .then((response) => response.data)
  );

  const onClick = () => mutation.mutate({ productId: id, userId: user!.id });

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
