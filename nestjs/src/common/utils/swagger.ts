import { GetArticlesVo } from "@/models/article.vo";
import { INestApplication, Type } from "@nestjs/common";
import { ApiOkResponse, ApiProperty, DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GetListVO, ResultVO } from "@/models/index.vo";
import { schemas } from "./schemas";

export function GetVoFn<TModel extends Type<any>>(
  model: TModel,
  isArray: boolean = false
) {
  class Vo extends ResultVO {
    @ApiProperty({ type: model, isArray })
    data: typeof model;
  }
  return Vo;
}

export function GetListVoFn<TModel extends Type<any>>(model: TModel) {
  class List extends GetListVO {
    @ApiProperty({ type: GetArticlesVo, isArray: true })
    data: GetArticlesVo;
  }
  class Vo extends ResultVO {
    @ApiProperty({ type: List })
    data: List;
  }
  return Vo;
}
export interface ApiVoResponseOptions {
  isArray?: boolean;
  isPager?: boolean;
  description?: string;
}
export function ApiVoResponse<TModel extends Type<any>>(
  model: TModel,
  options: ApiVoResponseOptions = {}
) {
  const { isArray = false, isPager = false, description = "" } = options;

  return ApiOkResponse({
    description,
    type: isPager
      ? GetListVoFn(model)
      : isArray
      ? [GetVoFn(model)]
      : GetVoFn(model),
  });
}


export function useSwagger(app:INestApplication){
    if (process.env.ENV !== "prod") {
    const options = new DocumentBuilder()
      .setTitle("server.snoozemo.com")
      .setDescription("接口文档") // 文档介绍
      .setVersion("1.0.0") // 文档版本
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      extraModels: schemas,
    });
    SwaggerModule.setup("/swagger", app, document);
  }
}
