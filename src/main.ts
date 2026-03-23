import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getValidationPipeOptions } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log'],
    },
  );

  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe(getValidationPipeOptions(logger)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
