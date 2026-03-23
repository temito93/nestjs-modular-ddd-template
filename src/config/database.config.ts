import { registerAs } from '@nestjs/config';
import { DATABASE_CONFIG_TOKEN } from '@app/database/constants';
import { type DatabaseConfig } from '@app/database/interfaces/database-config.interface';

export default registerAs(
  DATABASE_CONFIG_TOKEN,
  (): DatabaseConfig => ({
    mode: process.env.DB_MODE as 'single' | 'cluster',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'postgres',
    primaryHost: process.env.DB_PRIMARY_HOST,
    replicaHosts: process.env.DB_REPLICA_HOSTS?.split(','),
    poolMin: parseInt(process.env.DB_POOL_MIN ?? '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX ?? '10', 10),
    ssl: process.env.DB_SSL === 'true',
  }),
);
