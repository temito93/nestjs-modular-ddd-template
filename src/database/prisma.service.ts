import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import type { IDatabaseAdapter } from './interfaces/database-adapter.interface';
import { DATABASE_ADAPTER } from './constants';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(DATABASE_ADAPTER)
    adapter: IDatabaseAdapter,
  ) {
    super({
      adapter: new PrismaPg({
        connectionString: adapter.getConnectionString(),
      }),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
