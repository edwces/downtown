import Image from "next/image";
import { Button } from "../../common/ui/Button";
import { currencyFormatter } from "./util/currency.utils";

interface ProductItemProps {
  label: string;
  price: number;
  src: string;
  alt?: string;
  onAddToCart: () => void;
}

export const ProductItem = ({
  label,
  price,
  src,
  alt,
  onAddToCart,
}: ProductItemProps) => {
  return (
    <article className="flex flex-col">
      <Image src={src} width={400} height={400} alt={alt} />
      <div className="p-2 break-words">
        <p className="text-lg mt-2">{label}</p>
        <div className=" border-b-2 border-gray-400 my-4" />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {currencyFormatter.format(price)}
          </h2>
          <Button variant="outline" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
};
