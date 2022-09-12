import { useLocalCart } from "../cart/hooks/useLocalCart";
import { Product } from "./product.model";
import { ProductItem } from "./ProductItem";

interface ProductsList {
  products?: Product[];
}

export const ProductsList = ({ products = [] }: ProductsList) => {
  const { addOne } = useLocalCart();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem
            label={product.label}
            price={product.price}
            onAddToCart={() => addOne(product.id)}
          />
        </li>
      ))}
    </ul>
  );
};
