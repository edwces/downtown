import { useProducts } from "../product/api/useProducts";
import { CartDrawerItem } from "./CartDrawerItem";
import { useLocalCart } from "./hooks/useLocalCart";

export const UnauthenticatedCartDrawerList = () => {
  const { addOne, removeOne, localCart } = useLocalCart();
  const { data } = useProducts({ query: { ids: Object.keys(localCart) } });

  return (
    <ul className="flex flex-grow flex-col gap-5">
      {data &&
        data.map((product) => (
          <li key={product.id}>
            <CartDrawerItem
              label={product.label}
              price={product.price}
              quantity={localCart[product.id]!}
              onIncrementQuantity={() => addOne(product.id)}
              onDecrementQuantity={() => removeOne(product.id)}
            />
          </li>
        ))}
    </ul>
  );
};
