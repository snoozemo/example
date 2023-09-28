import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { DictService } from "@/services/dict.service";
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
import { GetDictEnumsVo, GetDictsVo, GetDictVo } from "../models/dict.vo";
import {
  DeleteDictDto,
  GetDictDto,
  GetDictsDto,
  PostDictDto,
  PutDictDto,
} from "../models/dict.dto";
import { BooleanVo } from "@/common/vo";

@Controller("dict")
@ApiTags("DictController")
export class DictController {
  constructor(private readonly dictService: DictService) {}

  /**
   * @description 字典列表-分页
   * @param queryMessagesDto
   * @returns
   */
  @Get("list")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOperation({ summary: "getDicts" })
  @ApiOkResponse({ type: GetDictsVo })
  async getDicts(@Query() GetDictsParams: GetDictsDto) {
    return await this.dictService.getDicts(GetDictsParams);
  }

  /**
   * @description 枚举字典列表
   * @param queryMessagesDto
   * @returns
   */
  @Get("enum/:name")
  @ApiOkResponse({ type: GetDictEnumsVo })
  @ApiOperation({ summary: "getDictEnums" })
  async getDictEnums(@Param("name") enumName: string) {
    return await this.dictService.getEnums({ name: enumName });
  }
  /**
   * @description 字典详情
   * @param queryDictParams
   * @returns
   */
  @Get("details")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: GetDictVo })
  @ApiOperation({ summary: "getDict" })
  async getDict(@Query() getDictParams: GetDictDto) {
    return await this.dictService.getDict(getDictParams);
  }
  /**
   *
   * @description 新增字典
   * @param commitMessageParams
   * @returns
   */
  @Post("post")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "postDict" })
  async postDict(@Req() req, @Body() postDictParams: PostDictDto) {
    postDictParams.createUserId = req.user.id as number;
    return await this.dictService.postDict(postDictParams);
  }
  /**
   *
   * @description 修改字典
   * @param putDictParams
   * @returns
   */
  @Put("put")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "putDict" })
  async putDict(@Req() req, @Body() putDictParams: PutDictDto) {
    putDictParams.createUserId = req.user.id as number;
    return await this.dictService.putDict(putDictParams);
  }

  /**
   *
   * @description 删除字典
   * @param deleteDictParams
   * @returns
   */
  @Delete("delete")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "deleteDict" })
  async deleteDict(@Query() deleteDictParams: DeleteDictDto) {
    return await this.dictService.deleteDict(deleteDictParams);
  }
}
