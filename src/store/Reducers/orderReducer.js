import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_orders = createAsyncThunk(
  "orders/place_orders",
  async (
    { price, products, shipping_fee, items, shippingInfo, userId, navigate },
    { fulfillWithValue, rejectWithValue },
  ) => {
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
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const get_orders = createAsyncThunk(
  "orders/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`,
        {
          withCredentials: true,
        },
      );
      console.log("getOrders =====>", data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const get_detailsOrder = createAsyncThunk(
  "orders/get_detailsOrder",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-details-order/${orderId}`,
        {
          withCredentials: true,
        },
      );
      console.log("getOrders =====>", data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const ordersReducer = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    detailsOrder: {},
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
        console.log(payload);
      })

      .addCase(place_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.error;
      })
      //
      .addCase(get_orders.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.myOrders = payload.allOrders;
        console.log(payload);
      })

      .addCase(get_orders.rejected, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.error;
      })
      //
      .addCase(get_detailsOrder.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_detailsOrder.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.detailsOrder = payload.detailsOrder;
        console.log(payload);
      })

      .addCase(get_detailsOrder.rejected, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.error;
      });
  },
});
export const { messageClear } = ordersReducer.actions;

export default ordersReducer.reducer;
