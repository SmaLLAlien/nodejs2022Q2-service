import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from '../logger/services/custom-logger.service';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: CustomLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Server cant handle you request, please try again later'
        : exception.message;

    this.log(request, status, message);

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private log(request: any, status: number, message: string) {
    const { body, query, method, originalUrl } = request;
    const bodyString = JSON.stringify(body);
    const queryString = JSON.stringify(query);
    const loggerMessage = `[HttpExceptionFilter]: ${message} ${method} ${originalUrl} ${status} - [BODY]: ${bodyString} [QUERY]: ${queryString}`;
    this.logger.errorLog(loggerMessage);
  }
}
