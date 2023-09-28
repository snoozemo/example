import { Suspense, lazy } from "react";
import NProgress from "@/components/nprogress";
import { redirect, type RouteObject } from "react-router-dom";

const LayoutComponent = lazy(() => import("@/components/layout"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Error = lazy(() => import("@/pages/error"));
const NoFound = lazy(() => import("@/pages/nofound"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogEditor = lazy(() => import("@/pages/blog/editor"));
const Dict = lazy(() => import("@/pages/dict"));
const Message = lazy(() => import("@/pages/message"));
const User = lazy(() => import("@/pages/user"));
const Login = lazy(() => import("@/pages/login"));

export const routesMap = [
  {
    path: "/user",
    errorElement: <Error />,
    loader: () => redirect("/user/ls"),
  },
  {
    path: "/user/ls",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<NProgress />}>
        <User />
      </Suspense>
    ),
  },
  {
    path: "/blog",
    errorElement: <Error />,
    loader: () => redirect("/blog/ls"),
  },
  {
    path: "/blog/ls",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<NProgress />}>
        <Blog />
      </Suspense>
    ),
  },
  {
    path: "/blog/editor",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<NProgress />}>
        <BlogEditor />
      </Suspense>
    ),
  },
  {
    path: "/message",
    errorElement: <Error />,
    loader: () => redirect("/message/ls"),
  },
  {
    path: "/message/ls",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<NProgress />}>
        <Message />
      </Suspense>
    ),
  },
  {
    path: "/dict",
    errorElement: <Error />,
    loader: () => redirect("/dict/ls"),
  },
  {
    path: "/dict/ls",
    errorElement: <Error />,
    element: (
      <Suspense fallback={<NProgress />}>
        <Dict />
      </Suspense>
    ),
  },
];

export const routesCreator = (children: RouteObject[] = []) => [
  {
    path: "/",
    element: (
      <Suspense fallback={<NProgress />}>
        <LayoutComponent />
      </Suspense>
    ),
    children: [
      {
        index: true,
        loader: () => redirect("/dashboard"),
      },
      {
        path: "/dashboard",
        errorElement: <Error />,
        element: (
          <Suspense fallback={<NProgress />}>
            <Dashboard />
          </Suspense>
        ),
      },
      ...children,
      {
        path: "*",
        errorElement: <Error />,
        element: (
          <Suspense fallback={<NProgress />}>
            <NoFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<NProgress />}>
        <Login />
      </Suspense>
    ),
  },
];
