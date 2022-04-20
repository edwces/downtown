import useFilters from '../../../store/useFilters';
import useProducts from '../hooks/useProducts';
import ProductGrid from './ProductGrid';

export default function ProductsContainer() {
  const { values } = useFilters();
  const { data, error } = useProducts(values);

  if (data) {
    return <ProductGrid data={data} />;
  }
  if (error) {
    return <div>error occured: {error}</div>;
  }

  return <div>Loading Products</div>;
}
