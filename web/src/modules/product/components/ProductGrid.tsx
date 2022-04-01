import { SimpleGrid } from '@mantine/core';
import React from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  data: Product[];
}

function ProductGrid({ data }: ProductGridProps) {
  // render all products in responsive simple SimpleGrid
  // all products are rendered as productCard

  return (
    <SimpleGrid
      cols={2}
      spacing="xs"
      breakpoints={[
        { minWidth: 1280, cols: 4, spacing: 'lg' },
        { minWidth: 770, cols: 3, spacing: 'md' },
        { minWidth: 600, cols: 3, spacing: 'sm' },
      ]}
    >
      {data.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.images[0].url}
        />
      ))}
    </SimpleGrid>
  );
}

export default ProductGrid;
