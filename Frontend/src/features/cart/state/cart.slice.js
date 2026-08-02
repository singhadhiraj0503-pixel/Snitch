import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: null,
  currency: null,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalPrice = action.payload;
      state.currency = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    incrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        if (item.product._id === productId && item.variant === variantId) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    },
    decrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items
        .map((item) => {
          if (item.product._id === productId && item.variant === variantId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0);
    },
    removeCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.product._id === productId && item.variant === variantId),
      );
    },
  },
});

export const {
  setCart,
  addItem,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
