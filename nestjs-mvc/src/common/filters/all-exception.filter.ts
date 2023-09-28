import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // super.catch(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const msg = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      data: null, // 获取全部的错误信息
      msg,
      code: status,
    };

    // console.log(exception);

    Logger.log(msg, "AllException");

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
