import { ListDto } from "./list.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class GetMessageDto {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "评论Id不合规" })
  readonly id: number;
}

export class DeleteMessagesDto extends GetMessageDto {}

export class GetMessagesDto extends ListDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: "评论内容不合规" })
  readonly content?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "被评论内容ID不合规" })
  readonly beCommentedId?: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "被评论用户ID不合规" })
  readonly toId?: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "评论用户ID不合规" })
  readonly fromId?: number;
}

export class PostMessageDto {
  @ApiProperty({ minLength: 5, maxLength: 2500 })
  @IsOptional()
  @IsString({ message: "评论内容不合规" })
  @Length(5, 2500, { message: "评论内容长度5~2500" })
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: "被评论内容ID不合规" })
  readonly beCommentedId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: "被评论用户ID不合规" })
  readonly toId: number;

  readonly fromId: number;
}

export class PutMessagesDto extends PostMessageDto {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "评论Id不合规" })
  readonly id: number;
}
