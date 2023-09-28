import { UserModule } from "@/modules/user.module";
import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { TypeormClass } from "@/configs/typeorm.class";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesModule } from "@/modules/message.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "@/services/tasks.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerClass } from "@/configs/mailer.class";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";
import { AllExceptionsFilter } from "@/common/filters/all-exception.filter";
import { ArticleModule } from "@/modules/article.module";
import { DictModule } from "@/modules/dict.module";
import { ConfigModule } from "./modules/config.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: TypeormClass,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MailerClass,
    }),
    ScheduleModule.forRoot(),
    MessagesModule,
    UserModule,
    ArticleModule,
    DictModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TasksService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
