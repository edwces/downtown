import { ShoppingBag, User } from "react-feather";
import { useCartDrawer } from "../cart/store/useCartDrawer";
import { Button } from "../../common/ui/Button";
import { BrandLogo } from "./BrandLogo";
import { Popover } from "../../common/ui/Popover";
import { useState } from "react";
import { UnauthenticatedAccountPopover } from "./UnauthenticatedAccountPopover";
import { useSession } from "../auth/store/useSession";
import { AuthenticatedAccountPopover } from "./AuthenticatedAccountPopover";

export const MainHeader = () => {
  const status = useSession((state) => state.status);
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
            {status === "signIn" ? (
              <AuthenticatedAccountPopover />
            ) : (
              <UnauthenticatedAccountPopover />
            )}
          </Popover>
          <Button variant="unstyled" onClick={toggle}>
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </header>
  );
};
