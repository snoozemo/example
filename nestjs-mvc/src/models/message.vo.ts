import { GetListVO, ResultVO } from "@/common/vo";
import { ApiProperty } from "@nestjs/swagger";

/** @description GetMessagesVo */
export class MessagesItemVo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty({ required: false })
  beCommentedId?: number;
  @ApiProperty({ required: false })
  toId: number;
  @ApiProperty({ required: false })
  toName: string;
  @ApiProperty({ required: false })
  toAvatar: string;
  @ApiProperty()
  fromId: number;
  @ApiProperty()
  fromName: string;
  @ApiProperty()
  fromAvatar: string;
}
export class MessagesListVo extends GetListVO {
  @ApiProperty({ type: MessagesItemVo, isArray: true })
  data: MessagesItemVo[];
}
export class GetMessagesVo extends ResultVO {
  @ApiProperty({ type: MessagesListVo })
  data: MessagesListVo;
}
/** @description GetMessageVo */
export class MessageVo extends MessagesItemVo {
  @ApiProperty()
  createAt: string;
}

export class GetMessageVo extends ResultVO {
  @ApiProperty({ type: MessageVo })
  data: MessageVo;
}
