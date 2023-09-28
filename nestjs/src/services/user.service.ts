import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrderValue, FindOptionsWhere, Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { encryptPassword } from "@/common/utils/cryptogram";
// import { ConfigService } from "@/common/config/config.service";
import { createHash } from "crypto";
import { getPage, queryHas } from "@/common/utils/orm";
import { AuthService } from "@/services/auth.service";
import {
  DeleteUserDto,
  GetUserDto,
  GetUsersDto,
  LoginByGithubOAuthDto,
  LoginDto,
  PostUserByGithubOAuthDto,
  PostUserDto,
  PutUserDto,
} from "../models/user.dto";
import { ConfigService } from "@/services/config.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    this.client_id = configService.get("GITHUB_CLIENT_ID");
    this.client_secret = configService.get("GITHUB_CLIENT_SECRET");
    // this.client_id = process.env.GITHUB_CLIENT_ID;
    // this.client_secret = process.env.GITHUB_CLIENT_SECRET;
  }

  /** @description Github  client_id */
  client_id: string = "";

  /** @description Github  client_secret */
  client_secret: string = "";

  /**
   * @description 用户列表 - 分页
   * @param parameter
   * @returns
   */
  async getUsers(parameter: GetUsersDto) {
    const { pageSize, current, ...SQLwhere } = parameter;

    const options = {
      where: SQLwhere,
      likeKeys: ["username", "nickname"] as (keyof User)[],
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
        createAt: true,
        updateAt: true,
        level: true,
        status: true,
      },
      order: {
        id: "DESC" as FindOptionsOrderValue,
      },
      current: +current,
      pageSize: +pageSize,
    };
    try {
      return await getPage(this.userRepository, options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取用户列表失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description gets user information by admin
   * @param parameter
   * @returns
   */
  async getUser(parameter: GetUserDto) {
    const options = {
      where: parameter,
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
        level: true,
        email: true,
      },
    };
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取用户信息失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description gets user information by public
   * @param parameter
   * @returns
   */
  async getUserByPublic(parameter: GetUserDto) {
    const options = {
      where: parameter,
      select: {
        id: true,
        username: true,
        nickname: true,
        avatar: true,
      },
    };
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取用户信息失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Github OAuth No.1 根据code获取 access_token
   * @url https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}
   */
  async getCodeByGithub() {
    return `https://github.com/login/oauth/authorize?client_id=${this.client_id}&scope=user:email`;
  }
  /**
   * @description Github OAuth No.1 根据code获取 access_token
   * @url https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}
   */
  async getAccessTokenByGithub(code: string): Promise<string> {
    // const client_id = this.configService.get("GITHUB_CLIENT_ID");
    // const client_secret = this.configService.get("GITHUB_CLIENT_SECRET");
    const url = `https://github.com/login/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&code=${code}`;
    const conf = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };
    try {
      const result = await await (await fetch(url, conf)).json();
      if (result.access_token) {
        return result.access_token;
      } else {
        throw new HttpException(
          "授权登录失败",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      Logger.error(error);
      throw new HttpException("授权登录失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description Github OAuth No.2 根据access_token获取 github 用户信息
   * @url https://api.github.com/user  https://api.github.com/user/emails
   */
  async getUserInfoByGithub(authorization: string) {
    const conf = {
      method: "GET",
      headers: {
        Authorization: `token ${authorization}`,
        "User-Agent": "easterCat",
      },
    };
    try {
      const userinfo = await (
        await fetch("https://api.github.com/user", conf)
      ).json();
      return {
        avatar: userinfo.avatar_url,
        username: userinfo.login,
        nickname: userinfo.name,
        gid: userinfo.id,
      };
    } catch (_error) {
      throw new HttpException(
        "Github授权信息获取失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description  Github OAuth No.3 储存 github 用户信息
   * @param parameter
   * @returns
   */
  async putUserByGithubOAuth(parameter: PostUserByGithubOAuthDto) {
    const options = {
      where: [
        {
          gid: parameter.gid,
        },
      ],
    };
    // 判断 是否存在
    try {
      const user = await this.userRepository.findOne(options);
      if (user) return user;
      return await this.userRepository.save(parameter);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "写入用户信息失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description  Github OAuth No.1-3  转换为本地 token
   * @returns
   */
  async getTokenByGithub(parameter: LoginByGithubOAuthDto) {
    const accessToken = await this.getAccessTokenByGithub(parameter.code);

    const userinfo = await this.getUserInfoByGithub(accessToken);

    /* username 重复检测 重复加上随机字符 */
    userinfo.username = await this.userRepository
      .count({
        where: { username: userinfo.username },
      })
      .then((result) => {
        if (!result) return userinfo.username;
        const hash = createHash("md5");
        hash.update(userinfo.username + result + Date.now());
        const username = `${userinfo.username}_${hash
          .digest("hex")
          .toLocaleUpperCase()
          .slice(2, 7)}${result}`;
        return username;
      });

    const { id, username, level } = await this.putUserByGithubOAuth(userinfo);

    return await this.authService.certificate({
      id,
      username,
      level,
    });
  }

  /**
   * @description  Emails Login in
   * @returns
   */
  async getToken(parameter: LoginDto) {
    const { email, password } = parameter;
    const tokenMeta = await this.authService.validateUser(email, password);
    return await this.authService.certificate(tokenMeta);
  }
  /**
   * 查询用户 Auth 模块使用 ./src/common/logical/auth.service.ts
   * @param where
   * @returns
   */
  async getUserForAuth(
    parameter: FindOptionsWhere<User> | FindOptionsWhere<User>[]
  ) {
    return await this.userRepository.findOne({
      where: parameter,
      select: { password: true, username: true, level: true, id: true },
    });
  }

  /**
   * 添加用户 @Email
   * @param parameter
   * @returns
   */
  async postUser({ password, ...parameter }: PostUserDto) {
    await queryHas(this.userRepository, {
      where: [
        {
          email: parameter.email,
        },
        {
          username: parameter.username,
        },
      ],
      yesOrNo: true,
      errMsg: "邮箱或用户名重复",
    });
    try {
      const { id } = await this.userRepository.save(parameter);
      password = encryptPassword(password, String(id));
      await this.userRepository.update({ id }, { password });
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("添加用户失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 更新用户
   * @param parameter
   * @returns
   */
  async putUser({ id, ...parameter }: PutUserDto) {
    await queryHas(this.userRepository, {
      where: [
        {
          email: parameter.email,
        },
        {
          username: parameter.username,
        },
      ],
      yesOrNo: true,
      errMsg: "邮箱或用户名重复",
    });
    if (parameter.password) {
      parameter.password = encryptPassword(parameter.password, String(id));
    }
    try {
      await this.userRepository.update({ id }, parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "修改用户信息失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * 删除用户
   * @param parameter
   * @returns
   */
  async deleteUser(parameter: DeleteUserDto): Promise<boolean> {
    await queryHas(this.userRepository, { where: parameter });
    try {
      await this.userRepository.delete(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("删除用户失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
