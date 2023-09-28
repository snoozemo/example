import { createSlice } from "@reduxjs/toolkit";
import { MenuItemProps } from "antd";

export interface RouteSliceStateType {
  routes: Api.EnumType[];
  menus: Api.DictEnumsVo[];
}

const initialState: RouteSliceStateType = {
  routes: [],
  menus: [],
};
export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
  },
});
export const { setRoutes, setMenus } = routeSlice.actions;

export default routeSlice.reducer;
