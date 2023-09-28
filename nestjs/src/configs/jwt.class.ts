// import { ConfigService } from "@/common/config/config.service";
import { ConfigService } from "@/services/config.service";
import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtClass implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService
  ) {
    // private readonly configService: ConfigService
    if (!this.configService.get("JWT_SECRET")) {
      throw new Error("JWT_SECRET Miss");
    }
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get("JWT_SECRET"),
      // secret: process.env.JWT_SECRET,
      signOptions: {
        // expiresIn: "7d" //TODO auto sign expires
      },
    };
  }
}
