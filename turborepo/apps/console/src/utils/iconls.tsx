import {
  PieChartOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  BlockOutlined,
  BarsOutlined,
} from "@ant-design/icons";

export const iconOfPath = new Map<string, string>([
  ["/dashboard", "PieChartOutlined"],
  ["/message", "MessageOutlined"],
  ["/dict", "BarsOutlined"],
  ["/blog", "FileTextOutlined"],
  ["/user", "UserOutlined"],
]);

export const iconls: Record<string, JSX.Element> = {
  PieChartOutlined: <PieChartOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  MessageOutlined: <MessageOutlined />,
  UserOutlined: <UserOutlined />,
  BlockOutlined: <BlockOutlined />,
  BarsOutlined: <BarsOutlined />,
};
