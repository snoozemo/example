import request from "@/utils/request";
import { AxiosInstance } from "axios";
import { GlobalService } from "./global";

export function createServices(axios: AxiosInstance) {
  return {
    global: new GlobalService(axios),
  };
}

const service = createServices(request);
export default service;
