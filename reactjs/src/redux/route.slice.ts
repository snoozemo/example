import { createSlice } from "@reduxjs/toolkit";
import { type RouteObject } from "react-router";

export interface RouteSliceStateType {
  routes: RouteObject[];
}

const initialState: RouteSliceStateType = {
  routes: [],
};
export const routeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: (state, action) => {
      console.log(action.payload);
      state.routes = action.payload;
    },
  },
});
export const { reset } = routeSlice.actions;

export default routeSlice.reducer;
