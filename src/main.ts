import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CustomLoggerService } from './logger/services/custom-logger.service';
import { HttpExceptionFilter } from './filters/http-exception-filter';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useLogger(new CustomLoggerService());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);

  console.log('************************************************************\n');
  logger.log(`Service is ready to receive messages on PORT - ${PORT}\n`);
  console.log('************************************************************\n');
}

bootstrap();
