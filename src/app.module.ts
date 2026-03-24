import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { RedisModule } from './redis/redis.module.js';
import { appConfig, databaseConfig, redisConfig } from './config';
import { validate } from './config/env.validation';
import { CommonModule } from './common/common.module';
import { OrderModule } from '@app/modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
      validate,
    }),
    DatabaseModule.forRoot(),
    RedisModule.forRoot(),
    CommonModule,
    OrderModule,
  ],
})
export class AppModule {}
