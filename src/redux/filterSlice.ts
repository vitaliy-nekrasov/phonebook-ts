import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: string;
}

const initialState = {
  value: "",
} as CounterState;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
