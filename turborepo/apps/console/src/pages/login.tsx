import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import bgUrl from "@/assets/bg-glo.svg";
import { Button, Checkbox, Form, Input } from "antd";
import services from "@/services";
import { GLOBAL_ENUM } from "@/common/enum";

interface AppLoginFormType extends Api.LoginDto {
  remember: boolean;
}
export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorageState<string>(GLOBAL_ENUM.TOKEN_KEY);

  const onFinish = async (params: AppLoginFormType) => {
    const { remember, ...loginByParams } = params;
    const data = await services.user.postLogin(loginByParams);
    setToken(data);
  };
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);
  return (
    <div
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
      className="flex h-screen w-screen items-center justify-center overflow-hidden bg-[#D6F2FF] bg-cover bg-fixed bg-center bg-no-repeat "
    >
      <Form
        className="rounded-2xl bg-white p-6 shadow-xl"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // autoComplete="off"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="mr-4" disabled>
              记住密码
            </Checkbox>
          </Form.Item>
          <Form.Item noStyle>
            <Button
              type="primary"
              className="flex-1 bg-[#1677ff]"
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
