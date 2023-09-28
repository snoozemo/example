import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
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

    Logger.log(msg, "HttpException");

    // 设置返回的状态码、请求头、发送错误信息
    response.status(HttpStatus.OK);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
