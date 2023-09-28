import { useAppSelector } from "@/redux/hooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesCreator, routesMap } from "@/router/routes";
import { useMemo } from "react";

export default function Router() {
  const effectRoutes = useAppSelector((state) => state.route.routes);
  const routes = useMemo(() => {
    return routesMap.filter((route) =>
      effectRoutes.some((item) => item.value === route.path)
    );
  }, [effectRoutes]);
  return (
    <RouterProvider
      router={createBrowserRouter(routesCreator(routes))}
      fallbackElement="..."
    />
  );
}
