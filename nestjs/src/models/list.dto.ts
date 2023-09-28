import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumberString, Min } from "class-validator";
export class ListDto {
  @ApiProperty({ default: 10 })
  @IsNotEmpty({ message: "不能为空" })
  @Min(0, { message: "分页大小不能小于1的整数" })
  @IsInt({ message: "分页为数字" })
  @Transform(({ value }) => value && +value)
  readonly pageSize: number;

  @ApiProperty({ default: 1 })
  @Transform(({ value }) => value && +value)
  @IsNotEmpty({ message: "页码不能为空" })
  @IsInt({ message: "页码为数字" })
  @Min(0, { message: "页码最小为0" })
  readonly current: number;
}
