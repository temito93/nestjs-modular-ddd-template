import {
  DynamicModule,
  Module,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisConfig } from './interfaces/redis-config.interface';
import redisConfig from './redis.config';
import { StandaloneAdapter } from './adapters/standalone.adapter';
import { SentinelAdapter } from './adapters/sentinel.adapter';
import { RedisService } from './redis.service';
import { REDIS_CLIENT, REDIS_CONFIG_TOKEN } from './constants';
import Redis from 'ioredis';

@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule.forFeature(redisConfig)],
      providers: [
        {
          provide: REDIS_CLIENT,
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            const redis = config.get<RedisConfig>(REDIS_CONFIG_TOKEN);

            if (!redis) {
              throw new InternalServerErrorException(
                'Redis configuration not found',
              );
            }

            const adapter =
              redis.mode === 'sentinel'
                ? new SentinelAdapter(config)
                : new StandaloneAdapter(config);

            return new Redis(adapter.getConfig());
          },
        },
        RedisService,
      ],
      exports: [RedisService],
      global: true,
    };
  }
}
