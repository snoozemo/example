declare namespace Api {
  export interface ArticlesItemVo {
    author: string;
    authorId: number;
    avatar: string;
    createAt: string;
    id: number;
    prev?: string;
    prevImgs?: string;
    url: string;
  }
  export interface ArticleVo extends ArticlesItemVo {
    tags: string;
  }
  export interface PostArticleDto {
    prev: string;
    prevImgs: string;
    tags: string;
    url: string;
  }
  export interface PutArticleDto extends PostArticleDto {
    id: number;
  }
  export interface GetArticleDto {
    id: number;
  }
  export interface GetArticlesDto extends ListDto {
    authorId?: number;
    prev?: string;
    tags?: string;
  }
  export interface DeleteArticleDto extends GetArticleDto {}
}
