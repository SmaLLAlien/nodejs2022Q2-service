import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './services/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private customLogger: CustomLoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { body, query, method, originalUrl } = request;
    const bodyString = JSON.stringify(body);
    const queryString = JSON.stringify(query);

    response.on('finish', () => {
      const { statusCode } = response;

      this.customLogger.info(
        `${method} ${originalUrl} ${statusCode} - [BODY]: ${bodyString} [QUERY]: ${queryString}`,
      );
    });

    next();
  }
}
