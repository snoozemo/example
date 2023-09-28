import jsCookie from "js-cookie";
import axios, { type AxiosResponse } from "axios";
import { GLOBAL_ENUM } from "../enums/enum";
import { cookies } from "next/headers";
declare global {
  export interface Window {
    REQUEST_BASE_URL?: string;
  }
}
export interface ResponseData<T> {
  code: number;
  data: T;
  msg: string;
}
const isBrowser = typeof window !== "undefined";
const BASE_URL = isBrowser
  ? window?.REQUEST_BASE_URL
  : process.env.REQUEST_BASE_URL;

/**@description create */
const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  validateStatus(status) {
    if (status < 500) {
      return true;
    }
    return false;
  },
});
request.interceptors.request.use(
  async function (config) {
    // 在发送请求之前做些什么
    console.log("config", config.baseURL);

    config.headers["Authorization"] = isBrowser
      ? jsCookie.get(GLOBAL_ENUM.TOKEN_KEY)
      : cookies().get(GLOBAL_ENUM.TOKEN_KEY)?.value;

    if (config.params) {
      config.params = filterInvalidKey(config.params);
    }
    if (config.data) {
      config.data = filterInvalidKey(config.data);
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  function <T>(response: AxiosResponse<ResponseData<T>>) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response?.data?.code === 400) {
      // isBrowser && message.error(response.data.msg);
    }
    if (response?.data?.code === 401) {
      isBrowser && (window.location.href = `${location.origin}/login`);
    }
    if (response?.data?.code === 500) {
      // isBrowser && message.error(response.data.msg);
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;

export function filterInvalidKey(data: Record<string, unknown>) {
  if (typeof data !== "object") return data;
  const newData: Record<string, unknown> = {};
  Object.keys(data).forEach((item) => {
    if (
      !(data[item] === undefined || data[item] === null || data[item] === "")
    ) {
      newData[item] = data[item];
    }
  });
  return newData;
}
// please write a format cookie function not js-cookie
export function cookieFmt(cookie: string) {
  if (!cookie) return null;
  const list = cookie.split(";");
  const cookieObj: Record<string, unknown> = {};
  list.map((item) => {
    const arr = item.split("=");
    cookieObj[arr[0]] = arr[1];
  });
  return cookieObj;
}
