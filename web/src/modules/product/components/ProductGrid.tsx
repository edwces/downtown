import { SimpleGrid } from '@mantine/core';
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../../types/index';

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  // render all products in responsive simple SimpleGrid
  // all products are rendered as productCard

  return (
    <SimpleGrid
      cols={2}
      spacing="xs"
      breakpoints={[
        { minWidth: 1280, cols: 4, spacing: 'xl' },
        { minWidth: 770, cols: 3, spacing: 'lg' },
        { minWidth: 600, cols: 3, spacing: 'md' },
      ]}
    >
      {data.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </SimpleGrid>
  );
}
