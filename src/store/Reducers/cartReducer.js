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
      const { data } = await api.get(
        `/home/product/get-cart-product/${userId}`,
      );
      console.log("cart  Data ===> ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const delete_cart_product = createAsyncThunk(
  "products/delete_cart_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${productId}`,
        {
          withCredentials: true,
        },
      );
      console.log("productId =>", productId);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const inccrement_product = createAsyncThunk(
  "products/inccrement_product",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cartId}`, {
        withCredentials: true,
      });
      console.log("productId =>", cartId);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const deccrement_product_quantity = createAsyncThunk(
  "products/deccrement_product_quantity",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cartId}`, {
        withCredentials: true,
      });
      console.log("productId =>", cartId);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
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
    buy_product_item: "",
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
      // End -------------------------------------

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
        state.outOfStockProduct = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
        console.log(payload);
        
      })
      .addCase(get_cart_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      })

      // End -------------------------------------
      .addCase(delete_cart_product.pending, (state) => {
        state.loader = true;
      })

      .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.succsussMessage = payload.message;
      })
      .addCase(delete_cart_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      })

      // End -------------------------------------

      .addCase(inccrement_product.pending, (state) => {
        state.loader = true;
      })

      .addCase(inccrement_product.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.succsussMessage = payload.message;
      })
      .addCase(inccrement_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      })

      // End -------------------------------------

      .addCase(deccrement_product_quantity.pending, (state) => {
        state.loader = true;
      })

      .addCase(deccrement_product_quantity.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.succsussMessage = payload.message;
      })
      .addCase(deccrement_product_quantity.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      });

    // End -------------------------------------
  },
});

export const { messageClear } = cartReducer.actions;

export default cartReducer.reducer;
