import { GLOBAL_ENUM } from "@/common/enum";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthSliceStateType {
  token?: string;
  userInfo?: Api.UserVo;
}

const initialState: AuthSliceStateType = {
  userInfo: undefined,
};
export const routeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    loginOut: () => {
      localStorage.removeItem(GLOBAL_ENUM.TOKEN_KEY);
      location.href = location.origin;
    },
  },
});
export const { setUserInfo, loginOut } = routeSlice.actions;

export default routeSlice.reducer;
