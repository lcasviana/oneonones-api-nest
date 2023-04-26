import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const httpContext: HttpArgumentsHost = host.switchToHttp();
    const httpResponse: Response = httpContext.getResponse<Response>();

    const status: number = exception.getStatus();
    const { message }: Record<string, any> = exception.getResponse() as Record<string, any>;

    httpResponse.status(status).json({ status, message });
  }
}
