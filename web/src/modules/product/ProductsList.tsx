import { useJSONStorage } from "../../common/hooks/useJSONStorage";
import { Product } from "./product.model";
import { ProductItem } from "./ProductItem";

interface ProductsList {
  products: Product[];
}

export const ProductsList = ({ products = [] }: ProductsList) => {
  const [value, setValue] = useJSONStorage({ key: "local_cart" });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem
            label={product.label}
            price="200.99 $"
            onAddToCart={() => setValue({ ...value, [product.id]: 1 })}
          />
        </li>
      ))}
    </ul>
  );
};
