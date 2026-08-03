import { useDispatch } from "react-redux";
import {
  addItem,
  createCartOrder,
  decrementCartItemApi,
  getCart,
  incrementCartItemApi,
  removeCartItemApi,
  verifyCartOrder,
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
    // dispatch(setCart(data.cart));
    const cartData = data.cart[0];

    dispatch(
      setCart({
        items: cartData.items,
        totalPrice: cartData.totalPrice,
        currency: cartData.currency,
      }),
    );
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

  const handleCreateCartOrder = async () => {
    const data = await createCartOrder();
    return data.order;
  };

  const handleVerifyCartOrder = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) => {
    const data = await verifyCartOrder({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return data.success;
  };

  return {
    handleAddItem,
    handleGetcart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleRemoveCartItem,
    handleCreateCartOrder,
    handleVerifyCartOrder,
  };
};
