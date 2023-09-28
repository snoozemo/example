import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ResultVO {
  @ApiProperty({ example: 200, description: "状态码", type: "number" })
  code: number;
  @ApiProperty({ example: "接口调用成功", description: "提示信息" })
  msg: string;
}

export class GetListVO {
  @ApiProperty({ example: 1, description: "页码", type: "number" })
  total?: number;
  @ApiProperty({ example: true, description: "结果", type: "boolean" })
  success?: boolean;
}

export class BooleanVo extends ResultVO {
  @ApiProperty({ type: Boolean })
  data: Boolean;
}
export class StringVo extends ResultVO {
  @ApiProperty({ type: String })
  data: String;
}

