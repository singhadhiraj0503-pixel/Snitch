import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
  },
});

export const { setSellerProducts } = productSlice.actions;
export default productSlice.reducer;
