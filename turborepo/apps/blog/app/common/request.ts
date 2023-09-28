import axios, { type AxiosResponse } from "axios";
import { GLOBAL_ENUM } from "~/common/enum";

const request = axios.create({
  baseURL: "http://127.0.0.1:3100",
  validateStatus(status) {
    if (status < 500) {
      return true;
    }
    return false;
  },
});

request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(GLOBAL_ENUM.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = JSON.parse(token);
    }
    if (config.params) {
      config.params = filterInvalidKey(config.params);
    }
    if (config.data) {
      config.data = filterInvalidKey(config.data);
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response: AxiosResponse<Api.ResultVO<unknown>>) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response?.data?.code === 400) {
      // message.error(response.data.msg);
    }
    if (response?.data?.code === 401) {
      window.location.href = `${location.origin}/login`;
    }
    if (response?.data?.code === 500) {
      // message.error(response.data.msg);
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
export function filterInvalidKey(data: Record<string, any>) {
  if (typeof data !== "object") return data;
  const newData: Record<string, any> = {};
  Object.keys(data).forEach((item) => {
    if (
      !(data[item] === undefined || data[item] === null || data[item] === "")
    ) {
      newData[item] = data[item];
    }
  });
  return newData;
}
