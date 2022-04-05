import { Group, Select } from '@mantine/core';

interface ProductFiltersProps {
  onChange: (value: string) => void;
}

export default function ProductFilters({ onChange }: ProductFiltersProps) {
  return (
    <Group sx={{ marginBottom: 20 }}>
      <Select
        label="Order By"
        data={[
          { value: 'price:desc', label: 'highest price' },
          { value: 'price:asc', label: 'lowest price' },
          { value: 'created_at:asc', label: 'newest' },
        ]}
        onChange={onChange}
      />
    </Group>
  );
}
