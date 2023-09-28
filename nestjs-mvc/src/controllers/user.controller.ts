import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { UserService } from "@/services/user.service";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { Role } from "@/common/enums/role.enum";
import { Roles } from "@/common/decorators/roles.decorator";
import { RolesGuard } from "@/common/guards/roles.guard";
import { GetUsersVo, GetUserVo } from "../models/user.vo";
import {
  DeleteUserDto,
  GetUserDto,
  GetUsersDto,
  LoginByGithubOAuthDto,
  LoginDto,
  PostUserDto,
  PutUserDto,
} from "../models/user.dto";
import { BooleanVo, StringVo } from "@/common/vo";

/**
 * @author 再躺一会儿吧
 * @version 0.0.1
 * @date 2022/01/08 22:29
 */
@Controller("user")
@ApiTags("UserController")
export class UserController {
  constructor(
    // private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  /**
   * @description 管理员 - 获取用户列表
   * @param
   * @returns
   */
  @Get("list")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: GetUsersVo })
  @ApiOperation({ summary: "getUsers" })
  async getUsers(@Query() getUsersParams: GetUsersDto) {
    return this.userService.getUsers(getUsersParams);
  }

  /**
   * @description  gets user information by admin
   * @param
   * @returns
   */
  @Get("details")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: GetUserVo })
  @ApiOperation({ summary: "getUser" })
  async getUser(@Query() getUserParams: GetUserDto) {
    return await this.userService.getUser(getUserParams);
  }

  /**
   * @description  gets user information by public
   * @param
   * @returns
   */
  @Get("details/public")
  @ApiOkResponse({ type: GetUserVo })
  @ApiOperation({ summary: "getUser" })
  async getUserPublic(@Query() getUserParams: GetUserDto) {
    return await this.userService.getUserByPublic(getUserParams);
  }

  /**
   * @description gets user information by self
   * @param
   * @returns
   */
  @Get("/self")
  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: GetUserVo })
  @ApiOperation({ summary: "getSelfInfo" })
  async getSelfInfo(@Req() req) {
    return await this.userService.getUser({ id: req.user?.id as number });
  }

  /**
   * @description login by password & email
   * @param loginParams
   * @returns
   */
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: StringVo })
  @ApiOperation({ summary: "postLogin" })
  async postLogin(@Body() loginParams: LoginDto) {
    return await this.userService.getToken(loginParams);
  }

  /**
   * @description login by GitHub
   * @param loginParams
   * @returns
   */
  @Get("/oauth/github")
  @ApiOkResponse({ type: StringVo })
  @ApiOperation({ summary: "getLoginByGithub" })
  async getLoginByGithub(@Query() loginParams: LoginByGithubOAuthDto) {
    return await this.userService.getTokenByGithub(loginParams);
  }

  /**
   * @description 用户 - 新增用户
   * @param addUserDto
   * @returns
   */
  @Post("/register")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "postUser" })
  async postUser(@Body() postUserParams: PostUserDto) {
    return await this.userService.postUser(postUserParams);
  }

  /**
   * @description 管理员 - 更新用户信息
   * @param
   * @returns
   */
  @Put("put")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "putUser" })
  async putUser(@Req() req, @Body() putUserParams: PutUserDto) {
    putUserParams.id = req.user.id as number;
    return await this.userService.putUser(putUserParams);
  }

  /**
   * @description 管理员 - 删除用户
   * @param deleteUserDto
   * @returns
   */
  @Delete("delete")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: "Authorization", description: "jwt token" })
  @ApiOkResponse({ type: BooleanVo })
  @ApiOperation({ summary: "deleteUser" })
  async deleteUser(@Query() deleteUserParams: DeleteUserDto) {
    return await this.userService.deleteUser(deleteUserParams);
  }
}
