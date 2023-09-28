import { Layout } from "antd";
import "@/components/layout/index.less";
import AppHeader from "@/components/layout/header";
import AppSider from "@/components/layout/sider";
import AppContent from "@/components/layout/content";
import { useLocalStorageState, useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import services from "@/services";
import { setUserInfo } from "@/redux/slice/auth";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import bgUrl from "@/assets/bg-glo.svg";
import { GLOBAL_ENUM } from "@/common/enum";
import { setMenus, setRoutes } from "@/redux/slice/route";

export default function LayoutComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [token] = useLocalStorageState<string>(GLOBAL_ENUM.TOKEN_KEY);

  useRequest(() => services.user.getSelf(), {
    ready: !!token,
    onSuccess(res) {
      dispatch(setUserInfo(res));
    },
  });
  useRequest(() => services.dict.getDictEnums(GLOBAL_ENUM.GET_ENUM_ROUTE_KEY), {
    ready: !!token,
    onSuccess(res) {
      dispatch(setRoutes(res));
    },
  });
  useRequest(() => services.dict.getDictEnums(GLOBAL_ENUM.GET_ENUM_MENU_KEY), {
    ready: !!token,
    onSuccess(res) {
      dispatch(setMenus(res));
    },
  });
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div
      style={{
        backgroundImage: `url(${"https://imgs.snoozemo.com/item/63f3488ef144a01007977284.png"})`,
        // backgroundImage: `url(${bgUrl} )`,
      }}
      className="relative box-border h-screen w-screen overflow-hidden whitespace-pre-wrap bg-white bg-cover bg-fixed bg-center bg-no-repeat p-4 text-black/[.88]"
    >
      <Layout className="h-full w-full overflow-hidden rounded-lg bg-[#f7f7f790] backdrop-blur backdrop-filter">
        {/* header */}
        <AppHeader />
        <Layout className="h-full bg-transparent">
          {/* sider menu */}
          <AppSider />
          {/* content */}
          <AppContent />
        </Layout>
      </Layout>
      {/* footer */}
      {/* <AppFooter /> */}
    </div>
  );
}
