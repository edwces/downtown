import Image from "next/image";
import { Minus, Plus } from "react-feather";
import { Button } from "../../common/ui/Button";
import { currencyFormatter } from "../product/util/currency.utils";

interface CartDrawerItemProps {
  label: string;
  price: number;
  src: string;
  quantity: number;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
}

export const CartDrawerItem = ({
  label,
  price,
  src,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}: CartDrawerItemProps) => {
  return (
    <article>
      <div className="flex items-center">
        <Image src={src} width={120} height={120} />
        <div className="pl-4 flex-grow">
          <p className="text-lg ml-4">{label}</p>
          <div className="border-b-2 border-gray-400 my-4" />
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center justify-between">
              <Button variant="unstyled" onClick={onIncrementQuantity}>
                <Plus />
              </Button>
              <p className="text-md">{quantity}</p>
              <Button variant="unstyled" onClick={onDecrementQuantity}>
                <Minus />
              </Button>
            </div>
            <h2 className="text-lg font-semibold">
              {currencyFormatter.format(price)}
            </h2>
          </div>
        </div>
      </div>
    </article>
  );
};
