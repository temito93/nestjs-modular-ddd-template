import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IDatabaseAdapter } from '../interfaces/database-adapter.interface';
import type { DatabaseConfig } from '../interfaces/database-config.interface';
import { DATABASE_CONFIG_TOKEN } from '../constants';

@Injectable()
export class ClusterAdapter implements IDatabaseAdapter {
  constructor(private readonly config: ConfigService) {}

  getConnectionString(): string {
    const db = this.config.get<DatabaseConfig>(DATABASE_CONFIG_TOKEN);

    if (!db) {
      throw new InternalServerErrorException(
        'Database configuration not found',
      );
    }

    const primary = db.primaryHost ?? db.host;
    const ssl = db.ssl ? '?sslmode=require' : '';

    return `postgresql://${db.user}:${db.password}@${primary}:${db.port}/${db.name}${ssl}`;
  }
}
