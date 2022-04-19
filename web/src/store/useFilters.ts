import create from 'zustand';
import { ProductsFilterQuery } from '../types';

interface FiltersState {
  values: ProductsFilterQuery;
  clear: () => void;
  update: (values: Partial<ProductsFilterQuery>) => void;
}

const useFilters = create<FiltersState>((set) => ({
  values: { sort: null, order: null },
  clear: () => set({ values: { sort: null, order: null } }),
  update: (updatedValues) =>
    set((state) => ({ values: { ...state.values, ...updatedValues } })),
}));

export default useFilters;
