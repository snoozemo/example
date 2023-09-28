import { Message } from "../entities/message.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getPageByQueryRunner, queryHas } from "@/common/utils/orm";
import { User } from "@/entities/user.entity";
import {
  DeleteMessagesDto,
  GetMessageDto,
  GetMessagesDto,
  PostMessageDto,
  PutMessagesDto,
} from "../models/message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}
  /**
   * @description 评论列表
   * @param parameter
   * @returns
   */
  async getMessages(parameter: GetMessagesDto) {
    const { pageSize, current, ...SQLwhere } = parameter;
    const repository = this.messageRepository
      .createQueryBuilder("msg")
      .leftJoinAndSelect(User, "from_user", "msg.from_id = from_user.id")
      .leftJoinAndSelect(User, "to_user", "msg.to_id = to_user.id")
      .select([
        "msg.id as id",
        "msg.content as content",
        'msg.be_commented_id as "beCommentedId"',
        'msg.create_at as "createAt"',
        'msg.to_id as "toId"',
        'msg.from_id as "fromId"',
        'to_user.nickname as "toName"',
        'to_user.avatar as "toAvatar"',
        'from_user.nickname as "fromName"',
        'from_user.avatar as "fromAvatar"',
      ]);
    const options = {
      where: SQLwhere,
      pageSize,
      current,
      likeKeys: ["content"] as (keyof Message)[],
    };

    try {
      return await getPageByQueryRunner(repository, options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取评论列表失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * @description 评论列表
   * @param parameter
   * @returns
   */
  async getMessage(parameter: GetMessageDto) {
    const repository = this.messageRepository
      .createQueryBuilder("msg")
      .leftJoinAndSelect(User, "form_user", "msg.from_id = form_user.id")
      .leftJoinAndSelect(User, "to_user", "msg.to_id = to_user.id")
      .select([
        "msg.id",
        "msg.content",
        'msg.be_commented_id as "beCommentedId"',
        'msg.create_at as "createAt"',
        'msg.to_id as "toId"',
        'msg.from_id "fromId"',
        'to_user.nickname as "toName"',
        'to_user.avatar as "toAvatar"',
        'form_user.nickname as "formName"',
        'form_user.avatar as "formAvatar"',
      ])
      .where(parameter);

    try {
      return await repository.getRawOne();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取评论详情失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * @description 提交评论
   * @param parameter
   * @returns
   */
  async postMessage(parameter: PostMessageDto): Promise<boolean> {
    try {
      await this.messageRepository.save(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("提交评论失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 修改评论
   * @param parameter
   * @returns
   */
  async putMessage({ id, ...parameter }: PutMessagesDto): Promise<boolean> {
    try {
      await this.messageRepository.update({ id }, parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("修改评论失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 删除评论
   * @param parameter
   * @returns
   */
  async deleteMessage(parameter: DeleteMessagesDto): Promise<boolean> {
    await queryHas(this.messageRepository, { where: parameter });
    try {
      await this.messageRepository.delete(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("删除评论失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
