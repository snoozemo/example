import { useAppSelector } from "@/redux/hooks";
import { routesCreator, routesMap } from "@/router/routes";
import { iconls, iconOfPath } from "@/utils/iconls";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useMemo, useState } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router";

export default function AppSider(): JSX.Element {
  /** useHooks */
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  /** useAppSelector */
  const menus = useAppSelector((state) => state.route.menus);

  /** useMemo */
  const selectedKeys = useMemo(() => {
    const data = matchRoutes(
      routesCreator(routesMap)[0].children || [],
      location.pathname
    )?.map((item) => item.route.path!);
    return data;
  }, [location.pathname]);
  const menuItems = useMemo(() => {
    return createMenus(menus);
  }, [menus]);

  return (
    <Sider collapsed={collapsed} className=" !bg-transparent">
      <Menu
        className="layout-menu"
        defaultSelectedKeys={["/"]}
        selectedKeys={selectedKeys}
        mode="inline"
        onSelect={(e) => {
          navigate(e.key);
        }}
        items={menuItems}
      />
    </Sider>
  );
}

function createMenus(enums: Api.DictEnumsVo[] = []) {
  const mapEnums = (data: Api.DictEnumsVo[]): ItemType[] => {
    return data.map(({ value, children, ...item }) => ({
      ...item,
      key: value,
      value,
      icon: iconls?.[iconOfPath.get(value) || ""],
      children: children?.length ? mapEnums(children) : children,
    }));
  };
  return mapEnums(enums);
}
