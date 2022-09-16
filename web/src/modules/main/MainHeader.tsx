import { ShoppingBag, User } from "react-feather";
import { useCartDrawer } from "../cart/store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { BrandLogo } from "./BrandLogo";
import { Popover } from "../../common/ui/Popover";
import { useState } from "react";
import { UnauthenticatedAccountPopover } from "./UnauthenticatedAccountPopover";

export const MainHeader = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const toggle = useCartDrawer((state) => state.toggle);

  return (
    <header className=" p-5">
      <div className="flex justify-between items-center">
        <BrandLogo />
        <div className="flex gap-2">
          <Popover
            isOpen={isPopoverOpen}
            target={
              <Button
                variant="unstyled"
                onClick={() => setPopoverOpen(!isPopoverOpen)}
              >
                <User />
              </Button>
            }
          >
            <UnauthenticatedAccountPopover />
          </Popover>
          <Button variant="unstyled" onClick={toggle}>
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </header>
  );
};
