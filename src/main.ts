import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getValidationPipeOptions } from './common/pipes/validation.pipe';
import { GlobalExceptionFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';
import { TRANSLATION_SERVICE } from './common/interfaces/translation-service.interface';
import type { ITranslationService } from './common/interfaces/translation-service.interface';
import { AppClsService } from './common/cls';
import type { AppConfig } from './config/app.config';
import { APP_CONFIG_TOKEN } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log'],
    },
  );

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(APP_CONFIG_TOKEN);

  if (!appConfig) {
    throw new Error('App configuration not found');
  }

  const translationService = app.get<ITranslationService>(TRANSLATION_SERVICE);
  const appClsService = app.get(AppClsService);

  app.useGlobalPipes(new ValidationPipe(getValidationPipeOptions(logger)));
  app.useGlobalFilters(
    new GlobalExceptionFilter(translationService, appConfig, appClsService),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(appClsService));

  await app.listen(appConfig.port);
}
void bootstrap();
