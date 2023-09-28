import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { MessageService } from "@/services/message.service";
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Request } from "express";
import { GetMessagesVo, GetMessageVo } from "../models/message.vo";
import {
  DeleteMessagesDto,
  GetMessageDto,
  GetMessagesDto,
  PostMessageDto,
  PutMessagesDto,
} from "../models/message.dto";
import { BooleanVo } from "@/common/vo";

@Controller("message")
@ApiTags("MessageController")
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  /**
   * @description 评论列表
   * @param getMessagesParams
   * @returns
   */
  @Get("list")
  @ApiOkResponse({ type: GetMessagesVo })
  @ApiOperation({ summary: "getMessages" })
  async getMessages(@Query() getMessagesParams: GetMessagesDto) {
    return await this.messagesService.getMessages(getMessagesParams);
  }

  /**
   * @description 评论详情
   * @param getMessageParams
   * @returns
   */
  @Get("details")
  @ApiOkResponse({ type: GetMessageVo })
  @ApiOperation({ summary: "getMessage" })
  async getMessage(@Query() getMessageParams: GetMessageDto) {
    return await this.messagesService.getMessage(getMessageParams);
  }
  /**
   *
   * @description 提交评论
   * @param postMessageParams
   * @returns
   */
  @Post("post")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "postMessage" })
  async postMessage(
    @Req() req: Request<API.ValidatePayload>,
    @Body() postMessageParams: PostMessageDto
  ): Promise<boolean> {
    const user = req.user as API.ValidatePayload;
    return await this.messagesService.postMessage({
      ...postMessageParams,
      fromId: user.id,
    });
  }
  /**
   *
   * @description 修改评论
   * @param putMessageParams
   * @returns
   */
  @Put("put")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "putMessage" })
  async putMessage(@Body() putMessageParams: PutMessagesDto): Promise<boolean> {
    return await this.messagesService.putMessage(putMessageParams);
  }

  /**
   *
   * @description 删除评论
   * @param addMessageParams
   * @returns
   */
  @Delete("delete")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "deleteMessage" })
  async deleteMessage(
    @Query() deleteMessageParams: DeleteMessagesDto
  ): Promise<boolean> {
    return await this.messagesService.deleteMessage(deleteMessageParams);
  }
}
