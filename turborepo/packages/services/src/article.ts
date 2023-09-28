import autobind from "autobind-decorator";
import { AxiosInstance } from "axios";

export class ArticleService {
  constructor(private request: AxiosInstance) {
    this.request = request;
  }
  /**
   * @description 获取文章列表
   * @returns
   */
  @autobind
  async getArticles(
    params: Api.GetArticlesDto
  ): Promise<Api.GetListVO<Api.ArticlesItemVo>> {
    const { data } = await this.request.get<
      Api.ResultVO<Api.GetListVO<Api.ArticlesItemVo>>
    >("/article/list", { params });
    return data.data;
  }
  /**
   * @description 获取文章
   * @returns
   */
  @autobind
  async getArticle(params: Api.GetArticleDto): Promise<Api.ArticleVo> {
    const { data } = await this.request.get<Api.ResultVO<Api.ArticleVo>>(
      "/article/details",
      { params }
    );
    return data.data;
  }

  /**
   * @description 文章注册
   * @returns
   */
  @autobind
  async postArticle(params: Api.PostArticleDto): Promise<boolean> {
    const { data } = await this.request.post<Api.ResultVO<boolean>>(
      "/article/post",
      params
    );
    return data.data;
  }
  /**
   * @description 文章修改
   * @returns
   */
  @autobind
  async putArticle(params: Api.PutArticleDto): Promise<boolean> {
    const { data } = await this.request.put<Api.ResultVO<boolean>>(
      "/article/put",
      params
    );
    return data.data;
  }
  /**
   * @description 文章删除
   * @returns
   */
  @autobind
  async deleteArticle(params: Api.DeleteArticleDto): Promise<boolean> {
    const { data } = await this.request.delete<Api.ResultVO<boolean>>(
      "/article/delete",
      { params }
    );
    return data.data;
  }
}
