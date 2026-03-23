import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RedisOptions } from 'ioredis';
import type { IRedisAdapter } from '../interfaces/redis-adapter.interface';
import type { RedisConfig } from '../interfaces/redis-config.interface';
import { REDIS_CONFIG_TOKEN } from '../constants';

@Injectable()
export class StandaloneAdapter implements IRedisAdapter {
  constructor(private readonly config: ConfigService) {}

  getConfig(): RedisOptions {
    const redis = this.config.get<RedisConfig>(REDIS_CONFIG_TOKEN);

    if (!redis) {
      throw new InternalServerErrorException('Redis configuration not found');
    }

    return {
      host: redis.host,
      port: redis.port,
      db: redis.db,
      password: redis.password,
      tls: redis.tls ? {} : undefined,
    };
  }
}
