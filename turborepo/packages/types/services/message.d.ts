declare namespace Api {
  export interface MessagesItemVo {
    beCommentedId?: number;
    content: string;
    fromAvatar: string;
    fromId: number;
    fromName: string;
    id: number;
    toAvatar?: string;
    toId?: number;
    toName?: string;
  }
  export interface MessageVo extends MessagesItemVo {
    createAt: string;
  }
  export interface PostMessageDto {
    beCommentedId: number;
    content: string;
    toId: number;
  }
  export interface PutMessageDto extends PostMessageDto {
    id: number;
  }
  export interface GetMessageDto {
    id: number;
  }
  export interface DeleteMessageDto extends GetMessageDto {}
  export interface GetMessagesDto extends ListDto {
    beCommentedId?: number;
    content?: string;
    fromId?: number;
    toId?: number;
  }
}
