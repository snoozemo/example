import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ArticleService } from "@/services/article.service";
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { GetArticlesVo, GetArticleVo } from "../models/article.vo";
import {
  DeleteArticleDto,
  GetArticleDto,
  GetArticlesDto,
  PostArticleDto,
  PutArticleDto,
} from "../models/article.dto";
import { BooleanVo } from "@/common/vo";
@Controller("article")
@ApiTags("ArticleController")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * @description 文章列表
   * @param queryArticlesParams
   * @returns
   */
  @Get("list")
  @ApiOperation({ summary: "getArticles" })
  @ApiOkResponse({ type: GetArticlesVo })
  async getArticles(@Query() queryArticlesParams: GetArticlesDto) {
    return await this.articleService.getArticles(queryArticlesParams);
  }
  /**
   * @description 文章详情
   * @param queryArticleParams
   * @returns
   */
  @Get("details")
  @ApiOperation({ summary: "getArticle" })
  @ApiOkResponse({ type: GetArticleVo })
  async getArticle(@Query() queryArticleParams: GetArticleDto) {
    return await this.articleService.getArticle(queryArticleParams);
  }
  /**
   *
   * @description 提交文章
   * @param addArticleParams
   * @returns
   */
  @Post("post")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOperation({ summary: "postArticle" })
  @ApiOkResponse({ type: BooleanVo })
  async postArticle(@Req() req, @Body() addArticleParams: PostArticleDto) {
    addArticleParams.authorId = req.user.id;
    return await this.articleService.postArticle(addArticleParams);
  }
  /**
   *
   * @description 修改文章
   * @param addArticleParams
   * @returns
   */
  @Put("put")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOperation({ summary: "putArticle" })
  @ApiOkResponse({ type: BooleanVo })
  async putArticle(@Body() addArticleParams: PutArticleDto) {
    return await this.articleService.putArticle(addArticleParams);
  }

  /**
   *
   * @description 删除文章
   * @param commitMessageParams
   * @returns
   */
  @Delete("delete")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "deleteArticle" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  async deleteArticle(@Query() deleteArticleParams: DeleteArticleDto) {
    return await this.articleService.deleteArticle(deleteArticleParams);
  }
}
