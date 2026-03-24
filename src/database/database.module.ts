import {
  DynamicModule,
  Module,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { DatabaseConfig } from './interfaces/database-config.interface';
import { SingleNodeAdapter } from './adapters/single-node.adapter';
import { ClusterAdapter } from './adapters/cluster.adapter';
import { PrismaService } from './prisma.service';
import { DATABASE_ADAPTER, DATABASE_CONFIG_TOKEN } from './constants';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,

      providers: [
        {
          provide: DATABASE_ADAPTER,
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            const db = config.get<DatabaseConfig>(DATABASE_CONFIG_TOKEN);

            if (!db) {
              throw new InternalServerErrorException(
                'Database configuration not found',
              );
            }

            return db.mode === 'cluster'
              ? new ClusterAdapter(config)
              : new SingleNodeAdapter(config);
          },
        },
        PrismaService,
      ],
      exports: [PrismaService],
      global: true,
    };
  }
}
