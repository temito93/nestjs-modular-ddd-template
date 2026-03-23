import { registerAs } from '@nestjs/config';

export const APP_CONFIG_TOKEN = 'app';

export interface AppConfig {
  port: number;
  nodeEnv: string;
  country: string;
}

export default registerAs(
  APP_CONFIG_TOKEN,
  (): AppConfig => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    country: process.env.COUNTRY ?? 'tr',
  }),
);
