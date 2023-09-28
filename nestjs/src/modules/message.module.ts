import { Module } from "@nestjs/common";
import { MessageService } from "@/services/message.service";
import { MessageController } from "@/controllers/message.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../entities/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessagesModule {}
