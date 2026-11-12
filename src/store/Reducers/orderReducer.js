import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_orders = createAsyncThunk(
  "orders/place_orders",
  async ({
    price,
    products,
    shipping_fee,
    items,
    shippingInfo,
    userId,
    navigate,
  }) => {
    console.log(shippingInfo);
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });

      console.log("data place order ==>", data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
);

export const ordersReducer = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    myOrder: {},
    succsussMessage: "",
    errorMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      ((state.errorMessage = ""), (state.succsussMessage = ""));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(place_orders.pending, (state) => {
        state.loader = true;
      })
      .addCase(place_orders.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
      });
  },
});
export const { messageClear } = ordersReducer.actions;

export default ordersReducer.reducer;
