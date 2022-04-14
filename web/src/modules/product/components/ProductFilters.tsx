import { Group, Select } from '@mantine/core';
import useFilters from '../../../store/useFilters';

export default function ProductFilters() {
  const { update } = useFilters();

  const applyFilter = (value: string) => {
    const [sort, order] = value.split(':');
    update({ sort, order: order as 'asc' | 'desc' | null });
  };

  return (
    <Group sx={{ marginBottom: 20 }}>
      <Select
        label="Order By"
        data={[
          { value: 'price:desc', label: 'highest price' },
          { value: 'price:asc', label: 'lowest price' },
          { value: 'created_at:asc', label: 'newest' },
        ]}
        onChange={applyFilter}
      />
    </Group>
  );
}
