import { ReactNode } from "react";
import { useCartDrawer } from "../../common/store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { Drawer } from "../../common/ui/Drawer";
import { CartItem } from "../cart/CartItem";
import { MainFooter } from "./MainFooter";
import { MainHeader } from "./MainHeader";

type MainLayoutProps = { children: ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  const cartDrawer = useCartDrawer();

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow p-10">{children}</main>
      <MainFooter />
      <Drawer size="xl" isOpen={cartDrawer.isOpen} onClose={cartDrawer.toggle}>
        <div className="flex flex-col gap-10 p-5">
          <div className="flex flex-grow flex-col gap-5">
            <CartItem label="T-shirt" quantity="2" price="200.99 $" />
            <CartItem label="T-shirt" quantity="2" price="200.99 $" />
            <CartItem label="T-shirt" quantity="2" price="200.99 $" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="mr-auto inline text-lg">Total:</p>
              <p className="ml-auto text-xl font-extrabold">800.99</p>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
