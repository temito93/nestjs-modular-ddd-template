export interface RedisConfig {
  mode: 'standalone' | 'sentinel';
  host?: string;
  port?: number;
  // sentinel
  sentinelHosts?: { host: string; port: number }[];
  sentinelName?: string;
  sentinelPassword?: string;
  // common
  db?: number;
  password?: string;
  tls?: boolean;
}
