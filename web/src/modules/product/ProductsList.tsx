import { Product } from "./product.model";
import { ProductItem } from "./ProductItem";

interface ProductsList {
  products: Product[];
}

export const ProductsList = ({ products = [] }: ProductsList) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem label={product.label} price="200.99 $" />
        </li>
      ))}
    </ul>
  );
};
