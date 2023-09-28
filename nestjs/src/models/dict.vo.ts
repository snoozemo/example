import { GetListVO, ResultVO } from "@/common/vo";
import { ApiProperty } from "@nestjs/swagger";

/** @description GetDictsVo */
export class DictsItemsVo {
  @ApiProperty()
  id: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  pid: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  creator: string;
}

export class DictsListVo extends GetListVO {
  @ApiProperty({ type: DictsItemsVo, isArray: true })
  data: DictsItemsVo;
}
export class GetDictsVo extends ResultVO {
  @ApiProperty({ type: DictsListVo })
  data: DictsListVo;
}

/** @description GetDictEnumsVo */
export class DictEnumsVo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  label: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  pid: number;
  @ApiProperty({
    type: DictEnumsVo,
    isArray: true,
  })
  children?: DictEnumsVo[];
}

export class GetDictEnumsVo extends ResultVO {
  @ApiProperty({ type: DictEnumsVo, isArray: true })
  data: DictEnumsVo;
}

/** @description GetDictVo */
export class DictVo extends DictsItemsVo {
  @ApiProperty()
  createAt: string;
}
export class GetDictVo extends ResultVO {
  @ApiProperty({ type: DictVo })
  data: DictVo;
}
