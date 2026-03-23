export interface DatabaseConfig {
  mode: 'single' | 'cluster';
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  primaryHost?: string;
  replicaHosts?: string[];
  poolMin?: number;
  poolMax?: number;
  ssl?: boolean;
}
