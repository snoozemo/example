import { ConfigService } from "@/services/config.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(process.argv[2] || '.env.development'), //pm2
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
