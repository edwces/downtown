import { cloudinary } from "../../config/cloudinary.config";
import { Product } from "./product.model";
import { ProductItem } from "./ProductItem";

interface ProductsList {
  products?: Product[];
  onAddProductToCart: (id: number) => void;
}

export const ProductsList = ({
  products = [],
  onAddProductToCart,
}: ProductsList) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem
            label={product.label}
            price={product.price}
            src={cloudinary.image(product.image.path).toURL()}
            alt={product.image.path}
            onAddToCart={() => onAddProductToCart(product.id)}
          />
        </li>
      ))}
    </ul>
  );
};
