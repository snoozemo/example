import { useAppSelector } from "@/redux/hooks";
import { routesCreator, routesMap } from "@/router/routes";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { matchRoutes, Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function AppContent(): JSX.Element {
  const { pathname } = useLocation();
  /* motion props  */
  const transition = { type: "tween", ease: "linear", duration: 0.3 };
  const variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };
  const routes = useAppSelector((state) => state.route.routes);

  const titleOrigin = useMemo(() => {
    const route = matchRoutes(
      routesCreator(routesMap)[0].children || [],
      pathname
    )?.[0];
    return routes.find((item) => route?.pathname === item.value);
  }, [pathname, routes]);

  return (
    <Content className="flex flex-col overflow-auto  p-6 pt-3 ">
      {/* 面包屑导航 */}
      <AppBreadcrumb />
      {/* Title */}
      <h1 className="mb-3 text-2xl">{titleOrigin?.label}</h1>
      {/* 主体 */}
      <motion.div
        className="flex-1 overflow-auto rounded-md bg-[#fff6] p-1 shadow-md"
        key={pathname}
        initial="initial"
        animate="in"
        variants={variants}
        transition={transition}
      >
        <Outlet />
      </motion.div>
    </Content>
  );
}

export function AppBreadcrumb(): JSX.Element {
  const routesMap = useAppSelector((state) => state.route.routes);
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMap = useMemo(() => {
    const newResult: Record<string, string> = {};
    routesMap.forEach((item) => (newResult[item.value] = item.label as string));
    return newResult;
  }, [routesMap]);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/" key="/">
        {/* 首页 */}
        <HomeOutlined className="" />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className="mb-4 flex items-center">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
}
