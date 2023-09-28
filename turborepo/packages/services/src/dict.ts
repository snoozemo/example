import autobind from "autobind-decorator";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export class DictService {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }
  /**
   * @description 获取字典列表
   * @returns
   */
  @autobind
  async getDicts(
    params: Api.GetDictsDto
  ): Promise<Api.GetListVO<Api.DictsItemsVo>> {
    const { data } = await this.request.get<
      Api.ResultVO<Api.GetListVO<Api.DictsItemsVo>>
    >("/dict/list", { params });
    return data.data;
  }
  /**
   * @description 获取字典
   * @returns
   */
  @autobind
  async getDict(params: Api.GetDictDto): Promise<Api.DictVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.DictVo>>(
      "/dict/details",
      { params }
    );
    return data.data;
  }
  /**
   * @description 获取字典枚举
   * @returns
   */
  @autobind
  async getDictEnums(params: string): Promise<Api.DictEnumsVo[]> {
    const { data } = await this.request.get<Api.ResultVO<Api.DictEnumsVo[]>>(
      `/dict/enum/${params}`
    );
    return data.data;
  }
  /**
   * @description 字典注册
   * @returns
   */
  @autobind
  async postDict(params: Api.PostDictDto): Promise<boolean> {
    const { data } = await this.request.post<Api.ResultVO<boolean>>(
      "/dict/post",
      params
    );
    return data.data;
  }
  /**
   * @description 字典修改
   * @returns
   */
  @autobind
  async putDict(params: Api.PutDictDto): Promise<boolean> {
    const { data } = await this.request.put<Api.ResultVO<boolean>>(
      "/dict/put",
      params
    );
    return data.data;
  }
  /**
   * @description 字典删除
   * @returns
   */
  @autobind
  async deleteDict(params: Api.DeleteDictDto): Promise<boolean> {
    const { data } = await this.request.delete<Api.ResultVO<boolean>>(
      "/dict/delete",
      { params }
    );
    return data.data;
  }
}
