import { Group, Paper, Text, Title } from '@mantine/core';
import Image from 'next/image';

interface CheckoutCardProps {
  image: string;
  name: string;
  price: string;
  quantity: number;
}

export default function CheckoutCard(props: CheckoutCardProps) {
  const { image, name, price, quantity } = props;

  return (
    // TODO: Change color of Paper
    <Paper shadow="md" p="md">
      <Group spacing="md" sx={{ justifyContent: 'space-around' }}>
        <Image src={image} alt="shirt" width={120} height={250} />
        <Text>{name}</Text>
        <Text>{quantity}</Text>
        <Title>{price}</Title>
      </Group>
    </Paper>
  );
}
