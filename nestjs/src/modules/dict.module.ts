import { Module } from "@nestjs/common";
import { DictService } from "@/services/dict.service";
import { DictController } from "@/controllers/dict.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Dict } from "@/entities/dict.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dict])],
  providers: [DictService],
  controllers: [DictController],
})
export class DictModule {}
