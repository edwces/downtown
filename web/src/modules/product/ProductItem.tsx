import { Button } from "../../common/ui/Button";

interface ProductItemProps {
  label: string;
  price: string;
}

export const ProductItem = ({ label, price }: ProductItemProps) => {
  return (
    <article className="flex flex-col">
      <div className="p-2 break-words">
        <p className="text-lg mt-2">{label}</p>
        <div className=" border-b-2 border-gray-400 my-4" />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{price}</h2>
          <Button variant="outline">Add to Cart</Button>
        </div>
      </div>
    </article>
  );
};
