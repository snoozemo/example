import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "@/common/filters/transform.interceptor";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@/common/validator/validate.pipe";
import { useSwagger } from "./common/utils/swagger";

async function bootstrap() {
  // 检查必须的环境变量
  // checkEnvKeys();

  const app = await NestFactory.create(AppModule);
  // 过滤器
  // app.useGlobalFilters(new HttpExceptionFilter(),);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: "*" });

  useSwagger(app)

  await app.listen(3100);
  Logger.log(await app.getUrl(), "Listen");
  Logger.log(`${await app.getUrl()}/swagger`, "Swagger");
}
bootstrap();
