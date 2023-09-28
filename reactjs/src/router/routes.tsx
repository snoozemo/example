import { RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import NProgress from "@/components/nprogress";

export const Index = lazy(() => import("@/pages/index"));
export const Home = lazy(() => import("@/pages/home"));
export const About = lazy(() => import("@/pages/about"));

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<NProgress />}>
        <Index />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        errorElement: "error",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: "404",
  },
];
