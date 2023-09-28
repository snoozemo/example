import autobind from "autobind-decorator";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export class UserService {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }
  /**
   * @description 获取用户列表
   * @returns
   */
  @autobind
  async getUsers(
    params: Api.GetUsersDto
  ): Promise<Api.GetListVO<Api.UsersItemVo>> {
    const { data } = await this.request.get<
      Api.ResultVO<Api.GetListVO<Api.UsersItemVo>>
    >("/user/list", { params });
    return data.data;
  }
  /**
   * @description 获取用户
   * @returns
   */
  @autobind
  async getUser(params: Api.GetUserDto): Promise<Api.UserVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.UserVo>>(
      "/user/details",
      { params }
    );
    return data.data;
  }
  /**
   * @description 获取用户
   * @returns
   */
  @autobind
  async getUserByPublic(params: Api.GetUserDto): Promise<Api.UserByPublicVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.UserByPublicVo>>(
      "/user/details/public",
      { params }
    );
    return data.data;
  }
  /**
   * @description 获取个人信息
   * @returns
   */
  @autobind
  async getSelf(): Promise<Api.UserVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.UserVo>>(
      "/user/self"
    );
    return data.data;
  }

  /**
   * @description 用户登录
   * @returns
   */
  @autobind
  async postLogin(params: Api.LoginDto): Promise<string> {
    const { data } = await this.request.post<Api.ResultVO<string>>(
      "/user/login",
      params
    );
    return data.data;
  }
  /**
   * @description 用户注册
   * @returns
   */
  @autobind
  async postUser(params: Api.PostUserDto): Promise<boolean> {
    const { data } = await this.request.post<Api.ResultVO<boolean>>(
      "/user/register",
      params
    );
    return data.data;
  }
  /**
   * @description 用户修改
   * @returns
   */
  @autobind
  async putUser(params: Api.PutUserDto): Promise<boolean> {
    const { data } = await this.request.put<Api.ResultVO<boolean>>(
      "/user/put",
      params
    );
    return data.data;
  }
  /**
   * @description 用户删除
   * @returns
   */
  @autobind
  async deleteUser(params: Api.DeleteUserDto): Promise<boolean> {
    const { data } = await this.request.delete<Api.ResultVO<boolean>>(
      "/user/delete",
      { params }
    );
    return data.data;
  }
}
