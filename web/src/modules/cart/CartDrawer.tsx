import { useCartDrawer } from "./store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { Drawer } from "../../common/ui/Drawer";
import { UnauthenticatedCartDrawerList } from "./UnauthenticatedCartDrawerList";

interface CartDrawerProps {
  onCheckout?: () => void;
}

export const CartDrawer = ({ onCheckout }: CartDrawerProps) => {
  const { isOpen, toggle } = useCartDrawer();

  return (
    <Drawer size="xl" isOpen={isOpen} onClose={toggle}>
      <div className="inline-flex flex-col gap-10 p-5 h-full">
        <UnauthenticatedCartDrawerList />
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
