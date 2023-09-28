import { AuthService } from "@/services/auth.service";
import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@/modules/config.module";
import { JwtClass } from "@/configs/jwt.class";
import { EMailService } from "@/services/email.service";
import { JwtStrategy } from "@/common/strategies/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: JwtClass,
    }),
    ConfigModule,
  ],
  providers: [UserService, AuthService, EMailService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
