import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { RedisModule } from './redis/redis.module.js';
import { appConfig, databaseConfig, redisConfig } from './config';
import { validate } from './config/env.validation';
import { CreateOrderModule } from './modules/order/create/create-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
      validate,
    }),
    DatabaseModule.forRoot(),
    RedisModule.forRoot(),
    CreateOrderModule,
  ],
})
export class AppModule {}
