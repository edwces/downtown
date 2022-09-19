import { useCartDrawer } from "./store/useCartDrawer";
import { useProducts } from "../product/api/useProducts";
import { CartDrawerItem } from "./CartDrawerItem";
import { useLocalCart } from "./hooks/useLocalCart";
import { useCheckoutMutation } from "./api/useCheckoutMutation";
import { CartDrawerWrapper } from "./CartDrawerWrapper";
import { useMemo } from "react";

export const UnauthenticatedCartDrawer = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { localCart, addOne, removeOne } = useLocalCart();
  const checkout = useCheckoutMutation();

  const { data } = useProducts({
    query: { ids: localCart.map((item) => item.id.toString()) },
    enabled: !!localCart.length,
  });

  const totalPrice = useMemo(() => {
    if (!data) return;
    return data.reduce((last, current) => {
      const quantity = localCart.find(
        (item) => item.id === current.id
      )!.quantity;
      return last + Number(current.price) * Number(quantity);
    }, 0);
  }, [localCart, data]);

  const handleCheckout = async () => {
    const response = await checkout.mutateAsync(localCart);
    window.location.href = response.data.url;
  };

  return (
    <CartDrawerWrapper
      isOpen={isOpen}
      onClose={toggle}
      totalPrice={totalPrice}
      onCheckout={handleCheckout}
    >
      <ul className="flex flex-grow flex-col gap-5">
        {data &&
          data.map((product) => (
            <li key={product.id}>
              <CartDrawerItem
                label={product.label}
                price={product.price}
                quantity={
                  localCart.find((item) => item.id === product.id)!.quantity
                }
                onIncrementQuantity={() => addOne(product.id)}
                onDecrementQuantity={() => removeOne(product.id)}
              />
            </li>
          ))}
      </ul>
    </CartDrawerWrapper>
  );
};
