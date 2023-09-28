// import { ConfigService } from "@/common/config/config.service";
import {
  MailerOptions,
  type MailerOptionsFactory,
} from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
@Injectable()
export class MailerClass implements MailerOptionsFactory {
  constructor() {} // private readonly configService: ConfigService
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: "smtp.office365.com",
        port: 587,
        ssl: true,
        auth: {
          user: "snoozenno@outlook.com",
          pass: "Pjt20221106..",
        },
      },
      defaults: {
        from: "snoozemo.com <snoozenno@outlook.com>",
        subject: "",
        text: "",
        html: "",
      },
      template: {
        dir: "./template/",
        adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    };
  }
}
