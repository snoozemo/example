import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux";
import Router from "@/router";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5a54f9",
            controlItemBgActive: "#f3f0ff",
          },
        }}
        locale={zhCN}
      >
        <Router />
      </ConfigProvider>
    </ReduxProvider>
  );
}

export default App;
