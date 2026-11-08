import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("home/get-category");

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
);

// End -------------------------------------

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("home/get-products");

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
);

// End -------------------------------------

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `home/query_products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ""}`,
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
);

// End -------------------------------------

export const get_product_Price = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("home/price-range-product");

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
    }
  },
);

const HomeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    totalCategory: 0,
    products: [],
    totalProduct: 0,
    parPage: 3,
    latest_Product: [],
    topRated_Product: [],
    discount_product: [],
    priceRange: {
      low: 0,
      high: 100,
    },
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_category.pending, (state) => {
        state.loader = true;
      })

      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.categorys = payload.categorys;
        state.totalCategory = payload.totalCategotyry;
      })
      .addCase(get_category.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // End -------------------------------------
      .addCase(get_products.pending, (state) => {
        state.loader = true;
      })

      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.products = payload.products;
        state.latest_Product = payload.latest_Product;
        state.topRated_Product = payload.topRated_Product;
        state.discount_product = payload.discount_product;
        state.totalProduct = payload.totalProduct;
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      // End -------------------------------------

      .addCase(get_product_Price.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.latest_Product = payload.latest_product;
        state.priceRange = payload.priceRange;
      })

      .addCase(get_product_Price.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      // End -------------------------------------

      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
        state.parPage = payload.parPage;
      })

      .addCase(query_products.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

// export const { messageClear } = authReducer.actions;
export default HomeReducer.reducer;
