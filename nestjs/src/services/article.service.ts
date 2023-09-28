import { Article } from "../entities/article.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getPageByQueryRunner, queryHas } from "@/common/utils/orm";

import { User } from "@/entities/user.entity";
import {
  DeleteArticleDto,
  GetArticleDto,
  GetArticlesDto,
  PostArticleDto,
  PutArticleDto,
} from "../models/article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}
  /**
   * @description 获取文章列表
   * @param parameter
   * @returns
   */
  async getArticles(parameter: GetArticlesDto) {
    const { pageSize, current, tags, ...SQLwhere } = parameter;
    const repository = this.articleRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect(User, "from_user", "article.author_id = from_user.id")
      .select([
        "article.id as id",
        "article.prev as prev",
        'article.prev_imgs as "prevImgs"',
        'article.author_id as "authorId"',
        "article.url as url",
        'from_user.nickname as "author"',
        "from_user.avatar as avatar",
        'article.create_at as "createAt"',
      ]);
    const options = {
      where: SQLwhere,
      pageSize,
      current,
      likeKeys: ["prev"] as (keyof Article)[],
      whereLeft: tags
        ? `string_to_array(article.tags,',') @> array ${JSON.stringify(
            tags.split(",")
          ).replaceAll('"', "'")}`
        : "",
    };

    try {
      return await getPageByQueryRunner(repository, options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取文章列表失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getArticle(parameter: GetArticleDto) {
    await queryHas(this.articleRepository, { where: parameter });
    const repository = this.articleRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect(User, "from_user", "article.author_id = from_user.id")
      .select([
        "article.id as id",
        "article.url as url",
        "article.prev as prev",
        'article.prev_imgs as "prevImgs"',
        "article.tags as tags",
        'article.author_id as "authorId"',
        'from_user.nickname as "author"',
        "from_user.avatar as avatar",
        'article.create_at as "createAt"',
      ])
      .where(parameter);
    try {
      return await repository.getRawOne();
    } catch (error) {
      Logger.error(error);
      throw new HttpException("获取文章失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * 文章 - 提交文章
   * @param parameter
   * @returns
   */
  async postArticle(parameter: PostArticleDto) {
    try {
      await this.articleRepository.save(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("提交文章失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * 文章 - 更新文章
   * @param parameter
   * @returns
   */
  async putArticle({ id, ...parameter }: PutArticleDto) {
    await queryHas(this.articleRepository, { where: { id } });
    try {
      await await this.articleRepository.update({ id }, parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("更新文章失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * 文章 - 删除文章
   * @param parameter
   * @returns
   */
  async deleteArticle(parameter: DeleteArticleDto) {
    await queryHas(this.articleRepository, { where: parameter });
    try {
      await this.articleRepository.delete(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("删除文章失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
