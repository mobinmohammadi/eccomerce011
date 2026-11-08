import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const user_register = createAsyncThunk(
  "auth/user_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer-register", info, {
        withCredentials: true,
      });
      // console.log("login Data ===> ", data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const user_login = createAsyncThunk(
  "auth/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/costomer-login", info, {
        withCredentials: true,
      });
      // console.log("login Data ===> ", data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      // console.log("login Data ===> ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const deCodeToken = (token) => {
  try {
    if (token) {
      const userData = jwtDecode(token);
      return userData
    } else {
      return "";
    }
  } catch {
    localStorage.removeItem("accessToken");
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    succsussMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: deCodeToken(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
    // role: 
  },
  reducers: {
    messageClear: (state, _) => {
      ((state.errorMessage = ""), (state.succsussMessage = ""));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(user_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(user_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
        state.succsussMessage = payload.userInfo;
        console.log("payloadSucssuss ==> ", payload);
      })
      .addCase(user_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log("payloadSucssuss ==> ", payload.error);
      })

      .addCase(user_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(user_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
        state.userInfo = payload.userInfo;
        console.log("payloadSucssuss ==> ", payload);
      })
      .addCase(user_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log("payloadSucssuss ==> ", payload.error);
      })

      .addCase(get_user_info.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.succsussMessage = payload.message;
        state.userInfo = payload.userInfo;
        console.log("payloadSucssuss ==> ", payload);
      })
      .addCase(get_user_info.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        console.log("payloadSucssuss ==> ", payload.error);
      });
  },
});

export const { messageClear } = authReducer.actions;

export default authReducer.reducer;
