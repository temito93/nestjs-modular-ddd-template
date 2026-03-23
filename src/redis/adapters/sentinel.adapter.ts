import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RedisOptions } from 'ioredis';
import type { IRedisAdapter } from '../interfaces/redis-adapter.interface';
import type { RedisConfig } from '../interfaces/redis-config.interface';
import { REDIS_CONFIG_TOKEN } from '../constants';

@Injectable()
export class SentinelAdapter implements IRedisAdapter {
  constructor(private readonly config: ConfigService) {}

  getConfig(): RedisOptions {
    const redis = this.config.get<RedisConfig>(REDIS_CONFIG_TOKEN);

    if (!redis) {
      throw new InternalServerErrorException('Redis configuration not found');
    }

    if (!redis.sentinelHosts?.length || !redis.sentinelName) {
      throw new InternalServerErrorException(
        'Sentinel configuration is incomplete: sentinelHosts and sentinelName are required',
      );
    }

    return {
      sentinels: redis.sentinelHosts,
      name: redis.sentinelName,
      sentinelPassword: redis.sentinelPassword,
      password: redis.password,
      db: redis.db,
      tls: redis.tls ? {} : undefined,
    };
  }
}
