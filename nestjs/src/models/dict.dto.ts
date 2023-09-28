import { ListDto } from "./list.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class GetDictDto {
  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "标签ID不合规" })
  @IsNotEmpty({ message: "标签ID不为空" })
  readonly id: number;
}

export class GetDictsDto extends ListDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: "字典名不合规" })
  readonly name?: string;

  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "字典ID不合规" })
  readonly id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "键不合规" })
  readonly key?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "值不合规" })
  readonly value?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "用户ID参数不合规" })
  readonly createUserId?: number;
}

export class DeleteDictDto extends GetDictDto {}

export class PostDictDto {
  @ApiProperty({ minLength: 1, maxLength: 20 })
  @Length(0, 20, { message: "字典名长度0~20" })
  @IsString({ message: "字典名不合规" })
  @IsNotEmpty({ message: "字典名不为空" })
  readonly name: string;

  @ApiProperty({ minLength: 1, maxLength: 20 })
  @Length(0, 20, { message: "键长度0~20" })
  @IsString({ message: "键不合规" })
  @IsNotEmpty({ message: "键不为空" })
  readonly key: string;

  @ApiProperty({ minLength: 1, maxLength: 20 })
  @Length(0, 20, { message: "值长度0~20" })
  @IsString({ message: "值不合规" })
  @IsNotEmpty({ message: "值不为空" })
  readonly value: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: "PID不合规" })
  @IsNotEmpty({ message: "值不为空" })
  readonly pid: number;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsOptional()
  @Length(0, 200, { message: "简介内容长度0~200" })
  @IsString({ message: "简介内容不合规" })
  readonly desc: string;

  createUserId?: number;
}

export class PutDictDto extends PostDictDto {
  @Transform(({ value }) => value && +value)
  @ApiProperty()
  @IsInt({ message: "字典ID不合规" })
  @IsNotEmpty({ message: "字典ID不为空" })
  readonly id: number;
}
