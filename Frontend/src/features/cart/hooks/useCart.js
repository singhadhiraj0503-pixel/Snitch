import { useDispatch } from "react-redux";
import { addItem } from "../service/cart.api";
import { addItem as addItemToCart } from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddItem = async ({ productId, variantId }) => {
    const data = await addItem({ productId, variantId });
    // dispatch(addItemToCart(data));
    return data;
  };

  return { handleAddItem };
};
