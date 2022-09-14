import { useCartDrawer } from "./store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { Drawer } from "../../common/ui/Drawer";
import { useProducts } from "../product/api/useProducts";
import { CartDrawerItem } from "./CartDrawerItem";
import { useLocalCart } from "./hooks/useLocalCart";
import { useCheckoutMutation } from "./api/useCheckoutMutation";
import { currencyFormatter } from "../product/util/currency.utils";

// TODO: Decompose this component somehow

export const UnauthenticatedCartDrawer = () => {
  const { isOpen, toggle } = useCartDrawer();
  const { localCart, addOne, removeOne } = useLocalCart();
  const checkout = useCheckoutMutation();

  const { data } = useProducts({
    query: { ids: localCart.map((item) => item.id.toString()) },
    enabled: !!localCart.length,
  });

  const handleCheckout = async () => {
    const response = await checkout.mutateAsync(localCart);
    window.location.href = response.data.url;
  };

  return (
    <Drawer size="xl" isOpen={isOpen} onClose={toggle}>
      <div className="inline-flex flex-col gap-10 p-5 h-full">
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

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="mr-auto inline text-lg">Total:</p>
            <p className="ml-auto text-xl font-extrabold">
              {data &&
                currencyFormatter.format(
                  data.reduce(
                    (last, current) =>
                      last +
                      Number(current.price) *
                        Number(
                          localCart.find((item) => item.id === current.id)!
                            .quantity
                        ),
                    0
                  )
                )}
            </p>
          </div>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>
    </Drawer>
  );
};
