import { ShoppingBag } from "react-feather";
import { useCartDrawer } from "../../common/store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { BrandLogo } from "./BrandLogo";

export const MainHeader = () => {
  const toggle = useCartDrawer((state) => state.toggle);

  return (
    <header className=" p-5">
      <div className="flex justify-between items-center">
        <BrandLogo />
        <Button variant="unstyled" onClick={toggle}>
          <ShoppingBag />
        </Button>
      </div>
    </header>
  );
};
