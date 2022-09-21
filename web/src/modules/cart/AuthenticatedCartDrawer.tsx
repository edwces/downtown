import { useMemo } from "react";
import { cloudinary } from "../../config/cloudinary.config";
import { useAddProductToCartMutation } from "./api/useAddProductToCartMutation";
import { useCheckoutMutation } from "./api/useCheckoutMutation";
import { useRemoveProductFromCartMutation } from "./api/useRemoveProductFromCartMutation";
import { useServerCart } from "./api/useServerCart";
import { CartDrawerItem } from "./CartDrawerItem";
import { CartDrawerWrapper } from "./CartDrawerWrapper";
import { useCartDrawer } from "./store/useCartDrawer";

export const AuthenticatedCartDrawer = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { data } = useServerCart();
  const addProductToCart = useAddProductToCartMutation();
  const removeProductFromCart = useRemoveProductFromCartMutation();
  const checkout = useCheckoutMutation();

  const totalPrice = useMemo(() => {
    if (!data) return;
    return data.items.reduce((last, current) => {
      return last + Number(current.product.price) * Number(current.quantity);
    }, 0);
  }, [data]);

  const handleCheckout = async () => {
    if (!data) return;
    const checkoutItems = data.items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    const response = await checkout.mutateAsync(checkoutItems);
    window.location.href = response.data.url;
  };

  return (
    <CartDrawerWrapper
      isOpen={isOpen}
      onClose={toggle}
      totalPrice={totalPrice}
      onCheckout={handleCheckout}
    >
      <ul className="flex flex-grow flex-col gap-10">
        {data &&
          data.items.map((item) => (
            <li key={item.id}>
              <CartDrawerItem
                label={item.product.label}
                price={item.product.price}
                quantity={item.quantity}
                src={cloudinary.image(item.product.image.path).toURL()}
                onIncrementQuantity={() =>
                  addProductToCart.mutate({ productId: item.product.id })
                }
                onDecrementQuantity={() =>
                  removeProductFromCart.mutate({ productId: item.product.id })
                }
              />
            </li>
          ))}
      </ul>
    </CartDrawerWrapper>
  );
};
