import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@/services/config.service";
// import { ConfigService } from "@/common/config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
     private readonly configService: ConfigService
  ) { // private readonly configService: ConfigService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: API.ValidatePayload) {
    return payload;
  }
}
