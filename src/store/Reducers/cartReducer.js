import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    
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
  "cart/delete_cart_product",
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
  "cart/inccrement_product",
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
  "cart/deccrement_product_quantity",
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

// End ---------------------------------

export const add_to_wish_list = createAsyncThunk(
  "cart/add_to_wish_list",
  async (infos, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/costomer/product/add-wish-product`,
        infos,
        {
          withCredentials: true,
        },
      );
      console.log("productId =>", infos);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const get_products_in_wish = createAsyncThunk(
  "cart/get_products_in_wish",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/costomer/product/get-products-in-wish`, {
        withCredentials: true,
      });
      console.log("productId =>", data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error ===> ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// End ---------------------------------

export const delete_product_in_wish = createAsyncThunk(
  "cart/delete_product_in_wish",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    console.log(productId);
    
    try {
      const { data } = await api.delete(
        `/costomer/product/delete-product-in-wish/${productId}`,
       
        {
          withCredentials: true,
        },
      );
      console.log("productId =>", data);

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
      })
      .addCase(get_cart_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
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
      })

      // End -------------------------------------

      .addCase(deccrement_product_quantity.pending, (state) => {
        state.loader = true;
      })

      .addCase(deccrement_product_quantity.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
      })
      .addCase(deccrement_product_quantity.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      // End -------------------------------------

      .addCase(add_to_wish_list.pending, (state) => {
        state.loader = true;
      })

      .addCase(add_to_wish_list.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.succsussMessage = payload.message;
        state.wishlist_count = payload.wishlistCount;
      })
      .addCase(add_to_wish_list.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      })

      // End -------------------------------------

      .addCase(get_products_in_wish.pending, (state) => {
        state.loader = true;
      })

      .addCase(get_products_in_wish.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.wishlist = payload.wishList;
        state.wishlist_count = payload.wishlistCount;
      })
      .addCase(get_products_in_wish.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      // End -------------------------------------

      .addCase(delete_product_in_wish.pending, (state) => {
        state.loader = true;
      })

      .addCase(delete_product_in_wish.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.wishlist = payload.wishList;
        state.succsussMessage = payload.message;
        state.wishlist_count = payload.wishlistCount;
      })
      .addCase(delete_product_in_wish.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log(payload);
      });

    // End -------------------------------------
  },
});

export const { messageClear } = cartReducer.actions;

export default cartReducer.reducer;
