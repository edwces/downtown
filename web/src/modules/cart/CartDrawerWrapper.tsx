import { ReactNode } from "react";
import { Button } from "../../common/ui/Button";
import { Drawer } from "../../common/ui/Drawer";
import { currencyFormatter } from "../product/util/currency.utils";

interface CartDrawerWrapperProps {
  isOpen?: boolean;
  onClose?: () => void;
  totalPrice?: number;
  onCheckout?: () => void;
  children: ReactNode;
}

export const CartDrawerWrapper = ({
  isOpen = true,
  onClose,
  totalPrice,
  onCheckout,
  children,
}: CartDrawerWrapperProps) => {
  return (
    <Drawer size="xl" isOpen={isOpen} onClose={onClose}>
      <div className="inline-flex flex-col gap-10 p-5 pt-10 h-full">
        {children}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="mr-auto inline text-lg">Total:</p>
            <p className="ml-auto text-xl font-extrabold">
              {currencyFormatter.format(totalPrice || 0)}
            </p>
          </div>
          <Button onClick={onCheckout}>Checkout</Button>
        </div>
      </div>
    </Drawer>
  );
};
