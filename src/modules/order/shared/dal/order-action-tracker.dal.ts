import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import type { PrismaClient } from '@app/generated/prisma';
import { OrderActionTrackerEntity } from '../entities/order-action-tracker.entity';
import type {
  IOrderActionTrackerDal,
  CreateTrackerParams,
  UpdateTrackerParams,
} from './interfaces';

@Injectable()
export class OrderActionTrackerDal implements IOrderActionTrackerDal {
  private readonly client: PrismaClient;

  constructor(prisma: PrismaService) {
    this.client = prisma as unknown as PrismaClient;
  }

  async create(params: CreateTrackerParams): Promise<OrderActionTrackerEntity> {
    const record = await this.client.orderActionTracker.create({
      data: {
        idempotencyKey: params.idempotencyKey,
        accountId: params.accountId,
        sourceCurrencyId: params.sourceCurrencyId,
        sourceAmount: params.sourceAmount,
        targetCurrencyId: params.targetCurrencyId,
        targetAmount: params.targetAmount,
        rate: params.rate,
        status: params.status,
      },
    });

    return this.toEntity(record);
  }

  async update(
    id: string,
    params: UpdateTrackerParams,
  ): Promise<OrderActionTrackerEntity> {
    const record = await this.client.orderActionTracker.update({
      where: { id },
      data: {
        status: params.status,
        orderId: params.orderId,
        errorMessage: params.errorMessage,
        transactionRef: params.transactionRef,
      },
    });

    return this.toEntity(record);
  }

  async delete(id: string): Promise<void> {
    await this.client.orderActionTracker.delete({
      where: { id },
    });
  }

  private toEntity(
    record: Awaited<
      ReturnType<typeof this.client.orderActionTracker.findFirstOrThrow>
    >,
  ): OrderActionTrackerEntity {
    return new OrderActionTrackerEntity({
      id: record.id,
      idempotencyKey: record.idempotencyKey,
      accountId: record.accountId,
      sourceCurrencyId: record.sourceCurrencyId,
      sourceAmount: record.sourceAmount.toString(),
      targetCurrencyId: record.targetCurrencyId,
      targetAmount: record.targetAmount.toString(),
      rate: record.rate.toString(),
      transactionRef: record.transactionRef,
      errorMessage: record.errorMessage,
      status: record.status,
      orderId: record.orderId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
