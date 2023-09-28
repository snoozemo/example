import { AxiosInstance } from "axios";
import { ArticleService } from "./article";
import { DictService } from "./dict";
import { MessageService } from "./message";
import { UserService } from "./user";

export function createServices(axios: AxiosInstance) {
  return {
    user: new UserService(axios),
    message: new MessageService(axios),
    article: new ArticleService(axios),
    dict: new DictService(axios),
  };
}

export default {
  UserService,
  MessageService,
  DictService,
  ArticleService,
};
