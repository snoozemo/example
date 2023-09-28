import { useAppSelector } from "@/redux/redux.hooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router/routes";

export default function Router() {
  // const routes = useAppSelector((state) => state.route.routes);
  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      fallbackElement="..."
    />
  );
}
