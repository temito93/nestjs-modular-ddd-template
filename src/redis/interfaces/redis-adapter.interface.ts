import type { RedisOptions } from 'ioredis';

export interface IRedisAdapter {
  getConfig(): RedisOptions;
}
