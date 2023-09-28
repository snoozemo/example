import TsImg from "@/components/tsImg";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginOut } from "@/redux/slice/auth";
import { Header } from "antd/es/layout/layout";

export default function AppHeader(): JSX.Element {
  return (
    <Header className="layout-header flex items-center justify-between overflow-hidden border-0 border-b border-solid border-[#0505050f] !bg-transparent px-0">
      <div className="flex space-x-2">
        <span className="text-xl" style={{ textShadow: "#007 -1px 1px 2px" }}>
          Console.
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <AvatarMenu />
      </div>
    </Header>
  );
}

function AvatarMenu() {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  return (
    <div className="group flex w-8 items-center justify-between rounded-full bg-[#f3f0ff] shadow-md transition-all hover:w-32 hover:p-1">
      <TsImg
        width={32}
        height={32}
        className="h-8 w-8 rounded-2xl"
        alt=""
        src={userInfo?.avatar}
      />
      <Button
        className="hidden items-center justify-center group-hover:flex "
        shape="circle"
        onClick={() => dispatch(loginOut())}
        icon={<LogoutOutlined />}
      />
    </div>
  );
}
