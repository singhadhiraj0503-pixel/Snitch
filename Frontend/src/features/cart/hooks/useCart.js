import { useDispatch } from "react-redux";
import {
  addItem,
  decrementCartItemApi,
  getCart,
  incrementCartItemApi,
  removeCartItemApi,
} from "../service/cart.api";
import {
  setCart,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddItem = async ({ productId, variantId }) => {
    const data = await addItem({ productId, variantId });
    // dispatch(addItemToCart(data));
    return data;
  };

  const handleGetcart = async () => {
    const data = await getCart();
    dispatch(setCart(data.cart));
  };

  const handleIncrementCartItem = async ({ productId, variantId }) => {
    const data = await incrementCartItemApi({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));

    return data;
  };

  const handleDecrementCartItem = async ({ productId, variantId }) => {
    const data = await decrementCartItemApi({ productId, variantId });
    dispatch(decrementCartItem({ productId, variantId }));

    return data;
  };

  const handleRemoveCartItem = async ({ productId, variantId }) => {
    const data = await removeCartItemApi({ productId, variantId });
    dispatch(removeCartItem({ productId, variantId }));

    return data;
  };

  return {
    handleAddItem,
    handleGetcart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleRemoveCartItem,
  };
};
