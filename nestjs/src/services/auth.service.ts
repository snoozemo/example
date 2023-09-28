import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/services/user.service";
import { encryptPassword } from "../common/utils/cryptogram";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(
    email: string,
    password: string
  ): Promise<API.ValidatePayload> {
    const user = await this.usersService.getUserForAuth({ email });

    if (!user) {
      throw new HttpException("查无此人", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = user.password;
    // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
    const hashPassword = encryptPassword(password, String(user.id));
    if (hashedPassword !== hashPassword)
      throw new HttpException("密码错误", HttpStatus.BAD_REQUEST);

    return {
      id: user.id,
      username: user.username,
      level: user.level,
    };
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: API.ValidatePayload) {
    const payload = {
      id: user.id,
      username: user.username,
      level: user.level,
    };
    try {
      return `Bearer ${this.jwtService.sign(payload)}`;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        JSON.stringify(`登录失败:${JSON.stringify(error)}`),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
