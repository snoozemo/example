import { ResultVO } from "@/common/vo";
import { GetListVO } from "@/common/vo";
import { ApiProperty } from "@nestjs/swagger";

/** @description GetArticlesVo */
export class ArticlesItemVo {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: false })
  prev: string;
  @ApiProperty({ required: false })
  prevImgs?: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  url: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  createAt: string;
}
export class ArticlesListVo extends GetListVO {
  @ApiProperty({ type: ArticlesItemVo, isArray: true })
  data: ArticlesItemVo[];
}

export class GetArticlesVo extends ResultVO {
  @ApiProperty({ type: ArticlesListVo })
  data: ArticlesListVo;
}

/** @description GetArticleVo */
export class ArticleVo extends ArticlesItemVo {
  @ApiProperty()
  tags: string;
}

export class GetArticleVo extends ResultVO {
  @ApiProperty({ type: ArticleVo })
  data: ArticleVo;
}
