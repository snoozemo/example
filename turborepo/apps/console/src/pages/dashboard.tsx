import { useAppSelector } from "@/redux/hooks";
import { Button, TimePicker } from "antd";

export default function Dashboard() {
  const profile = useAppSelector((state) => state.auth.userInfo);

  return (
    <div className="flex">
      {/* 个人信息 */}
      <div className="rounded bg-white p-4 text-black/[.6] shadow transition-all hover:shadow-md">
        <div className="flex space-x-4">
          <img
            className="h-16 w-16 rounded-lg shadow"
            alt=""
            src={profile?.avatar}
          />
          <div className="flex flex-col justify-between text-xs">
            <p className="flex justify-between space-x-2">
              <span>ID:</span>
              <span>{profile?.id}</span>
            </p>
            <p className="flex justify-between space-x-2">
              <span>用户名:</span>
              <span>{profile?.username}</span>
            </p>
            <p className="flex justify-between space-x-2">
              <span>昵称:</span>
              <span>{profile?.nickname}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
