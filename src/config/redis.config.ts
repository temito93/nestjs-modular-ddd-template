import { registerAs } from '@nestjs/config';
import type { RedisConfig } from '../redis/interfaces/redis-config.interface';

export const REDIS_CONFIG_TOKEN = 'redis';

export default registerAs(
  REDIS_CONFIG_TOKEN,
  (): RedisConfig => ({
    mode: process.env.REDIS_MODE as 'standalone' | 'sentinel',
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    db: parseInt(process.env.REDIS_DB ?? '0', 10),
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === 'true',
    sentinelName: process.env.REDIS_SENTINEL_NAME,
    sentinelPassword: process.env.REDIS_SENTINEL_PASSWORD,
    sentinelHosts: process.env.REDIS_SENTINEL_HOSTS
      ? process.env.REDIS_SENTINEL_HOSTS.split(',').map((h) => {
          const [host, port] = h.split(':');
          return { host, port: parseInt(port, 10) };
        })
      : undefined,
  }),
);
