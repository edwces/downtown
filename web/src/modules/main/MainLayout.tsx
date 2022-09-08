import { ReactNode } from "react";
import { useCartDrawer } from "../../common/store/useCartDrawer";
import { Drawer } from "../../common/ui/Drawer";
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
      <Drawer
        size="xl"
        isOpen={cartDrawer.isOpen}
        onClose={cartDrawer.toggle}
      ></Drawer>
    </div>
  );
};
