import { Minus, Plus } from "react-feather";
import { Button } from "../../common/ui/Button";

interface CartItemProps {
  label: string;
  price: string;
  quantity: string;
}

export const CartItem = ({ label, price, quantity }: CartItemProps) => {
  return (
    <article>
      <div className="p2 break-words"></div>
      <p className="text-lg mt-2">{label}</p>
      <div className=" border-b-2 border-gray-400 my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{price}</h2>
        <div className="flex gap-2 items-center">
          <Button variant="unstyled">
            <Plus />
          </Button>
          <p className="text-md">{quantity}</p>
          <Button variant="unstyled">
            <Minus />
          </Button>
        </div>
      </div>
    </article>
  );
};