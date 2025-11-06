import { HttpExceptionResponse } from "@ar7profacex/shared";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const error = exception as Error;
    const stack = error.stack;
    let exceptionName: string;
    let remoteExceptionName: string;
    let message: string;
    let messageDetail: string;
    let errorDescription: string;
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as HttpExceptionResponse;
      exceptionName = response.exceptionName || error.name;
      remoteExceptionName = response.remoteExceptionName;
      message = response.message || exception.message;
      messageDetail = response.messageDetail || response.message;
      statusCode = response.statusCode;
      errorDescription = "A HttpException has thrown";
    } else {
      exceptionName = error.name;
      message = "Ha ocurrido un problema, por favor reintente nuevamente";
      messageDetail = error.message;
      errorDescription = "A non HttpException has thrown";
    }

    const responseBody: HttpExceptionResponse = {
      exceptionName,
      remoteExceptionName,
      date: new Date(),
      path: httpAdapter.getRequestUrl(request),
      method: httpAdapter.getRequestMethod(request),
      statusCode,
      message,
      messageDetail,
      data: null,
    };

    console.log(`🚀 ~ HttpExceptionsFilter ~ catch ~ errorDescription:`, errorDescription, { ...responseBody, stack })

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
