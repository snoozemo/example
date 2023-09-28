import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "@/entities/user.entity";
import { Message } from "@/entities/message.entity";
import { Article } from "@/entities/article.entity";
import { Dict } from "@/entities/dict.entity";
import { ConfigService } from "../services/config.service";

@Injectable()
export class TypeormClass implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService
  ) {

  }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      url: this.configService.get("POSTGRESSQL_URL"),
      entities: [Message, User, Article, Dict],
      // entities: [`${__dirname}/*/*.entity{.ts,.js}`],
      synchronize: true,
    };
  }
}
