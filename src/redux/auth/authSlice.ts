import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperations";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
} as CounterState;

// interface IFetchCurrentUser {
//   name: null | string;
//   email: null | string;
// }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        console.log(action.payload);
      })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
