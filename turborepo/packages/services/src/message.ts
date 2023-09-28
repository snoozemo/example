import autobind from "autobind-decorator";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export class MessageService {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }
  /**
   * @description 获取信息列表
   * @returns
   */
  @autobind
  async getMessages(
    params: Api.GetMessagesDto
  ): Promise<Api.GetListVO<Api.MessagesItemVo>> {
    const { data } = await this.request.get<
      Api.ResultVO<Api.GetListVO<Api.MessagesItemVo>>
    >("/message/list", { params });
    return data.data;
  }
  /**
   * @description 获取信息
   * @returns
   */
  @autobind
  async getMessage(params: Api.GetMessageDto): Promise<Api.MessageVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.MessageVo>>(
      "/message/details",
      { params }
    );
    return data.data;
  }

  /**
   * @description 信息注册
   * @returns
   */
  @autobind
  async postMessage(params: Api.PostMessageDto): Promise<boolean> {
    const { data } = await this.request.post<Api.ResultVO<boolean>>(
      "/message/post",
      params
    );
    return data.data;
  }
  /**
   * @description 信息修改
   * @returns
   */
  @autobind
  async putMessage(params: Api.PutMessageDto): Promise<boolean> {
    const { data } = await this.request.put<Api.ResultVO<boolean>>(
      "/message/put",
      params
    );
    return data.data;
  }
  /**
   * @description 信息删除
   * @returns
   */
  @autobind
  async deleteMessage(params: Api.DeleteMessageDto): Promise<boolean> {
    const { data } = await this.request.delete<Api.ResultVO<boolean>>(
      "/message/delete",
      { params }
    );
    return data.data;
  }
}
