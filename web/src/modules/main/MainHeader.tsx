import { ShoppingBag } from "react-feather";
import { Button } from "../../common/ui/Button";
import { BrandLogo } from "./BrandLogo";

export const MainHeader = () => {
  return (
    <header className=" p-5">
      <div className="flex justify-between items-center">
        <BrandLogo />
        <Button variant="unstyled">
          <ShoppingBag />
        </Button>
      </div>
    </header>
  );
};
