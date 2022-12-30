import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

interface IUser {
  name: string;
  email: string;
  password: string;
}

type User = {
  email: string;
  password: string;
};

const register = createAsyncThunk(
  "auth/register",
  async (credentials: IUser) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      console.log(error);
      return Notify.failure("Sorry, this user already is registered!", {
        timeout: 3000,
        distance: "100px",
      });
    }
  }
);

const logIn = createAsyncThunk("auth/login", async (credentials: User) => {
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    console.log(error);
    return Notify.failure("Sorry, but I don`t find this user! Please Sign Up", {
      timeout: 3000,
      distance: "100px",
    });
  }
});

const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/users/logout");
    token.unset();
  } catch (error) {
    console.log(error);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    console.log(state);
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Error");
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const operations = { register, logIn, logOut, fetchCurrentUser };
export default operations;
