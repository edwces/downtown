import create from 'zustand';
import { ProductsFilterQuery } from '../modules/product/hooks/useProducts';

interface FiltersStore {
  filters: ProductsFilterQuery;
  clear: () => void;
  update: (values: Partial<ProductsFilterQuery>) => void;
}

const useFilters = create<FiltersStore>((set) => ({
  filters: { sort: null, order: null },
  clear: () => set({ filters: { sort: null, order: null } }),
  update: (values) =>
    set((state) => ({ filters: { ...state.filters, ...values } })),
}));

export default useFilters;
