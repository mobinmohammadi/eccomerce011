import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { data } from "react-router";

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info, {
        withCredentials: true,
      });
      //    console.log("cart  Data ===> ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const get_cart_product = createAsyncThunk(
  "cart/get_cart_product",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-cart-product/${userId}`)
         console.log("cart  Data ===> ", data );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    buy_product_item: '',
    shipping_fee: 0,
    outOfStockProduct: [],
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
      .addCase(add_to_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
      })
      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.loader = false;
        state.cart_product_count = state.cart_product_count + 1;
        state.errorMessage = payload.error;
      })

      .addCase(get_cart_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_cart_product.fulfilled, (state, { payload }) => {
        console.log(payload);
        
        state.loader = false;
        state.cart_products = payload.cart_products;
        state.price = payload.price;
        state.cart_product_count = payload.cart_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outOfStockProduct = payload.outofstock_products;
        state.buy_product_item = payload.buy_product_item;

        console.log(payload);
      })
      .addCase(get_cart_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      })


     


  },
});

export const { messageClear } = cartReducer.actions;

export default cartReducer.reducer;
