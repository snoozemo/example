import { Module } from "@nestjs/common";
import { UserModule } from "@/modules/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "@/common/strategies/local.strategy";
import { JwtClass } from "../configs/jwt.class";
import { AuthService } from "../services/auth.service";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { ConfigModule } from "@/modules/config.module";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: JwtClass,
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
