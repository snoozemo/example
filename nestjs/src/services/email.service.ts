import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EMailService {
	constructor(private readonly mailerService: MailerService) {}

	/**
	 * 邮件发送
	 */
	public example(subject: string, text: string, html: string) {
		this.mailerService
			.sendMail({
				to: "pingjintao@qq.com",
				from: "发送邮箱",
				subject: subject,
				text: text,
				html: html,
			})
			.then((err) => Logger.debug(JSON.stringify(err)))
			.catch((err) => Logger.debug(JSON.stringify(err)));
	}
}
