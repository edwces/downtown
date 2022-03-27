import { SimpleGrid } from '@mantine/core';
import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid() {
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
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
      <ProductCard name="shirt" price={19.99} />
    </SimpleGrid>
  );
}

export default ProductGrid;
