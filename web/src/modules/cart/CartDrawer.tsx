import { useCartDrawer } from "../../common/store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { Drawer } from "../../common/ui/Drawer";
import { CartItem } from "./cart-item.model";
import { CartDrawerItem } from "./CartDrawerItem";

interface CartDrawerProps {
  onCheckout?: () => void;
  cartItems?: CartItem[];
}

export const CartDrawer = ({ cartItems = [], onCheckout }: CartDrawerProps) => {
  const { isOpen, toggle } = useCartDrawer();

  return (
    <Drawer size="xl" isOpen={isOpen} onClose={toggle}>
      <div className="inline-flex flex-col gap-10 p-5 h-full">
        <ul className="flex flex-grow flex-col gap-5">
          {cartItems.map((cartItem) => (
            <li key={cartItem.product.id}>
              <CartDrawerItem
                label={cartItem.product.label}
                price="200.99 $"
                quantity={cartItem.quantity}
              />
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="mr-auto inline text-lg">Total:</p>
            <p className="ml-auto text-xl font-extrabold">800.99</p>
          </div>
          <Button onClick={onCheckout}>Checkout</Button>
        </div>
      </div>
    </Drawer>
  );
};
