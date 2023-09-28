import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "@/redux/slice/route";
import profileReducer from "@/redux/slice/auth";

//https://cn.redux.js.org/
const store = configureStore({
  reducer: {
    route: routeReducer,
    auth: profileReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
