import { useJSONStorage } from "../../../common/hooks/useJSONStorage";

export const useLocalCart = () => {
  const [localCart, setLocalCart] = useJSONStorage({
    key: "local_cart",
    initial: "",
  });

  const addOne = (id: number) => {
    if (!localCart[id]) setLocalCart({ ...localCart, [id]: 1 });
    else setLocalCart({ ...localCart, [id]: localCart[id] + 1 });
  };

  const removeOne = (id: number) => {
    if (!localCart[id]) throw new Error("Id of product does not exist");
    if (localCart[id] - 1 === 0) {
      const { [id]: removedId, ...rest } = localCart;
      setLocalCart(rest);
    } else {
      setLocalCart({ ...localCart, [id]: localCart[id] - 1 });
    }
  };

  return { localCart, addOne, removeOne };
};
