import type { OrderStatus, OrderSubStatus } from '@app/generated/prisma';

export class OrderEntity {
  readonly id: string;
  readonly accountId: string;
  readonly sourceCurrencyId: string;
  readonly targetCurrencyId: string;
  readonly sourceAmount: string;
  readonly targetAmount: string;
  readonly rate: string;
  readonly status: OrderStatus;
  readonly subStatus: OrderSubStatus;
  readonly details: Record<string, unknown>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(params: {
    id: string;
    accountId: string;
    sourceCurrencyId: string;
    targetCurrencyId: string;
    sourceAmount: string;
    targetAmount: string;
    rate: string;
    status: OrderStatus;
    subStatus: OrderSubStatus;
    details: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }) {
    this.id = params.id;
    this.accountId = params.accountId;
    this.sourceCurrencyId = params.sourceCurrencyId;
    this.targetCurrencyId = params.targetCurrencyId;
    this.sourceAmount = params.sourceAmount;
    this.targetAmount = params.targetAmount;
    this.rate = params.rate;
    this.status = params.status;
    this.subStatus = params.subStatus;
    this.details = params.details;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.deletedAt = params.deletedAt;
  }
}
