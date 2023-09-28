import { GetListVO, ResultVO } from "@/common/vo";
import { ApiProperty } from "@nestjs/swagger";

export class UsersItemVo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty({ required: false })
  avatar: string;
  @ApiProperty()
  createAt: string;
  @ApiProperty()
  updateAt: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  level: string;
}

export class UsersListVo extends GetListVO {
  @ApiProperty({ type: UsersItemVo, isArray: true })
  data: UsersItemVo[];
}
export class GetUsersVo extends ResultVO {
  @ApiProperty({ type: UsersListVo })
  data: UsersListVo;
}
/** @description GetUserVo */
export class UserVo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty({ required: false })
  email: string;
}
export class GetUserVo extends ResultVO {
  @ApiProperty({ type: UserVo })
  data: UserVo;
}
