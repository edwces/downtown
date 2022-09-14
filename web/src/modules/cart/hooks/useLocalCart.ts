import { useJSONStorage } from "../../../common/hooks/useJSONStorage";
import { CheckoutItem } from "../cart.types";

export const useLocalCart = () => {
  const [localCart, setLocalCart] = useJSONStorage({
    key: "local_cart",
    initial: [] as CheckoutItem[],
  });

  const addOne = (id: number) => {
    const copy = [...localCart];
    const index = localCart.findIndex((item) => item.id === id);
    console.log({ copy, index });

    if (!copy[index]) {
      copy.push({ id, quantity: 1 });
    } else if (copy[index]) {
      copy[index]!.quantity += 1;
    }
    setLocalCart(copy);
  };

  const removeOne = (id: number) => {
    const copy = [...localCart];
    const index = localCart.findIndex((item) => item.id === id);
    if (!copy[index]) throw new Error("Id of product does not exist");
    copy[index]!.quantity -= 1;

    if (localCart[index]!.quantity <= 0) copy.splice(index, 1);

    setLocalCart(copy);
  };

  return { localCart, addOne, removeOne };
};
