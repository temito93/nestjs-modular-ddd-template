import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import type { PrismaClient, Prisma } from '@app/generated/prisma';
import { OrderEntity } from '../entities/order.entity';
import type { IOrderDal, CreateOrderParams } from './interfaces';

@Injectable()
export class OrderDal implements IOrderDal {
  private readonly client: PrismaClient;

  constructor(prisma: PrismaService) {
    this.client = prisma as unknown as PrismaClient;
  }

  async create(params: CreateOrderParams): Promise<OrderEntity> {
    const record = await this.client.order.create({
      data: {
        accountId: params.accountId,
        sourceCurrencyId: params.sourceCurrencyId,
        targetCurrencyId: params.targetCurrencyId,
        sourceAmount: params.sourceAmount,
        targetAmount: params.targetAmount,
        rate: params.rate,
        status: params.status,
        subStatus: params.subStatus,
        details: params.details as Prisma.InputJsonValue,
      },
    });

    return new OrderEntity({
      id: record.id,
      accountId: record.accountId,
      sourceCurrencyId: record.sourceCurrencyId,
      targetCurrencyId: record.targetCurrencyId,
      sourceAmount: record.sourceAmount.toString(),
      targetAmount: record.targetAmount.toString(),
      rate: record.rate.toString(),
      status: record.status,
      subStatus: record.subStatus,
      details: record.details as Record<string, unknown>,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
    });
  }
}
