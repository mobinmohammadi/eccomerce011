import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
  "auth/get_dashboard_index_data",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`,
        {
          withCredentials: true,
        },
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const dashboardReducer = createSlice({
  name: "dahboard",
  initialState: {
    recendOrders: [],
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    loader: false,
    errorMessage: "",
    succsussMessage: "",

    // role:
  },
  reducers: {
    messageClear: (state, _) => {
      ((state.errorMessage = ""), (state.succsussMessage = ""));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_dashboard_index_data.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
        state.recendOrders = payload.recendOrders;
        state.totalOrders = payload.totalOrders;
        state.pendingOrders = payload.pendingOrders;
        state.cancelledOrders = payload.cancelledOrders;
        console.log("payload", payload);
      })

      .addCase(get_dashboard_index_data.rejected, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.error;
      });
  },
  //  jk
});

export const { messageClear } = dashboardReducer.actions;

export default dashboardReducer.reducer;
