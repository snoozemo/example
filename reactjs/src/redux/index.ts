import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "@/redux/route.slice";

//https://cn.redux.js.org/
const store = configureStore({
  reducer: {
    route: routeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
