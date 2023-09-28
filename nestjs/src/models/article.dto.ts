import { ListDto } from "./list.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

export class GetArticleDto {
  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "文章ID不合规" })
  @IsNotEmpty({ message: "文章ID不为空" })
  readonly id: number;
}
export class GetArticlesDto extends ListDto {
  @ApiProperty({ minLength: 1, maxLength: 500 })
  @IsOptional()
  @IsString({ message: "预览内容不合规" })
  @Length(1, 500, { message: "预览内容长度1~500" })
  readonly prev?: string;

  @ApiProperty({ minLength: 0, maxLength: 100 })
  @IsOptional()
  @IsString({ message: "标签内容" })
  @Length(0, 100, { message: "标签长度0~100" })
  readonly tags?: string;

  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsOptional()
  @IsInt({ message: "用户ID不合规" })
  readonly authorId?: number;
}

export class PostArticleDto {
  @ApiProperty({ minLength: 7, maxLength: 500 })
  @IsUrl({}, { message: "文章链接不合规" })
  @Length(7, 500, { message: "文章链接长度7~500" })
  readonly url: string;

  @ApiProperty({ minLength: 0, maxLength: 100 })
  @IsOptional()
  @IsString({ message: "标签不合规" })
  @Length(0, 100, { message: "标签长度0~100" })
  readonly tags?: string;

  @ApiProperty({ minLength: 0, maxLength: 1000 })
  @IsOptional()
  @IsString({ message: "预览图片不合规" })
  @Length(0, 1000, { message: "预览图片链接长度0~1000" })
  readonly prevImgs: string;

  @ApiProperty({ minLength: 1, maxLength: 500 })
  @Length(1, 500, { message: "预览内容长度1~500" })
  @IsString({ message: "预览内容不合规" })
  prev: string;

  authorId?: number;
}

export class PutArticleDto extends PostArticleDto {
  @ApiProperty()
  @IsInt({ message: "文章ID不合规" })
  @IsNotEmpty({ message: "文章ID不为空" })
  readonly id: number;
}

export class DeleteArticleDto extends GetArticleDto {}
